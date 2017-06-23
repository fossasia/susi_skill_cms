'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeColonSpacing = require('./typeColonSpacing');

var _typeColonSpacing2 = _interopRequireDefault(_typeColonSpacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context) {
  return (0, _typeColonSpacing2.default)('before', context, {
    always: context.options[0] === 'always'
  });
};

module.exports = exports['default'];