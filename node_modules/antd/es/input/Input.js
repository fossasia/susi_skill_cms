import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import calculateNodeHeight from './calculateNodeHeight';
import assign from 'object-assign';
import omit from 'omit.js';
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}
function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}
function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}

var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input() {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));

        _this.state = {
            textareaStyles: null,
            isFocus: false
        };
        _this.handleKeyDown = function (e) {
            var _this$props = _this.props,
                onPressEnter = _this$props.onPressEnter,
                onKeyDown = _this$props.onKeyDown;

            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        };
        _this.handleTextareaChange = function (e) {
            if (!('value' in _this.props)) {
                _this.resizeTextarea();
            }
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(e);
            }
        };
        _this.resizeTextarea = function () {
            var _this$props2 = _this.props,
                type = _this$props2.type,
                autosize = _this$props2.autosize;

            if (type !== 'textarea' || !autosize || !_this.refs.input) {
                return;
            }
            var minRows = autosize ? autosize.minRows : null;
            var maxRows = autosize ? autosize.maxRows : null;
            var textareaStyles = calculateNodeHeight(_this.refs.input, false, minRows, maxRows);
            _this.setState({ textareaStyles: textareaStyles });
        };
        return _this;
    }

    _createClass(Input, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.resizeTextarea();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // Re-render with the new content then recalculate the height as required.
            if (this.props.value !== nextProps.value) {
                if (this.nextFrameActionId) {
                    clearNextFrameAction(this.nextFrameActionId);
                }
                this.nextFrameActionId = onNextFrame(this.resizeTextarea);
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.refs.input.focus();
        }
    }, {
        key: 'renderLabeledInput',
        value: function renderLabeledInput(children) {
            var props = this.props;
            // Not wrap when there is not addons
            if (props.type === 'textarea' || !props.addonBefore && !props.addonAfter) {
                return children;
            }
            var wrapperClassName = props.prefixCls + '-group';
            var addonClassName = wrapperClassName + '-addon';
            var addonBefore = props.addonBefore ? React.createElement(
                'span',
                { className: addonClassName },
                props.addonBefore
            ) : null;
            var addonAfter = props.addonAfter ? React.createElement(
                'span',
                { className: addonClassName },
                props.addonAfter
            ) : null;
            var className = classNames(props.prefixCls + '-wrapper', _defineProperty({}, wrapperClassName, addonBefore || addonAfter));
            // Need another wrapper for changing display:table to display:inline-block
            // and put style prop in wrapper
            if (addonBefore || addonAfter) {
                return React.createElement(
                    'span',
                    { className: props.prefixCls + '-group-wrapper', style: props.style },
                    React.createElement(
                        'span',
                        { className: className },
                        addonBefore,
                        cloneElement(children, { style: null }),
                        addonAfter
                    )
                );
            }
            return React.createElement(
                'span',
                { className: className },
                addonBefore,
                children,
                addonAfter
            );
        }
    }, {
        key: 'renderLabeledIcon',
        value: function renderLabeledIcon(children) {
            var props = this.props;

            if (props.type === 'textarea' || !('prefix' in props || 'suffix' in props)) {
                return children;
            }
            var prefix = props.prefix ? React.createElement(
                'span',
                { className: props.prefixCls + '-prefix' },
                props.prefix
            ) : null;
            var suffix = props.suffix ? React.createElement(
                'span',
                { className: props.prefixCls + '-suffix' },
                props.suffix
            ) : null;
            return React.createElement(
                'span',
                { className: props.prefixCls + '-affix-wrapper', style: props.style },
                prefix,
                cloneElement(children, { style: null }),
                suffix
            );
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var _classNames2;

            var props = assign({}, this.props);
            // Fix https://fb.me/react-unknown-prop
            var otherProps = omit(this.props, ['prefixCls', 'onPressEnter', 'autosize', 'addonBefore', 'addonAfter', 'prefix', 'suffix']);
            var prefixCls = props.prefixCls;
            if (!props.type) {
                return props.children;
            }
            var inputClassName = classNames(prefixCls, (_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-sm', props.size === 'small'), _defineProperty(_classNames2, prefixCls + '-lg', props.size === 'large'), _classNames2), props.className);
            if ('value' in props) {
                otherProps.value = fixControlledValue(props.value);
                // Input elements must be either controlled or uncontrolled,
                // specify either the value prop, or the defaultValue prop, but not both.
                delete otherProps.defaultValue;
            }
            switch (props.type) {
                case 'textarea':
                    return React.createElement('textarea', _extends({}, otherProps, { style: assign({}, props.style, this.state.textareaStyles), className: inputClassName, onKeyDown: this.handleKeyDown, onChange: this.handleTextareaChange, ref: 'input' }));
                default:
                    return this.renderLabeledIcon(React.createElement('input', _extends({}, otherProps, { className: inputClassName, onKeyDown: this.handleKeyDown, ref: 'input' })));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return this.renderLabeledInput(this.renderInput());
        }
    }]);

    return Input;
}(Component);

export default Input;

Input.defaultProps = {
    disabled: false,
    prefixCls: 'ant-input',
    type: 'text',
    autosize: false
};
Input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['small', 'default', 'large']),
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefixCls: PropTypes.string,
    autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node
};