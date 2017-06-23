
import { parse } from './parser'; /**
                                   * Copyright (c) 2015-present, Facebook, Inc.
                                   * All rights reserved.
                                   *
                                   * This source code is licensed under the BSD-style license found in the
                                   * LICENSE file in the root directory of this source tree. An additional grant
                                   * of patent rights can be found in the PATENTS file in the same directory.
                                   */

import { map } from './mapper';
import { unmap } from './unmapper';

var recorded = [];

var errorsConsumed = 0;

function consume(error) {
  var unhandledRejection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var contextSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

  var parsedFrames = parse(error);
  var enhancedFramesPromise = void 0;
  if (error.__unmap_source) {
    enhancedFramesPromise = unmap(
    // $FlowFixMe
    error.__unmap_source, parsedFrames, contextSize);
  } else {
    enhancedFramesPromise = map(parsedFrames, contextSize);
  }
  return enhancedFramesPromise.then(function (enhancedFrames) {
    if (enhancedFrames.map(function (f) {
      return f._originalFileName;
    }).filter(function (f) {
      return f != null && f.indexOf('node_modules') === -1;
    }).length === 0) {
      return null;
    }
    enhancedFrames = enhancedFrames.filter(function (_ref) {
      var functionName = _ref.functionName;
      return functionName == null || functionName.indexOf('__stack_frame_overlay_proxy_console__') === -1;
    });
    recorded[++errorsConsumed] = {
      error: error,
      unhandledRejection: unhandledRejection,
      contextSize: contextSize,
      enhancedFrames: enhancedFrames
    };
    return errorsConsumed;
  });
}

function getErrorRecord(ref) {
  return recorded[ref];
}

function drain() {
  // $FlowFixMe
  var keys = Object.keys(recorded);
  for (var index = 0; index < keys.length; ++index) {
    delete recorded[keys[index]];
  }
}

export { consume, getErrorRecord, drain };