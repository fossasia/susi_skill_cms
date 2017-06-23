/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var SHORTCUT_ESCAPE = 'SHORTCUT_ESCAPE',
    SHORTCUT_LEFT = 'SHORTCUT_LEFT',
    SHORTCUT_RIGHT = 'SHORTCUT_RIGHT';

var boundKeyHandler = null;

function keyHandler(callback, e) {
  var key = e.key,
      keyCode = e.keyCode,
      which = e.which;

  if (key === 'Escape' || keyCode === 27 || which === 27) {
    callback(SHORTCUT_ESCAPE);
  } else if (key === 'ArrowLeft' || keyCode === 37 || which === 37) {
    callback(SHORTCUT_LEFT);
  } else if (key === 'ArrowRight' || keyCode === 39 || which === 39) {
    callback(SHORTCUT_RIGHT);
  }
}

function registerShortcuts(target, callback) {
  if (boundKeyHandler !== null) {
    return;
  }
  boundKeyHandler = keyHandler.bind(undefined, callback);
  target.addEventListener('keydown', boundKeyHandler);
}

function unregisterShortcuts(target) {
  if (boundKeyHandler === null) {
    return;
  }
  target.removeEventListener('keydown', boundKeyHandler);
  boundKeyHandler = null;
}

export { SHORTCUT_ESCAPE, SHORTCUT_LEFT, SHORTCUT_RIGHT, registerShortcuts as register, unregisterShortcuts as unregister, keyHandler as handler };