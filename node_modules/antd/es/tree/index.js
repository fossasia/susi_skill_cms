import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import RcTree, { TreeNode } from 'rc-tree';
import animation from '../_util/openAnimation';
import classNames from 'classnames';
export var AntTreeNode = function (_React$Component) {
    _inherits(AntTreeNode, _React$Component);

    function AntTreeNode() {
        _classCallCheck(this, AntTreeNode);

        return _possibleConstructorReturn(this, (AntTreeNode.__proto__ || Object.getPrototypeOf(AntTreeNode)).apply(this, arguments));
    }

    _createClass(AntTreeNode, [{
        key: 'render',
        value: function render() {
            return React.createElement(AntTreeNode, this.props);
        }
    }]);

    return AntTreeNode;
}(React.Component);

var Tree = function (_React$Component2) {
    _inherits(Tree, _React$Component2);

    function Tree() {
        _classCallCheck(this, Tree);

        return _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).apply(this, arguments));
    }

    _createClass(Tree, [{
        key: 'render',
        value: function render() {
            var props = this.props;
            var prefixCls = props.prefixCls,
                className = props.className,
                showLine = props.showLine;

            var checkable = props.checkable;
            var classString = classNames(_defineProperty({}, prefixCls + '-show-line', !!showLine), className);
            return React.createElement(
                RcTree,
                _extends({}, props, { className: classString, checkable: checkable ? React.createElement('span', { className: prefixCls + '-checkbox-inner' }) : checkable }),
                this.props.children
            );
        }
    }]);

    return Tree;
}(React.Component);

export default Tree;

Tree.TreeNode = TreeNode;
Tree.defaultProps = {
    prefixCls: 'ant-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation
};