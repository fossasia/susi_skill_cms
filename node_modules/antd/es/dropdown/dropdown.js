import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement } from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import warning from '../_util/warning';

var Dropdown = function (_React$Component) {
    _inherits(Dropdown, _React$Component);

    function Dropdown() {
        _classCallCheck(this, Dropdown);

        return _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
    }

    _createClass(Dropdown, [{
        key: 'getTransitionName',
        value: function getTransitionName() {
            var _props$placement = this.props.placement,
                placement = _props$placement === undefined ? '' : _props$placement;

            if (placement.indexOf('top') >= 0) {
                return 'slide-down';
            }
            return 'slide-up';
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var overlay = this.props.overlay;

            var overlayProps = overlay.props;
            warning(!overlayProps.mode || overlayProps.mode === 'vertical', 'mode="' + overlayProps.mode + '" is not supported for Dropdown\'s Menu.');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                prefixCls = _props.prefixCls,
                overlay = _props.overlay;

            var dropdownTrigger = cloneElement(children, {
                className: classNames(children.props.className, prefixCls + '-trigger')
            });
            var fixedModeOverlay = cloneElement(overlay, {
                mode: 'vertical'
            });
            return React.createElement(
                RcDropdown,
                _extends({ transitionName: this.getTransitionName() }, this.props, { overlay: fixedModeOverlay }),
                dropdownTrigger
            );
        }
    }]);

    return Dropdown;
}(React.Component);

export default Dropdown;

Dropdown.defaultProps = {
    prefixCls: 'ant-dropdown',
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft'
};