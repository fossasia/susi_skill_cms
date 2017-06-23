'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports['default'] = confirm;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _ActionButton = require('./ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _locale = require('./locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function confirm(config) {
    var props = (0, _objectAssign2['default'])({ iconType: 'question-circle' }, config);
    var prefixCls = props.prefixCls || 'ant-confirm';
    var div = document.createElement('div');
    document.body.appendChild(div);
    var width = props.width || 416;
    var style = props.style || {};
    // 默认为 false，保持旧版默认行为
    var maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
    // 默认为 true，保持向下兼容
    if (!('okCancel' in props)) {
        props.okCancel = true;
    }
    var runtimeLocale = (0, _locale.getConfirmLocale)();
    props.okText = props.okText || (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
    props.cancelText = props.cancelText || runtimeLocale.cancelText;
    function close() {
        var unmountResult = _reactDom2['default'].unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var triggerCancel = args && args.length && args.some(function (param) {
            return param && param.triggerCancel;
        });
        if (props.onCancel && triggerCancel) {
            props.onCancel.apply(props, args);
        }
    }
    var body = _react2['default'].createElement(
        'div',
        { className: prefixCls + '-body' },
        _react2['default'].createElement(_icon2['default'], { type: props.iconType }),
        _react2['default'].createElement(
            'span',
            { className: prefixCls + '-title' },
            props.title
        ),
        _react2['default'].createElement(
            'div',
            { className: prefixCls + '-content' },
            props.content
        )
    );
    var footer = null;
    if (props.okCancel) {
        footer = _react2['default'].createElement(
            'div',
            { className: prefixCls + '-btns' },
            _react2['default'].createElement(
                _ActionButton2['default'],
                { actionFn: props.onCancel, closeModal: close },
                props.cancelText
            ),
            _react2['default'].createElement(
                _ActionButton2['default'],
                { type: 'primary', actionFn: props.onOk, closeModal: close, autoFocus: true },
                props.okText
            )
        );
    } else {
        footer = _react2['default'].createElement(
            'div',
            { className: prefixCls + '-btns' },
            _react2['default'].createElement(
                _ActionButton2['default'],
                { type: 'primary', actionFn: props.onOk, closeModal: close, autoFocus: true },
                props.okText
            )
        );
    }
    var classString = (0, _classnames2['default'])(prefixCls, (0, _defineProperty3['default'])({}, prefixCls + '-' + props.type, true), props.className);
    _reactDom2['default'].render(_react2['default'].createElement(
        _Modal2['default'],
        { className: classString, onCancel: close.bind(this, { triggerCancel: true }), visible: true, title: '', transitionName: 'zoom', footer: '', maskTransitionName: 'fade', maskClosable: maskClosable, style: style, width: width },
        _react2['default'].createElement(
            'div',
            { className: prefixCls + '-body-wrapper' },
            body,
            ' ',
            footer
        )
    ), div);
    return {
        destroy: close
    };
}
module.exports = exports['default'];