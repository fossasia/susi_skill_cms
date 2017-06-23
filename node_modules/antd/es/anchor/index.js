import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/es/Dom/addEventListener';
import AnchorLink from './AnchorLink';
import Affix from '../affix';
import AnchorHelper, { getDefaultTarget } from './anchorHelper';

var Anchor = function (_React$Component) {
    _inherits(Anchor, _React$Component);

    function Anchor(props) {
        _classCallCheck(this, Anchor);

        var _this = _possibleConstructorReturn(this, (Anchor.__proto__ || Object.getPrototypeOf(Anchor)).call(this, props));

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
            _this.anchorHelper.scrollTo(href, _this.props.offsetTop, getDefaultTarget, function () {
                _this._avoidInk = false;
            });
        };
        _this.renderAnchorLink = function (child) {
            var href = child.props.href;
            var type = child.type;

            if (type.__ANT_ANCHOR_LINK && href) {
                _this.anchorHelper.addLink(href);
                return React.cloneElement(child, {
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
        _this.anchorHelper = new AnchorHelper();
        return _this;
    }

    _createClass(Anchor, [{
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
            this.scrollEvent = addEventListener((this.props.target || getDefaultTarget)(), 'scroll', this.handleScroll);
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

            var inkClass = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-ink-ball', true), _defineProperty(_classNames, 'animated', animated), _defineProperty(_classNames, 'visible', !!activeAnchor), _classNames));
            var wrapperClass = classNames(_defineProperty({}, prefixCls + '-wrapper', true), className);
            var anchorClass = classNames(prefixCls, {
                'fixed': !affix && !showInkInFixed
            });
            var anchorContent = React.createElement(
                'div',
                { className: wrapperClass, style: style },
                React.createElement(
                    'div',
                    { className: anchorClass },
                    React.createElement(
                        'div',
                        { className: prefixCls + '-ink' },
                        React.createElement('span', { className: inkClass, ref: 'ink' })
                    ),
                    React.Children.toArray(this.props.children).map(this.renderAnchorLink)
                )
            );
            return !affix ? anchorContent : React.createElement(
                Affix,
                { offsetTop: offsetTop },
                anchorContent
            );
        }
    }]);

    return Anchor;
}(React.Component);

export default Anchor;

Anchor.Link = AnchorLink;
Anchor.defaultProps = {
    prefixCls: 'ant-anchor',
    affix: true,
    showInkInFixed: false
};
Anchor.childContextTypes = {
    anchorHelper: PropTypes.any
};