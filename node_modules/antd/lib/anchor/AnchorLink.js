'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _anchorHelper = require('./anchorHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnchorLink = function (_React$Component) {
    (0, _inherits3['default'])(AnchorLink, _React$Component);

    function AnchorLink() {
        (0, _classCallCheck3['default'])(this, AnchorLink);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (AnchorLink.__proto__ || Object.getPrototypeOf(AnchorLink)).apply(this, arguments));

        _this.renderAnchorLink = function (child) {
            // Here child is a ReactChild type
            if (typeof child !== 'string' && typeof child !== 'number') {
                var href = child.props.href;

                if (href) {
                    _this.context.anchorHelper.addLink(href);
                    return _react2['default'].cloneElement(child, {
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
                var scrollToFn = anchorHelper ? anchorHelper.scrollTo : _anchorHelper.scrollTo;
                scrollToFn(href, _this.props.offsetTop);
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(AnchorLink, [{
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
            var cls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-link', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-link-active', active), _classNames));
            return _react2['default'].createElement(
                'div',
                { className: cls },
                _react2['default'].createElement(
                    'a',
                    { ref: this.refsTo, className: prefixCls + '-link-title', onClick: this.scrollTo, href: href, title: typeof title === 'string' ? title : '' },
                    title
                ),
                _react2['default'].Children.map(children, this.renderAnchorLink)
            );
        }
    }]);
    return AnchorLink;
}(_react2['default'].Component);

exports['default'] = AnchorLink;

AnchorLink.__ANT_ANCHOR_LINK = true;
AnchorLink.contextTypes = {
    anchorHelper: _propTypes2['default'].any
};
AnchorLink.defaultProps = {
    href: '#',
    prefixCls: 'ant-anchor'
};
module.exports = exports['default'];