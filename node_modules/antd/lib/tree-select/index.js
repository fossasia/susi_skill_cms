'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _rcTreeSelect = require('rc-tree-select');

var _rcTreeSelect2 = _interopRequireDefault(_rcTreeSelect);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _injectLocale = require('../locale-provider/injectLocale');

var _injectLocale2 = _interopRequireDefault(_injectLocale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var TreeSelect = function (_React$Component) {
    (0, _inherits3['default'])(TreeSelect, _React$Component);

    function TreeSelect() {
        (0, _classCallCheck3['default'])(this, TreeSelect);
        return (0, _possibleConstructorReturn3['default'])(this, (TreeSelect.__proto__ || Object.getPrototypeOf(TreeSelect)).apply(this, arguments));
    }

    (0, _createClass3['default'])(TreeSelect, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var locale = this.getLocale();
            var _a = this.props,
                prefixCls = _a.prefixCls,
                className = _a.className,
                size = _a.size,
                _a$notFoundContent = _a.notFoundContent,
                notFoundContent = _a$notFoundContent === undefined ? locale.notFoundContent : _a$notFoundContent,
                dropdownStyle = _a.dropdownStyle,
                restProps = __rest(_a, ["prefixCls", "className", "size", "notFoundContent", "dropdownStyle"]);
            var cls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', size === 'large'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', size === 'small'), _classNames), className);
            var checkable = restProps.treeCheckable;
            if (checkable) {
                checkable = _react2['default'].createElement('span', { className: prefixCls + '-tree-checkbox-inner' });
            }
            return _react2['default'].createElement(_rcTreeSelect2['default'], (0, _extends3['default'])({}, restProps, { prefixCls: prefixCls, className: cls, dropdownStyle: Object.assign({ maxHeight: '100vh', overflow: 'auto' }, dropdownStyle), treeCheckable: checkable, notFoundContent: notFoundContent }));
        }
    }]);
    return TreeSelect;
}(_react2['default'].Component);

TreeSelect.TreeNode = _rcTreeSelect.TreeNode;
TreeSelect.SHOW_ALL = _rcTreeSelect.SHOW_ALL;
TreeSelect.SHOW_PARENT = _rcTreeSelect.SHOW_PARENT;
TreeSelect.SHOW_CHILD = _rcTreeSelect.SHOW_CHILD;
TreeSelect.defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false,
    dropdownClassName: 'ant-select-tree-dropdown'
};
// Use Select's locale
var injectSelectLocale = (0, _injectLocale2['default'])('Select', {});
exports['default'] = injectSelectLocale(TreeSelect);
module.exports = exports['default'];