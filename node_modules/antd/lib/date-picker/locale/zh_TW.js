'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _zh_TW = require('rc-calendar/lib/locale/zh_TW');

var _zh_TW2 = _interopRequireDefault(_zh_TW);

var _zh_TW3 = require('../../time-picker/locale/zh_TW');

var _zh_TW4 = _interopRequireDefault(_zh_TW3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: '請選擇日期',
        rangePlaceholder: ['開始日期', '結束日期']
    }, _zh_TW2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _zh_TW4['default'])
};
locale.lang.ok = '確 定';
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];