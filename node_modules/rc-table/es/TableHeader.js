import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

var TableHeader = function (_React$Component) {
  _inherits(TableHeader, _React$Component);

  function TableHeader() {
    _classCallCheck(this, TableHeader);

    return _possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));
  }

  _createClass(TableHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !shallowequal(nextProps, this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          rowStyle = _props.rowStyle,
          rows = _props.rows;

      return React.createElement(
        'thead',
        { className: prefixCls + '-thead' },
        rows.map(function (row, index) {
          return React.createElement(
            'tr',
            { key: index, style: rowStyle },
            row.map(function (cellProps, i) {
              return React.createElement('th', _extends({}, cellProps, { key: i }));
            })
          );
        })
      );
    }
  }]);

  return TableHeader;
}(React.Component);

TableHeader.propTypes = {
  prefixCls: PropTypes.string,
  rowStyle: PropTypes.object,
  rows: PropTypes.array
};
export default TableHeader;