'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Constants = require('./Constants');

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _radio = require('../radio');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Option = _select2['default'].Option;

var Header = function (_React$Component) {
    (0, _inherits3['default'])(Header, _React$Component);

    function Header() {
        (0, _classCallCheck3['default'])(this, Header);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));

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

    (0, _createClass3['default'])(Header, [{
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
                options.push(_react2['default'].createElement(
                    Option,
                    { key: '' + index },
                    index + suffix
                ));
            }
            return _react2['default'].createElement(
                _select2['default'],
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
                options.push(_react2['default'].createElement(
                    Option,
                    { key: '' + index },
                    months[index]
                ));
            }
            return _react2['default'].createElement(
                _select2['default'],
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
            var typeSwitch = _react2['default'].createElement(
                _radio.Group,
                { onChange: this.onTypeChange, value: type, size: size },
                _react2['default'].createElement(
                    _radio.Button,
                    { value: 'date' },
                    locale.month
                ),
                _react2['default'].createElement(
                    _radio.Button,
                    { value: 'month' },
                    locale.year
                )
            );
            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-header' },
                yearSelect,
                monthSelect,
                typeSwitch
            );
        }
    }]);
    return Header;
}(_react2['default'].Component);

exports['default'] = Header;

Header.defaultProps = {
    prefixCls: _Constants.PREFIX_CLS + '-header',
    yearSelectOffset: 10,
    yearSelectTotal: 20
};
module.exports = exports['default'];