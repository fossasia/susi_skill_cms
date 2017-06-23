'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ko_KR = require('rc-calendar/lib/locale/ko_KR');

var _ko_KR2 = _interopRequireDefault(_ko_KR);

var _ko_KR3 = require('../../time-picker/locale/ko_KR');

var _ko_KR4 = _interopRequireDefault(_ko_KR3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: '날짜 선택',
        rangePlaceholder: ['시작일', '종료일']
    }, _ko_KR2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _ko_KR4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];