'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
    var matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
        return {
            media: mediaQuery,
            matches: false,
            addListener: function addListener() {},
            removeListener: function removeListener() {}
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

var Carousel = function (_React$Component) {
    (0, _inherits3['default'])(Carousel, _React$Component);

    function Carousel() {
        (0, _classCallCheck3['default'])(this, Carousel);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this));

        _this.onWindowResized = function () {
            // Fix https://github.com/ant-design/ant-design/issues/2550
            var slick = _this.refs.slick;
            var autoplay = _this.props.autoplay;

            if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
                slick.innerSlider.autoPlay();
            }
        };
        _this.onWindowResized = (0, _lodash2['default'])(_this.onWindowResized, 500, {
            leading: false
        });
        return _this;
    }

    (0, _createClass3['default'])(Carousel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var autoplay = this.props.autoplay;

            if (autoplay) {
                window.addEventListener('resize', this.onWindowResized);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var autoplay = this.props.autoplay;

            if (autoplay) {
                window.removeEventListener('resize', this.onWindowResized);
                this.onWindowResized.cancel();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var props = (0, _objectAssign2['default'])({}, this.props);
            if (props.effect === 'fade') {
                props.fade = true;
            }
            var className = props.prefixCls;
            if (props.vertical) {
                className = className + ' ' + className + '-vertical';
            }
            return _react2['default'].createElement(
                'div',
                { className: className },
                _react2['default'].createElement(_reactSlick2['default'], (0, _extends3['default'])({ ref: 'slick' }, props))
            );
        }
    }]);
    return Carousel;
}(_react2['default'].Component);

exports['default'] = Carousel;

Carousel.defaultProps = {
    dots: true,
    arrows: false,
    prefixCls: 'ant-carousel',
    draggable: false
};
module.exports = exports['default'];