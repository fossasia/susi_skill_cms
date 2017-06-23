import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _createClass from 'babel-runtime/helpers/createClass';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
export var CollapsePanel = function (_React$Component) {
    _inherits(CollapsePanel, _React$Component);

    function CollapsePanel() {
        _classCallCheck(this, CollapsePanel);

        return _possibleConstructorReturn(this, (CollapsePanel.__proto__ || Object.getPrototypeOf(CollapsePanel)).apply(this, arguments));
    }

    return CollapsePanel;
}(React.Component);

var Collapse = function (_React$Component2) {
    _inherits(Collapse, _React$Component2);

    function Collapse() {
        _classCallCheck(this, Collapse);

        return _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).apply(this, arguments));
    }

    _createClass(Collapse, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                bordered = _props.bordered;

            var collapseClassName = classNames(_defineProperty({}, prefixCls + '-borderless', !bordered), className);
            return React.createElement(RcCollapse, _extends({}, this.props, { className: collapseClassName }));
        }
    }]);

    return Collapse;
}(React.Component);

export default Collapse;

Collapse.Panel = RcCollapse.Panel;
Collapse.defaultProps = {
    prefixCls: 'ant-collapse',
    bordered: true,
    openAnimation: Object.assign({}, animation, {
        appear: function appear() {}
    })
};