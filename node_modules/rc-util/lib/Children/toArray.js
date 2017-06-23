'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = toArray;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function toArray(children) {
  var ret = [];
  _react2['default'].Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}
module.exports = exports['default'];