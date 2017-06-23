'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CollapsePanel = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcCollapse = require('rc-collapse');

var _rcCollapse2 = _interopRequireDefault(_rcCollapse);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _openAnimation = require('../_util/openAnimation');

var _openAnimation2 = _interopRequireDefault(_openAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CollapsePanel = exports.CollapsePanel = function (_React$Component) {
    (0, _inherits3['default'])(CollapsePanel, _React$Component);

    function CollapsePanel() {
        (0, _classCallCheck3['default'])(this, CollapsePanel);
        return (0, _possibleConstructorReturn3['default'])(this, (CollapsePanel.__proto__ || Object.getPrototypeOf(CollapsePanel)).apply(this, arguments));
    }

    return CollapsePanel;
}(_react2['default'].Component);

var Collapse = function (_React$Component2) {
    (0, _inherits3['default'])(Collapse, _React$Component2);

    function Collapse() {
        (0, _classCallCheck3['default'])(this, Collapse);
        return (0, _possibleConstructorReturn3['default'])(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Collapse, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                bordered = _props.bordered;

            var collapseClassName = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-borderless', !bordered), className);
            return _react2['default'].createElement(_rcCollapse2['default'], (0, _extends3['default'])({}, this.props, { className: collapseClassName }));
        }
    }]);
    return Collapse;
}(_react2['default'].Component);

exports['default'] = Collapse;

Collapse.Panel = _rcCollapse2['default'].Panel;
Collapse.defaultProps = {
    prefixCls: 'ant-collapse',
    bordered: true,
    openAnimation: Object.assign({}, _openAnimation2['default'], {
        appear: function appear() {}
    })
};