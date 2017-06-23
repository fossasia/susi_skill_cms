'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Modal2['default'].info = function (props) {
    var config = (0, _objectAssign2['default'])({}, {
        type: 'info',
        iconType: 'info-circle',
        okCancel: false
    }, props);
    return (0, _confirm2['default'])(config);
};
_Modal2['default'].success = function (props) {
    var config = (0, _objectAssign2['default'])({}, {
        type: 'success',
        iconType: 'check-circle',
        okCancel: false
    }, props);
    return (0, _confirm2['default'])(config);
};
_Modal2['default'].error = function (props) {
    var config = (0, _objectAssign2['default'])({}, {
        type: 'error',
        iconType: 'cross-circle',
        okCancel: false
    }, props);
    return (0, _confirm2['default'])(config);
};
_Modal2['default'].warning = _Modal2['default'].warn = function (props) {
    var config = (0, _objectAssign2['default'])({}, {
        type: 'warning',
        iconType: 'exclamation-circle',
        okCancel: false
    }, props);
    return (0, _confirm2['default'])(config);
};
_Modal2['default'].confirm = function (props) {
    var config = (0, _objectAssign2['default'])({}, {
        type: 'confirm',
        okCancel: true
    }, props);
    return (0, _confirm2['default'])(config);
};
exports['default'] = _Modal2['default'];
module.exports = exports['default'];