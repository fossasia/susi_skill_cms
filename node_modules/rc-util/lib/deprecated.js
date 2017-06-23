'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = deprecated;
function deprecated(props, instead, component) {
  if (typeof window !== 'undefined' && window.console && window.console.error) {
    window.console.error('Warning: ' + props + ' is deprecated at [ ' + component + ' ], ' + ('use [ ' + instead + ' ] instead of it.'));
  }
}
module.exports = exports['default'];