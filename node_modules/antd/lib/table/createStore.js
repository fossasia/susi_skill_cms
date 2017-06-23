'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = createStore;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function createStore(initialState) {
    var state = initialState;
    var listeners = [];
    function setState(partial) {
        state = (0, _objectAssign2['default'])({}, state, partial);
        for (var i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }
    function getState() {
        return state;
    }
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            var index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }
    return {
        setState: setState,
        getState: getState,
        subscribe: subscribe
    };
}
module.exports = exports['default'];