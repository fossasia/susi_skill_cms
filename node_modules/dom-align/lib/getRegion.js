'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getRegion(node) {
  var offset = void 0;
  var w = void 0;
  var h = void 0;
  if (!_utils2['default'].isWindow(node) && node.nodeType !== 9) {
    offset = _utils2['default'].offset(node);
    w = _utils2['default'].outerWidth(node);
    h = _utils2['default'].outerHeight(node);
  } else {
    var win = _utils2['default'].getWindow(node);
    offset = {
      left: _utils2['default'].getWindowScrollLeft(win),
      top: _utils2['default'].getWindowScrollTop(win)
    };
    w = _utils2['default'].viewportWidth(win);
    h = _utils2['default'].viewportHeight(win);
  }
  offset.width = w;
  offset.height = h;
  return offset;
}

exports['default'] = getRegion;
module.exports = exports['default'];