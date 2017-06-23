'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fi_FI = require('rc-calendar/lib/locale/fi_FI');

var _fi_FI2 = _interopRequireDefault(_fi_FI);

var _fi_FI3 = require('../../time-picker/locale/fi_FI');

var _fi_FI4 = _interopRequireDefault(_fi_FI3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Valitse päivä',
        rangePlaceholder: ['Alku päivä', 'Loppu päivä']
    }, _fi_FI2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _fi_FI4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];