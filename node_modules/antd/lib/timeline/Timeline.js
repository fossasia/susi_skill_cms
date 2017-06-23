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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TimelineItem = require('./TimelineItem');

var _TimelineItem2 = _interopRequireDefault(_TimelineItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Timeline = function (_React$Component) {
    (0, _inherits3['default'])(Timeline, _React$Component);

    function Timeline() {
        (0, _classCallCheck3['default'])(this, Timeline);
        return (0, _possibleConstructorReturn3['default'])(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Timeline, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                prefixCls = _a.prefixCls,
                children = _a.children,
                pending = _a.pending,
                className = _a.className,
                restProps = __rest(_a, ["prefixCls", "children", "pending", "className"]);
            var pendingNode = typeof pending === 'boolean' ? null : pending;
            var classString = (0, _classnames2['default'])(prefixCls, (0, _defineProperty3['default'])({}, prefixCls + '-pending', !!pending), className);
            var items = _react2['default'].Children.map(children, function (ele, idx) {
                return _react2['default'].cloneElement(ele, {
                    last: idx === children.length - 1
                });
            });
            var pendingItem = !!pending ? _react2['default'].createElement(
                _TimelineItem2['default'],
                { pending: !!pending },
                pendingNode
            ) : null;
            return _react2['default'].createElement(
                'ul',
                (0, _extends3['default'])({}, restProps, { className: classString }),
                items,
                pendingItem
            );
        }
    }]);
    return Timeline;
}(_react2['default'].Component);

exports['default'] = Timeline;

Timeline.Item = _TimelineItem2['default'];
Timeline.defaultProps = {
    prefixCls: 'ant-timeline'
};
module.exports = exports['default'];