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

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _injectLocale = require('../locale-provider/injectLocale');

var _injectLocale2 = _interopRequireDefault(_injectLocale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Popconfirm = function (_React$Component) {
    (0, _inherits3['default'])(Popconfirm, _React$Component);

    function Popconfirm(props) {
        (0, _classCallCheck3['default'])(this, Popconfirm);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Popconfirm.__proto__ || Object.getPrototypeOf(Popconfirm)).call(this, props));

        _this.onConfirm = function (e) {
            _this.setVisible(false);
            var onConfirm = _this.props.onConfirm;

            if (onConfirm) {
                onConfirm.call(_this, e);
            }
        };
        _this.onCancel = function (e) {
            _this.setVisible(false);
            var onCancel = _this.props.onCancel;

            if (onCancel) {
                onCancel.call(_this, e);
            }
        };
        _this.onVisibleChange = function (visible) {
            _this.setVisible(visible);
        };
        _this.state = {
            visible: props.visible
        };
        return _this;
    }

    (0, _createClass3['default'])(Popconfirm, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('visible' in nextProps) {
                this.setState({ visible: nextProps.visible });
            }
        }
    }, {
        key: 'setVisible',
        value: function setVisible(visible) {
            var props = this.props;
            if (!('visible' in props)) {
                this.setState({ visible: visible });
            }
            var onVisibleChange = props.onVisibleChange;

            if (onVisibleChange) {
                onVisibleChange(visible);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _a = this.props,
                prefixCls = _a.prefixCls,
                title = _a.title,
                placement = _a.placement,
                okText = _a.okText,
                cancelText = _a.cancelText,
                restProps = __rest(_a, ["prefixCls", "title", "placement", "okText", "cancelText"]);
            var popconfirmLocale = this.getLocale();
            var overlay = _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-inner-content' },
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-message' },
                        _react2['default'].createElement(_icon2['default'], { type: 'exclamation-circle' }),
                        _react2['default'].createElement(
                            'div',
                            { className: prefixCls + '-message-title' },
                            title
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-buttons' },
                        _react2['default'].createElement(
                            _button2['default'],
                            { onClick: this.onCancel, size: 'small' },
                            cancelText || popconfirmLocale.cancelText
                        ),
                        _react2['default'].createElement(
                            _button2['default'],
                            { onClick: this.onConfirm, type: 'primary', size: 'small' },
                            okText || popconfirmLocale.okText
                        )
                    )
                )
            );
            return _react2['default'].createElement(_tooltip2['default'], (0, _extends3['default'])({}, restProps, { prefixCls: prefixCls, placement: placement, onVisibleChange: this.onVisibleChange, visible: this.state.visible, overlay: overlay }));
        }
    }]);
    return Popconfirm;
}(_react2['default'].Component);

Popconfirm.defaultProps = {
    prefixCls: 'ant-popover',
    transitionName: 'zoom-big',
    placement: 'top',
    trigger: 'click'
};
var injectPopconfirmLocale = (0, _injectLocale2['default'])('Popconfirm', {
    cancelText: '取消',
    okText: '确定'
});
exports['default'] = injectPopconfirmLocale(Popconfirm);
module.exports = exports['default'];