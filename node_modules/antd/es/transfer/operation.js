import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Button from '../button';
import Icon from '../icon';
function noop() {}

var TransferOperation = function (_React$Component) {
    _inherits(TransferOperation, _React$Component);

    function TransferOperation() {
        _classCallCheck(this, TransferOperation);

        return _possibleConstructorReturn(this, (TransferOperation.__proto__ || Object.getPrototypeOf(TransferOperation)).apply(this, arguments));
    }

    _createClass(TransferOperation, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                moveToLeft = _props.moveToLeft,
                moveToRight = _props.moveToRight,
                leftArrowText = _props.leftArrowText,
                rightArrowText = _props.rightArrowText,
                leftActive = _props.leftActive,
                rightActive = _props.rightActive,
                className = _props.className;

            var moveToLeftButton = React.createElement(
                Button,
                { type: 'primary', size: 'small', disabled: !leftActive, onClick: moveToLeft },
                React.createElement(
                    'span',
                    null,
                    React.createElement(Icon, { type: 'left' }),
                    leftArrowText
                )
            );
            var moveToRightButton = React.createElement(
                Button,
                { type: 'primary', size: 'small', disabled: !rightActive, onClick: moveToRight },
                React.createElement(
                    'span',
                    null,
                    rightArrowText,
                    React.createElement(Icon, { type: 'right' })
                )
            );
            return React.createElement(
                'div',
                { className: className },
                moveToLeftButton,
                moveToRightButton
            );
        }
    }]);

    return TransferOperation;
}(React.Component);

export default TransferOperation;

TransferOperation.defaultProps = {
    leftArrowText: '',
    rightArrowText: '',
    moveToLeft: noop,
    moveToRight: noop
};