import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

var TableCell = function (_React$Component) {
  _inherits(TableCell, _React$Component);

  function TableCell() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TableCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableCell.__proto__ || Object.getPrototypeOf(TableCell)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
      var _this$props = _this.props,
          record = _this$props.record,
          onCellClick = _this$props.column.onCellClick;

      if (onCellClick) {
        onCellClick(record, e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableCell, [{
    key: 'isInvalidRenderCellText',
    value: function isInvalidRenderCellText(text) {
      return text && !React.isValidElement(text) && Object.prototype.toString.call(text) === '[object Object]';
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
        text = get(record, dataIndex);
      } else if (!dataIndex || dataIndex.length === 0) {
        text = record;
      } else {
        text = get(record, dataIndex);
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

      var indentText = expandIcon ? React.createElement('span', {
        style: { paddingLeft: indentSize * indent + 'px' },
        className: prefixCls + '-indent indent-level-' + indent
      }) : null;

      if (rowSpan === 0 || colSpan === 0) {
        return null;
      }
      return React.createElement(
        'td',
        _extends({
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
}(React.Component);

TableCell.propTypes = {
  record: PropTypes.object,
  prefixCls: PropTypes.string,
  index: PropTypes.number,
  indent: PropTypes.number,
  indentSize: PropTypes.number,
  column: PropTypes.object,
  expandIcon: PropTypes.node
};
export default TableCell;