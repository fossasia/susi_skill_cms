'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CheckboxGroup = function (_React$Component) {
    (0, _inherits3['default'])(CheckboxGroup, _React$Component);

    function CheckboxGroup(props) {
        (0, _classCallCheck3['default'])(this, CheckboxGroup);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

        _this.toggleOption = function (option) {
            var optionIndex = _this.state.value.indexOf(option.value);
            var value = [].concat((0, _toConsumableArray3['default'])(_this.state.value));
            if (optionIndex === -1) {
                value.push(option.value);
            } else {
                value.splice(optionIndex, 1);
            }
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(value);
            }
        };
        _this.state = {
            value: props.value || props.defaultValue || []
        };
        return _this;
    }

    (0, _createClass3['default'])(CheckboxGroup, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                checkboxGroup: {
                    toggleOption: this.toggleOption,
                    value: this.state.value,
                    disabled: this.props.disabled
                }
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value || []
                });
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !(0, _shallowequal2['default'])(this.props, nextProps) || !(0, _shallowequal2['default'])(this.state, nextState);
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            var options = this.props.options;
            // https://github.com/Microsoft/TypeScript/issues/7960

            return options.map(function (option) {
                if (typeof option === 'string') {
                    return {
                        label: option,
                        value: option
                    };
                }
                return option;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var props = this.props,
                state = this.state;
            var prefixCls = props.prefixCls,
                className = props.className,
                options = props.options;

            var children = props.children;
            if (options && options.length > 0) {
                children = this.getOptions().map(function (option) {
                    return _react2['default'].createElement(
                        _Checkbox2['default'],
                        { key: option.value, disabled: 'disabled' in option ? option.disabled : props.disabled, value: option.value, checked: state.value.indexOf(option.value) !== -1, onChange: function onChange() {
                                return _this2.toggleOption(option);
                            }, className: prefixCls + '-item' },
                        option.label
                    );
                });
            }
            var classString = (0, _classnames2['default'])(prefixCls, className);
            return _react2['default'].createElement(
                'div',
                { className: classString },
                children
            );
        }
    }]);
    return CheckboxGroup;
}(_react2['default'].Component);

exports['default'] = CheckboxGroup;

CheckboxGroup.defaultProps = {
    options: [],
    prefixCls: 'ant-checkbox-group'
};
CheckboxGroup.propTypes = {
    defaultValue: _propTypes2['default'].array,
    value: _propTypes2['default'].array,
    options: _propTypes2['default'].array.isRequired,
    onChange: _propTypes2['default'].func
};
CheckboxGroup.childContextTypes = {
    checkboxGroup: _propTypes2['default'].any
};
module.exports = exports['default'];