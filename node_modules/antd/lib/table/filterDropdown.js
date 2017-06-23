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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcMenu = require('rc-menu');

var _rcMenu2 = _interopRequireDefault(_rcMenu);

var _domClosest = require('dom-closest');

var _domClosest2 = _interopRequireDefault(_domClosest);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dropdown = require('../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _FilterDropdownMenuWrapper = require('./FilterDropdownMenuWrapper');

var _FilterDropdownMenuWrapper2 = _interopRequireDefault(_FilterDropdownMenuWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FilterMenu = function (_React$Component) {
    (0, _inherits3['default'])(FilterMenu, _React$Component);

    function FilterMenu(props) {
        (0, _classCallCheck3['default'])(this, FilterMenu);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (FilterMenu.__proto__ || Object.getPrototypeOf(FilterMenu)).call(this, props));

        _this.setSelectedKeys = function (_ref) {
            var selectedKeys = _ref.selectedKeys;

            _this.setState({ selectedKeys: selectedKeys });
        };
        _this.handleClearFilters = function () {
            _this.setState({
                selectedKeys: []
            }, _this.handleConfirm);
        };
        _this.handleConfirm = function () {
            _this.setVisible(false);
            _this.confirmFilter();
        };
        _this.onVisibleChange = function (visible) {
            _this.setVisible(visible);
            if (!visible) {
                _this.confirmFilter();
            }
        };
        _this.handleMenuItemClick = function (info) {
            if (info.keyPath.length <= 1) {
                return;
            }
            var keyPathOfSelectedItem = _this.state.keyPathOfSelectedItem;
            if (_this.state.selectedKeys.indexOf(info.key) >= 0) {
                // deselect SubMenu child
                delete keyPathOfSelectedItem[info.key];
            } else {
                // select SubMenu child
                keyPathOfSelectedItem[info.key] = info.keyPath;
            }
            _this.setState({ keyPathOfSelectedItem: keyPathOfSelectedItem });
        };
        _this.renderFilterIcon = function () {
            var _this$props = _this.props,
                column = _this$props.column,
                locale = _this$props.locale,
                prefixCls = _this$props.prefixCls;

            var filterIcon = column.filterIcon;
            var dropdownSelectedClass = _this.props.selectedKeys.length > 0 ? prefixCls + '-selected' : '';
            return filterIcon ? _react2['default'].cloneElement(filterIcon, {
                title: locale.filterTitle,
                className: (0, _classnames2['default'])(filterIcon.className, (0, _defineProperty3['default'])({}, prefixCls + '-icon', true))
            }) : _react2['default'].createElement(_icon2['default'], { title: locale.filterTitle, type: 'filter', className: dropdownSelectedClass });
        };
        var visible = 'filterDropdownVisible' in props.column ? props.column.filterDropdownVisible : false;
        _this.state = {
            selectedKeys: props.selectedKeys,
            keyPathOfSelectedItem: {},
            visible: visible
        };
        return _this;
    }

    (0, _createClass3['default'])(FilterMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var column = this.props.column;

            var rootNode = _reactDom2['default'].findDOMNode(this);
            var filterBelongToScrollBody = !!(0, _domClosest2['default'])(rootNode, '.ant-table-scroll');
            if (filterBelongToScrollBody && column.fixed) {
                // When fixed column have filters, there will be two dropdown menus
                // Filter dropdown menu inside scroll body should never be shown
                // To fix https://github.com/ant-design/ant-design/issues/5010
                this.neverShown = true;
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var column = nextProps.column;

            var newState = {};
            if ('selectedKeys' in nextProps) {
                newState.selectedKeys = nextProps.selectedKeys;
            }
            if ('filterDropdownVisible' in column) {
                newState.visible = column.filterDropdownVisible;
            }
            if (Object.keys(newState).length > 0) {
                this.setState(newState);
            }
        }
    }, {
        key: 'setVisible',
        value: function setVisible(visible) {
            var column = this.props.column;

            if (!('filterDropdownVisible' in column)) {
                this.setState({ visible: visible });
            }
            if (column.onFilterDropdownVisibleChange) {
                column.onFilterDropdownVisibleChange(visible);
            }
        }
    }, {
        key: 'confirmFilter',
        value: function confirmFilter() {
            if (this.state.selectedKeys !== this.props.selectedKeys) {
                this.props.confirmFilter(this.props.column, this.state.selectedKeys);
            }
        }
    }, {
        key: 'renderMenuItem',
        value: function renderMenuItem(item) {
            var column = this.props.column;

            var multiple = 'filterMultiple' in column ? column.filterMultiple : true;
            var input = multiple ? _react2['default'].createElement(_checkbox2['default'], { checked: this.state.selectedKeys.indexOf(item.value.toString()) >= 0 }) : _react2['default'].createElement(_radio2['default'], { checked: this.state.selectedKeys.indexOf(item.value.toString()) >= 0 });
            return _react2['default'].createElement(
                _rcMenu.Item,
                { key: item.value },
                input,
                _react2['default'].createElement(
                    'span',
                    null,
                    item.text
                )
            );
        }
    }, {
        key: 'hasSubMenu',
        value: function hasSubMenu() {
            var _props$column$filters = this.props.column.filters,
                filters = _props$column$filters === undefined ? [] : _props$column$filters;

            return filters.some(function (item) {
                return !!(item.children && item.children.length > 0);
            });
        }
    }, {
        key: 'renderMenus',
        value: function renderMenus(items) {
            var _this2 = this;

            return items.map(function (item) {
                if (item.children && item.children.length > 0) {
                    var keyPathOfSelectedItem = _this2.state.keyPathOfSelectedItem;

                    var containSelected = Object.keys(keyPathOfSelectedItem).some(function (key) {
                        return keyPathOfSelectedItem[key].indexOf(item.value) >= 0;
                    });
                    var subMenuCls = containSelected ? _this2.props.dropdownPrefixCls + '-submenu-contain-selected' : '';
                    return _react2['default'].createElement(
                        _rcMenu.SubMenu,
                        { title: item.text, className: subMenuCls, key: item.value.toString() },
                        _this2.renderMenus(item.children)
                    );
                }
                return _this2.renderMenuItem(item);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                column = _props.column,
                locale = _props.locale,
                prefixCls = _props.prefixCls,
                dropdownPrefixCls = _props.dropdownPrefixCls,
                getPopupContainer = _props.getPopupContainer;
            // default multiple selection in filter dropdown

            var multiple = 'filterMultiple' in column ? column.filterMultiple : true;
            var dropdownMenuClass = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, dropdownPrefixCls + '-menu-without-submenu', !this.hasSubMenu()));
            var menus = column.filterDropdown ? _react2['default'].createElement(
                _FilterDropdownMenuWrapper2['default'],
                null,
                column.filterDropdown
            ) : _react2['default'].createElement(
                _FilterDropdownMenuWrapper2['default'],
                { className: prefixCls + '-dropdown' },
                _react2['default'].createElement(
                    _rcMenu2['default'],
                    { multiple: multiple, onClick: this.handleMenuItemClick, prefixCls: dropdownPrefixCls + '-menu', className: dropdownMenuClass, onSelect: this.setSelectedKeys, onDeselect: this.setSelectedKeys, selectedKeys: this.state.selectedKeys },
                    this.renderMenus(column.filters)
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-dropdown-btns' },
                    _react2['default'].createElement(
                        'a',
                        { className: prefixCls + '-dropdown-link confirm', onClick: this.handleConfirm },
                        locale.filterConfirm
                    ),
                    _react2['default'].createElement(
                        'a',
                        { className: prefixCls + '-dropdown-link clear', onClick: this.handleClearFilters },
                        locale.filterReset
                    )
                )
            );
            return _react2['default'].createElement(
                _dropdown2['default'],
                { trigger: ['click'], overlay: menus, visible: this.neverShown ? false : this.state.visible, onVisibleChange: this.onVisibleChange, getPopupContainer: getPopupContainer },
                this.renderFilterIcon()
            );
        }
    }]);
    return FilterMenu;
}(_react2['default'].Component);

exports['default'] = FilterMenu;

FilterMenu.defaultProps = {
    handleFilter: function handleFilter() {},

    column: {}
};
module.exports = exports['default'];