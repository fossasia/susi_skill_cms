import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from './list';
import Operation from './operation';
import Search from './search';
import injectLocale from '../locale-provider/injectLocale';
function noop() {}

var Transfer = function (_React$Component) {
    _inherits(Transfer, _React$Component);

    function Transfer(props) {
        _classCallCheck(this, Transfer);

        var _this = _possibleConstructorReturn(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props));

        _this.moveTo = function (direction) {
            var _this$props = _this.props,
                _this$props$targetKey = _this$props.targetKeys,
                targetKeys = _this$props$targetKey === undefined ? [] : _this$props$targetKey,
                _this$props$dataSourc = _this$props.dataSource,
                dataSource = _this$props$dataSourc === undefined ? [] : _this$props$dataSourc,
                onChange = _this$props.onChange;
            var _this$state = _this.state,
                sourceSelectedKeys = _this$state.sourceSelectedKeys,
                targetSelectedKeys = _this$state.targetSelectedKeys;

            var moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
            // filter the disabled options
            var newMoveKeys = moveKeys.filter(function (key) {
                return !dataSource.some(function (data) {
                    return !!(key === data.key && data.disabled);
                });
            });
            // move items to target box
            var newTargetKeys = direction === 'right' ? newMoveKeys.concat(targetKeys) : targetKeys.filter(function (targetKey) {
                return newMoveKeys.indexOf(targetKey) === -1;
            });
            // empty checked keys
            var oppositeDirection = direction === 'right' ? 'left' : 'right';
            _this.setState(_defineProperty({}, _this.getSelectedKeysName(oppositeDirection), []));
            _this.handleSelectChange(oppositeDirection, []);
            if (onChange) {
                onChange(newTargetKeys, direction, newMoveKeys);
            }
        };
        _this.moveToLeft = function () {
            return _this.moveTo('left');
        };
        _this.moveToRight = function () {
            return _this.moveTo('right');
        };
        _this.handleSelectAll = function (direction, filteredDataSource, checkAll) {
            var originalSelectedKeys = _this.state[_this.getSelectedKeysName(direction)] || [];
            var currentKeys = filteredDataSource.map(function (item) {
                return item.key;
            });
            // Only operate current keys from original selected keys
            var newKeys1 = originalSelectedKeys.filter(function (key) {
                return currentKeys.indexOf(key) === -1;
            });
            var newKeys2 = [].concat(_toConsumableArray(originalSelectedKeys));
            currentKeys.forEach(function (key) {
                if (newKeys2.indexOf(key) === -1) {
                    newKeys2.push(key);
                }
            });
            var holder = checkAll ? newKeys1 : newKeys2;
            _this.handleSelectChange(direction, holder);
            if (!_this.props.selectedKeys) {
                _this.setState(_defineProperty({}, _this.getSelectedKeysName(direction), holder));
            }
        };
        _this.handleLeftSelectAll = function (filteredDataSource, checkAll) {
            return _this.handleSelectAll('left', filteredDataSource, checkAll);
        };
        _this.handleRightSelectAll = function (filteredDataSource, checkAll) {
            return _this.handleSelectAll('right', filteredDataSource, checkAll);
        };
        _this.handleFilter = function (direction, e) {
            _this.setState(_defineProperty({}, direction + 'Filter', e.target.value));
            if (_this.props.onSearchChange) {
                _this.props.onSearchChange(direction, e);
            }
        };
        _this.handleLeftFilter = function (e) {
            return _this.handleFilter('left', e);
        };
        _this.handleRightFilter = function (e) {
            return _this.handleFilter('right', e);
        };
        _this.handleClear = function (direction) {
            _this.setState(_defineProperty({}, direction + 'Filter', ''));
        };
        _this.handleLeftClear = function () {
            return _this.handleClear('left');
        };
        _this.handleRightClear = function () {
            return _this.handleClear('right');
        };
        _this.handleSelect = function (direction, selectedItem, checked) {
            var _this$state2 = _this.state,
                sourceSelectedKeys = _this$state2.sourceSelectedKeys,
                targetSelectedKeys = _this$state2.targetSelectedKeys;

            var holder = direction === 'left' ? [].concat(_toConsumableArray(sourceSelectedKeys)) : [].concat(_toConsumableArray(targetSelectedKeys));
            var index = holder.indexOf(selectedItem.key);
            if (index > -1) {
                holder.splice(index, 1);
            }
            if (checked) {
                holder.push(selectedItem.key);
            }
            _this.handleSelectChange(direction, holder);
            if (!_this.props.selectedKeys) {
                _this.setState(_defineProperty({}, _this.getSelectedKeysName(direction), holder));
            }
        };
        _this.handleLeftSelect = function (selectedItem, checked) {
            return _this.handleSelect('left', selectedItem, checked);
        };
        _this.handleRightSelect = function (selectedItem, checked) {
            return _this.handleSelect('right', selectedItem, checked);
        };
        _this.handleScroll = function (direction, e) {
            var onScroll = _this.props.onScroll;

            if (onScroll) {
                onScroll(direction, e);
            }
        };
        _this.handleLeftScroll = function (e) {
            return _this.handleScroll('left', e);
        };
        _this.handleRightScroll = function (e) {
            return _this.handleScroll('right', e);
        };
        var _props$selectedKeys = props.selectedKeys,
            selectedKeys = _props$selectedKeys === undefined ? [] : _props$selectedKeys,
            _props$targetKeys = props.targetKeys,
            targetKeys = _props$targetKeys === undefined ? [] : _props$targetKeys;

        _this.state = {
            leftFilter: '',
            rightFilter: '',
            sourceSelectedKeys: selectedKeys.filter(function (key) {
                return targetKeys.indexOf(key) === -1;
            }),
            targetSelectedKeys: selectedKeys.filter(function (key) {
                return targetKeys.indexOf(key) > -1;
            })
        };
        return _this;
    }

    _createClass(Transfer, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _state = this.state,
                sourceSelectedKeys = _state.sourceSelectedKeys,
                targetSelectedKeys = _state.targetSelectedKeys;

            if (nextProps.targetKeys !== this.props.targetKeys || nextProps.dataSource !== this.props.dataSource) {
                // clear cached splited dataSource
                this.splitedDataSource = null;
                if (!nextProps.selectedKeys) {
                    // clear key nolonger existed
                    // clear checkedKeys according to targetKeys
                    var dataSource = nextProps.dataSource,
                        _nextProps$targetKeys = nextProps.targetKeys,
                        targetKeys = _nextProps$targetKeys === undefined ? [] : _nextProps$targetKeys;

                    var newSourceSelectedKeys = [];
                    var newTargetSelectedKeys = [];
                    dataSource.forEach(function (_ref) {
                        var key = _ref.key;

                        if (sourceSelectedKeys.includes(key) && !targetKeys.includes(key)) {
                            newSourceSelectedKeys.push(key);
                        }
                        if (targetSelectedKeys.includes(key) && targetKeys.includes(key)) {
                            newTargetSelectedKeys.push(key);
                        }
                    });
                    this.setState({
                        sourceSelectedKeys: newSourceSelectedKeys,
                        targetSelectedKeys: newTargetSelectedKeys
                    });
                }
            }
            if (nextProps.selectedKeys) {
                var _targetKeys = nextProps.targetKeys;
                this.setState({
                    sourceSelectedKeys: nextProps.selectedKeys.filter(function (key) {
                        return !_targetKeys.includes(key);
                    }),
                    targetSelectedKeys: nextProps.selectedKeys.filter(function (key) {
                        return _targetKeys.includes(key);
                    })
                });
            }
        }
    }, {
        key: 'splitDataSource',
        value: function splitDataSource(props) {
            if (this.splitedDataSource) {
                return this.splitedDataSource;
            }
            var dataSource = props.dataSource,
                rowKey = props.rowKey,
                _props$targetKeys2 = props.targetKeys,
                targetKeys = _props$targetKeys2 === undefined ? [] : _props$targetKeys2;

            var leftDataSource = [];
            var rightDataSource = new Array(targetKeys.length);
            dataSource.forEach(function (record) {
                if (rowKey) {
                    record.key = rowKey(record);
                }
                // rightDataSource should be ordered by targetKeys
                // leftDataSource should be ordered by dataSource
                var indexOfKey = targetKeys.indexOf(record.key);
                if (indexOfKey !== -1) {
                    rightDataSource[indexOfKey] = record;
                } else {
                    leftDataSource.push(record);
                }
            });
            this.splitedDataSource = {
                leftDataSource: leftDataSource,
                rightDataSource: rightDataSource
            };
            return this.splitedDataSource;
        }
    }, {
        key: 'handleSelectChange',
        value: function handleSelectChange(direction, holder) {
            var _state2 = this.state,
                sourceSelectedKeys = _state2.sourceSelectedKeys,
                targetSelectedKeys = _state2.targetSelectedKeys;

            var onSelectChange = this.props.onSelectChange;
            if (!onSelectChange) {
                return;
            }
            if (direction === 'left') {
                onSelectChange(holder, targetSelectedKeys);
            } else {
                onSelectChange(sourceSelectedKeys, holder);
            }
        }
    }, {
        key: 'getTitles',
        value: function getTitles() {
            var props = this.props;

            if (props.titles) {
                return props.titles;
            }
            var transferLocale = this.getLocale();
            return transferLocale.titles;
        }
    }, {
        key: 'getSelectedKeysName',
        value: function getSelectedKeysName(direction) {
            return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
        }
    }, {
        key: 'render',
        value: function render() {
            var locale = this.getLocale();
            var _props = this.props,
                _props$prefixCls = _props.prefixCls,
                prefixCls = _props$prefixCls === undefined ? 'ant-transfer' : _props$prefixCls,
                className = _props.className,
                _props$operations = _props.operations,
                operations = _props$operations === undefined ? [] : _props$operations,
                showSearch = _props.showSearch,
                _props$notFoundConten = _props.notFoundContent,
                notFoundContent = _props$notFoundConten === undefined ? locale.notFoundContent : _props$notFoundConten,
                _props$searchPlacehol = _props.searchPlaceholder,
                searchPlaceholder = _props$searchPlacehol === undefined ? locale.searchPlaceholder : _props$searchPlacehol,
                body = _props.body,
                footer = _props.footer,
                listStyle = _props.listStyle,
                filterOption = _props.filterOption,
                render = _props.render,
                lazy = _props.lazy;
            var _state3 = this.state,
                leftFilter = _state3.leftFilter,
                rightFilter = _state3.rightFilter,
                sourceSelectedKeys = _state3.sourceSelectedKeys,
                targetSelectedKeys = _state3.targetSelectedKeys;

            var _splitDataSource = this.splitDataSource(this.props),
                leftDataSource = _splitDataSource.leftDataSource,
                rightDataSource = _splitDataSource.rightDataSource;

            var leftActive = targetSelectedKeys.length > 0;
            var rightActive = sourceSelectedKeys.length > 0;
            var cls = classNames(className, prefixCls);
            var titles = this.getTitles();
            return React.createElement(
                'div',
                { className: cls },
                React.createElement(List, { prefixCls: prefixCls + '-list', titleText: titles[0], dataSource: leftDataSource, filter: leftFilter, filterOption: filterOption, style: listStyle, checkedKeys: sourceSelectedKeys, handleFilter: this.handleLeftFilter, handleClear: this.handleLeftClear, handleSelect: this.handleLeftSelect, handleSelectAll: this.handleLeftSelectAll, render: render, showSearch: showSearch, searchPlaceholder: searchPlaceholder, notFoundContent: notFoundContent, itemUnit: locale.itemUnit, itemsUnit: locale.itemsUnit, body: body, footer: footer, lazy: lazy, onScroll: this.handleLeftScroll }),
                React.createElement(Operation, { className: prefixCls + '-operation', rightActive: rightActive, rightArrowText: operations[0], moveToRight: this.moveToRight, leftActive: leftActive, leftArrowText: operations[1], moveToLeft: this.moveToLeft }),
                React.createElement(List, { prefixCls: prefixCls + '-list', titleText: titles[1], dataSource: rightDataSource, filter: rightFilter, filterOption: filterOption, style: listStyle, checkedKeys: targetSelectedKeys, handleFilter: this.handleRightFilter, handleClear: this.handleRightClear, handleSelect: this.handleRightSelect, handleSelectAll: this.handleRightSelectAll, render: render, showSearch: showSearch, searchPlaceholder: searchPlaceholder, notFoundContent: notFoundContent, itemUnit: locale.itemUnit, itemsUnit: locale.itemsUnit, body: body, footer: footer, lazy: lazy, onScroll: this.handleRightScroll })
            );
        }
    }]);

    return Transfer;
}(React.Component);
// For high-level customized Transfer @dqaria


Transfer.List = List;
Transfer.Operation = Operation;
Transfer.Search = Search;
Transfer.defaultProps = {
    dataSource: [],
    render: noop,
    showSearch: false
};
Transfer.propTypes = {
    prefixCls: PropTypes.string,
    dataSource: PropTypes.array,
    render: PropTypes.func,
    targetKeys: PropTypes.array,
    onChange: PropTypes.func,
    height: PropTypes.number,
    listStyle: PropTypes.object,
    className: PropTypes.string,
    titles: PropTypes.array,
    operations: PropTypes.array,
    showSearch: PropTypes.bool,
    filterOption: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    notFoundContent: PropTypes.node,
    body: PropTypes.func,
    footer: PropTypes.func,
    rowKey: PropTypes.func,
    lazy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};
var injectTransferLocale = injectLocale('Transfer', {
    titles: ['', ''],
    searchPlaceholder: 'Search',
    notFoundContent: 'Not Found'
});
export default injectTransferLocale(Transfer);