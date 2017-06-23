import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Icon from '../icon';
import Input from '../input';

var Search = function (_React$Component) {
    _inherits(Search, _React$Component);

    function Search() {
        _classCallCheck(this, Search);

        var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));

        _this.handleChange = function (e) {
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(e);
            }
        };
        _this.handleClear = function (e) {
            e.preventDefault();
            var handleClear = _this.props.handleClear;
            if (handleClear) {
                handleClear(e);
            }
        };
        return _this;
    }

    _createClass(Search, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                placeholder = _props.placeholder,
                value = _props.value,
                prefixCls = _props.prefixCls;

            var icon = value && value.length > 0 ? React.createElement(
                'a',
                { href: '#', className: prefixCls + '-action', onClick: this.handleClear },
                React.createElement(Icon, { type: 'cross-circle' })
            ) : React.createElement(
                'span',
                { className: prefixCls + '-action' },
                React.createElement(Icon, { type: 'search' })
            );
            return React.createElement(
                'div',
                null,
                React.createElement(Input, { placeholder: placeholder, className: prefixCls, value: value, ref: 'input', onChange: this.handleChange }),
                icon
            );
        }
    }]);

    return Search;
}(React.Component);

export default Search;

Search.defaultProps = {
    placeholder: ''
};