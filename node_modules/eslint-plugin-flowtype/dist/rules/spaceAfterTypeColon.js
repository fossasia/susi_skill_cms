'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _typeColonSpacing = require('./typeColonSpacing');

var _typeColonSpacing2 = _interopRequireDefault(_typeColonSpacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context) {
  return (0, _typeColonSpacing2.default)('after', context, {
    allowLineBreak: _lodash2.default.get(context, ['options', '1', 'allowLineBreak'], false),
    always: _lodash2.default.get(context, ['options', '0'], 'always') === 'always'
  });
};

module.exports = exports['default'];