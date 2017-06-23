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
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
import warning from '../_util/warning';

var Badge = function (_React$Component) {
    _inherits(Badge, _React$Component);

    function Badge() {
        _classCallCheck(this, Badge);

        return _possibleConstructorReturn(this, (Badge.__proto__ || Object.getPrototypeOf(Badge)).apply(this, arguments));
    }

    _createClass(Badge, [{
        key: 'render',
        value: function render() {
            var _classNames, _classNames2;

            var _a = this.props,
                count = _a.count,
                showZero = _a.showZero,
                prefixCls = _a.prefixCls,
                overflowCount = _a.overflowCount,
                className = _a.className,
                style = _a.style,
                children = _a.children,
                dot = _a.dot,
                status = _a.status,
                text = _a.text,
                restProps = __rest(_a, ["count", "showZero", "prefixCls", "overflowCount", "className", "style", "children", "dot", "status", "text"]);
            var isDot = dot || status;
            var displayCount = count > overflowCount ? overflowCount + '+' : count;
            // dot mode don't need count
            if (isDot) {
                displayCount = '';
            }
            var isZero = displayCount === '0' || displayCount === 0;
            var isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
            var hidden = (isEmpty || isZero && !showZero) && !isDot;
            var scrollNumberCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-dot', isDot), _defineProperty(_classNames, prefixCls + '-count', !isDot), _classNames));
            var badgeCls = classNames(className, prefixCls, (_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-status', !!status), _defineProperty(_classNames2, prefixCls + '-not-a-wrapper', !children), _classNames2));
            warning(!(children && status), '`Badge[children]` and `Badge[status]` cannot be used at the same time.');
            // <Badge status="success" />
            if (!children && status) {
                var _classNames3;

                var statusCls = classNames((_classNames3 = {}, _defineProperty(_classNames3, prefixCls + '-status-dot', !!status), _defineProperty(_classNames3, prefixCls + '-status-' + status, true), _classNames3));
                return React.createElement(
                    'span',
                    { className: badgeCls },
                    React.createElement('span', { className: statusCls }),
                    React.createElement(
                        'span',
                        { className: prefixCls + '-status-text' },
                        text
                    )
                );
            }
            var scrollNumber = hidden ? null : React.createElement(ScrollNumber, { 'data-show': !hidden, className: scrollNumberCls, count: displayCount, style: style });
            var statusText = hidden || !text ? null : React.createElement(
                'span',
                { className: prefixCls + '-status-text' },
                text
            );
            return React.createElement(
                'span',
                _extends({}, restProps, { className: badgeCls, title: count }),
                children,
                React.createElement(
                    Animate,
                    { component: '', showProp: 'data-show', transitionName: children ? prefixCls + '-zoom' : '', transitionAppear: true },
                    scrollNumber
                ),
                statusText
            );
        }
    }]);

    return Badge;
}(React.Component);

export default Badge;

Badge.defaultProps = {
    prefixCls: 'ant-badge',
    count: null,
    showZero: false,
    dot: false,
    overflowCount: 99
};
Badge.propTypes = {
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showZero: PropTypes.bool,
    dot: PropTypes.bool,
    overflowCount: PropTypes.number
};