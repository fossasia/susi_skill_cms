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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcRate = require('rc-rate');

var _rcRate2 = _interopRequireDefault(_rcRate);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Rate = function (_React$Component) {
    (0, _inherits3['default'])(Rate, _React$Component);

    function Rate() {
        (0, _classCallCheck3['default'])(this, Rate);
        return (0, _possibleConstructorReturn3['default'])(this, (Rate.__proto__ || Object.getPrototypeOf(Rate)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Rate, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(_rcRate2['default'], this.props);
        }
    }]);
    return Rate;
}(_react2['default'].Component);

exports['default'] = Rate;

Rate.propTypes = {
    prefixCls: _propTypes2['default'].string,
    character: _propTypes2['default'].node
};
Rate.defaultProps = {
    prefixCls: 'ant-rate',
    character: _react2['default'].createElement(_icon2['default'], { type: 'star' })
};
module.exports = exports['default'];