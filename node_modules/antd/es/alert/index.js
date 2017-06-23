import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../icon';
import classNames from 'classnames';
function noop() {}

var Alert = function (_React$Component) {
    _inherits(Alert, _React$Component);

    function Alert(props) {
        _classCallCheck(this, Alert);

        var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

        _this.handleClose = function (e) {
            e.preventDefault();
            var dom = ReactDOM.findDOMNode(_this);
            dom.style.height = dom.offsetHeight + 'px';
            // Magic code
            // 重复一次后才能正确设置 height
            dom.style.height = dom.offsetHeight + 'px';
            _this.setState({
                closing: false
            });
            (_this.props.onClose || noop)(e);
        };
        _this.animationEnd = function () {
            _this.setState({
                closed: true,
                closing: true
            });
        };
        _this.state = {
            closing: true,
            closed: false
        };
        return _this;
    }

    _createClass(Alert, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                closable = _props.closable,
                description = _props.description,
                type = _props.type,
                _props$prefixCls = _props.prefixCls,
                prefixCls = _props$prefixCls === undefined ? 'ant-alert' : _props$prefixCls,
                message = _props.message,
                closeText = _props.closeText,
                showIcon = _props.showIcon,
                banner = _props.banner,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                style = _props.style;
            // banner模式默认有 Icon

            showIcon = banner && showIcon === undefined ? true : showIcon;
            // banner模式默认为警告
            type = banner && type === undefined ? 'warning' : type || 'info';
            var iconType = '';
            switch (type) {
                case 'success':
                    iconType = 'check-circle';
                    break;
                case 'info':
                    iconType = 'info-circle';
                    break;
                case 'error':
                    iconType = 'cross-circle';
                    break;
                case 'warning':
                    iconType = 'exclamation-circle';
                    break;
                default:
                    iconType = 'default';
            }
            // use outline icon in alert with description
            if (!!description) {
                iconType += '-o';
            }
            var alertCls = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + type, true), _defineProperty(_classNames, prefixCls + '-close', !this.state.closing), _defineProperty(_classNames, prefixCls + '-with-description', !!description), _defineProperty(_classNames, prefixCls + '-no-icon', !showIcon), _defineProperty(_classNames, prefixCls + '-banner', !!banner), _classNames), className);
            // closeable when closeText is assigned
            if (closeText) {
                closable = true;
            }
            var closeIcon = closable ? React.createElement(
                'a',
                { onClick: this.handleClose, className: prefixCls + '-close-icon' },
                closeText || React.createElement(Icon, { type: 'cross' })
            ) : null;
            return this.state.closed ? null : React.createElement(
                Animate,
                { component: '', showProp: 'data-show', transitionName: prefixCls + '-slide-up', onEnd: this.animationEnd },
                React.createElement(
                    'div',
                    { 'data-show': this.state.closing, className: alertCls, style: style },
                    showIcon ? React.createElement(Icon, { className: prefixCls + '-icon', type: iconType }) : null,
                    React.createElement(
                        'span',
                        { className: prefixCls + '-message' },
                        message
                    ),
                    React.createElement(
                        'span',
                        { className: prefixCls + '-description' },
                        description
                    ),
                    closeIcon
                )
            );
        }
    }]);

    return Alert;
}(React.Component);

export default Alert;