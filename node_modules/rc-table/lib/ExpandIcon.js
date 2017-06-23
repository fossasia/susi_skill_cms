'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var ExpandIcon = function (_React$Component) {
  (0, _inherits3['default'])(ExpandIcon, _React$Component);

  function ExpandIcon() {
    (0, _classCallCheck3['default'])(this, ExpandIcon);
    return (0, _possibleConstructorReturn3['default'])(this, (ExpandIcon.__proto__ || Object.getPrototypeOf(ExpandIcon)).apply(this, arguments));
  }

  (0, _createClass3['default'])(ExpandIcon, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowequal2['default'])(nextProps, this.props);
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
        return _react2['default'].createElement('span', {
          className: prefixCls + '-expand-icon ' + prefixCls + '-' + expandClassName,
          onClick: function onClick(e) {
            return onExpand(!expanded, record, e);
          }
        });
      } else if (needIndentSpaced) {
        return _react2['default'].createElement('span', { className: prefixCls + '-expand-icon ' + prefixCls + '-spaced' });
      }
      return null;
    }
  }]);
  return ExpandIcon;
}(_react2['default'].Component);

ExpandIcon.propTypes = {
  record: _propTypes2['default'].object,
  prefixCls: _propTypes2['default'].string,
  expandable: _propTypes2['default'].any,
  expanded: _propTypes2['default'].bool,
  needIndentSpaced: _propTypes2['default'].bool,
  onExpand: _propTypes2['default'].func
};
exports['default'] = ExpandIcon;
module.exports = exports['default'];