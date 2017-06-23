import _extends from "babel-runtime/helpers/extends";
import _defineProperty from "babel-runtime/helpers/defineProperty";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import _typeof from "babel-runtime/helpers/typeof";
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import addEventListener from "rc-util/es/Dom/addEventListener";
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import omit from 'omit.js';
import getScroll from '../_util/getScroll';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';
function getTargetRect(target) {
    return target !== window ? target.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 };
}
function getOffset(element, target) {
    var elemRect = element.getBoundingClientRect();
    var targetRect = getTargetRect(target);
    var scrollTop = getScroll(target, true);
    var scrollLeft = getScroll(target, false);
    var docElem = window.document.body;
    var clientTop = docElem.clientTop || 0;
    var clientLeft = docElem.clientLeft || 0;
    return {
        top: elemRect.top - targetRect.top + scrollTop - clientTop,
        left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
        width: elemRect.width,
        height: elemRect.height
    };
}
function noop() {}
function getDefaultTarget() {
    return typeof window !== 'undefined' ? window : null;
}

var Affix = function (_React$Component) {
    _inherits(Affix, _React$Component);

    function Affix(props) {
        _classCallCheck(this, Affix);

        var _this = _possibleConstructorReturn(this, (Affix.__proto__ || Object.getPrototypeOf(Affix)).call(this, props));

        _this.state = {
            affixStyle: null,
            placeholderStyle: null
        };
        return _this;
    }

    _createClass(Affix, [{
        key: "setAffixStyle",
        value: function setAffixStyle(e, affixStyle) {
            var _this2 = this;

            var _props = this.props,
                _props$onChange = _props.onChange,
                onChange = _props$onChange === undefined ? noop : _props$onChange,
                _props$target = _props.target,
                target = _props$target === undefined ? getDefaultTarget : _props$target;

            var originalAffixStyle = this.state.affixStyle;
            var isWindow = target() === window;
            if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
                return;
            }
            if (shallowequal(affixStyle, originalAffixStyle)) {
                return;
            }
            this.setState({ affixStyle: affixStyle }, function () {
                var affixed = !!_this2.state.affixStyle;
                if (affixStyle && !originalAffixStyle || !affixStyle && originalAffixStyle) {
                    onChange(affixed);
                }
            });
        }
    }, {
        key: "setPlaceholderStyle",
        value: function setPlaceholderStyle(placeholderStyle) {
            var originalPlaceholderStyle = this.state.placeholderStyle;
            if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
                return;
            }
            this.setState({ placeholderStyle: placeholderStyle });
        }
    }, {
        key: "updatePosition",
        value: function updatePosition(e) {
            var _props2 = this.props,
                offsetTop = _props2.offsetTop,
                offsetBottom = _props2.offsetBottom,
                offset = _props2.offset,
                _props2$target = _props2.target,
                target = _props2$target === undefined ? getDefaultTarget : _props2$target;

            var targetNode = target();
            // Backwards support
            offsetTop = offsetTop || offset;
            var scrollTop = getScroll(targetNode, true);
            var affixNode = ReactDOM.findDOMNode(this);
            var elemOffset = getOffset(affixNode, targetNode);
            var elemSize = {
                width: this.refs.fixedNode.offsetWidth,
                height: this.refs.fixedNode.offsetHeight
            };
            var offsetMode = {
                top: false,
                bottom: false
            };
            // Default to `offsetTop=0`.
            if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
                offsetMode.top = true;
                offsetTop = 0;
            } else {
                offsetMode.top = typeof offsetTop === 'number';
                offsetMode.bottom = typeof offsetBottom === 'number';
            }
            var targetRect = getTargetRect(targetNode);
            var targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;
            if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
                // Fixed Top
                var width = elemOffset.width;
                this.setAffixStyle(e, {
                    position: 'fixed',
                    top: targetRect.top + offsetTop,
                    left: targetRect.left + elemOffset.left,
                    width: width
                });
                this.setPlaceholderStyle({
                    width: width,
                    height: affixNode.offsetHeight
                });
            } else if (scrollTop < elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight && offsetMode.bottom) {
                // Fixed Bottom
                var targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
                var _width = elemOffset.width;
                this.setAffixStyle(e, {
                    position: 'fixed',
                    bottom: targetBottomOffet + offsetBottom,
                    left: targetRect.left + elemOffset.left,
                    width: _width
                });
                this.setPlaceholderStyle({
                    width: _width,
                    height: affixNode.offsetHeight
                });
            } else {
                var affixStyle = this.state.affixStyle;

                if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
                    this.setAffixStyle(e, Object.assign({}, affixStyle, { width: affixNode.offsetWidth }));
                } else {
                    this.setAffixStyle(e, null);
                }
                this.setPlaceholderStyle(null);
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            var target = this.props.target || getDefaultTarget;
            // Wait for parent component ref has its value
            this.timeout = setTimeout(function () {
                _this3.setTargetEventListeners(target);
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.target !== nextProps.target) {
                this.clearScrollEventListeners();
                this.setTargetEventListeners(nextProps.target);
                // Mock Event object.
                this.updatePosition({});
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.clearScrollEventListeners();
            clearTimeout(this.timeout);
            this.updatePosition.cancel();
        }
    }, {
        key: "setTargetEventListeners",
        value: function setTargetEventListeners(getTarget) {
            var target = getTarget();
            if (!target) {
                return;
            }
            this.clearScrollEventListeners();
            this.scrollEvent = addEventListener(target, 'scroll', this.updatePosition);
            this.resizeEvent = addEventListener(target, 'resize', this.updatePosition);
        }
    }, {
        key: "clearScrollEventListeners",
        value: function clearScrollEventListeners() {
            var _this4 = this;

            ['scrollEvent', 'resizeEvent'].forEach(function (name) {
                if (_this4[name]) {
                    _this4[name].remove();
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var className = classNames(_defineProperty({}, this.props.prefixCls || 'ant-affix', this.state.affixStyle));
            var props = omit(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);
            var placeholderStyle = Object.assign({}, this.state.placeholderStyle, this.props.style);
            return React.createElement(
                "div",
                _extends({}, props, { style: placeholderStyle }),
                React.createElement(
                    "div",
                    { className: className, ref: "fixedNode", style: this.state.affixStyle },
                    this.props.children
                )
            );
        }
    }]);

    return Affix;
}(React.Component);

export default Affix;

Affix.propTypes = {
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    target: PropTypes.func
};
__decorate([throttleByAnimationFrameDecorator()], Affix.prototype, "updatePosition", null);