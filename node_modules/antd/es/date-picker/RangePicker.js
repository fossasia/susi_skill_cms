import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import RangeCalendar from 'rc-calendar/es/RangeCalendar';
import RcDatePicker from 'rc-calendar/es/Picker';
import classNames from 'classnames';
import assign from 'object-assign';
import Icon from '../icon';
import { getLocaleCode } from '../_util/getLocale';
import warning from '../_util/warning';
function getShowDateFromValue(value) {
    var _value = _slicedToArray(value, 2),
        start = _value[0],
        end = _value[1];
    // value could be an empty array, then we should not reset showDate


    if (!start && !end) {
        return;
    }
    var newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
    return [start, newEnd];
}
function formatValue(value, format) {
    return value && value.format(format) || '';
}
function pickerValueAdapter(value) {
    if (!value) {
        return;
    }
    if (Array.isArray(value)) {
        return value;
    }
    return [value, value.clone().add(1, 'month')];
}

var RangePicker = function (_React$Component) {
    _inherits(RangePicker, _React$Component);

    function RangePicker(props) {
        _classCallCheck(this, RangePicker);

        var _this = _possibleConstructorReturn(this, (RangePicker.__proto__ || Object.getPrototypeOf(RangePicker)).call(this, props));

        _this.clearSelection = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.setState({ value: [] });
            _this.handleChange([]);
        };
        _this.clearHoverValue = function () {
            return _this.setState({ hoverValue: [] });
        };
        _this.handleChange = function (value) {
            var props = _this.props;
            if (!('value' in props)) {
                _this.setState({ value: value, showDate: getShowDateFromValue(value) });
            }
            props.onChange(value, [formatValue(value[0], props.format), formatValue(value[1], props.format)]);
        };
        _this.handleOpenChange = function (open) {
            _this.setState({ open: open });
            var onOpenChange = _this.props.onOpenChange;

            if (onOpenChange) {
                onOpenChange(open);
            }
        };
        _this.handleShowDateChange = function (showDate) {
            return _this.setState({ showDate: showDate });
        };
        _this.handleHoverChange = function (hoverValue) {
            return _this.setState({ hoverValue: hoverValue });
        };
        _this.renderFooter = function () {
            var _this$props = _this.props,
                prefixCls = _this$props.prefixCls,
                ranges = _this$props.ranges,
                renderExtraFooter = _this$props.renderExtraFooter;

            if (!ranges && !renderExtraFooter) {
                return null;
            }
            var customFooter = renderExtraFooter ? React.createElement(
                'div',
                { className: prefixCls + '-footer-extra', key: 'extra' },
                renderExtraFooter.apply(undefined, arguments)
            ) : null;
            var operations = Object.keys(ranges || {}).map(function (range) {
                var value = ranges[range];
                return React.createElement(
                    'a',
                    { key: range, onClick: function onClick() {
                            return _this.setValue(value);
                        }, onMouseEnter: function onMouseEnter() {
                            return _this.setState({ hoverValue: value });
                        }, onMouseLeave: _this.clearHoverValue },
                    range
                );
            });
            var rangeNode = React.createElement(
                'div',
                { className: prefixCls + '-footer-extra ' + prefixCls + '-range-quick-selector', key: 'range' },
                operations
            );
            return [rangeNode, customFooter];
        };
        var value = props.value || props.defaultValue || [];
        if (value[0] && !moment.isMoment(value[0]) || value[1] && !moment.isMoment(value[1])) {
            throw new Error('The value/defaultValue of RangePicker must be a moment object array after `antd@2.0`, ' + 'see: http://u.ant.design/date-picker-value');
        }
        _this.state = {
            value: value,
            open: props.open,
            hoverValue: []
        };
        return _this;
    }

    _createClass(RangePicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                var value = nextProps.value || [];
                this.setState({ value: value, showDate: getShowDateFromValue(value) });
            }
            if ('open' in nextProps) {
                this.setState({
                    open: nextProps.open
                });
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.handleChange(value);
            if (!this.props.showTime) {
                this.setState({ open: false });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var state = this.state,
                props = this.props,
                context = this.context;
            var value = state.value,
                showDate = state.showDate,
                hoverValue = state.hoverValue,
                open = state.open;

            var localeCode = getLocaleCode(context);
            if (value && localeCode) {
                if (value[0]) {
                    value[0].locale(localeCode);
                }
                if (value[1]) {
                    value[1].locale(localeCode);
                }
            }
            var prefixCls = props.prefixCls,
                popupStyle = props.popupStyle,
                style = props.style,
                disabledDate = props.disabledDate,
                disabledTime = props.disabledTime,
                showTime = props.showTime,
                showToday = props.showToday,
                ranges = props.ranges,
                onOk = props.onOk,
                locale = props.locale,
                format = props.format;

            warning(!('onOK' in props), 'It should be `RangePicker[onOk]`, instead of `onOK`!');
            var calendarClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-time', showTime), _defineProperty(_classNames, prefixCls + '-range-with-ranges', ranges), _classNames));
            // 需要选择时间时，点击 ok 时才触发 onChange
            var pickerChangeHandler = {
                onChange: this.handleChange
            };
            var calendarHandler = {
                onOk: this.handleChange
            };
            if (props.timePicker) {
                pickerChangeHandler.onChange = function (changedValue) {
                    return _this2.handleChange(changedValue);
                };
            } else {
                calendarHandler = {};
            }
            var startPlaceholder = 'placeholder' in props ? props.placeholder[0] : locale.lang.rangePlaceholder[0];
            var endPlaceholder = 'placeholder' in props ? props.placeholder[1] : locale.lang.rangePlaceholder[1];
            var calendar = React.createElement(RangeCalendar, _extends({}, calendarHandler, { format: format, prefixCls: prefixCls, className: calendarClassName, renderFooter: this.renderFooter, timePicker: props.timePicker, disabledDate: disabledDate, disabledTime: disabledTime, dateInputPlaceholder: [startPlaceholder, endPlaceholder], locale: locale.lang, onOk: onOk, value: showDate || pickerValueAdapter(props.defaultPickerValue) || pickerValueAdapter(moment()), onValueChange: this.handleShowDateChange, hoverValue: hoverValue, onHoverChange: this.handleHoverChange, showToday: showToday }));
            // default width for showTime
            var pickerStyle = {};
            if (props.showTime) {
                pickerStyle.width = style && style.width || 300;
            }
            var clearIcon = !props.disabled && props.allowClear && value && (value[0] || value[1]) ? React.createElement(Icon, { type: 'cross-circle', className: prefixCls + '-picker-clear', onClick: this.clearSelection }) : null;
            var input = function input(_ref) {
                var inputValue = _ref.value;

                var start = inputValue[0];
                var end = inputValue[1];
                return React.createElement(
                    'span',
                    { className: props.pickerInputClass, disabled: props.disabled },
                    React.createElement('input', { disabled: props.disabled, readOnly: true, value: start && start.format(props.format) || '', placeholder: startPlaceholder, className: prefixCls + '-range-picker-input' }),
                    React.createElement(
                        'span',
                        { className: prefixCls + '-range-picker-separator' },
                        ' ~ '
                    ),
                    React.createElement('input', { disabled: props.disabled, readOnly: true, value: end && end.format(props.format) || '', placeholder: endPlaceholder, className: prefixCls + '-range-picker-input' }),
                    clearIcon,
                    React.createElement('span', { className: prefixCls + '-picker-icon' })
                );
            };
            return React.createElement(
                'span',
                { className: props.pickerClass, style: assign({}, style, pickerStyle) },
                React.createElement(
                    RcDatePicker,
                    _extends({}, props, pickerChangeHandler, { calendar: calendar, value: value, open: open, onOpenChange: this.handleOpenChange, prefixCls: prefixCls + '-picker-container', style: popupStyle }),
                    input
                )
            );
        }
    }]);

    return RangePicker;
}(React.Component);

export default RangePicker;

RangePicker.contextTypes = {
    antLocale: PropTypes.object
};
RangePicker.defaultProps = {
    prefixCls: 'ant-calendar',
    allowClear: true,
    showToday: false
};