import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MonthCalendar from 'rc-calendar/es/MonthCalendar';
import RcDatePicker from 'rc-calendar/es/Picker';
import classNames from 'classnames';
import omit from 'omit.js';
import assign from 'object-assign';
import Icon from '../icon';
import { getLocaleCode } from '../_util/getLocale';
import warning from '../_util/warning';
export default function createPicker(TheCalendar) {
    return _a = function (_React$Component) {
        _inherits(CalenderWrapper, _React$Component);

        function CalenderWrapper(props) {
            _classCallCheck(this, CalenderWrapper);

            var _this = _possibleConstructorReturn(this, (CalenderWrapper.__proto__ || Object.getPrototypeOf(CalenderWrapper)).call(this, props));

            _this.renderFooter = function () {
                var _this$props = _this.props,
                    prefixCls = _this$props.prefixCls,
                    renderExtraFooter = _this$props.renderExtraFooter;

                return renderExtraFooter ? React.createElement(
                    'div',
                    { className: prefixCls + '-footer-extra' },
                    renderExtraFooter.apply(undefined, arguments)
                ) : null;
            };
            _this.clearSelection = function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this.handleChange(null);
            };
            _this.handleChange = function (value) {
                var props = _this.props;
                if (!('value' in props)) {
                    _this.setState({ value: value });
                }
                props.onChange(value, value && value.format(props.format) || '');
            };
            var value = props.value || props.defaultValue;
            if (value && !moment.isMoment(value)) {
                throw new Error('The value/defaultValue of DatePicker or MonthPicker must be ' + 'a moment object after `antd@2.0`, see: http://u.ant.design/date-picker-value');
            }
            _this.state = {
                value: value
            };
            return _this;
        }

        _createClass(CalenderWrapper, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if ('value' in nextProps) {
                    this.setState({
                        value: nextProps.value
                    });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _classNames;

                var value = this.state.value;

                var props = omit(this.props, ['onChange']);
                var prefixCls = props.prefixCls,
                    locale = props.locale;

                var placeholder = 'placeholder' in props ? props.placeholder : locale.lang.placeholder;
                var disabledTime = props.showTime ? props.disabledTime : null;
                var calendarClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-time', props.showTime), _defineProperty(_classNames, prefixCls + '-month', MonthCalendar === TheCalendar), _classNames));
                var pickerChangeHandler = {};
                var calendarHandler = {};
                if (props.showTime) {
                    calendarHandler = {
                        // fix https://github.com/ant-design/ant-design/issues/1902
                        onSelect: this.handleChange
                    };
                } else {
                    pickerChangeHandler = {
                        onChange: this.handleChange
                    };
                }
                warning(!('onOK' in props), 'It should be `DatePicker[onOk]` or `MonthPicker[onOk]`, instead of `onOK`!');
                var calendar = React.createElement(TheCalendar, _extends({}, calendarHandler, { disabledDate: props.disabledDate, disabledTime: disabledTime, locale: locale.lang, timePicker: props.timePicker, defaultValue: props.defaultPickerValue || moment(), dateInputPlaceholder: placeholder, prefixCls: prefixCls, className: calendarClassName, onOk: props.onOk, format: props.format, showToday: props.showToday, monthCellContentRender: props.monthCellContentRender, renderFooter: this.renderFooter }));
                // default width for showTime
                var pickerStyle = {};
                if (props.showTime) {
                    pickerStyle.width = props.style && props.style.width || 154;
                }
                var clearIcon = !props.disabled && props.allowClear && value ? React.createElement(Icon, { type: 'cross-circle', className: prefixCls + '-picker-clear', onClick: this.clearSelection }) : null;
                var input = function input(_ref) {
                    var inputValue = _ref.value;
                    return React.createElement(
                        'div',
                        null,
                        React.createElement('input', { disabled: props.disabled, readOnly: true, value: inputValue && inputValue.format(props.format) || '', placeholder: placeholder, className: props.pickerInputClass }),
                        clearIcon,
                        React.createElement('span', { className: prefixCls + '-picker-icon' })
                    );
                };
                var pickerValue = value;
                var localeCode = getLocaleCode(this.context);
                if (pickerValue && localeCode) {
                    pickerValue.locale(localeCode);
                }
                return React.createElement(
                    'span',
                    { className: props.pickerClass, style: assign({}, props.style, pickerStyle) },
                    React.createElement(
                        RcDatePicker,
                        _extends({}, props, pickerChangeHandler, { calendar: calendar, value: pickerValue, prefixCls: prefixCls + '-picker-container', style: props.popupStyle }),
                        input
                    )
                );
            }
        }]);

        return CalenderWrapper;
    }(React.Component), _a.contextTypes = {
        antLocale: PropTypes.object
    }, _a.defaultProps = {
        prefixCls: 'ant-calendar',
        allowClear: true,
        showToday: true
    }, _a;
    var _a;
}