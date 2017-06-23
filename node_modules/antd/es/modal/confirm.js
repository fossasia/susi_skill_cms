import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import assign from 'object-assign';
import Icon from '../icon';
import Dialog from './Modal';
import ActionButton from './ActionButton';
import { getConfirmLocale } from './locale';
export default function confirm(config) {
    var props = assign({ iconType: 'question-circle' }, config);
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
    var runtimeLocale = getConfirmLocale();
    props.okText = props.okText || (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
    props.cancelText = props.cancelText || runtimeLocale.cancelText;
    function close() {
        var unmountResult = ReactDOM.unmountComponentAtNode(div);
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
    var body = React.createElement(
        'div',
        { className: prefixCls + '-body' },
        React.createElement(Icon, { type: props.iconType }),
        React.createElement(
            'span',
            { className: prefixCls + '-title' },
            props.title
        ),
        React.createElement(
            'div',
            { className: prefixCls + '-content' },
            props.content
        )
    );
    var footer = null;
    if (props.okCancel) {
        footer = React.createElement(
            'div',
            { className: prefixCls + '-btns' },
            React.createElement(
                ActionButton,
                { actionFn: props.onCancel, closeModal: close },
                props.cancelText
            ),
            React.createElement(
                ActionButton,
                { type: 'primary', actionFn: props.onOk, closeModal: close, autoFocus: true },
                props.okText
            )
        );
    } else {
        footer = React.createElement(
            'div',
            { className: prefixCls + '-btns' },
            React.createElement(
                ActionButton,
                { type: 'primary', actionFn: props.onOk, closeModal: close, autoFocus: true },
                props.okText
            )
        );
    }
    var classString = classNames(prefixCls, _defineProperty({}, prefixCls + '-' + props.type, true), props.className);
    ReactDOM.render(React.createElement(
        Dialog,
        { className: classString, onCancel: close.bind(this, { triggerCancel: true }), visible: true, title: '', transitionName: 'zoom', footer: '', maskTransitionName: 'fade', maskClosable: maskClosable, style: style, width: width },
        React.createElement(
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