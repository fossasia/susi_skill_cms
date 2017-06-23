'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _en_US = require('rc-calendar/lib/locale/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

var _en_US3 = require('../../time-picker/locale/en_US');

var _en_US4 = _interopRequireDefault(_en_US3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Select date',
        rangePlaceholder: ['Start date', 'End date']
    }, _en_US2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _en_US4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];