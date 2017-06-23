import CalendarLocale from 'rc-calendar/es/locale/bg_BG';
import TimePickerLocale from '../../time-picker/locale/bg_BG';
import assign from 'object-assign';
// Merge into a locale object
var locale = {
    lang: assign({
        placeholder: 'Избор на дата',
        rangePlaceholder: ['Начална', 'Крайна']
    }, CalendarLocale),
    timePickerLocale: assign({}, TimePickerLocale)
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;