'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sv_SE = require('rc-calendar/lib/locale/sv_SE');

var _sv_SE2 = _interopRequireDefault(_sv_SE);

var _sv_SE3 = require('../../time-picker/locale/sv_SE');

var _sv_SE4 = _interopRequireDefault(_sv_SE3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Välj datum',
        rangePlaceholder: ['Startdatum', 'Slutdatum']
    }, _sv_SE2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _sv_SE4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];