'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ru_RU = require('rc-calendar/lib/locale/ru_RU');

var _ru_RU2 = _interopRequireDefault(_ru_RU);

var _ru_RU3 = require('../../time-picker/locale/ru_RU');

var _ru_RU4 = _interopRequireDefault(_ru_RU3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var locale = {
    lang: (0, _objectAssign2['default'])({
        placeholder: 'Выберите дату',
        rangePlaceholder: ['Начальная дата', 'Конечная дата']
    }, _ru_RU2['default']),
    timePickerLocale: (0, _objectAssign2['default'])({}, _ru_RU4['default'])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
/**
 * Created by Andrey Gayvoronsky on 13/04/16.
 */
exports['default'] = locale;
module.exports = exports['default'];