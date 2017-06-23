import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
import assign from 'object-assign';
import debounce from 'lodash.debounce';
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
import SlickCarousel from 'react-slick';
import React from 'react';

var Carousel = function (_React$Component) {
    _inherits(Carousel, _React$Component);

    function Carousel() {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this));

        _this.onWindowResized = function () {
            // Fix https://github.com/ant-design/ant-design/issues/2550
            var slick = _this.refs.slick;
            var autoplay = _this.props.autoplay;

            if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
                slick.innerSlider.autoPlay();
            }
        };
        _this.onWindowResized = debounce(_this.onWindowResized, 500, {
            leading: false
        });
        return _this;
    }

    _createClass(Carousel, [{
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
            var props = assign({}, this.props);
            if (props.effect === 'fade') {
                props.fade = true;
            }
            var className = props.prefixCls;
            if (props.vertical) {
                className = className + ' ' + className + '-vertical';
            }
            return React.createElement(
                'div',
                { className: className },
                React.createElement(SlickCarousel, _extends({ ref: 'slick' }, props))
            );
        }
    }]);

    return Carousel;
}(React.Component);

export default Carousel;

Carousel.defaultProps = {
    dots: true,
    arrows: false,
    prefixCls: 'ant-carousel',
    draggable: false
};