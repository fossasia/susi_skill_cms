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

var _locale = require('../modal/locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LocaleProvider = function (_React$Component) {
    (0, _inherits3['default'])(LocaleProvider, _React$Component);

    function LocaleProvider() {
        (0, _classCallCheck3['default'])(this, LocaleProvider);
        return (0, _possibleConstructorReturn3['default'])(this, (LocaleProvider.__proto__ || Object.getPrototypeOf(LocaleProvider)).apply(this, arguments));
    }

    (0, _createClass3['default'])(LocaleProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                antLocale: Object.assign({}, this.props.locale, { exist: true })
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.componentDidUpdate();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var locale = this.props.locale;

            (0, _locale.changeConfirmLocale)(locale && locale.Modal);
        }
    }, {
        key: 'componentWillUnMount',
        value: function componentWillUnMount() {
            (0, _locale.changeConfirmLocale)();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].Children.only(this.props.children);
        }
    }]);
    return LocaleProvider;
}(_react2['default'].Component);

exports['default'] = LocaleProvider;

LocaleProvider.propTypes = {
    locale: _propTypes2['default'].object
};
LocaleProvider.childContextTypes = {
    antLocale: _propTypes2['default'].object
};
module.exports = exports['default'];