import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import RcMention, { Nav, toString, toEditorState, getMentions } from 'rc-editor-mention';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import Icon from '../icon';

var Mention = function (_React$Component) {
    _inherits(Mention, _React$Component);

    function Mention(props) {
        _classCallCheck(this, Mention);

        var _this = _possibleConstructorReturn(this, (Mention.__proto__ || Object.getPrototypeOf(Mention)).call(this, props));

        _this.onSearchChange = function (value, prefix) {
            if (_this.props.onSearchChange) {
                return _this.props.onSearchChange(value, prefix);
            }
            return _this.defaultSearchChange(value);
        };
        _this.onChange = function (editorState) {
            if (_this.props.onChange) {
                _this.props.onChange(editorState);
            }
        };
        _this.onFocus = function (ev) {
            _this.setState({
                focus: true
            });
            if (_this.props.onFocus) {
                _this.props.onFocus(ev);
            }
        };
        _this.onBlur = function (ev) {
            _this.setState({
                focus: false
            });
            if (_this.props.onBlur) {
                _this.props.onBlur(ev);
            }
        };
        _this.state = {
            suggestions: props.suggestions,
            focus: false
        };
        return _this;
    }

    _createClass(Mention, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var suggestions = nextProps.suggestions;

            if (!shallowequal(suggestions, this.props.suggestions)) {
                this.setState({
                    suggestions: suggestions
                });
            }
        }
    }, {
        key: 'defaultSearchChange',
        value: function defaultSearchChange(value) {
            var searchValue = value.toLowerCase();
            var filteredSuggestions = (this.props.suggestions || []).filter(function (suggestion) {
                return suggestion.toLowerCase().indexOf(searchValue) !== -1;
            });
            this.setState({
                suggestions: filteredSuggestions
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                prefixCls = _props.prefixCls,
                loading = _props.loading;
            var _state = this.state,
                suggestions = _state.suggestions,
                focus = _state.focus;

            var cls = classNames(className, _defineProperty({}, prefixCls + '-active', focus));
            var notFoundContent = loading ? React.createElement(Icon, { type: 'loading' }) : this.props.notFoundContent;
            return React.createElement(RcMention, _extends({}, this.props, { className: cls, onSearchChange: this.onSearchChange, onChange: this.onChange, onFocus: this.onFocus, onBlur: this.onBlur, suggestions: suggestions, notFoundContent: notFoundContent }));
        }
    }]);

    return Mention;
}(React.Component);

export default Mention;

Mention.getMentions = getMentions;
Mention.defaultProps = {
    prefixCls: 'ant-mention',
    notFoundContent: '无匹配结果，轻敲空格完成输入',
    loading: false,
    multiLines: false
};
Mention.Nav = Nav;
Mention.toString = toString;
Mention.toContentState = toEditorState;
Mention.toEditorState = function (text) {
    console.warn('Mention.toEditorState is deprecated. Use toContentState instead.');
    return toEditorState(text);
};