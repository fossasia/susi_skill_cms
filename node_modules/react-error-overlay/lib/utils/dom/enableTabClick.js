/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

function enableTabClick(node) {
  node.setAttribute('tabindex', '0');
  node.addEventListener('keydown', function (e) {
    var key = e.key,
        which = e.which,
        keyCode = e.keyCode;

    if (key === 'Enter' || which === 13 || keyCode === 13) {
      e.preventDefault();
      if (typeof e.target.click === 'function') {
        e.target.click();
      }
    }
  });
}

export { enableTabClick };