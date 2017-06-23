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
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';

var InputNumber = function (_React$Component) {
    _inherits(InputNumber, _React$Component);

    function InputNumber() {
        _classCallCheck(this, InputNumber);

        return _possibleConstructorReturn(this, (InputNumber.__proto__ || Object.getPrototypeOf(InputNumber)).apply(this, arguments));
    }

    _createClass(InputNumber, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _a = this.props,
                className = _a.className,
                size = _a.size,
                others = __rest(_a, ["className", "size"]);
            var inputNumberClass = classNames((_classNames = {}, _defineProperty(_classNames, this.props.prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, this.props.prefixCls + '-sm', size === 'small'), _classNames), className);
            return React.createElement(RcInputNumber, _extends({ className: inputNumberClass }, others));
        }
    }]);

    return InputNumber;
}(React.Component);

export default InputNumber;

InputNumber.defaultProps = {
    prefixCls: 'ant-input-number',
    step: 1
};