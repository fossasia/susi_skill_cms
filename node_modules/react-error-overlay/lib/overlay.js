/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import { register as registerError, unregister as unregisterError } from './effects/unhandledError';
import { register as registerPromise, unregister as unregisterPromise } from './effects/unhandledRejection';
import { register as registerShortcuts, unregister as unregisterShortcuts, handler as keyEventHandler, SHORTCUT_ESCAPE, SHORTCUT_LEFT, SHORTCUT_RIGHT } from './effects/shortcuts';
import { register as registerStackTraceLimit, unregister as unregisterStackTraceLimit } from './effects/stackTraceLimit';
import { permanentRegister as permanentRegisterConsole, registerReactStack, unregisterReactStack } from './effects/proxyConsole';
import { massage as massageWarning } from './utils/warnings';

import { consume as consumeError, getErrorRecord, drain as drainErrors } from './utils/errorRegister';

import { iframeStyle } from './styles';
import { applyStyles } from './utils/dom/css';
import { createOverlay } from './components/overlay';
import { updateAdditional } from './components/additional';

var CONTEXT_SIZE = 3;
var iframeReference = null;
var additionalReference = null;
var errorReferences = [];
var currReferenceIndex = -1;

function render(name, message, resolvedFrames) {
  disposeCurrentView();

  var iframe = window.document.createElement('iframe');
  applyStyles(iframe, iframeStyle);
  iframeReference = iframe;
  iframe.onload = function () {
    if (iframeReference == null) {
      return;
    }
    var w = iframeReference.contentWindow;
    var document = iframeReference.contentDocument;

    var _createOverlay = createOverlay(document, name, message, resolvedFrames, CONTEXT_SIZE, currReferenceIndex + 1, errorReferences.length, function (offset) {
      switchError(offset);
    }, function () {
      unmount();
    }),
        overlay = _createOverlay.overlay,
        additional = _createOverlay.additional;

    if (w != null) {
      w.onkeydown = function (event) {
        keyEventHandler(function (type) {
          return shortcutHandler(type);
        }, event);
      };
    }
    if (document.body != null) {
      document.body.style.margin = '0';
      // Keep popup within body boundaries for iOS Safari
      // $FlowFixMe
      document.body.style['max-width'] = '100vw';

      document.body.appendChild(overlay);
    }
    additionalReference = additional;
  };
  window.document.body.appendChild(iframe);
}

function renderErrorByIndex(index) {
  currReferenceIndex = index;

  var _getErrorRecord = getErrorRecord(errorReferences[index]),
      error = _getErrorRecord.error,
      unhandledRejection = _getErrorRecord.unhandledRejection,
      enhancedFrames = _getErrorRecord.enhancedFrames;

  if (unhandledRejection) {
    render('Unhandled Rejection (' + error.name + ')', error.message, enhancedFrames);
  } else {
    render(error.name, error.message, enhancedFrames);
  }
}

function switchError(offset) {
  if (errorReferences.length === 0) {
    return;
  }

  var nextView = currReferenceIndex + offset;

  if (nextView < 0) {
    nextView = errorReferences.length - 1;
  } else if (nextView >= errorReferences.length) {
    nextView = 0;
  }

  renderErrorByIndex(nextView);
}

function disposeCurrentView() {
  if (iframeReference === null) {
    return;
  }
  window.document.body.removeChild(iframeReference);
  iframeReference = null;
  additionalReference = null;
}

function unmount() {
  disposeCurrentView();
  drainErrors();
  errorReferences = [];
  currReferenceIndex = -1;
}

function crash(error) {
  var unhandledRejection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (module.hot && typeof module.hot.decline === 'function') {
    module.hot.decline();
  }
  consumeError(error, unhandledRejection, CONTEXT_SIZE).then(function (ref) {
    if (ref == null) {
      return;
    }
    errorReferences.push(ref);
    if (iframeReference !== null && additionalReference !== null) {
      updateAdditional(iframeReference.contentDocument, additionalReference, currReferenceIndex + 1, errorReferences.length, function (offset) {
        switchError(offset);
      });
    } else {
      if (errorReferences.length !== 1) {
        throw new Error('Something is *really* wrong.');
      }
      renderErrorByIndex(currReferenceIndex = 0);
    }
  }).catch(function (e) {
    console.log('Could not consume error:', e);
  });
}

function shortcutHandler(type) {
  switch (type) {
    case SHORTCUT_ESCAPE:
      {
        unmount();
        break;
      }
    case SHORTCUT_LEFT:
      {
        switchError(-1);
        break;
      }
    case SHORTCUT_RIGHT:
      {
        switchError(1);
        break;
      }
    default:
      {
        //TODO: this
        break;
      }
  }
}

function inject() {
  registerError(window, function (error) {
    return crash(error);
  });
  registerPromise(window, function (error) {
    return crash(error, true);
  });
  registerShortcuts(window, shortcutHandler);
  registerStackTraceLimit();

  registerReactStack();
  permanentRegisterConsole('error', function (warning, stack) {
    var data = massageWarning(warning, stack);
    crash(
    // $FlowFixMe
    {
      message: data.message,
      stack: data.stack,
      __unmap_source: '/static/js/bundle.js'
    }, false);
  });
}

function uninject() {
  unregisterStackTraceLimit();
  unregisterShortcuts(window);
  unregisterPromise(window);
  unregisterError(window);
  unregisterReactStack();
}

export { inject, uninject };