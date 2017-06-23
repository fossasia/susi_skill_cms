import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { findDOMNode } from 'react-dom';

var InputElement = function (_React$Component) {
    _inherits(InputElement, _React$Component);

    function InputElement() {
        _classCallCheck(this, InputElement);

        var _this = _possibleConstructorReturn(this, (InputElement.__proto__ || Object.getPrototypeOf(InputElement)).apply(this, arguments));

        _this.focus = function () {
            _this.ele.focus ? _this.ele.focus() : findDOMNode(_this.ele).focus();
        };
        _this.blur = function () {
            _this.ele.blur ? _this.ele.blur() : findDOMNode(_this.ele).blur();
        };
        return _this;
    }

    _createClass(InputElement, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.cloneElement(this.props.children, Object.assign({}, this.props, { ref: function ref(ele) {
                    return _this2.ele = ele;
                } }), null);
        }
    }]);

    return InputElement;
}(React.Component);

export default InputElement;