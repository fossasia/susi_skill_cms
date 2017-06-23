import CalendarLocale from 'rc-calendar/es/locale/de_DE';
import TimePickerLocale from '../../time-picker/locale/de_DE';
import assign from 'object-assign';
// Merge into a locale object
var locale = {
    lang: assign({
        placeholder: 'Datum auswählen',
        rangePlaceholder: ['Startdatum', 'Enddatum']
    }, CalendarLocale),
    timePickerLocale: assign({}, TimePickerLocale)
};
// All settings at:
// https://github.com/ant-design/ant-design/issues/424
export default locale;