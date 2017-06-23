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
import classNames from 'classnames';

var TimelineItem = function (_React$Component) {
    _inherits(TimelineItem, _React$Component);

    function TimelineItem() {
        _classCallCheck(this, TimelineItem);

        return _possibleConstructorReturn(this, (TimelineItem.__proto__ || Object.getPrototypeOf(TimelineItem)).apply(this, arguments));
    }

    _createClass(TimelineItem, [{
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
            var itemClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-item', true), _defineProperty(_classNames, prefixCls + '-item-last', last), _defineProperty(_classNames, prefixCls + '-item-pending', pending), _classNames), className);
            var dotClassName = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-item-head', true), _defineProperty(_classNames2, prefixCls + '-item-head-custom', dot), _defineProperty(_classNames2, prefixCls + '-item-head-' + color, true), _classNames2));
            return React.createElement(
                'li',
                _extends({}, restProps, { className: itemClassName }),
                React.createElement('div', { className: prefixCls + '-item-tail' }),
                React.createElement(
                    'div',
                    { className: dotClassName, style: { borderColor: /blue|red|green/.test(color) ? null : color } },
                    dot
                ),
                React.createElement(
                    'div',
                    { className: prefixCls + '-item-content' },
                    children
                )
            );
        }
    }]);

    return TimelineItem;
}(React.Component);

export default TimelineItem;

TimelineItem.defaultProps = {
    prefixCls: 'ant-timeline',
    color: 'blue',
    last: false,
    pending: false
};