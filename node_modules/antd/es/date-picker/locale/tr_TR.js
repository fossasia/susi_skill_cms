import CalendarLocale from 'rc-calendar/es/locale/en_US';
import TimePickerLocale from '../../time-picker/locale/tr_TR';
import assign from 'object-assign';
// Merge into a locale object
var locale = {
    lang: assign({
        placeholder: 'Tarih Seç',
        rangePlaceholder: ['Başlangıç Tarihi', 'Bitiş Tarihi']
    }, CalendarLocale),
    timePickerLocale: assign({}, TimePickerLocale)
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;