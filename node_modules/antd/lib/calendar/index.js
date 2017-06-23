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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _FullCalendar = require('rc-calendar/lib/FullCalendar');

var _FullCalendar2 = _interopRequireDefault(_FullCalendar);

var _Constants = require('./Constants');

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _getLocale = require('../_util/getLocale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function noop() {
    return null;
}
function zerofixed(v) {
    if (v < 10) {
        return '0' + v;
    }
    return '' + v;
}

var Calendar = function (_React$Component) {
    (0, _inherits3['default'])(Calendar, _React$Component);

    function Calendar(props, context) {
        (0, _classCallCheck3['default'])(this, Calendar);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props, context));

        _this.monthCellRender = function (value) {
            var _this$props = _this.props,
                prefixCls = _this$props.prefixCls,
                _this$props$monthCell = _this$props.monthCellRender,
                monthCellRender = _this$props$monthCell === undefined ? noop : _this$props$monthCell;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-month' },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-value' },
                    value.localeData().monthsShort(value)
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    monthCellRender(value)
                )
            );
        };
        _this.dateCellRender = function (value) {
            var _this$props2 = _this.props,
                prefixCls = _this$props2.prefixCls,
                _this$props2$dateCell = _this$props2.dateCellRender,
                dateCellRender = _this$props2$dateCell === undefined ? noop : _this$props2$dateCell;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-date' },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-value' },
                    zerofixed(value.date())
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    dateCellRender(value)
                )
            );
        };
        _this.setValue = function (value, way) {
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            if (way === 'select') {
                if (_this.props.onSelect) {
                    _this.props.onSelect(value);
                }
            } else if (way === 'changePanel') {
                _this.onPanelChange(value, _this.state.mode);
            }
        };
        _this.setType = function (type) {
            var mode = type === 'date' ? 'month' : 'year';
            if (_this.state.mode !== mode) {
                _this.setState({ mode: mode });
                _this.onPanelChange(_this.state.value, mode);
            }
        };
        _this.onHeaderValueChange = function (value) {
            _this.setValue(value, 'changePanel');
        };
        _this.onHeaderTypeChange = function (type) {
            _this.setType(type);
        };
        _this.onSelect = function (value) {
            _this.setValue(value, 'select');
        };
        // Make sure that moment locale had be set correctly.
        (0, _getLocale.getComponentLocale)(props, context, 'Calendar', function () {
            return require('./locale/zh_CN');
        });
        var value = props.value || props.defaultValue || (0, _moment2['default'])();
        if (!_moment2['default'].isMoment(value)) {
            throw new Error('The value/defaultValue of Calendar must be a moment object after `antd@2.0`, ' + 'see: http://u.ant.design/calendar-value');
        }
        _this.state = {
            value: value,
            mode: props.mode
        };
        return _this;
    }

    (0, _createClass3['default'])(Calendar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'onPanelChange',
        value: function onPanelChange(value, mode) {
            var onPanelChange = this.props.onPanelChange;

            if (onPanelChange) {
                onPanelChange(value, mode);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var state = this.state,
                props = this.props,
                context = this.context;
            var value = state.value,
                mode = state.mode;

            var localeCode = (0, _getLocale.getLocaleCode)(context);
            if (value && localeCode) {
                value.locale(localeCode);
            }
            var prefixCls = props.prefixCls,
                style = props.style,
                className = props.className,
                fullscreen = props.fullscreen,
                dateFullCellRender = props.dateFullCellRender,
                monthFullCellRender = props.monthFullCellRender;

            var type = mode === 'year' ? 'month' : 'date';
            var locale = (0, _getLocale.getComponentLocale)(props, context, 'Calendar', function () {
                return require('./locale/zh_CN');
            });
            var cls = className || '';
            if (fullscreen) {
                cls += ' ' + prefixCls + '-fullscreen';
            }
            var monthCellRender = monthFullCellRender || this.monthCellRender;
            var dateCellRender = dateFullCellRender || this.dateCellRender;
            return _react2['default'].createElement(
                'div',
                { className: cls, style: style },
                _react2['default'].createElement(_Header2['default'], { fullscreen: fullscreen, type: type, value: value, locale: locale.lang, prefixCls: prefixCls, onTypeChange: this.onHeaderTypeChange, onValueChange: this.onHeaderValueChange }),
                _react2['default'].createElement(_FullCalendar2['default'], (0, _extends3['default'])({}, props, { Select: noop, locale: locale.lang, type: type, prefixCls: prefixCls, showHeader: false, value: value, monthCellRender: monthCellRender, dateCellRender: dateCellRender, onSelect: this.onSelect }))
            );
        }
    }]);
    return Calendar;
}(_react2['default'].Component);

exports['default'] = Calendar;

Calendar.defaultProps = {
    locale: {},
    fullscreen: true,
    prefixCls: _Constants.PREFIX_CLS,
    mode: 'month',
    onSelect: noop,
    onPanelChange: noop
};
Calendar.propTypes = {
    monthCellRender: _propTypes2['default'].func,
    dateCellRender: _propTypes2['default'].func,
    monthFullCellRender: _propTypes2['default'].func,
    dateFullCellRender: _propTypes2['default'].func,
    fullscreen: _propTypes2['default'].bool,
    locale: _propTypes2['default'].object,
    prefixCls: _propTypes2['default'].string,
    className: _propTypes2['default'].string,
    style: _propTypes2['default'].object,
    onPanelChange: _propTypes2['default'].func,
    value: _propTypes2['default'].object,
    onSelect: _propTypes2['default'].func
};
Calendar.contextTypes = {
    antLocale: _propTypes2['default'].object
};
module.exports = exports['default'];