'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _Slider = require('rc-slider/lib/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Range = require('rc-slider/lib/Range');

var _Range2 = _interopRequireDefault(_Range);

var _Handle = require('rc-slider/lib/Handle');

var _Handle2 = _interopRequireDefault(_Handle);

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Slider = function (_React$Component) {
    (0, _inherits3['default'])(Slider, _React$Component);

    function Slider(props) {
        (0, _classCallCheck3['default'])(this, Slider);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

        _this.toggleTooltipVisible = function (index, visible) {
            _this.setState(function (_ref) {
                var visibles = _ref.visibles;
                return {
                    visibles: Object.assign({}, visibles, (0, _defineProperty3['default'])({}, index, visible))
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

            return _react2['default'].createElement(
                _tooltip2['default'],
                { prefixCls: tooltipPrefixCls, title: tipFormatter ? tipFormatter(value) : '', visible: tipFormatter && (visibles[index] || dragging), placement: 'top', transitionName: 'zoom-down', key: index },
                _react2['default'].createElement(_Handle2['default'], (0, _extends3['default'])({}, restProps, { value: value, onMouseEnter: function onMouseEnter() {
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

    (0, _createClass3['default'])(Slider, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                range = _a.range,
                restProps = __rest(_a, ["range"]);
            if (range) {
                return _react2['default'].createElement(_Range2['default'], (0, _extends3['default'])({}, restProps, { handle: this.handleWithTooltip }));
            }
            return _react2['default'].createElement(_Slider2['default'], (0, _extends3['default'])({}, restProps, { handle: this.handleWithTooltip }));
        }
    }]);
    return Slider;
}(_react2['default'].Component);

exports['default'] = Slider;

Slider.defaultProps = {
    prefixCls: 'ant-slider',
    tooltipPrefixCls: 'ant-tooltip',
    tipFormatter: function tipFormatter(value) {
        return value.toString();
    }
};
module.exports = exports['default'];