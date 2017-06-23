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

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableCell = function (_React$Component) {
  (0, _inherits3['default'])(TableCell, _React$Component);

  function TableCell() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, TableCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = TableCell.__proto__ || Object.getPrototypeOf(TableCell)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
      var _this$props = _this.props,
          record = _this$props.record,
          onCellClick = _this$props.column.onCellClick;

      if (onCellClick) {
        onCellClick(record, e);
      }
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(TableCell, [{
    key: 'isInvalidRenderCellText',
    value: function isInvalidRenderCellText(text) {
      return text && !_react2['default'].isValidElement(text) && Object.prototype.toString.call(text) === '[object Object]';
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          record = _props.record,
          indentSize = _props.indentSize,
          prefixCls = _props.prefixCls,
          indent = _props.indent,
          index = _props.index,
          expandIcon = _props.expandIcon,
          column = _props.column;
      var dataIndex = column.dataIndex,
          render = column.render,
          _column$className = column.className,
          className = _column$className === undefined ? '' : _column$className;

      // We should return undefined if no dataIndex is specified, but in order to
      // be compatible with object-path's behavior, we return the record object instead.

      var text = void 0;
      if (typeof dataIndex === 'number') {
        text = (0, _lodash2['default'])(record, dataIndex);
      } else if (!dataIndex || dataIndex.length === 0) {
        text = record;
      } else {
        text = (0, _lodash2['default'])(record, dataIndex);
      }
      var tdProps = void 0;
      var colSpan = void 0;
      var rowSpan = void 0;

      if (render) {
        text = render(text, record, index);
        if (this.isInvalidRenderCellText(text)) {
          tdProps = text.props || {};
          colSpan = tdProps.colSpan;
          rowSpan = tdProps.rowSpan;
          text = text.children;
        }
      }

      // Fix https://github.com/ant-design/ant-design/issues/1202
      if (this.isInvalidRenderCellText(text)) {
        text = null;
      }

      var indentText = expandIcon ? _react2['default'].createElement('span', {
        style: { paddingLeft: indentSize * indent + 'px' },
        className: prefixCls + '-indent indent-level-' + indent
      }) : null;

      if (rowSpan === 0 || colSpan === 0) {
        return null;
      }
      return _react2['default'].createElement(
        'td',
        (0, _extends3['default'])({
          className: className
        }, tdProps, {
          onClick: this.handleClick
        }),
        indentText,
        expandIcon,
        text
      );
    }
  }]);
  return TableCell;
}(_react2['default'].Component);

TableCell.propTypes = {
  record: _propTypes2['default'].object,
  prefixCls: _propTypes2['default'].string,
  index: _propTypes2['default'].number,
  indent: _propTypes2['default'].number,
  indentSize: _propTypes2['default'].number,
  column: _propTypes2['default'].object,
  expandIcon: _propTypes2['default'].node
};
exports['default'] = TableCell;
module.exports = exports['default'];