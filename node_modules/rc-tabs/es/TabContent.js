import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getTransformByIndex, getActiveIndex, getTransformPropValue, getMarginStyle } from './utils';

var TabContent = createReactClass({
  displayName: 'TabContent',
  propTypes: {
    animated: PropTypes.bool,
    animatedWithMargin: PropTypes.bool,
    prefixCls: PropTypes.string,
    children: PropTypes.any,
    activeKey: PropTypes.string,
    style: PropTypes.any,
    tabBarPosition: PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      animated: true
    };
  },
  getTabPanes: function getTabPanes() {
    var props = this.props;
    var activeKey = props.activeKey;
    var children = props.children;
    var newChildren = [];

    React.Children.forEach(children, function (child) {
      if (!child) {
        return;
      }
      var key = child.key;
      var active = activeKey === key;
      newChildren.push(React.cloneElement(child, {
        active: active,
        destroyInactiveTabPane: props.destroyInactiveTabPane,
        rootPrefixCls: props.prefixCls
      }));
    });

    return newChildren;
  },
  render: function render() {
    var _classnames;

    var props = this.props;
    var prefixCls = props.prefixCls,
        children = props.children,
        activeKey = props.activeKey,
        tabBarPosition = props.tabBarPosition,
        animated = props.animated,
        animatedWithMargin = props.animatedWithMargin;
    var style = props.style;

    var classes = classnames((_classnames = {}, _defineProperty(_classnames, prefixCls + '-content', true), _defineProperty(_classnames, animated ? prefixCls + '-content-animated' : prefixCls + '-content-no-animated', true), _classnames));
    if (animated) {
      var activeIndex = getActiveIndex(children, activeKey);
      if (activeIndex !== -1) {
        var animatedStyle = animatedWithMargin ? getMarginStyle(activeIndex, tabBarPosition) : getTransformPropValue(getTransformByIndex(activeIndex, tabBarPosition));
        style = _extends({}, style, animatedStyle);
      } else {
        style = _extends({}, style, {
          display: 'none'
        });
      }
    }
    return React.createElement(
      'div',
      {
        className: classes,
        style: style
      },
      this.getTabPanes()
    );
  }
});

export default TabContent;