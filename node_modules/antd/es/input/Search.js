import _extends from 'babel-runtime/helpers/extends';
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
import classNames from 'classnames';
import Input from './Input';
import Icon from '../icon';

var Search = function (_React$Component) {
    _inherits(Search, _React$Component);

    function Search() {
        _classCallCheck(this, Search);

        var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));

        _this.onSearch = function () {
            var onSearch = _this.props.onSearch;

            if (onSearch) {
                onSearch(_this.input.refs.input.value);
            }
            _this.input.refs.input.focus();
        };
        return _this;
    }

    _createClass(Search, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _a = this.props,
                className = _a.className,
                prefixCls = _a.prefixCls,
                others = __rest(_a, ["className", "prefixCls"]);
            delete others.onSearch;
            var searchSuffix = React.createElement(Icon, { className: prefixCls + '-icon', onClick: this.onSearch, type: 'search' });
            return React.createElement(Input, _extends({ onPressEnter: this.onSearch }, others, { suffix: searchSuffix, className: classNames(prefixCls, className), ref: function ref(node) {
                    return _this2.input = node;
                } }));
        }
    }]);

    return Search;
}(React.Component);

export default Search;

Search.defaultProps = {
    prefixCls: 'ant-input-search',
    onSearch: function onSearch() {}
};