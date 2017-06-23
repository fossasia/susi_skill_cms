import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
import React from 'react';
import RcSlider from 'rc-slider/es/Slider';
import RcRange from 'rc-slider/es/Range';
import RcHandle from 'rc-slider/es/Handle';
import Tooltip from '../tooltip';

var Slider = function (_React$Component) {
    _inherits(Slider, _React$Component);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

        _this.toggleTooltipVisible = function (index, visible) {
            _this.setState(function (_ref) {
                var visibles = _ref.visibles;
                return {
                    visibles: Object.assign({}, visibles, _defineProperty({}, index, visible))
                };
            });
        };
        _this.handleWithTooltip = function (_a) {
            var value = _a.value,
                dragging = _a.dragging,
                index = _a.index,
                restProps = __rest(_a, ["value", "dragging", "index"]);

            var _this$props = _this.props,
                tooltipPrefixCls = _this$props.tooltipPrefixCls,
                tipFormatter = _this$props.tipFormatter;
            var visibles = _this.state.visibles;

            return React.createElement(
                Tooltip,
                { prefixCls: tooltipPrefixCls, title: tipFormatter ? tipFormatter(value) : '', visible: tipFormatter && (visibles[index] || dragging), placement: 'top', transitionName: 'zoom-down', key: index },
                React.createElement(RcHandle, _extends({}, restProps, { value: value, onMouseEnter: function onMouseEnter() {
                        return _this.toggleTooltipVisible(index, true);
                    }, onMouseLeave: function onMouseLeave() {
                        return _this.toggleTooltipVisible(index, false);
                    } }))
            );
        };
        _this.state = {
            visibles: {}
        };
        return _this;
    }

    _createClass(Slider, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                range = _a.range,
                restProps = __rest(_a, ["range"]);
            if (range) {
                return React.createElement(RcRange, _extends({}, restProps, { handle: this.handleWithTooltip }));
            }
            return React.createElement(RcSlider, _extends({}, restProps, { handle: this.handleWithTooltip }));
        }
    }]);

    return Slider;
}(React.Component);

export default Slider;

Slider.defaultProps = {
    prefixCls: 'ant-slider',
    tooltipPrefixCls: 'ant-tooltip',
    tipFormatter: function tipFormatter(value) {
        return value.toString();
    }
};