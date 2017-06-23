import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

var ExpandIcon = function (_React$Component) {
  _inherits(ExpandIcon, _React$Component);

  function ExpandIcon() {
    _classCallCheck(this, ExpandIcon);

    return _possibleConstructorReturn(this, (ExpandIcon.__proto__ || Object.getPrototypeOf(ExpandIcon)).apply(this, arguments));
  }

  _createClass(ExpandIcon, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !shallowequal(nextProps, this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          expandable = _props.expandable,
          prefixCls = _props.prefixCls,
          onExpand = _props.onExpand,
          needIndentSpaced = _props.needIndentSpaced,
          expanded = _props.expanded,
          record = _props.record;

      if (expandable) {
        var expandClassName = expanded ? 'expanded' : 'collapsed';
        return React.createElement('span', {
          className: prefixCls + '-expand-icon ' + prefixCls + '-' + expandClassName,
          onClick: function onClick(e) {
            return onExpand(!expanded, record, e);
          }
        });
      } else if (needIndentSpaced) {
        return React.createElement('span', { className: prefixCls + '-expand-icon ' + prefixCls + '-spaced' });
      }
      return null;
    }
  }]);

  return ExpandIcon;
}(React.Component);

ExpandIcon.propTypes = {
  record: PropTypes.object,
  prefixCls: PropTypes.string,
  expandable: PropTypes.any,
  expanded: PropTypes.bool,
  needIndentSpaced: PropTypes.bool,
  onExpand: PropTypes.func
};
export default ExpandIcon;