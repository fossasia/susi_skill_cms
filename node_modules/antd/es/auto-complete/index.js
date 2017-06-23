import _typeof from 'babel-runtime/helpers/typeof';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import Select from '../select';
import Input from '../input';
import InputElement from './InputElement';
function isSelectOptionOrSelectOptGroup(child) {
    return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

var AutoComplete = function (_React$Component) {
    _inherits(AutoComplete, _React$Component);

    function AutoComplete() {
        _classCallCheck(this, AutoComplete);

        var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).apply(this, arguments));

        _this.getInputElement = function () {
            var children = _this.props.children;

            var element = children && React.isValidElement(children) && children.type !== Option ? React.Children.only(_this.props.children) : React.createElement(Input, null);
            return React.createElement(
                InputElement,
                _extends({}, element.props, { className: classNames('ant-input', element.props.className) }),
                element
            );
        };
        return _this;
    }

    _createClass(AutoComplete, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                size = _props.size,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                notFoundContent = _props.notFoundContent,
                prefixCls = _props.prefixCls,
                optionLabelProp = _props.optionLabelProp,
                dataSource = _props.dataSource,
                children = _props.children;

            var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-show-search', true), _defineProperty(_classNames, prefixCls + '-auto-complete', true), _classNames));
            var options = void 0;
            var childArray = React.Children.toArray(children);
            if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
                options = children;
            } else {
                options = dataSource ? dataSource.map(function (item) {
                    if (React.isValidElement(item)) {
                        return item;
                    }
                    switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
                        case 'string':
                            return React.createElement(
                                Option,
                                { key: item },
                                item
                            );
                        case 'object':
                            return React.createElement(
                                Option,
                                { key: item.value },
                                item.text
                            );
                        default:
                            throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
                    }
                }) : [];
            }
            return React.createElement(
                Select,
                _extends({}, this.props, { className: cls, mode: 'combobox', optionLabelProp: optionLabelProp, getInputElement: this.getInputElement, notFoundContent: notFoundContent }),
                options
            );
        }
    }]);

    return AutoComplete;
}(React.Component);

export default AutoComplete;

AutoComplete.Option = Option;
AutoComplete.OptGroup = OptGroup;
AutoComplete.defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
    filterOption: false
};