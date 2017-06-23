import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import CalendarLocale from 'rc-calendar/es/locale/zh_CN';
import RcCalendar from 'rc-calendar';
import warning from 'warning';

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar() {
        _classCallCheck(this, Calendar);

        return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
    }

    _createClass(Calendar, [{
        key: 'render',
        value: function render() {
            warning(false, 'DatePicker.Calendar is deprecated, use Calendar instead.');
            return React.createElement(RcCalendar, this.props);
        }
    }]);

    return Calendar;
}(React.Component);

export default Calendar;

Calendar.defaultProps = {
    locale: CalendarLocale,
    prefixCls: 'ant-calendar'
};