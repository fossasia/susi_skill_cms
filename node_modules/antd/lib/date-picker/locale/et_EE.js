'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _et_EE = require('rc-calendar/lib/locale/et_EE');

var _et_EE2 = _interopRequireDefault(_et_EE);

var _et_EE3 = require('../../time-picker/locale/et_EE');

var _et_EE4 = _interopRequireDefault(_et_EE3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// 统一合并为完整的 Locale
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Vali kuupäev',
        rangePlaceholder: ['Algus kuupäev', 'Lõpu kuupäev']
    }, _et_EE2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _et_EE4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];