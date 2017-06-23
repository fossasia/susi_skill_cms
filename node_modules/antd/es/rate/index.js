import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import RcRate from 'rc-rate';
import Icon from '../icon';

var Rate = function (_React$Component) {
    _inherits(Rate, _React$Component);

    function Rate() {
        _classCallCheck(this, Rate);

        return _possibleConstructorReturn(this, (Rate.__proto__ || Object.getPrototypeOf(Rate)).apply(this, arguments));
    }

    _createClass(Rate, [{
        key: 'render',
        value: function render() {
            return React.createElement(RcRate, this.props);
        }
    }]);

    return Rate;
}(React.Component);

export default Rate;

Rate.propTypes = {
    prefixCls: PropTypes.string,
    character: PropTypes.node
};
Rate.defaultProps = {
    prefixCls: 'ant-rate',
    character: React.createElement(Icon, { type: 'star' })
};