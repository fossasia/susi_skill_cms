import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { scrollTo } from './anchorHelper';

var AnchorLink = function (_React$Component) {
    _inherits(AnchorLink, _React$Component);

    function AnchorLink() {
        _classCallCheck(this, AnchorLink);

        var _this = _possibleConstructorReturn(this, (AnchorLink.__proto__ || Object.getPrototypeOf(AnchorLink)).apply(this, arguments));

        _this.renderAnchorLink = function (child) {
            // Here child is a ReactChild type
            if (typeof child !== 'string' && typeof child !== 'number') {
                var href = child.props.href;

                if (href) {
                    _this.context.anchorHelper.addLink(href);
                    return React.cloneElement(child, {
                        onClick: _this.props.onClick,
                        prefixCls: _this.props.prefixCls,
                        affix: _this.props.affix,
                        offsetTop: _this.props.offsetTop
                    });
                }
            }
            return child;
        };
        _this.refsTo = function (component) {
            _this._component = component;
        };
        _this.scrollTo = function (e) {
            e.preventDefault();
            var _this$props = _this.props,
                onClick = _this$props.onClick,
                href = _this$props.href;
            var anchorHelper = _this.context.anchorHelper;

            if (onClick) {
                onClick(href, _this._component);
            } else {
                var scrollToFn = anchorHelper ? anchorHelper.scrollTo : scrollTo;
                scrollToFn(href, _this.props.offsetTop);
            }
        };
        return _this;
    }

    _createClass(AnchorLink, [{
        key: 'setActiveAnchor',
        value: function setActiveAnchor() {
            var _props = this.props,
                bounds = _props.bounds,
                offsetTop = _props.offsetTop,
                href = _props.href,
                affix = _props.affix;
            var anchorHelper = this.context.anchorHelper;

            var active = affix && anchorHelper && anchorHelper.getCurrentAnchor(offsetTop, bounds) === href;
            if (active && anchorHelper) {
                anchorHelper.setActiveAnchor(this._component);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setActiveAnchor();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.setActiveAnchor();
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                href = _props2.href,
                children = _props2.children,
                title = _props2.title,
                bounds = _props2.bounds,
                offsetTop = _props2.offsetTop,
                affix = _props2.affix;
            var anchorHelper = this.context.anchorHelper;

            var active = affix && anchorHelper && anchorHelper.getCurrentAnchor(offsetTop, bounds) === href;
            var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-link', true), _defineProperty(_classNames, prefixCls + '-link-active', active), _classNames));
            return React.createElement(
                'div',
                { className: cls },
                React.createElement(
                    'a',
                    { ref: this.refsTo, className: prefixCls + '-link-title', onClick: this.scrollTo, href: href, title: typeof title === 'string' ? title : '' },
                    title
                ),
                React.Children.map(children, this.renderAnchorLink)
            );
        }
    }]);

    return AnchorLink;
}(React.Component);

export default AnchorLink;

AnchorLink.__ANT_ANCHOR_LINK = true;
AnchorLink.contextTypes = {
    anchorHelper: PropTypes.any
};
AnchorLink.defaultProps = {
    href: '#',
    prefixCls: 'ant-anchor'
};