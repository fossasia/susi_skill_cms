'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _PureRenderMixin = require('rc-util/lib/PureRenderMixin');

var _PureRenderMixin2 = _interopRequireDefault(_PureRenderMixin);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _reactLazyLoad = require('react-lazy-load');

var _reactLazyLoad2 = _interopRequireDefault(_reactLazyLoad);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Item = function (_React$Component) {
    (0, _inherits3['default'])(Item, _React$Component);

    function Item() {
        (0, _classCallCheck3['default'])(this, Item);
        return (0, _possibleConstructorReturn3['default'])(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Item, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _PureRenderMixin2['default'].shouldComponentUpdate.apply(this, args);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                renderedText = _props.renderedText,
                renderedEl = _props.renderedEl,
                item = _props.item,
                lazy = _props.lazy,
                checked = _props.checked,
                prefixCls = _props.prefixCls,
                onClick = _props.onClick;

            var className = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-content-item', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-content-item-disabled', item.disabled), _classNames));
            var listItem = _react2['default'].createElement(
                'li',
                { className: className, title: renderedText, onClick: item.disabled ? undefined : function () {
                        return onClick(item);
                    } },
                _react2['default'].createElement(_checkbox2['default'], { checked: checked, disabled: item.disabled }),
                _react2['default'].createElement(
                    'span',
                    null,
                    renderedEl
                )
            );
            var children = null;
            if (lazy) {
                var lazyProps = (0, _objectAssign2['default'])({
                    height: 32,
                    offset: 500,
                    throttle: 0,
                    debounce: false
                }, lazy);
                children = _react2['default'].createElement(
                    _reactLazyLoad2['default'],
                    lazyProps,
                    listItem
                );
            } else {
                children = listItem;
            }
            return children;
        }
    }]);
    return Item;
}(_react2['default'].Component);

exports['default'] = Item;
module.exports = exports['default'];