'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Search = function (_React$Component) {
    (0, _inherits3['default'])(Search, _React$Component);

    function Search() {
        (0, _classCallCheck3['default'])(this, Search);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));

        _this.onSearch = function () {
            var onSearch = _this.props.onSearch;

            if (onSearch) {
                onSearch(_this.input.refs.input.value);
            }
            _this.input.refs.input.focus();
        };
        return _this;
    }

    (0, _createClass3['default'])(Search, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _a = this.props,
                className = _a.className,
                prefixCls = _a.prefixCls,
                others = __rest(_a, ["className", "prefixCls"]);
            delete others.onSearch;
            var searchSuffix = _react2['default'].createElement(_icon2['default'], { className: prefixCls + '-icon', onClick: this.onSearch, type: 'search' });
            return _react2['default'].createElement(_Input2['default'], (0, _extends3['default'])({ onPressEnter: this.onSearch }, others, { suffix: searchSuffix, className: (0, _classnames2['default'])(prefixCls, className), ref: function ref(node) {
                    return _this2.input = node;
                } }));
        }
    }]);
    return Search;
}(_react2['default'].Component);

exports['default'] = Search;

Search.defaultProps = {
    prefixCls: 'ant-input-search',
    onSearch: function onSearch() {}
};
module.exports = exports['default'];