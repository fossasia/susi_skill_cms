'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _es_ES = require('rc-pagination/lib/locale/es_ES');

var _es_ES2 = _interopRequireDefault(_es_ES);

var _es_ES3 = require('../date-picker/locale/es_ES');

var _es_ES4 = _interopRequireDefault(_es_ES3);

var _es_ES5 = require('../time-picker/locale/es_ES');

var _es_ES6 = _interopRequireDefault(_es_ES5);

var _es_ES7 = require('../calendar/locale/es_ES');

var _es_ES8 = _interopRequireDefault(_es_ES7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
    locale: 'es',
    Pagination: _es_ES2['default'],
    DatePicker: _es_ES4['default'],
    TimePicker: _es_ES6['default'],
    Calendar: _es_ES8['default'],
    Table: {
        filterTitle: 'Filtrar Menu',
        filterConfirm: 'OK',
        filterReset: 'Resetear',
        emptyText: 'No Hay Datos',
        selectAll: 'Seleccionar Todo',
        selectInvert: 'Invertir Selección'
    },
    Modal: {
        okText: 'OK',
        cancelText: 'Cancelar',
        justOkText: 'OK'
    },
    Popconfirm: {
        okText: 'OK',
        cancelText: 'Cancelar'
    },
    Transfer: {
        notFoundContent: 'No Encontrado',
        searchPlaceholder: 'Buscar aquí',
        itemUnit: 'item',
        itemsUnit: 'items'
    },
    Select: {
        notFoundContent: 'No Encontrado'
    },
    Upload: {
        uploading: 'Subiendo...',
        removeFile: 'Eliminar archivo',
        uploadError: 'Error de subida',
        previewFile: 'Vista previa'
    }
};
module.exports = exports['default'];