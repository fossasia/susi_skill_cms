import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';

var Column = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
  }

  return Column;
}(Component);

Column.propTypes = {
  className: PropTypes.string,
  colSpan: PropTypes.number,
  title: PropTypes.node,
  dataIndex: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fixed: PropTypes.oneOf([true, 'left', 'right']),
  render: PropTypes.func,
  onCellClick: PropTypes.func
};
export default Column;