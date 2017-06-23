import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import RcSteps from 'rc-steps';

var Steps = function (_React$Component) {
    _inherits(Steps, _React$Component);

    function Steps() {
        _classCallCheck(this, Steps);

        return _possibleConstructorReturn(this, (Steps.__proto__ || Object.getPrototypeOf(Steps)).apply(this, arguments));
    }

    _createClass(Steps, [{
        key: 'render',
        value: function render() {
            return React.createElement(RcSteps, this.props);
        }
    }]);

    return Steps;
}(React.Component);

export default Steps;

Steps.Step = RcSteps.Step;
Steps.defaultProps = {
    prefixCls: 'ant-steps',
    iconPrefix: 'ant',
    current: 0
};
Steps.propTypes = {
    prefixCls: PropTypes.string,
    iconPrefix: PropTypes.string,
    current: PropTypes.number
};