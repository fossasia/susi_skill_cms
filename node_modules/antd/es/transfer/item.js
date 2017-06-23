import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/es/PureRenderMixin';
import assign from 'object-assign';
import Lazyload from 'react-lazy-load';
import Checkbox from '../checkbox';

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    _createClass(Item, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return PureRenderMixin.shouldComponentUpdate.apply(this, args);
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

            var className = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-content-item', true), _defineProperty(_classNames, prefixCls + '-content-item-disabled', item.disabled), _classNames));
            var listItem = React.createElement(
                'li',
                { className: className, title: renderedText, onClick: item.disabled ? undefined : function () {
                        return onClick(item);
                    } },
                React.createElement(Checkbox, { checked: checked, disabled: item.disabled }),
                React.createElement(
                    'span',
                    null,
                    renderedEl
                )
            );
            var children = null;
            if (lazy) {
                var lazyProps = assign({
                    height: 32,
                    offset: 500,
                    throttle: 0,
                    debounce: false
                }, lazy);
                children = React.createElement(
                    Lazyload,
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
}(React.Component);

export default Item;