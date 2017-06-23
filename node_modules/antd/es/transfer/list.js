import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Animate from 'rc-animate';
import PureRenderMixin from 'rc-util/es/PureRenderMixin';
import assign from 'object-assign';
import Checkbox from '../checkbox';
import Search from './search';
import Item from './item';
import triggerEvent from '../_util/triggerEvent';
function noop() {}
function isRenderResultPlainObject(result) {
    return result && !React.isValidElement(result) && Object.prototype.toString.call(result) === '[object Object]';
}

var TransferList = function (_React$Component) {
    _inherits(TransferList, _React$Component);

    function TransferList(props) {
        _classCallCheck(this, TransferList);

        var _this = _possibleConstructorReturn(this, (TransferList.__proto__ || Object.getPrototypeOf(TransferList)).call(this, props));

        _this.handleSelect = function (selectedItem) {
            var checkedKeys = _this.props.checkedKeys;

            var result = checkedKeys.some(function (key) {
                return key === selectedItem.key;
            });
            _this.props.handleSelect(selectedItem, !result);
        };
        _this.handleFilter = function (e) {
            _this.props.handleFilter(e);
            if (!e.target.value) {
                return;
            }
            // Manually trigger scroll event for lazy search bug
            // https://github.com/ant-design/ant-design/issues/5631
            _this.triggerScrollTimer = setTimeout(function () {
                var listNode = findDOMNode(_this).querySelectorAll('.ant-transfer-list-content')[0];
                if (listNode) {
                    triggerEvent(listNode, 'scroll');
                }
            }, 0);
        };
        _this.handleClear = function () {
            _this.props.handleClear();
        };
        _this.matchFilter = function (text, item) {
            var _this$props = _this.props,
                filter = _this$props.filter,
                filterOption = _this$props.filterOption;

            if (filterOption) {
                return filterOption(filter, item);
            }
            return text.indexOf(filter) >= 0;
        };
        _this.renderItem = function (item) {
            var _this$props$render = _this.props.render,
                render = _this$props$render === undefined ? noop : _this$props$render;

            var renderResult = render(item);
            var isRenderResultPlain = isRenderResultPlainObject(renderResult);
            return {
                renderedText: isRenderResultPlain ? renderResult.value : renderResult,
                renderedEl: isRenderResultPlain ? renderResult.label : renderResult
            };
        };
        _this.state = {
            mounted: false
        };
        return _this;
    }

    _createClass(TransferList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.timer = setTimeout(function () {
                _this2.setState({
                    mounted: true
                });
            }, 0);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timer);
            clearTimeout(this.triggerScrollTimer);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return PureRenderMixin.shouldComponentUpdate.apply(this, args);
        }
    }, {
        key: 'getCheckStatus',
        value: function getCheckStatus(filteredDataSource) {
            var checkedKeys = this.props.checkedKeys;

            if (checkedKeys.length === 0) {
                return 'none';
            } else if (filteredDataSource.every(function (item) {
                return checkedKeys.indexOf(item.key) >= 0;
            })) {
                return 'all';
            }
            return 'part';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                dataSource = _props.dataSource,
                titleText = _props.titleText,
                checkedKeys = _props.checkedKeys,
                lazy = _props.lazy,
                _props$body = _props.body,
                body = _props$body === undefined ? noop : _props$body,
                _props$footer = _props.footer,
                footer = _props$footer === undefined ? noop : _props$footer,
                showSearch = _props.showSearch,
                style = _props.style,
                filter = _props.filter,
                searchPlaceholder = _props.searchPlaceholder,
                notFoundContent = _props.notFoundContent,
                itemUnit = _props.itemUnit,
                itemsUnit = _props.itemsUnit,
                onScroll = _props.onScroll;
            // Custom Layout

            var footerDom = footer(assign({}, this.props));
            var bodyDom = body(assign({}, this.props));
            var listCls = classNames(prefixCls, _defineProperty({}, prefixCls + '-with-footer', !!footerDom));
            var filteredDataSource = [];
            var totalDataSource = [];
            var showItems = dataSource.map(function (item) {
                var _renderItem = _this3.renderItem(item),
                    renderedText = _renderItem.renderedText,
                    renderedEl = _renderItem.renderedEl;

                if (filter && filter.trim() && !_this3.matchFilter(renderedText, item)) {
                    return null;
                }
                // all show items
                totalDataSource.push(item);
                if (!item.disabled) {
                    // response to checkAll items
                    filteredDataSource.push(item);
                }
                var checked = checkedKeys.indexOf(item.key) >= 0;
                return React.createElement(Item, { key: item.key, item: item, lazy: lazy, renderedText: renderedText, renderedEl: renderedEl, checked: checked, prefixCls: prefixCls, onClick: _this3.handleSelect });
            });
            var unit = dataSource.length > 1 ? itemsUnit : itemUnit;
            var search = showSearch ? React.createElement(
                'div',
                { className: prefixCls + '-body-search-wrapper' },
                React.createElement(Search, { prefixCls: prefixCls + '-search', onChange: this.handleFilter, handleClear: this.handleClear, placeholder: searchPlaceholder, value: filter })
            ) : null;
            var listBody = bodyDom || React.createElement(
                'div',
                { className: showSearch ? prefixCls + '-body ' + prefixCls + '-body-with-search' : prefixCls + '-body' },
                search,
                React.createElement(
                    Animate,
                    { component: 'ul', componentProps: { onScroll: onScroll }, className: prefixCls + '-content', transitionName: this.state.mounted ? prefixCls + '-content-item-highlight' : '', transitionLeave: false },
                    showItems
                ),
                React.createElement(
                    'div',
                    { className: prefixCls + '-body-not-found' },
                    notFoundContent
                )
            );
            var listFooter = footerDom ? React.createElement(
                'div',
                { className: prefixCls + '-footer' },
                footerDom
            ) : null;
            var checkStatus = this.getCheckStatus(filteredDataSource);
            var checkedAll = checkStatus === 'all';
            var checkAllCheckbox = React.createElement(Checkbox, { ref: 'checkbox', checked: checkedAll, indeterminate: checkStatus === 'part', onChange: function onChange() {
                    return _this3.props.handleSelectAll(filteredDataSource, checkedAll);
                } });
            return React.createElement(
                'div',
                { className: listCls, style: style },
                React.createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    checkAllCheckbox,
                    React.createElement(
                        'span',
                        { className: prefixCls + '-header-selected' },
                        React.createElement(
                            'span',
                            null,
                            (checkedKeys.length > 0 ? checkedKeys.length + '/' : '') + totalDataSource.length,
                            ' ',
                            unit
                        ),
                        React.createElement(
                            'span',
                            { className: prefixCls + '-header-title' },
                            titleText
                        )
                    )
                ),
                listBody,
                listFooter
            );
        }
    }]);

    return TransferList;
}(React.Component);

export default TransferList;

TransferList.defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    render: noop,
    lazy: {}
};