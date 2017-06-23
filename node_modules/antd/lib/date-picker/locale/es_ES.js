'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _es_ES = require('rc-calendar/lib/locale/es_ES');

var _es_ES2 = _interopRequireDefault(_es_ES);

var _es_ES3 = require('../../time-picker/locale/es_ES');

var _es_ES4 = _interopRequireDefault(_es_ES3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Seleccionar fecha',
        rangePlaceholder: ['Fecha inicial', 'Fecha final']
    }, _es_ES2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _es_ES4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];