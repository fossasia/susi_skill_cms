
import { applyStyles } from '../utils/dom/css'; /**
                                                 * Copyright (c) 2015-present, Facebook, Inc.
                                                 * All rights reserved.
                                                 *
                                                 * This source code is licensed under the BSD-style license found in the
                                                 * LICENSE file in the root directory of this source tree. An additional grant
                                                 * of patent rights can be found in the PATENTS file in the same directory.
                                                 */

import { absolutifyCaret } from '../utils/dom/absolutifyCaret';
import { codeStyle, primaryErrorStyle, primaryPreStyle, secondaryErrorStyle, secondaryPreStyle } from '../styles';

import generateAnsiHtml from 'react-dev-utils/ansiHTML';

import codeFrame from 'babel-code-frame';

function createCode(document, sourceLines, lineNum, columnNum, contextSize, main, onSourceClick) {
  var sourceCode = [];
  var whiteSpace = Infinity;
  sourceLines.forEach(function (e) {
    var text = e.content;

    var m = text.match(/^\s*/);
    if (text === '') {
      return;
    }
    if (m && m[0]) {
      whiteSpace = Math.min(whiteSpace, m[0].length);
    } else {
      whiteSpace = 0;
    }
  });
  sourceLines.forEach(function (e) {
    var text = e.content;
    var line = e.lineNumber;


    if (isFinite(whiteSpace)) {
      text = text.substring(whiteSpace);
    }
    sourceCode[line - 1] = text;
  });
  var ansiHighlight = codeFrame(sourceCode.join('\n'), lineNum, columnNum == null ? 0 : columnNum - (isFinite(whiteSpace) ? whiteSpace : 0), {
    forceColor: true,
    linesAbove: contextSize,
    linesBelow: contextSize
  });
  var htmlHighlight = generateAnsiHtml(ansiHighlight);
  var code = document.createElement('code');
  code.innerHTML = htmlHighlight;
  absolutifyCaret(code);
  applyStyles(code, codeStyle);

  var ccn = code.childNodes;
  // eslint-disable-next-line
  oLoop: for (var index = 0; index < ccn.length; ++index) {
    var node = ccn[index];
    var ccn2 = node.childNodes;
    for (var index2 = 0; index2 < ccn2.length; ++index2) {
      var lineNode = ccn2[index2];
      var text = lineNode.innerText;
      if (text == null) {
        continue;
      }
      if (text.indexOf(' ' + lineNum + ' |') === -1) {
        continue;
      }
      // $FlowFixMe
      applyStyles(node, main ? primaryErrorStyle : secondaryErrorStyle);
      // eslint-disable-next-line
      break oLoop;
    }
  }
  var pre = document.createElement('pre');
  applyStyles(pre, main ? primaryPreStyle : secondaryPreStyle);
  pre.appendChild(code);

  if (typeof onSourceClick === 'function') {
    var handler = onSourceClick;
    pre.style.cursor = 'pointer';
    pre.addEventListener('click', function () {
      handler();
    });
  }

  return pre;
}

export { createCode };