import moment from 'moment';
moment.locale('sv');
import Pagination from 'rc-pagination/es/locale/sv_SE';
import DatePicker from '../date-picker/locale/sv_SE';
import TimePicker from '../time-picker/locale/sv_SE';
import Calendar from '../calendar/locale/sv_SE';
export default {
    locale: 'sv',
    Pagination: Pagination,
    DatePicker: DatePicker,
    TimePicker: TimePicker,
    Calendar: Calendar,
    Table: {
        filterTitle: 'Filtermeny',
        filterConfirm: 'OK',
        filterReset: 'Rensa',
        emptyText: 'Ingen information'
    },
    Modal: {
        okText: 'OK',
        cancelText: 'Avbryt',
        justOkText: 'OK'
    },
    Popconfirm: {
        okText: 'OK',
        cancelText: 'Avbryt'
    },
    Transfer: {
        notFoundContent: 'Info saknas',
        searchPlaceholder: 'Sök',
        itemUnit: 'element',
        itemsUnit: 'element'
    },
    Select: {
        notFoundContent: 'Info saknas'
    }
};