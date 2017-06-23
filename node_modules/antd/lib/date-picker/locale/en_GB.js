'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _en_GB = require('rc-calendar/lib/locale/en_GB');

var _en_GB2 = _interopRequireDefault(_en_GB);

var _en_GB3 = require('../../time-picker/locale/en_GB');

var _en_GB4 = _interopRequireDefault(_en_GB3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Select date',
        rangePlaceholder: ['Start date', 'End date']
    }, _en_GB2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _en_GB4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];