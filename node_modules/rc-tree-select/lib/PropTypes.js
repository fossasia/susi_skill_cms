'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectPropTypes = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _strategies = require('./strategies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function valueType(props, propName, componentName) {
  var labelInValueShape = _propTypes2['default'].shape({
    value: _propTypes2['default'].string.isRequired,
    label: _propTypes2['default'].string
  });
  if (props.labelInValue) {
    var validate = _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(labelInValueShape), labelInValueShape]);
    var error = validate.apply(undefined, arguments);
    if (error) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`, ' + ('when `labelInValue` is `true`, `' + propName + '` should in ') + 'shape of `{ value: string, label?: string }`.');
    }
  } else if (props.treeCheckable && props.treeCheckStrictly) {
    var _validate = _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(labelInValueShape), labelInValueShape]);
    var _error = _validate.apply(undefined, arguments);
    if (_error) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`, ' + 'when `treeCheckable` and `treeCheckStrictly` are `true`, ' + ('`' + propName + '` should in shape of `{ value: string, label?: string }`.'));
    }
  } else if (props.multiple && props[propName] === '') {
    return new Error('Invalid prop `' + propName + '` of type `string` supplied to `' + componentName + '`, ' + 'expected `array` when `multiple` is `true`.');
  } else {
    var _validate2 = _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(_propTypes2['default'].string), _propTypes2['default'].string]);
    return _validate2.apply(undefined, arguments);
  }
}

var SelectPropTypes = exports.SelectPropTypes = {
  className: _propTypes2['default'].string,
  prefixCls: _propTypes2['default'].string,
  multiple: _propTypes2['default'].bool,
  filterTreeNode: _propTypes2['default'].any,
  showSearch: _propTypes2['default'].bool,
  disabled: _propTypes2['default'].bool,
  showArrow: _propTypes2['default'].bool,
  allowClear: _propTypes2['default'].bool,
  defaultOpen: _propTypes2['default'].bool,
  open: _propTypes2['default'].bool,
  transitionName: _propTypes2['default'].string,
  animation: _propTypes2['default'].string,
  choiceTransitionName: _propTypes2['default'].string,
  onClick: _propTypes2['default'].func,
  onChange: _propTypes2['default'].func,
  onSelect: _propTypes2['default'].func,
  onDeselect: _propTypes2['default'].func,
  onSearch: _propTypes2['default'].func,
  searchPlaceholder: _propTypes2['default'].string,
  placeholder: _propTypes2['default'].any,
  inputValue: _propTypes2['default'].any,
  value: valueType,
  defaultValue: valueType,
  label: _propTypes2['default'].any,
  defaultLabel: _propTypes2['default'].any,
  labelInValue: _propTypes2['default'].bool,
  dropdownStyle: _propTypes2['default'].object,
  drodownPopupAlign: _propTypes2['default'].object,
  onDropdownVisibleChange: _propTypes2['default'].func,
  maxTagTextLength: _propTypes2['default'].number,
  showCheckedStrategy: _propTypes2['default'].oneOf([_strategies.SHOW_ALL, _strategies.SHOW_PARENT, _strategies.SHOW_CHILD]),
  treeCheckStrictly: _propTypes2['default'].bool,
  treeIcon: _propTypes2['default'].bool,
  treeLine: _propTypes2['default'].bool,
  treeDefaultExpandAll: _propTypes2['default'].bool,
  treeCheckable: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].node]),
  treeNodeLabelProp: _propTypes2['default'].string,
  treeNodeFilterProp: _propTypes2['default'].string,
  treeData: _propTypes2['default'].array,
  treeDataSimpleMode: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
  loadData: _propTypes2['default'].func
};