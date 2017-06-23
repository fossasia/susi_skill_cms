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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var TimelineItem = function (_React$Component) {
    (0, _inherits3['default'])(TimelineItem, _React$Component);

    function TimelineItem() {
        (0, _classCallCheck3['default'])(this, TimelineItem);
        return (0, _possibleConstructorReturn3['default'])(this, (TimelineItem.__proto__ || Object.getPrototypeOf(TimelineItem)).apply(this, arguments));
    }

    (0, _createClass3['default'])(TimelineItem, [{
        key: 'render',
        value: function render() {
            var _classNames, _classNames2;

            var _a = this.props,
                prefixCls = _a.prefixCls,
                className = _a.className,
                _a$color = _a.color,
                color = _a$color === undefined ? '' : _a$color,
                last = _a.last,
                children = _a.children,
                pending = _a.pending,
                dot = _a.dot,
                restProps = __rest(_a, ["prefixCls", "className", "color", "last", "children", "pending", "dot"]);
            var itemClassName = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-item', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-item-last', last), (0, _defineProperty3['default'])(_classNames, prefixCls + '-item-pending', pending), _classNames), className);
            var dotClassName = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-item-head', true), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-item-head-custom', dot), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-item-head-' + color, true), _classNames2));
            return _react2['default'].createElement(
                'li',
                (0, _extends3['default'])({}, restProps, { className: itemClassName }),
                _react2['default'].createElement('div', { className: prefixCls + '-item-tail' }),
                _react2['default'].createElement(
                    'div',
                    { className: dotClassName, style: { borderColor: /blue|red|green/.test(color) ? null : color } },
                    dot
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-item-content' },
                    children
                )
            );
        }
    }]);
    return TimelineItem;
}(_react2['default'].Component);

exports['default'] = TimelineItem;

TimelineItem.defaultProps = {
    prefixCls: 'ant-timeline',
    color: 'blue',
    last: false,
    pending: false
};
module.exports = exports['default'];