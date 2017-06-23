import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Upload from './Upload';

var Dragger = function (_React$Component) {
    _inherits(Dragger, _React$Component);

    function Dragger() {
        _classCallCheck(this, Dragger);

        return _possibleConstructorReturn(this, (Dragger.__proto__ || Object.getPrototypeOf(Dragger)).apply(this, arguments));
    }

    _createClass(Dragger, [{
        key: 'render',
        value: function render() {
            var props = this.props;

            return React.createElement(Upload, _extends({}, props, { type: 'drag', style: Object.assign({}, props.style, { height: props.height }) }));
        }
    }]);

    return Dragger;
}(React.Component);

export default Dragger;