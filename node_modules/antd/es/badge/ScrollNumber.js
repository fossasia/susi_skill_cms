import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { createElement, Component } from 'react';
import assign from 'object-assign';
import omit from 'omit.js';
function getNumberArray(num) {
    return num ? num.toString().split('').reverse().map(function (i) {
        return Number(i);
    }) : [];
}

var ScrollNumber = function (_Component) {
    _inherits(ScrollNumber, _Component);

    function ScrollNumber(props) {
        _classCallCheck(this, ScrollNumber);

        var _this = _possibleConstructorReturn(this, (ScrollNumber.__proto__ || Object.getPrototypeOf(ScrollNumber)).call(this, props));

        _this.state = {
            animateStarted: true,
            count: props.count
        };
        return _this;
    }

    _createClass(ScrollNumber, [{
        key: 'getPositionByNum',
        value: function getPositionByNum(num, i) {
            if (this.state.animateStarted) {
                return 10 + num;
            }
            var currentDigit = getNumberArray(this.state.count)[i];
            var lastDigit = getNumberArray(this.lastCount)[i];
            // 同方向则在同一侧切换数字
            if (this.state.count > this.lastCount) {
                if (currentDigit >= lastDigit) {
                    return 10 + num;
                }
                return 20 + num;
            }
            if (currentDigit <= lastDigit) {
                return 10 + num;
            }
            return num;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if ('count' in nextProps) {
                if (this.state.count === nextProps.count) {
                    return;
                }
                this.lastCount = this.state.count;
                // 复原数字初始位置
                this.setState({
                    animateStarted: true
                }, function () {
                    // 等待数字位置复原完毕
                    // 开始设置完整的数字
                    setTimeout(function () {
                        _this2.setState({
                            animateStarted: false,
                            count: nextProps.count
                        }, function () {
                            var onAnimated = _this2.props.onAnimated;
                            if (onAnimated) {
                                onAnimated();
                            }
                        });
                    }, 5);
                });
            }
        }
    }, {
        key: 'renderNumberList',
        value: function renderNumberList(position) {
            var childrenToReturn = [];
            for (var i = 0; i < 30; i++) {
                var currentClassName = position === i ? 'current' : '';
                childrenToReturn.push(React.createElement(
                    'p',
                    { key: i.toString(), className: currentClassName },
                    i % 10
                ));
            }
            return childrenToReturn;
        }
    }, {
        key: 'renderCurrentNumber',
        value: function renderCurrentNumber(num, i) {
            var position = this.getPositionByNum(num, i);
            var removeTransition = this.state.animateStarted || getNumberArray(this.lastCount)[i] === undefined;
            return createElement('span', {
                className: this.props.prefixCls + '-only',
                style: {
                    transition: removeTransition && 'none',
                    msTransform: 'translateY(' + -position * 100 + '%)',
                    WebkitTransform: 'translateY(' + -position * 100 + '%)',
                    transform: 'translateY(' + -position * 100 + '%)'
                },
                key: i
            }, this.renderNumberList(position));
        }
    }, {
        key: 'renderNumberElement',
        value: function renderNumberElement() {
            var _this3 = this;

            var state = this.state;
            if (!state.count || isNaN(state.count)) {
                return state.count;
            }
            return getNumberArray(state.count).map(function (num, i) {
                return _this3.renderCurrentNumber(num, i);
            }).reverse();
        }
    }, {
        key: 'render',
        value: function render() {
            // fix https://fb.me/react-unknown-prop
            var props = assign({}, omit(this.props, ['count', 'onAnimated', 'component', 'prefixCls']), {
                className: this.props.prefixCls + ' ' + this.props.className
            });
            // allow specify the border
            // mock border-color by box-shadow for compatible with old usage:
            // <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />
            if (props.style && props.style.borderColor) {
                props.style.boxShadow = '0 0 0 1px ' + props.style.borderColor + ' inset';
            }
            return createElement(this.props.component || 'sup', props, this.renderNumberElement());
        }
    }]);

    return ScrollNumber;
}(Component);

export default ScrollNumber;

ScrollNumber.defaultProps = {
    prefixCls: 'ant-scroll-number',
    count: null,
    onAnimated: function onAnimated() {}
};