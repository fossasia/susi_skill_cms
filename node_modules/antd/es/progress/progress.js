import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../icon';
import { Circle } from 'rc-progress';
import classNames from 'classnames';
var statusColorMap = {
    normal: '#108ee9',
    exception: '#ff5500',
    success: '#87d068'
};

var Progress = function (_React$Component) {
    _inherits(Progress, _React$Component);

    function Progress() {
        _classCallCheck(this, Progress);

        return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
    }

    _createClass(Progress, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var props = this.props;

            var prefixCls = props.prefixCls,
                className = props.className,
                _props$percent = props.percent,
                percent = _props$percent === undefined ? 0 : _props$percent,
                status = props.status,
                format = props.format,
                trailColor = props.trailColor,
                type = props.type,
                strokeWidth = props.strokeWidth,
                width = props.width,
                showInfo = props.showInfo,
                _props$gapDegree = props.gapDegree,
                gapDegree = _props$gapDegree === undefined ? 0 : _props$gapDegree,
                gapPosition = props.gapPosition,
                restProps = __rest(props, ["prefixCls", "className", "percent", "status", "format", "trailColor", "type", "strokeWidth", "width", "showInfo", "gapDegree", "gapPosition"]);

            var progressStatus = parseInt(percent.toString(), 10) >= 100 && !('status' in props) ? 'success' : status || 'normal';
            var progressInfo = void 0;
            var progress = void 0;
            var textFormatter = format || function (percentNumber) {
                return percentNumber + '%';
            };
            if (showInfo) {
                var text = void 0;
                var iconType = type === 'circle' || type === 'dashboard' ? '' : '-circle';
                if (progressStatus === 'exception') {
                    text = format ? textFormatter(percent) : React.createElement(Icon, { type: 'cross' + iconType });
                } else if (progressStatus === 'success') {
                    text = format ? textFormatter(percent) : React.createElement(Icon, { type: 'check' + iconType });
                } else {
                    text = textFormatter(percent);
                }
                progressInfo = React.createElement(
                    'span',
                    { className: prefixCls + '-text' },
                    text
                );
            }
            if (type === 'line') {
                var percentStyle = {
                    width: percent + '%',
                    height: strokeWidth || 10
                };
                progress = React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: prefixCls + '-outer' },
                        React.createElement(
                            'div',
                            { className: prefixCls + '-inner' },
                            React.createElement('div', { className: prefixCls + '-bg', style: percentStyle })
                        )
                    ),
                    progressInfo
                );
            } else if (type === 'circle' || type === 'dashboard') {
                var circleSize = width || 132;
                var circleStyle = {
                    width: circleSize,
                    height: circleSize,
                    fontSize: circleSize * 0.16 + 6
                };
                var circleWidth = strokeWidth || 6;
                var gapPos = gapPosition || type === 'dashboard' && 'bottom' || 'top';
                var gapDeg = gapDegree || type === 'dashboard' && 75;
                progress = React.createElement(
                    'div',
                    { className: prefixCls + '-inner', style: circleStyle },
                    React.createElement(Circle, { percent: percent, strokeWidth: circleWidth, trailWidth: circleWidth, strokeColor: statusColorMap[progressStatus], trailColor: trailColor, prefixCls: prefixCls, gapDegree: gapDeg, gapPosition: gapPos }),
                    progressInfo
                );
            }
            var classString = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + (type === 'dashboard' && 'circle' || type), true), _defineProperty(_classNames, prefixCls + '-status-' + progressStatus, true), _defineProperty(_classNames, prefixCls + '-show-info', showInfo), _classNames), className);
            return React.createElement(
                'div',
                _extends({}, restProps, { className: classString }),
                progress
            );
        }
    }]);

    return Progress;
}(React.Component);

export default Progress;

Progress.defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    prefixCls: 'ant-progress'
};
Progress.propTypes = {
    status: PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    type: PropTypes.oneOf(['line', 'circle', 'dashboard']),
    showInfo: PropTypes.bool,
    percent: PropTypes.number,
    width: PropTypes.number,
    strokeWidth: PropTypes.number,
    trailColor: PropTypes.string,
    format: PropTypes.func,
    gapDegree: PropTypes.number
};