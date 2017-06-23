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
import PropTypes from 'prop-types';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import warning from '../_util/warning';
// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };

var Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select() {
        _classCallCheck(this, Select);

        return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
    }

    _createClass(Select, [{
        key: 'getLocale',
        value: function getLocale() {
            var antLocale = this.context.antLocale;

            if (antLocale && antLocale.Select) {
                return antLocale.Select;
            }
            return {
                notFoundContent: '无匹配结果'
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _a = this.props,
                prefixCls = _a.prefixCls,
                _a$className = _a.className,
                className = _a$className === undefined ? '' : _a$className,
                size = _a.size,
                mode = _a.mode,
                multiple = _a.multiple,
                tags = _a.tags,
                combobox = _a.combobox,
                restProps = __rest(_a, ["prefixCls", "className", "size", "mode", "multiple", "tags", "combobox"]);
            warning(!multiple && !tags && !combobox, '`Select[multiple|tags|combobox]` is deprecated, please use `Select[mode]` instead.');
            var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _classNames), className);
            var locale = this.getLocale();
            var _props = this.props,
                _props$notFoundConten = _props.notFoundContent,
                notFoundContent = _props$notFoundConten === undefined ? locale.notFoundContent : _props$notFoundConten,
                optionLabelProp = _props.optionLabelProp;

            var isCombobox = mode === 'combobox' || combobox;
            if (isCombobox) {
                notFoundContent = null;
                // children 带 dom 结构时，无法填入输入框
                optionLabelProp = optionLabelProp || 'value';
            }
            var modeConfig = {
                multiple: mode === 'multiple' || multiple,
                tags: mode === 'tags' || tags,
                combobox: isCombobox
            };
            return React.createElement(RcSelect, _extends({}, restProps, modeConfig, { prefixCls: prefixCls, className: cls, optionLabelProp: optionLabelProp || 'children', notFoundContent: notFoundContent }));
        }
    }]);

    return Select;
}(React.Component);

export default Select;

Select.Option = Option;
Select.OptGroup = OptGroup;
Select.defaultProps = {
    prefixCls: 'ant-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom'
};
Select.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    combobox: PropTypes.bool,
    notFoundContent: PropTypes.any,
    showSearch: PropTypes.bool,
    optionLabelProp: PropTypes.string,
    transitionName: PropTypes.string,
    choiceTransitionName: PropTypes.string
};
Select.contextTypes = {
    antLocale: PropTypes.object
};