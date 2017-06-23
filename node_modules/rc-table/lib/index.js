'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnGroup = exports.Column = undefined;

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

var _ColumnGroup = require('./ColumnGroup');

var _ColumnGroup2 = _interopRequireDefault(_ColumnGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Table2['default'].Column = _Column2['default'];
_Table2['default'].ColumnGroup = _ColumnGroup2['default'];

exports['default'] = _Table2['default'];
exports.Column = _Column2['default'];
exports.ColumnGroup = _ColumnGroup2['default'];