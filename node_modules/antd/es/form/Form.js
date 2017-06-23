import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createDOMForm from 'rc-form/es/createDOMForm';
import PureRenderMixin from 'rc-util/es/PureRenderMixin';
import omit from 'omit.js';
import assign from 'object-assign';
import createReactClass from 'create-react-class';
import warning from '../_util/warning';
import FormItem from './FormItem';
import { FIELD_META_PROP } from './constants';

var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        warning(!props.form, 'It is unnecessary to pass `form` to `Form` after antd@1.7.0.');
        return _this;
    }

    _createClass(Form, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return PureRenderMixin.shouldComponentUpdate.apply(this, args);
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            var _props = this.props,
                layout = _props.layout,
                vertical = _props.vertical;

            return {
                vertical: layout === 'vertical' || vertical
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                hideRequiredMark = _props2.hideRequiredMark,
                _props2$className = _props2.className,
                className = _props2$className === undefined ? '' : _props2$className,
                layout = _props2.layout,
                inline = _props2.inline,
                horizontal = _props2.horizontal,
                vertical = _props2.vertical;

            warning(!inline && !horizontal && !vertical, '`Form[inline|horizontal|vertical]` is deprecated, please use `Form[layout]` instead.');
            var formClassName = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-horizontal', !inline && !vertical && layout === 'horizontal' || horizontal), _defineProperty(_classNames, prefixCls + '-vertical', layout === 'vertical' || vertical), _defineProperty(_classNames, prefixCls + '-inline', layout === 'inline' || inline), _defineProperty(_classNames, prefixCls + '-hide-required-mark', hideRequiredMark), _classNames), className);
            var formProps = omit(this.props, ['prefixCls', 'className', 'layout', 'inline', 'horizontal', 'vertical', 'form', 'hideRequiredMark']);
            return React.createElement('form', _extends({}, formProps, { className: formClassName }));
        }
    }]);

    return Form;
}(React.Component);

export default Form;

Form.defaultProps = {
    prefixCls: 'ant-form',
    layout: 'horizontal',
    hideRequiredMark: false,
    onSubmit: function onSubmit(e) {
        e.preventDefault();
    }
};
Form.propTypes = {
    prefixCls: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
    children: PropTypes.any,
    onSubmit: PropTypes.func,
    hideRequiredMark: PropTypes.bool
};
Form.childContextTypes = {
    vertical: PropTypes.bool
};
Form.Item = FormItem;
Form.create = function (options) {
    var formWrapper = createDOMForm(assign({
        fieldNameProp: 'id'
    }, options, {
        fieldMetaProp: FIELD_META_PROP
    }));
    /* eslint-disable react/prefer-es6-class */
    return function (Component) {
        return formWrapper(createReactClass({
            propTypes: {
                form: PropTypes.object.isRequired
            },
            childContextTypes: {
                form: PropTypes.object.isRequired
            },
            getChildContext: function getChildContext() {
                return {
                    form: this.props.form
                };
            },
            componentWillMount: function componentWillMount() {
                this.__getFieldProps = this.props.form.getFieldProps;
            },
            deprecatedGetFieldProps: function deprecatedGetFieldProps(name, option) {
                warning(false, '`getFieldProps` is not recommended, please use `getFieldDecorator` instead, ' + 'see: http://u.ant.design/get-field-decorator');
                return this.__getFieldProps(name, option);
            },
            render: function render() {
                this.props.form.getFieldProps = this.deprecatedGetFieldProps;
                var withRef = {};
                if (options && options.withRef) {
                    withRef.ref = 'formWrappedComponent';
                }
                return React.createElement(Component, _extends({}, this.props, withRef));
            }
        }));
    };
};