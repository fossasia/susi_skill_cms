import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Animate from 'rc-animate';
import addEventListener from 'rc-util/es/Dom/addEventListener';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';
import getScroll from '../_util/getScroll';
import getRequestAnimationFrame from '../_util/getRequestAnimationFrame';
var reqAnimFrame = getRequestAnimationFrame();
var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
    var cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return cc / 2 * t * t * t + b;
    } else {
        return cc / 2 * ((t -= 2) * t * t + 2) + b;
    }
};
function noop() {}
function getDefaultTarget() {
    return typeof window !== 'undefined' ? window : null;
}

var BackTop = function (_React$Component) {
    _inherits(BackTop, _React$Component);

    function BackTop(props) {
        _classCallCheck(this, BackTop);

        var _this = _possibleConstructorReturn(this, (BackTop.__proto__ || Object.getPrototypeOf(BackTop)).call(this, props));

        _this.getCurrentScrollTop = function () {
            var targetNode = (_this.props.target || getDefaultTarget)();
            if (targetNode === window) {
                return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            }
            return targetNode.scrollTop;
        };
        _this.scrollToTop = function (e) {
            var scrollTop = _this.getCurrentScrollTop();
            var startTime = Date.now();
            var frameFunc = function frameFunc() {
                var timestamp = Date.now();
                var time = timestamp - startTime;
                _this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
                if (time < 450) {
                    reqAnimFrame(frameFunc);
                }
            };
            reqAnimFrame(frameFunc);
            (_this.props.onClick || noop)(e);
        };
        _this.handleScroll = function () {
            var _this$props = _this.props,
                visibilityHeight = _this$props.visibilityHeight,
                _this$props$target = _this$props.target,
                target = _this$props$target === undefined ? getDefaultTarget : _this$props$target;

            var scrollTop = getScroll(target(), true);
            _this.setState({
                visible: scrollTop > visibilityHeight
            });
        };
        _this.state = {
            visible: false
        };
        return _this;
    }

    _createClass(BackTop, [{
        key: 'setScrollTop',
        value: function setScrollTop(value) {
            var targetNode = (this.props.target || getDefaultTarget)();
            if (targetNode === window) {
                document.body.scrollTop = value;
                document.documentElement.scrollTop = value;
            } else {
                targetNode.scrollTop = value;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.handleScroll();
            this.scrollEvent = addEventListener((this.props.target || getDefaultTarget)(), 'scroll', this.handleScroll);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.scrollEvent) {
                this.scrollEvent.remove();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$prefixCls = _props.prefixCls,
                prefixCls = _props$prefixCls === undefined ? 'ant-back-top' : _props$prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                children = _props.children;

            var classString = classNames(prefixCls, className);
            var defaultElement = React.createElement(
                'div',
                { className: prefixCls + '-content' },
                React.createElement(Icon, { className: prefixCls + '-icon', type: 'to-top' })
            );
            // fix https://fb.me/react-unknown-prop
            var divProps = omit(this.props, ['prefixCls', 'className', 'children', 'visibilityHeight']);
            var backTopBtn = this.state.visible ? React.createElement(
                'div',
                _extends({}, divProps, { className: classString, onClick: this.scrollToTop }),
                children || defaultElement
            ) : null;
            return React.createElement(
                Animate,
                { component: '', transitionName: 'fade' },
                backTopBtn
            );
        }
    }]);

    return BackTop;
}(React.Component);

export default BackTop;

BackTop.defaultProps = {
    visibilityHeight: 400
};