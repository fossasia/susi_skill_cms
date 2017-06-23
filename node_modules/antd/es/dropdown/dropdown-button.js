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
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';
var ButtonGroup = Button.Group;
import classNames from 'classnames';

var DropdownButton = function (_React$Component) {
    _inherits(DropdownButton, _React$Component);

    function DropdownButton() {
        _classCallCheck(this, DropdownButton);

        return _possibleConstructorReturn(this, (DropdownButton.__proto__ || Object.getPrototypeOf(DropdownButton)).apply(this, arguments));
    }

    _createClass(DropdownButton, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                type = _a.type,
                overlay = _a.overlay,
                trigger = _a.trigger,
                align = _a.align,
                children = _a.children,
                className = _a.className,
                onClick = _a.onClick,
                prefixCls = _a.prefixCls,
                disabled = _a.disabled,
                visible = _a.visible,
                onVisibleChange = _a.onVisibleChange,
                placement = _a.placement,
                restProps = __rest(_a, ["type", "overlay", "trigger", "align", "children", "className", "onClick", "prefixCls", "disabled", "visible", "onVisibleChange", "placement"]);
            var cls = classNames(prefixCls, className);
            var dropdownProps = {
                align: align,
                overlay: overlay,
                trigger: disabled ? [] : trigger,
                onVisibleChange: onVisibleChange,
                placement: placement
            };
            if ('visible' in this.props) {
                dropdownProps.visible = visible;
            }
            return React.createElement(
                ButtonGroup,
                _extends({}, restProps, { className: cls }),
                React.createElement(
                    Button,
                    { type: type, onClick: onClick, disabled: disabled },
                    children
                ),
                React.createElement(
                    Dropdown,
                    dropdownProps,
                    React.createElement(
                        Button,
                        { type: type, disabled: disabled },
                        React.createElement(Icon, { type: 'down' })
                    )
                )
            );
        }
    }]);

    return DropdownButton;
}(React.Component);

export default DropdownButton;

DropdownButton.defaultProps = {
    placement: 'bottomRight',
    type: 'default',
    prefixCls: 'ant-dropdown-button'
};