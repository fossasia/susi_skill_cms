'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ca_ES = require('rc-calendar/lib/locale/ca_ES');

var _ca_ES2 = _interopRequireDefault(_ca_ES);

var _ca_ES3 = require('../../time-picker/locale/ca_ES');

var _ca_ES4 = _interopRequireDefault(_ca_ES3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Seleccionar data',
        rangePlaceholder: ['Data inicial', 'Data final']
    }, _ca_ES2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _ca_ES4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];