'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _nl_NL = require('rc-pagination/lib/locale/nl_NL');

var _nl_NL2 = _interopRequireDefault(_nl_NL);

var _nl_NL3 = require('../date-picker/locale/nl_NL');

var _nl_NL4 = _interopRequireDefault(_nl_NL3);

var _nl_NL5 = require('../time-picker/locale/nl_NL');

var _nl_NL6 = _interopRequireDefault(_nl_NL5);

var _nl_NL7 = require('../calendar/locale/nl_NL');

var _nl_NL8 = _interopRequireDefault(_nl_NL7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_moment2['default'].locale('nl');
exports['default'] = {
    locale: 'nl',
    Pagination: _nl_NL2['default'],
    DatePicker: _nl_NL4['default'],
    TimePicker: _nl_NL6['default'],
    Calendar: _nl_NL8['default'],
    Table: {
        filterTitle: 'Filter Menu',
        filterConfirm: 'OK',
        filterReset: 'Reset',
        emptyText: 'Geen gegevens'
    },
    Modal: {
        okText: 'OK',
        cancelText: 'Annuleren',
        justOkText: 'OK'
    },
    Popconfirm: {
        okText: 'OK',
        cancelText: 'Annuleren'
    },
    Transfer: {
        notFoundContent: 'Niet gevonden',
        searchPlaceholder: 'Zoeken',
        itemUnit: 'item',
        itemsUnit: 'items'
    },
    Select: {
        notFoundContent: 'Niet gevonden'
    }
};
module.exports = exports['default'];