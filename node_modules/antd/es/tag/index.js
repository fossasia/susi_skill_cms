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
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import classNames from 'classnames';
import omit from 'omit.js';
import assign from 'object-assign';
import Icon from '../icon';
import CheckableTag from './CheckableTag';

var Tag = function (_React$Component) {
    _inherits(Tag, _React$Component);

    function Tag(props) {
        _classCallCheck(this, Tag);

        var _this = _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props));

        _this.close = function (e) {
            var onClose = _this.props.onClose;
            if (onClose) {
                onClose(e);
            }
            if (e.defaultPrevented) {
                return;
            }
            var dom = ReactDOM.findDOMNode(_this);
            dom.style.width = dom.getBoundingClientRect().width + 'px';
            // It's Magic Code, don't know why
            dom.style.width = dom.getBoundingClientRect().width + 'px';
            _this.setState({
                closing: true
            });
        };
        _this.animationEnd = function (_, existed) {
            if (!existed && !_this.state.closed) {
                _this.setState({
                    closed: true,
                    closing: false
                });
                var afterClose = _this.props.afterClose;
                if (afterClose) {
                    afterClose();
                }
            }
        };
        _this.state = {
            closing: false,
            closed: false
        };
        return _this;
    }

    _createClass(Tag, [{
        key: 'isPresetColor',
        value: function isPresetColor(color) {
            return (/^(pink|red|yellow|orange|cyan|green|blue|purple)(-inverse)?$/.test(color)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _a = this.props,
                prefixCls = _a.prefixCls,
                closable = _a.closable,
                color = _a.color,
                className = _a.className,
                children = _a.children,
                style = _a.style,
                otherProps = __rest(_a, ["prefixCls", "closable", "color", "className", "children", "style"]);
            var closeIcon = closable ? React.createElement(Icon, { type: 'cross', onClick: this.close }) : '';
            var isPresetColor = this.isPresetColor(color);
            var classString = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + color, isPresetColor), _defineProperty(_classNames, prefixCls + '-has-color', color && !isPresetColor), _defineProperty(_classNames, prefixCls + '-close', this.state.closing), _classNames), className);
            // fix https://fb.me/react-unknown-prop
            var divProps = omit(otherProps, ['onClose', 'afterClose']);
            var tagStyle = assign({
                backgroundColor: color && !isPresetColor ? color : null
            }, style);
            var tag = this.state.closed ? null : React.createElement(
                'div',
                _extends({ 'data-show': !this.state.closing }, divProps, { className: classString, style: tagStyle }),
                React.createElement(
                    'span',
                    { className: prefixCls + '-text' },
                    children
                ),
                closeIcon
            );
            return React.createElement(
                Animate,
                { component: '', showProp: 'data-show', transitionName: prefixCls + '-zoom', transitionAppear: true, onEnd: this.animationEnd },
                tag
            );
        }
    }]);

    return Tag;
}(React.Component);

export default Tag;

Tag.CheckableTag = CheckableTag;
Tag.defaultProps = {
    prefixCls: 'ant-tag',
    closable: false
};