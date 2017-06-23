'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }return t;
};

exports['default'] = function (props) {
  var _classNames;

  var _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === undefined ? 'ant-card' : _props$prefixCls,
      className = props.className,
      extra = props.extra,
      bodyStyle = props.bodyStyle,
      title = props.title,
      loading = props.loading,
      _props$bordered = props.bordered,
      bordered = _props$bordered === undefined ? true : _props$bordered,
      others = __rest(props, ["prefixCls", "className", "extra", "bodyStyle", "title", "loading", "bordered"]);

  var children = props.children;
  var classString = (0, _classnames2['default'])(prefixCls, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-loading', loading), (0, _defineProperty3['default'])(_classNames, prefixCls + '-bordered', bordered), _classNames));
  if (loading) {
    children = _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement('p', { className: prefixCls + '-loading-block', style: { width: '94%' } }),
      _react2['default'].createElement(
        'p',
        null,
        _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '28%' } }),
        _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '62%' } })
      ),
      _react2['default'].createElement(
        'p',
        null,
        _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '22%' } }),
        _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '66%' } })
      ),
      _react2['default'].createElement(
        'p',
        null,
        _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '56%' } }),
        _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '39%' } })
      ),
      _react2['default'].createElement(
        'p',
        null,
        _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '21%' } }),
        _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '15%' } }),
        _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '40%' } })
      )
    );
  }
  var head = void 0;
  if (!title) {
    head = null;
  } else {
    head = typeof title === 'string' ? _react2['default'].createElement(
      'div',
      { className: prefixCls + '-head' },
      _react2['default'].createElement(
        'h3',
        { className: prefixCls + '-head-title' },
        title
      )
    ) : _react2['default'].createElement(
      'div',
      { className: prefixCls + '-head' },
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-head-title' },
        title
      )
    );
  }
  return _react2['default'].createElement(
    'div',
    (0, _extends3['default'])({}, others, { className: classString }),
    head,
    extra ? _react2['default'].createElement(
      'div',
      { className: prefixCls + '-extra' },
      extra
    ) : null,
    _react2['default'].createElement(
      'div',
      { className: prefixCls + '-body', style: bodyStyle },
      children
    )
  );
};

module.exports = exports['default'];