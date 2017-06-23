import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import RcMenu, { Item, Divider, SubMenu, ItemGroup } from 'rc-menu';
import animation from '../_util/openAnimation';
import warning from '../_util/warning';

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.handleClick = function (e) {
            _this.setOpenKeys([]);
            var onClick = _this.props.onClick;

            if (onClick) {
                onClick(e);
            }
        };
        _this.handleOpenChange = function (openKeys) {
            _this.setOpenKeys(openKeys);
            var onOpenChange = _this.props.onOpenChange;

            if (onOpenChange) {
                onOpenChange(openKeys);
            }
        };
        warning(!('onOpen' in props || 'onClose' in props), '`onOpen` and `onClose` are removed, please use `onOpenChange` instead, ' + 'see: http://u.ant.design/menu-on-open-change.');
        var openKeys = void 0;
        if ('defaultOpenKeys' in props) {
            openKeys = props.defaultOpenKeys;
        } else if ('openKeys' in props) {
            openKeys = props.openKeys;
        }
        _this.state = {
            openKeys: openKeys || []
        };
        return _this;
    }

    _createClass(Menu, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.mode === 'inline' && nextProps.mode !== 'inline') {
                this.switchModeFromInline = true;
            }
            if ('openKeys' in nextProps) {
                this.setState({ openKeys: nextProps.openKeys });
            }
        }
    }, {
        key: 'setOpenKeys',
        value: function setOpenKeys(openKeys) {
            if (!('openKeys' in this.props)) {
                this.setState({ openKeys: openKeys });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var openAnimation = this.props.openAnimation || this.props.openTransitionName;
            if (this.props.openAnimation === undefined && this.props.openTransitionName === undefined) {
                switch (this.props.mode) {
                    case 'horizontal':
                        openAnimation = 'slide-up';
                        break;
                    case 'vertical':
                        // When mode switch from inline
                        // submenu should hide without animation
                        if (this.switchModeFromInline) {
                            openAnimation = '';
                            this.switchModeFromInline = false;
                        } else {
                            openAnimation = 'zoom-big';
                        }
                        break;
                    case 'inline':
                        openAnimation = animation;
                        break;
                    default:
                }
            }
            var props = {};
            var className = this.props.className + ' ' + this.props.prefixCls + '-' + this.props.theme;
            if (this.props.mode !== 'inline') {
                // There is this.state.openKeys for
                // closing vertical popup submenu after click it
                props = {
                    openKeys: this.state.openKeys,
                    onClick: this.handleClick,
                    onOpenChange: this.handleOpenChange,
                    openTransitionName: openAnimation,
                    className: className
                };
            } else {
                props = {
                    openAnimation: openAnimation,
                    className: className
                };
            }
            return React.createElement(RcMenu, _extends({}, this.props, props));
        }
    }]);

    return Menu;
}(React.Component);

export default Menu;

Menu.Divider = Divider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
Menu.defaultProps = {
    prefixCls: 'ant-menu',
    className: '',
    theme: 'light'
};