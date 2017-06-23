'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ja_JP = require('rc-calendar/lib/locale/ja_JP');

var _ja_JP2 = _interopRequireDefault(_ja_JP);

var _ja_JP3 = require('../../time-picker/locale/ja_JP');

var _ja_JP4 = _interopRequireDefault(_ja_JP3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: '日付を選択',
        rangePlaceholder: ['開始日付', '終了日付']
    }, _ja_JP2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _ja_JP4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];