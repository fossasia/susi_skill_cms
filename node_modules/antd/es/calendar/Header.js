import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { PREFIX_CLS } from './Constants';
import Select from '../select';
import { Group, Button } from '../radio';
var Option = Select.Option;

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));

        _this.onYearChange = function (year) {
            var newValue = _this.props.value.clone();
            newValue.year(parseInt(year, 10));
            var onValueChange = _this.props.onValueChange;
            if (onValueChange) {
                onValueChange(newValue);
            }
        };
        _this.onMonthChange = function (month) {
            var newValue = _this.props.value.clone();
            newValue.month(parseInt(month, 10));
            var onValueChange = _this.props.onValueChange;
            if (onValueChange) {
                onValueChange(newValue);
            }
        };
        _this.onTypeChange = function (e) {
            var onTypeChange = _this.props.onTypeChange;
            if (onTypeChange) {
                onTypeChange(e.target.value);
            }
        };
        return _this;
    }

    _createClass(Header, [{
        key: 'getYearSelectElement',
        value: function getYearSelectElement(year) {
            var _props = this.props,
                yearSelectOffset = _props.yearSelectOffset,
                yearSelectTotal = _props.yearSelectTotal,
                locale = _props.locale,
                prefixCls = _props.prefixCls,
                fullscreen = _props.fullscreen;

            var start = year - yearSelectOffset;
            var end = start + yearSelectTotal;
            var suffix = locale.year === '年' ? '年' : '';
            var options = [];
            for (var index = start; index < end; index++) {
                options.push(React.createElement(
                    Option,
                    { key: '' + index },
                    index + suffix
                ));
            }
            return React.createElement(
                Select,
                { size: fullscreen ? 'default' : 'small', dropdownMatchSelectWidth: false, className: prefixCls + '-year-select', onChange: this.onYearChange, value: String(year) },
                options
            );
        }
    }, {
        key: 'getMonthsLocale',
        value: function getMonthsLocale(value) {
            var current = value.clone();
            var localeData = value.localeData();
            var months = [];
            for (var i = 0; i < 12; i++) {
                current.month(i);
                months.push(localeData.monthsShort(current));
            }
            return months;
        }
    }, {
        key: 'getMonthSelectElement',
        value: function getMonthSelectElement(month, months) {
            var props = this.props;
            var prefixCls = props.prefixCls,
                fullscreen = props.fullscreen;

            var options = [];
            for (var index = 0; index < 12; index++) {
                options.push(React.createElement(
                    Option,
                    { key: '' + index },
                    months[index]
                ));
            }
            return React.createElement(
                Select,
                { size: fullscreen ? 'default' : 'small', dropdownMatchSelectWidth: false, className: prefixCls + '-month-select', value: String(month), onChange: this.onMonthChange },
                options
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                type = _props2.type,
                value = _props2.value,
                prefixCls = _props2.prefixCls,
                locale = _props2.locale,
                fullscreen = _props2.fullscreen;

            var yearSelect = this.getYearSelectElement(value.year());
            var monthSelect = type === 'date' ? this.getMonthSelectElement(value.month(), this.getMonthsLocale(value)) : null;
            var size = fullscreen ? 'default' : 'small';
            var typeSwitch = React.createElement(
                Group,
                { onChange: this.onTypeChange, value: type, size: size },
                React.createElement(
                    Button,
                    { value: 'date' },
                    locale.month
                ),
                React.createElement(
                    Button,
                    { value: 'month' },
                    locale.year
                )
            );
            return React.createElement(
                'div',
                { className: prefixCls + '-header' },
                yearSelect,
                monthSelect,
                typeSwitch
            );
        }
    }]);

    return Header;
}(React.Component);

export default Header;

Header.defaultProps = {
    prefixCls: PREFIX_CLS + '-header',
    yearSelectOffset: 10,
    yearSelectTotal: 20
};