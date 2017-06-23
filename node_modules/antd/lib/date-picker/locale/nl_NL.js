'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nl_NL = require('rc-calendar/lib/locale/nl_NL');

var _nl_NL2 = _interopRequireDefault(_nl_NL);

var _nl_NL3 = require('../../time-picker/locale/nl_NL');

var _nl_NL4 = _interopRequireDefault(_nl_NL3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Selecteer datum',
        rangePlaceholder: ['Begin datum', 'Eind datum']
    }, _nl_NL2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _nl_NL4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/issues/424
exports['default'] = locale;
module.exports = exports['default'];