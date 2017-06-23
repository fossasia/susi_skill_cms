'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _it_IT = require('rc-calendar/lib/locale/it_IT');

var _it_IT2 = _interopRequireDefault(_it_IT);

var _it_IT3 = require('../../time-picker/locale/it_IT');

var _it_IT4 = _interopRequireDefault(_it_IT3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Selezionare la data',
        rangePlaceholder: ['Data d\'inizio', 'Data di fine']
    }, _it_IT2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _it_IT4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/issues/424
exports['default'] = locale;
module.exports = exports['default'];