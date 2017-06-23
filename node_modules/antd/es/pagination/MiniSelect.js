import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Select from '../select';

var MiniSelect = function (_React$Component) {
    _inherits(MiniSelect, _React$Component);

    function MiniSelect() {
        _classCallCheck(this, MiniSelect);

        return _possibleConstructorReturn(this, (MiniSelect.__proto__ || Object.getPrototypeOf(MiniSelect)).apply(this, arguments));
    }

    _createClass(MiniSelect, [{
        key: 'render',
        value: function render() {
            return React.createElement(Select, _extends({ size: 'small' }, this.props));
        }
    }]);

    return MiniSelect;
}(React.Component);

export default MiniSelect;

MiniSelect.Option = Select.Option;