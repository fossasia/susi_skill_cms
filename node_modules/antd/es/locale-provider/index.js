import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import { changeConfirmLocale } from '../modal/locale';

var LocaleProvider = function (_React$Component) {
    _inherits(LocaleProvider, _React$Component);

    function LocaleProvider() {
        _classCallCheck(this, LocaleProvider);

        return _possibleConstructorReturn(this, (LocaleProvider.__proto__ || Object.getPrototypeOf(LocaleProvider)).apply(this, arguments));
    }

    _createClass(LocaleProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                antLocale: Object.assign({}, this.props.locale, { exist: true })
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.componentDidUpdate();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var locale = this.props.locale;

            changeConfirmLocale(locale && locale.Modal);
        }
    }, {
        key: 'componentWillUnMount',
        value: function componentWillUnMount() {
            changeConfirmLocale();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.Children.only(this.props.children);
        }
    }]);

    return LocaleProvider;
}(React.Component);

export default LocaleProvider;

LocaleProvider.propTypes = {
    locale: PropTypes.object
};
LocaleProvider.childContextTypes = {
    antLocale: PropTypes.object
};