'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableHeader = function (_React$Component) {
  (0, _inherits3['default'])(TableHeader, _React$Component);

  function TableHeader() {
    (0, _classCallCheck3['default'])(this, TableHeader);
    return (0, _possibleConstructorReturn3['default'])(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));
  }

  (0, _createClass3['default'])(TableHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowequal2['default'])(nextProps, this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          rowStyle = _props.rowStyle,
          rows = _props.rows;

      return _react2['default'].createElement(
        'thead',
        { className: prefixCls + '-thead' },
        rows.map(function (row, index) {
          return _react2['default'].createElement(
            'tr',
            { key: index, style: rowStyle },
            row.map(function (cellProps, i) {
              return _react2['default'].createElement('th', (0, _extends3['default'])({}, cellProps, { key: i }));
            })
          );
        })
      );
    }
  }]);
  return TableHeader;
}(_react2['default'].Component);

TableHeader.propTypes = {
  prefixCls: _propTypes2['default'].string,
  rowStyle: _propTypes2['default'].object,
  rows: _propTypes2['default'].array
};
exports['default'] = TableHeader;
module.exports = exports['default'];