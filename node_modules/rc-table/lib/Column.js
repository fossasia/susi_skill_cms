'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Column = function (_Component) {
  (0, _inherits3['default'])(Column, _Component);

  function Column() {
    (0, _classCallCheck3['default'])(this, Column);
    return (0, _possibleConstructorReturn3['default'])(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
  }

  return Column;
}(_react.Component);

Column.propTypes = {
  className: _propTypes2['default'].string,
  colSpan: _propTypes2['default'].number,
  title: _propTypes2['default'].node,
  dataIndex: _propTypes2['default'].string,
  width: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
  fixed: _propTypes2['default'].oneOf([true, 'left', 'right']),
  render: _propTypes2['default'].func,
  onCellClick: _propTypes2['default'].func
};
exports['default'] = Column;
module.exports = exports['default'];