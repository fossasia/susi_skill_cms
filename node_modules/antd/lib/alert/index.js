'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function noop() {}

var Alert = function (_React$Component) {
    (0, _inherits3['default'])(Alert, _React$Component);

    function Alert(props) {
        (0, _classCallCheck3['default'])(this, Alert);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

        _this.handleClose = function (e) {
            e.preventDefault();
            var dom = _reactDom2['default'].findDOMNode(_this);
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

    (0, _createClass3['default'])(Alert, [{
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
            var alertCls = (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + type, true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-close', !this.state.closing), (0, _defineProperty3['default'])(_classNames, prefixCls + '-with-description', !!description), (0, _defineProperty3['default'])(_classNames, prefixCls + '-no-icon', !showIcon), (0, _defineProperty3['default'])(_classNames, prefixCls + '-banner', !!banner), _classNames), className);
            // closeable when closeText is assigned
            if (closeText) {
                closable = true;
            }
            var closeIcon = closable ? _react2['default'].createElement(
                'a',
                { onClick: this.handleClose, className: prefixCls + '-close-icon' },
                closeText || _react2['default'].createElement(_icon2['default'], { type: 'cross' })
            ) : null;
            return this.state.closed ? null : _react2['default'].createElement(
                _rcAnimate2['default'],
                { component: '', showProp: 'data-show', transitionName: prefixCls + '-slide-up', onEnd: this.animationEnd },
                _react2['default'].createElement(
                    'div',
                    { 'data-show': this.state.closing, className: alertCls, style: style },
                    showIcon ? _react2['default'].createElement(_icon2['default'], { className: prefixCls + '-icon', type: iconType }) : null,
                    _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-message' },
                        message
                    ),
                    _react2['default'].createElement(
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
}(_react2['default'].Component);

exports['default'] = Alert;
module.exports = exports['default'];