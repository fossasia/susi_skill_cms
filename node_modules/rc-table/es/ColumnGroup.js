import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';

var ColumnGroup = function (_Component) {
  _inherits(ColumnGroup, _Component);

  function ColumnGroup() {
    _classCallCheck(this, ColumnGroup);

    return _possibleConstructorReturn(this, (ColumnGroup.__proto__ || Object.getPrototypeOf(ColumnGroup)).apply(this, arguments));
  }

  return ColumnGroup;
}(Component);

ColumnGroup.propTypes = {
  title: PropTypes.node
};
ColumnGroup.isTableColumnGroup = true;
export default ColumnGroup;