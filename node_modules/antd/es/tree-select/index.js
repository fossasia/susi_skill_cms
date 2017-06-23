import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
import React from 'react';
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import classNames from 'classnames';
import injectLocale from '../locale-provider/injectLocale';

var TreeSelect = function (_React$Component) {
    _inherits(TreeSelect, _React$Component);

    function TreeSelect() {
        _classCallCheck(this, TreeSelect);

        return _possibleConstructorReturn(this, (TreeSelect.__proto__ || Object.getPrototypeOf(TreeSelect)).apply(this, arguments));
    }

    _createClass(TreeSelect, [{
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
            var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _classNames), className);
            var checkable = restProps.treeCheckable;
            if (checkable) {
                checkable = React.createElement('span', { className: prefixCls + '-tree-checkbox-inner' });
            }
            return React.createElement(RcTreeSelect, _extends({}, restProps, { prefixCls: prefixCls, className: cls, dropdownStyle: Object.assign({ maxHeight: '100vh', overflow: 'auto' }, dropdownStyle), treeCheckable: checkable, notFoundContent: notFoundContent }));
        }
    }]);

    return TreeSelect;
}(React.Component);

TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
TreeSelect.defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false,
    dropdownClassName: 'ant-select-tree-dropdown'
};
// Use Select's locale
var injectSelectLocale = injectLocale('Select', {});
export default injectSelectLocale(TreeSelect);