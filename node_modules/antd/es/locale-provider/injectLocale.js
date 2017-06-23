import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
export default (function (componentName, defaultLocale) {
    return function (Component) {
        var ComponentWithStatics = Component;
        return _a = function (_Component) {
            _inherits(_a, _Component);

            function _a() {
                _classCallCheck(this, _a);

                return _possibleConstructorReturn(this, (_a.__proto__ || Object.getPrototypeOf(_a)).apply(this, arguments));
            }

            _createClass(_a, [{
                key: 'getLocale',
                value: function getLocale() {
                    var antLocale = this.context.antLocale;

                    var localeFromContext = antLocale && antLocale[componentName];
                    var localeFromProps = this.props.locale || {};
                    return Object.assign({}, defaultLocale, localeFromContext || {}, localeFromProps);
                }
            }]);

            return _a;
        }(Component), _a.propTypes = ComponentWithStatics.propTypes, _a.defaultProps = ComponentWithStatics.defaultProps, _a.contextTypes = Object.assign({}, ComponentWithStatics.context || {}, { antLocale: PropTypes.object }), _a;
        var _a;
    };
});