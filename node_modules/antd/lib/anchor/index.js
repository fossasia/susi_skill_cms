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

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _AnchorLink = require('./AnchorLink');

var _AnchorLink2 = _interopRequireDefault(_AnchorLink);

var _affix = require('../affix');

var _affix2 = _interopRequireDefault(_affix);

var _anchorHelper = require('./anchorHelper');

var _anchorHelper2 = _interopRequireDefault(_anchorHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Anchor = function (_React$Component) {
    (0, _inherits3['default'])(Anchor, _React$Component);

    function Anchor(props) {
        (0, _classCallCheck3['default'])(this, Anchor);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Anchor.__proto__ || Object.getPrototypeOf(Anchor)).call(this, props));

        _this.handleScroll = function () {
            _this.setState({
                activeAnchor: _this.anchorHelper.getCurrentAnchor(_this.props.offsetTop, _this.props.bounds)
            });
        };
        _this.updateInk = function () {
            var activeAnchor = _this.anchorHelper.getCurrentActiveAnchor();
            if (activeAnchor) {
                _this.refs.ink.style.top = activeAnchor.offsetTop + activeAnchor.clientHeight / 2 - 4.5 + 'px';
            }
        };
        _this.clickAnchorLink = function (href, component) {
            _this._avoidInk = true;
            _this.refs.ink.style.top = component.offsetTop + component.clientHeight / 2 - 4.5 + 'px';
            _this.anchorHelper.scrollTo(href, _this.props.offsetTop, _anchorHelper.getDefaultTarget, function () {
                _this._avoidInk = false;
            });
        };
        _this.renderAnchorLink = function (child) {
            var href = child.props.href;
            var type = child.type;

            if (type.__ANT_ANCHOR_LINK && href) {
                _this.anchorHelper.addLink(href);
                return _react2['default'].cloneElement(child, {
                    onClick: _this.clickAnchorLink,
                    prefixCls: _this.props.prefixCls,
                    bounds: _this.props.bounds,
                    affix: _this.props.affix || _this.props.showInkInFixed,
                    offsetTop: _this.props.offsetTop
                });
            }
            return child;
        };
        _this.state = {
            activeAnchor: null,
            animated: true
        };
        _this.anchorHelper = new _anchorHelper2['default']();
        return _this;
    }

    (0, _createClass3['default'])(Anchor, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                anchorHelper: this.anchorHelper
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.handleScroll();
            this.updateInk();
            this.scrollEvent = (0, _addEventListener2['default'])((this.props.target || _anchorHelper.getDefaultTarget)(), 'scroll', this.handleScroll);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.scrollEvent) {
                this.scrollEvent.remove();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!this._avoidInk) {
                this.updateInk();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                offsetTop = _props.offsetTop,
                style = _props.style,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                affix = _props.affix,
                showInkInFixed = _props.showInkInFixed;
            var _state = this.state,
                activeAnchor = _state.activeAnchor,
                animated = _state.animated;

            var inkClass = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-ink-ball', true), (0, _defineProperty3['default'])(_classNames, 'animated', animated), (0, _defineProperty3['default'])(_classNames, 'visible', !!activeAnchor), _classNames));
            var wrapperClass = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-wrapper', true), className);
            var anchorClass = (0, _classnames2['default'])(prefixCls, {
                'fixed': !affix && !showInkInFixed
            });
            var anchorContent = _react2['default'].createElement(
                'div',
                { className: wrapperClass, style: style },
                _react2['default'].createElement(
                    'div',
                    { className: anchorClass },
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-ink' },
                        _react2['default'].createElement('span', { className: inkClass, ref: 'ink' })
                    ),
                    _react2['default'].Children.toArray(this.props.children).map(this.renderAnchorLink)
                )
            );
            return !affix ? anchorContent : _react2['default'].createElement(
                _affix2['default'],
                { offsetTop: offsetTop },
                anchorContent
            );
        }
    }]);
    return Anchor;
}(_react2['default'].Component);

exports['default'] = Anchor;

Anchor.Link = _AnchorLink2['default'];
Anchor.defaultProps = {
    prefixCls: 'ant-anchor',
    affix: true,
    showInkInFixed: false
};
Anchor.childContextTypes = {
    anchorHelper: _propTypes2['default'].any
};
module.exports = exports['default'];