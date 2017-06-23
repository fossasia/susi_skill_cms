/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import { enableTabClick } from '../utils/dom/enableTabClick';
import { createCode } from './code';
import { isInternalFile } from '../utils/isInternalFile';

import { applyStyles } from '../utils/dom/css';
import { omittedFramesExpandedStyle, omittedFramesCollapsedStyle, functionNameStyle, depStyle, linkStyle, anchorStyle, hiddenStyle } from '../styles';

function getGroupToggle(document, omitsCount, omitBundle) {
  var omittedFrames = document.createElement('div');
  enableTabClick(omittedFrames);
  var text1 = document.createTextNode('\u25B6 ' + omitsCount + ' stack frames were collapsed.');
  omittedFrames.appendChild(text1);
  omittedFrames.addEventListener('click', function () {
    var hide = text1.textContent.match(/▲/);
    var list = document.getElementsByName('bundle-' + omitBundle);
    for (var index = 0; index < list.length; ++index) {
      var n = list[index];
      if (hide) {
        n.style.display = 'none';
      } else {
        n.style.display = '';
      }
    }
    if (hide) {
      text1.textContent = text1.textContent.replace(/▲/, '▶');
      text1.textContent = text1.textContent.replace(/expanded/, 'collapsed');
      applyStyles(omittedFrames, omittedFramesCollapsedStyle);
    } else {
      text1.textContent = text1.textContent.replace(/▶/, '▲');
      text1.textContent = text1.textContent.replace(/collapsed/, 'expanded');
      applyStyles(omittedFrames, omittedFramesExpandedStyle);
    }
  });
  applyStyles(omittedFrames, omittedFramesCollapsedStyle);
  return omittedFrames;
}

function insertBeforeBundle(document, parent, omitsCount, omitBundle, actionElement) {
  var children = document.getElementsByName('bundle-' + omitBundle);
  if (children.length < 1) {
    return;
  }
  var first = children[0];
  while (first != null && first.parentNode !== parent) {
    first = first.parentNode;
  }
  var div = document.createElement('div');
  enableTabClick(div);
  div.setAttribute('name', 'bundle-' + omitBundle);
  var text = document.createTextNode('\u25BC ' + omitsCount + ' stack frames were expanded.');
  div.appendChild(text);
  div.addEventListener('click', function () {
    return actionElement.click();
  });
  applyStyles(div, omittedFramesExpandedStyle);
  div.style.display = 'none';

  parent.insertBefore(div, first);
}

function frameDiv(document, functionName, url, internalUrl, onSourceClick) {
  var frame = document.createElement('div');
  var frameFunctionName = document.createElement('div');

  var cleanedFunctionName = void 0;
  if (!functionName || functionName === 'Object.<anonymous>') {
    cleanedFunctionName = '(anonymous function)';
  } else {
    cleanedFunctionName = functionName;
  }

  var cleanedUrl = url.replace('webpack://', '.');

  if (internalUrl) {
    applyStyles(frameFunctionName, Object.assign({}, functionNameStyle, depStyle));
  } else {
    applyStyles(frameFunctionName, functionNameStyle);
  }

  frameFunctionName.appendChild(document.createTextNode(cleanedFunctionName));
  frame.appendChild(frameFunctionName);

  var frameLink = document.createElement('div');
  applyStyles(frameLink, linkStyle);
  var frameAnchor = document.createElement('a');
  applyStyles(frameAnchor, anchorStyle);
  frameAnchor.appendChild(document.createTextNode(cleanedUrl));
  frameLink.appendChild(frameAnchor);
  frame.appendChild(frameLink);

  if (typeof onSourceClick === 'function') {
    var handler = onSourceClick;
    enableTabClick(frameAnchor);
    frameAnchor.style.cursor = 'pointer';
    frameAnchor.addEventListener('click', function () {
      handler();
    });
  }

  return frame;
}

function isBultinErrorName(errorName) {
  switch (errorName) {
    case 'EvalError':
    case 'InternalError':
    case 'RangeError':
    case 'ReferenceError':
    case 'SyntaxError':
    case 'TypeError':
    case 'URIError':
      return true;
    default:
      return false;
  }
}

function getPrettyURL(sourceFileName, sourceLineNumber, sourceColumnNumber, fileName, lineNumber, columnNumber, compiled) {
  var prettyURL = void 0;
  if (!compiled && sourceFileName && typeof sourceLineNumber === 'number') {
    // Remove everything up to the first /src/ or /node_modules/
    var trimMatch = /^[/|\\].*?[/|\\]((src|node_modules)[/|\\].*)/.exec(sourceFileName);
    if (trimMatch && trimMatch[1]) {
      prettyURL = trimMatch[1];
    } else {
      prettyURL = sourceFileName;
    }
    prettyURL += ':' + sourceLineNumber;
    // Note: we intentionally skip 0's because they're produced by cheap Webpack maps
    if (sourceColumnNumber) {
      prettyURL += ':' + sourceColumnNumber;
    }
  } else if (fileName && typeof lineNumber === 'number') {
    prettyURL = fileName + ':' + lineNumber;
    // Note: we intentionally skip 0's because they're produced by cheap Webpack maps
    if (columnNumber) {
      prettyURL += ':' + columnNumber;
    }
  } else {
    prettyURL = 'unknown';
  }
  return prettyURL;
}

function createFrame(document, frameSetting, frame, contextSize, critical, omits, omitBundle, parentContainer, lastElement, errorName) {
  var compiled = frameSetting.compiled;
  var functionName = frame.functionName,
      sourceFileName = frame._originalFileName;
  var fileName = frame.fileName,
      lineNumber = frame.lineNumber,
      columnNumber = frame.columnNumber,
      scriptLines = frame._scriptCode,
      sourceLineNumber = frame._originalLineNumber,
      sourceColumnNumber = frame._originalColumnNumber,
      sourceLines = frame._originalScriptCode;

  // TODO: find a better place for this.
  // Chrome has a bug with inferring function.name:
  // https://github.com/facebookincubator/create-react-app/issues/2097
  // Let's ignore a meaningless name we get for top-level modules.

  if (functionName === 'Object.friendlySyntaxErrorLabel' || functionName === 'Object.exports.__esModule') {
    functionName = '(anonymous function)';
  }

  var prettyURL = getPrettyURL(sourceFileName, sourceLineNumber, sourceColumnNumber, fileName, lineNumber, columnNumber, compiled);

  var needsHidden = false;
  var isInternalUrl = isInternalFile(sourceFileName, fileName);
  var isThrownIntentionally = !isBultinErrorName(errorName);
  var shouldCollapse = isInternalUrl && (isThrownIntentionally || omits.hasReachedAppCode);

  if (!isInternalUrl) {
    omits.hasReachedAppCode = true;
  }

  if (shouldCollapse) {
    ++omits.value;
    needsHidden = true;
  }

  var collapseElement = null;
  if (!shouldCollapse || lastElement) {
    if (omits.value > 0) {
      var capV = omits.value;
      var omittedFrames = getGroupToggle(document, capV, omitBundle);
      window.requestAnimationFrame(function () {
        insertBeforeBundle(document, parentContainer, capV, omitBundle, omittedFrames);
      });
      if (lastElement && shouldCollapse) {
        collapseElement = omittedFrames;
      } else {
        parentContainer.appendChild(omittedFrames);
      }
      ++omits.bundle;
    }
    omits.value = 0;
  }

  var onSourceClick = null;
  if (sourceFileName) {
    // e.g. "/path-to-my-app/webpack/bootstrap eaddeb46b67d75e4dfc1"
    var isInternalWebpackBootstrapCode = sourceFileName.trim().indexOf(' ') !== -1;
    if (!isInternalWebpackBootstrapCode) {
      onSourceClick = function onSourceClick() {
        // Keep this in sync with react-error-overlay/middleware.js
        fetch('/__open-stack-frame-in-editor?fileName=' + window.encodeURIComponent(sourceFileName) + '&lineNumber=' + window.encodeURIComponent(sourceLineNumber || 1)).then(function () {}, function () {});
      };
    }
  }

  var elem = frameDiv(document, functionName, prettyURL, shouldCollapse, onSourceClick);
  if (needsHidden) {
    applyStyles(elem, hiddenStyle);
    elem.setAttribute('name', 'bundle-' + omitBundle);
  }

  var hasSource = false;
  if (!shouldCollapse) {
    if (compiled && scriptLines && scriptLines.length !== 0 && lineNumber != null) {
      elem.appendChild(createCode(document, scriptLines, lineNumber, columnNumber, contextSize, critical, onSourceClick));
      hasSource = true;
    } else if (!compiled && sourceLines && sourceLines.length !== 0 && sourceLineNumber != null) {
      elem.appendChild(createCode(document, sourceLines, sourceLineNumber, sourceColumnNumber, contextSize, critical, onSourceClick));
      hasSource = true;
    }
  }

  return { elem: elem, hasSource: hasSource, collapseElement: collapseElement };
}

export { createFrame };