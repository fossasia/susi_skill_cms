import moment from 'moment';
moment.locale('tr');
import Pagination from 'rc-pagination/es/locale/en_US';
import DatePicker from '../date-picker/locale/tr_TR';
import TimePicker from '../time-picker/locale/tr_TR';
import Calendar from '../calendar/locale/en_US';
export default {
    locale: 'tr',
    Pagination: Pagination,
    DatePicker: DatePicker,
    TimePicker: TimePicker,
    Calendar: Calendar,
    Table: {
        filterTitle: 'Menü Filtrele',
        filterConfirm: 'Tamam',
        filterReset: 'Sıfırla',
        emptyText: 'Veri Yok',
        selectAll: 'Hepsini Seç',
        selectInvert: 'Tersini Seç'
    },
    Modal: {
        okText: 'Tamam',
        cancelText: 'İptal',
        justOkText: 'Tamam'
    },
    Popconfirm: {
        okText: 'Tamam',
        cancelText: 'İptal'
    },
    Transfer: {
        notFoundContent: 'Bulunamadı',
        searchPlaceholder: 'Arama',
        itemUnit: 'Öğe',
        itemsUnit: 'Öğeler'
    },
    Select: {
        notFoundContent: 'Bulunamadı'
    },
    Upload: {
        uploading: 'Yükleniyor...',
        removeFile: 'Dosyay\u0131 kald\u0131r',
        uploadError: 'Yükleme Hatası',
        previewFile: 'Dosyay\u0131 \xD6nizle'
    }
};