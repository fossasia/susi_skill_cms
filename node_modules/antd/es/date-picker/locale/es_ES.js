import CalendarLocale from 'rc-calendar/es/locale/es_ES';
import TimePickerLocale from '../../time-picker/locale/es_ES';
import assign from 'object-assign';
// Merge into a locale object
var locale = {
    lang: assign({
        placeholder: 'Seleccionar fecha',
        rangePlaceholder: ['Fecha inicial', 'Fecha final']
    }, CalendarLocale),
    timePickerLocale: assign({}, TimePickerLocale)
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;