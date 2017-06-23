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

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function noop() {}

var TransferOperation = function (_React$Component) {
    (0, _inherits3['default'])(TransferOperation, _React$Component);

    function TransferOperation() {
        (0, _classCallCheck3['default'])(this, TransferOperation);
        return (0, _possibleConstructorReturn3['default'])(this, (TransferOperation.__proto__ || Object.getPrototypeOf(TransferOperation)).apply(this, arguments));
    }

    (0, _createClass3['default'])(TransferOperation, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                moveToLeft = _props.moveToLeft,
                moveToRight = _props.moveToRight,
                leftArrowText = _props.leftArrowText,
                rightArrowText = _props.rightArrowText,
                leftActive = _props.leftActive,
                rightActive = _props.rightActive,
                className = _props.className;

            var moveToLeftButton = _react2['default'].createElement(
                _button2['default'],
                { type: 'primary', size: 'small', disabled: !leftActive, onClick: moveToLeft },
                _react2['default'].createElement(
                    'span',
                    null,
                    _react2['default'].createElement(_icon2['default'], { type: 'left' }),
                    leftArrowText
                )
            );
            var moveToRightButton = _react2['default'].createElement(
                _button2['default'],
                { type: 'primary', size: 'small', disabled: !rightActive, onClick: moveToRight },
                _react2['default'].createElement(
                    'span',
                    null,
                    rightArrowText,
                    _react2['default'].createElement(_icon2['default'], { type: 'right' })
                )
            );
            return _react2['default'].createElement(
                'div',
                { className: className },
                moveToLeftButton,
                moveToRightButton
            );
        }
    }]);
    return TransferOperation;
}(_react2['default'].Component);

exports['default'] = TransferOperation;

TransferOperation.defaultProps = {
    leftArrowText: '',
    rightArrowText: '',
    moveToLeft: noop,
    moveToRight: noop
};
module.exports = exports['default'];