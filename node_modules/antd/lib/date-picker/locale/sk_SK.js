'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sk_SK = require('rc-calendar/lib/locale/sk_SK');

var _sk_SK2 = _interopRequireDefault(_sk_SK);

var _sk_SK3 = require('../../time-picker/locale/sk_SK');

var _sk_SK4 = _interopRequireDefault(_sk_SK3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// 统一合并为完整的 Locale
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Vybrať dátum',
        rangePlaceholder: ['Od', 'Do']
    }, _sk_SK2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _sk_SK4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];