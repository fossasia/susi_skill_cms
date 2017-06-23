'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeConfirmLocale = changeConfirmLocale;
exports.getConfirmLocale = getConfirmLocale;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var defaultLocale = {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了'
};
var runtimeLocale = (0, _objectAssign2['default'])({}, defaultLocale);
function changeConfirmLocale(newLocale) {
    if (newLocale) {
        runtimeLocale = (0, _objectAssign2['default'])({}, runtimeLocale, newLocale);
    } else {
        runtimeLocale = (0, _objectAssign2['default'])({}, defaultLocale);
    }
}
function getConfirmLocale() {
    return runtimeLocale;
}