'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pt_BR = require('rc-calendar/lib/locale/pt_BR');

var _pt_BR2 = _interopRequireDefault(_pt_BR);

var _pt_BR3 = require('../../time-picker/locale/pt_BR');

var _pt_BR4 = _interopRequireDefault(_pt_BR3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Selecionar data',
        rangePlaceholder: ['Data de início', 'Data de fim']
    }, _pt_BR2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _pt_BR4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
exports['default'] = locale;
module.exports = exports['default'];