'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AntTreeNode = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcTree = require('rc-tree');

var _rcTree2 = _interopRequireDefault(_rcTree);

var _openAnimation = require('../_util/openAnimation');

var _openAnimation2 = _interopRequireDefault(_openAnimation);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AntTreeNode = exports.AntTreeNode = function (_React$Component) {
    (0, _inherits3['default'])(AntTreeNode, _React$Component);

    function AntTreeNode() {
        (0, _classCallCheck3['default'])(this, AntTreeNode);
        return (0, _possibleConstructorReturn3['default'])(this, (AntTreeNode.__proto__ || Object.getPrototypeOf(AntTreeNode)).apply(this, arguments));
    }

    (0, _createClass3['default'])(AntTreeNode, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(AntTreeNode, this.props);
        }
    }]);
    return AntTreeNode;
}(_react2['default'].Component);

var Tree = function (_React$Component2) {
    (0, _inherits3['default'])(Tree, _React$Component2);

    function Tree() {
        (0, _classCallCheck3['default'])(this, Tree);
        return (0, _possibleConstructorReturn3['default'])(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Tree, [{
        key: 'render',
        value: function render() {
            var props = this.props;
            var prefixCls = props.prefixCls,
                className = props.className,
                showLine = props.showLine;

            var checkable = props.checkable;
            var classString = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-show-line', !!showLine), className);
            return _react2['default'].createElement(
                _rcTree2['default'],
                (0, _extends3['default'])({}, props, { className: classString, checkable: checkable ? _react2['default'].createElement('span', { className: prefixCls + '-checkbox-inner' }) : checkable }),
                this.props.children
            );
        }
    }]);
    return Tree;
}(_react2['default'].Component);

exports['default'] = Tree;

Tree.TreeNode = _rcTree.TreeNode;
Tree.defaultProps = {
    prefixCls: 'ant-tree',
    checkable: false,
    showIcon: false,
    openAnimation: _openAnimation2['default']
};