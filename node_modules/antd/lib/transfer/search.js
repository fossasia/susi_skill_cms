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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Search = function (_React$Component) {
    (0, _inherits3['default'])(Search, _React$Component);

    function Search() {
        (0, _classCallCheck3['default'])(this, Search);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));

        _this.handleChange = function (e) {
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(e);
            }
        };
        _this.handleClear = function (e) {
            e.preventDefault();
            var handleClear = _this.props.handleClear;
            if (handleClear) {
                handleClear(e);
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(Search, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                placeholder = _props.placeholder,
                value = _props.value,
                prefixCls = _props.prefixCls;

            var icon = value && value.length > 0 ? _react2['default'].createElement(
                'a',
                { href: '#', className: prefixCls + '-action', onClick: this.handleClear },
                _react2['default'].createElement(_icon2['default'], { type: 'cross-circle' })
            ) : _react2['default'].createElement(
                'span',
                { className: prefixCls + '-action' },
                _react2['default'].createElement(_icon2['default'], { type: 'search' })
            );
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(_input2['default'], { placeholder: placeholder, className: prefixCls, value: value, ref: 'input', onChange: this.handleChange }),
                icon
            );
        }
    }]);
    return Search;
}(_react2['default'].Component);

exports['default'] = Search;

Search.defaultProps = {
    placeholder: ''
};
module.exports = exports['default'];