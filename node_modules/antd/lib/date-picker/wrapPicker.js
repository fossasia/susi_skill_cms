'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports['default'] = wrapPicker;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Panel = require('rc-time-picker/lib/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _getLocale = require('../_util/getLocale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getColumns(_ref) {
    var showHour = _ref.showHour,
        showMinute = _ref.showMinute,
        showSecond = _ref.showSecond,
        use12Hours = _ref.use12Hours;

    var column = 0;
    if (showHour) {
        column += 1;
    }
    if (showMinute) {
        column += 1;
    }
    if (showSecond) {
        column += 1;
    }
    if (use12Hours) {
        column += 1;
    }
    return column;
}
function wrapPicker(Picker, defaultFormat) {
    return _a = function (_React$Component) {
        (0, _inherits3['default'])(PickerWrapper, _React$Component);

        function PickerWrapper() {
            (0, _classCallCheck3['default'])(this, PickerWrapper);

            var _this = (0, _possibleConstructorReturn3['default'])(this, (PickerWrapper.__proto__ || Object.getPrototypeOf(PickerWrapper)).apply(this, arguments));

            _this.handleOpenChange = function (open) {
                var _this$props = _this.props,
                    onOpenChange = _this$props.onOpenChange,
                    toggleOpen = _this$props.toggleOpen;

                onOpenChange(open);
                if (toggleOpen) {
                    (0, _warning2['default'])(false, '`toggleOpen` is deprecated and will be removed in the future, ' + 'please use `onOpenChange` instead, see: http://u.ant.design/date-picker-on-open-change');
                    toggleOpen({ open: open });
                }
            };
            return _this;
        }

        (0, _createClass3['default'])(PickerWrapper, [{
            key: 'render',
            value: function render() {
                var _classNames2;

                var props = this.props;
                var prefixCls = props.prefixCls,
                    inputPrefixCls = props.inputPrefixCls;

                var pickerClass = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-picker', true));
                var pickerInputClass = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-picker-input', true), (0, _defineProperty3['default'])(_classNames2, inputPrefixCls, true), (0, _defineProperty3['default'])(_classNames2, inputPrefixCls + '-lg', props.size === 'large'), (0, _defineProperty3['default'])(_classNames2, inputPrefixCls + '-sm', props.size === 'small'), _classNames2));
                var locale = (0, _getLocale.getComponentLocale)(props, this.context, 'DatePicker', function () {
                    return require('./locale/zh_CN');
                });
                var timeFormat = props.showTime && props.showTime.format || 'HH:mm:ss';
                var rcTimePickerProps = {
                    format: timeFormat,
                    showSecond: timeFormat.indexOf('ss') >= 0,
                    showMinute: timeFormat.indexOf('mm') >= 0,
                    showHour: timeFormat.indexOf('HH') >= 0,
                    use12Hours: props.showTime && props.showTime.use12Hours
                };
                var columns = getColumns(rcTimePickerProps);
                var timePickerCls = prefixCls + '-time-picker-column-' + columns;
                var timePicker = props.showTime ? _react2['default'].createElement(_Panel2['default'], (0, _extends3['default'])({}, rcTimePickerProps, props.showTime, { prefixCls: prefixCls + '-time-picker', className: timePickerCls, placeholder: locale.timePickerLocale.placeholder, transitionName: 'slide-up' })) : null;
                return _react2['default'].createElement(Picker, (0, _extends3['default'])({}, props, { pickerClass: pickerClass, pickerInputClass: pickerInputClass, locale: locale, timePicker: timePicker, onOpenChange: this.handleOpenChange }));
            }
        }]);
        return PickerWrapper;
    }(_react2['default'].Component), _a.contextTypes = {
        antLocale: _propTypes2['default'].object
    }, _a.defaultProps = {
        format: defaultFormat || 'YYYY-MM-DD',
        transitionName: 'slide-up',
        popupStyle: {},
        onChange: function onChange() {},
        onOk: function onOk() {},
        onOpenChange: function onOpenChange() {},

        locale: {},
        prefixCls: 'ant-calendar',
        inputPrefixCls: 'ant-input'
    }, _a;
    var _a;
}
module.exports = exports['default'];