import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import assign from 'object-assign';
import Tooltip from '../tooltip';
import warning from '../_util/warning';

var Popover = function (_React$Component) {
    _inherits(Popover, _React$Component);

    function Popover() {
        _classCallCheck(this, Popover);

        return _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).apply(this, arguments));
    }

    _createClass(Popover, [{
        key: 'getPopupDomNode',
        value: function getPopupDomNode() {
            return this.refs.tooltip.getPopupDomNode();
        }
    }, {
        key: 'getOverlay',
        value: function getOverlay() {
            var _props = this.props,
                title = _props.title,
                prefixCls = _props.prefixCls,
                content = _props.content;

            warning(!('overlay' in this.props), 'Popover[overlay] is removed, please use Popover[content] instead, ' + 'see: http://u.ant.design/popover-content');
            return React.createElement(
                'div',
                null,
                title && React.createElement(
                    'div',
                    { className: prefixCls + '-title' },
                    title
                ),
                React.createElement(
                    'div',
                    { className: prefixCls + '-inner-content' },
                    content
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var props = assign({}, this.props);
            delete props.title;
            return React.createElement(Tooltip, _extends({}, props, { ref: 'tooltip', overlay: this.getOverlay() }));
        }
    }]);

    return Popover;
}(React.Component);

export default Popover;

Popover.defaultProps = {
    prefixCls: 'ant-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {}
};