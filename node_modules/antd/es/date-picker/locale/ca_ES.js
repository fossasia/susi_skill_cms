import CalendarLocale from 'rc-calendar/es/locale/ca_ES';
import TimePickerLocale from '../../time-picker/locale/ca_ES';
import assign from 'object-assign';
// Merge into a locale object
var locale = {
    lang: assign({
        placeholder: 'Seleccionar data',
        rangePlaceholder: ['Data inicial', 'Data final']
    }, CalendarLocale),
    timePickerLocale: assign({}, TimePickerLocale)
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;