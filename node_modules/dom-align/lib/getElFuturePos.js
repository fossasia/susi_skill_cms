'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getAlignOffset = require('./getAlignOffset');

var _getAlignOffset2 = _interopRequireDefault(_getAlignOffset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
  var xy = void 0;
  var diff = void 0;
  var p1 = void 0;
  var p2 = void 0;

  xy = {
    left: elRegion.left,
    top: elRegion.top
  };

  p1 = (0, _getAlignOffset2['default'])(refNodeRegion, points[1]);
  p2 = (0, _getAlignOffset2['default'])(elRegion, points[0]);

  diff = [p2.left - p1.left, p2.top - p1.top];

  return {
    left: xy.left - diff[0] + offset[0] - targetOffset[0],
    top: xy.top - diff[1] + offset[1] - targetOffset[1]
  };
}

exports['default'] = getElFuturePos;
module.exports = exports['default'];