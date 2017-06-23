'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transition = exports.animation = undefined;

var _canUseDom = require('./canUseDom');

var _canUseDom2 = _interopRequireDefault(_canUseDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var animationEndEventNames = {
  WebkitAnimation: 'webkitAnimationEnd',
  OAnimation: 'oAnimationEnd',
  animation: 'animationend'
};
var transitionEventNames = {
  WebkitTransition: 'webkitTransitionEnd',
  OTransition: 'oTransitionEnd',
  transition: 'transitionend'
};

function supportEnd(names) {
  var el = document.createElement('div');
  for (var name in names) {
    if (names.hasOwnProperty(name) && el.style[name] !== undefined) {
      return {
        end: names[name]
      };
    }
  }
  return false;
}

var animation = exports.animation = (0, _canUseDom2['default'])() && supportEnd(animationEndEventNames);
var transition = exports.transition = (0, _canUseDom2['default'])() && supportEnd(transitionEventNames);