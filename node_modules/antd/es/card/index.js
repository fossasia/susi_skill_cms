import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }return t;
};
import React from 'react';
import classNames from 'classnames';
export default (function (props) {
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
  var classString = classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-loading', loading), _defineProperty(_classNames, prefixCls + '-bordered', bordered), _classNames));
  if (loading) {
    children = React.createElement(
      'div',
      null,
      React.createElement('p', { className: prefixCls + '-loading-block', style: { width: '94%' } }),
      React.createElement(
        'p',
        null,
        React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '28%' } }),
        React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '62%' } })
      ),
      React.createElement(
        'p',
        null,
        React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '22%' } }),
        React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '66%' } })
      ),
      React.createElement(
        'p',
        null,
        React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '56%' } }),
        React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '39%' } })
      ),
      React.createElement(
        'p',
        null,
        React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '21%' } }),
        React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '15%' } }),
        React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '40%' } })
      )
    );
  }
  var head = void 0;
  if (!title) {
    head = null;
  } else {
    head = typeof title === 'string' ? React.createElement(
      'div',
      { className: prefixCls + '-head' },
      React.createElement(
        'h3',
        { className: prefixCls + '-head-title' },
        title
      )
    ) : React.createElement(
      'div',
      { className: prefixCls + '-head' },
      React.createElement(
        'div',
        { className: prefixCls + '-head-title' },
        title
      )
    );
  }
  return React.createElement(
    'div',
    _extends({}, others, { className: classString }),
    head,
    extra ? React.createElement(
      'div',
      { className: prefixCls + '-extra' },
      extra
    ) : null,
    React.createElement(
      'div',
      { className: prefixCls + '-body', style: bodyStyle },
      children
    )
  );
});