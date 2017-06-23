import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import moment from 'moment';
import RcTimePicker from 'rc-time-picker/es/TimePicker';
import classNames from 'classnames';
import assign from 'object-assign';
import injectLocale from '../locale-provider/injectLocale';
import defaultLocale from './locale/zh_CN';

var TimePicker = function (_React$Component) {
    _inherits(TimePicker, _React$Component);

    function TimePicker(props) {
        _classCallCheck(this, TimePicker);

        var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

        _this.handleChange = function (value) {
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            var _this$props = _this.props,
                onChange = _this$props.onChange,
                _this$props$format = _this$props.format,
                format = _this$props$format === undefined ? 'HH:mm:ss' : _this$props$format;

            if (onChange) {
                onChange(value, value && value.format(format) || '');
            }
        };
        _this.handleOpenClose = function (_ref) {
            var open = _ref.open;
            var onOpenChange = _this.props.onOpenChange;

            if (onOpenChange) {
                onOpenChange(open);
            }
        };
        _this.saveTimePicker = function (timePickerRef) {
            _this.timePickerRef = timePickerRef;
        };
        var value = props.value || props.defaultValue;
        if (value && !moment.isMoment(value)) {
            throw new Error('The value/defaultValue of TimePicker must be a moment object after `antd@2.0`, ' + 'see: http://u.ant.design/time-picker-value');
        }
        _this.state = {
            value: value
        };
        return _this;
    }

    _createClass(TimePicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({ value: nextProps.value });
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.timePickerRef.focus();
        }
    }, {
        key: 'getDefaultFormat',
        value: function getDefaultFormat() {
            var _props = this.props,
                format = _props.format,
                use12Hours = _props.use12Hours;

            if (format) {
                return format;
            } else if (use12Hours) {
                return 'h:mm:ss a';
            }
            return 'HH:mm:ss';
        }
    }, {
        key: 'render',
        value: function render() {
            var props = assign({}, this.props);
            delete props.defaultValue;
            var format = this.getDefaultFormat();
            var className = classNames(props.className, _defineProperty({}, props.prefixCls + '-' + props.size, !!props.size));
            var addon = function addon(panel) {
                return props.addon ? React.createElement(
                    'div',
                    { className: props.prefixCls + '-panel-addon' },
                    props.addon(panel)
                ) : null;
            };
            return React.createElement(RcTimePicker, _extends({ showHour: format.indexOf('HH') > -1 || format.indexOf('h') > -1, showMinute: format.indexOf('mm') > -1, showSecond: format.indexOf('ss') > -1 }, props, { ref: this.saveTimePicker, format: format, className: className, value: this.state.value, placeholder: props.placeholder === undefined ? this.getLocale().placeholder : props.placeholder, onChange: this.handleChange, onOpen: this.handleOpenClose, onClose: this.handleOpenClose, addon: addon }));
        }
    }]);

    return TimePicker;
}(React.Component);

TimePicker.defaultProps = {
    prefixCls: 'ant-time-picker',
    align: {
        offset: [0, -2]
    },
    disabled: false,
    disabledHours: undefined,
    disabledMinutes: undefined,
    disabledSeconds: undefined,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    transitionName: 'slide-up'
};
var injectTimePickerLocale = injectLocale('TimePicker', defaultLocale);
export default injectTimePickerLocale(TimePicker);