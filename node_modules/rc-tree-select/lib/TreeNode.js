'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TreeNode = function (_React$Component) {
  (0, _inherits3['default'])(TreeNode, _React$Component);

  function TreeNode() {
    (0, _classCallCheck3['default'])(this, TreeNode);
    return (0, _possibleConstructorReturn3['default'])(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).apply(this, arguments));
  }

  return TreeNode;
}(_react2['default'].Component);

TreeNode.propTypes = {
  value: _propTypes2['default'].string
};
exports['default'] = TreeNode;
module.exports = exports['default'];