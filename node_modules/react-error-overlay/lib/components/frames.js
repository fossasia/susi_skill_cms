
import { applyStyles } from '../utils/dom/css'; /**
                                                 * Copyright (c) 2015-present, Facebook, Inc.
                                                 * All rights reserved.
                                                 *
                                                 * This source code is licensed under the BSD-style license found in the
                                                 * LICENSE file in the root directory of this source tree. An additional grant
                                                 * of patent rights can be found in the PATENTS file in the same directory.
                                                 */

import { traceStyle, toggleStyle } from '../styles';
import { enableTabClick } from '../utils/dom/enableTabClick';
import { createFrame } from './frame';

function createFrameWrapper(document, parent, factory, lIndex, frameSettings, contextSize) {
  var fac = factory();
  if (fac == null) {
    return;
  }
  var hasSource = fac.hasSource,
      elem = fac.elem,
      collapseElement = fac.collapseElement;


  var elemWrapper = document.createElement('div');
  elemWrapper.appendChild(elem);

  if (hasSource) {
    var compiledDiv = document.createElement('div');
    enableTabClick(compiledDiv);
    applyStyles(compiledDiv, toggleStyle);

    var o = frameSettings[lIndex];
    var compiledText = document.createTextNode('View ' + (o && o.compiled ? 'source' : 'compiled'));
    compiledDiv.addEventListener('click', function () {
      if (o) {
        o.compiled = !o.compiled;
      }

      var next = createFrameWrapper(document, parent, factory, lIndex, frameSettings, contextSize);
      if (next != null) {
        parent.insertBefore(next, elemWrapper);
        parent.removeChild(elemWrapper);
      }
    });
    compiledDiv.appendChild(compiledText);
    elemWrapper.appendChild(compiledDiv);
  }

  if (collapseElement != null) {
    elemWrapper.appendChild(collapseElement);
  }

  return elemWrapper;
}

function createFrames(document, resolvedFrames, frameSettings, contextSize, errorName) {
  if (resolvedFrames.length !== frameSettings.length) {
    throw new Error('You must give a frame settings array of identical length to resolved frames.');
  }
  var trace = document.createElement('div');
  applyStyles(trace, traceStyle);

  var index = 0;
  var critical = true;
  var omits = { value: 0, bundle: 1, hasReachedAppCode: false };
  resolvedFrames.forEach(function (frame) {
    var lIndex = index++;
    var elem = createFrameWrapper(document, trace, createFrame.bind(undefined, document, frameSettings[lIndex], frame, contextSize, critical, omits, omits.bundle, trace, index === resolvedFrames.length, errorName), lIndex, frameSettings, contextSize);
    if (elem == null) {
      return;
    }
    critical = false;
    trace.appendChild(elem);
  });
  //TODO: fix this
  omits.value = 0;

  return trace;
}

export { createFrames };