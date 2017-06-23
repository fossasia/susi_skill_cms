'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var InputElement = function (_React$Component) {
    (0, _inherits3['default'])(InputElement, _React$Component);

    function InputElement() {
        (0, _classCallCheck3['default'])(this, InputElement);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (InputElement.__proto__ || Object.getPrototypeOf(InputElement)).apply(this, arguments));

        _this.focus = function () {
            _this.ele.focus ? _this.ele.focus() : (0, _reactDom.findDOMNode)(_this.ele).focus();
        };
        _this.blur = function () {
            _this.ele.blur ? _this.ele.blur() : (0, _reactDom.findDOMNode)(_this.ele).blur();
        };
        return _this;
    }

    (0, _createClass3['default'])(InputElement, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2['default'].cloneElement(this.props.children, Object.assign({}, this.props, { ref: function ref(ele) {
                    return _this2.ele = ele;
                } }), null);
        }
    }]);
    return InputElement;
}(_react2['default'].Component);

exports['default'] = InputElement;
module.exports = exports['default'];