'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _progress = require('../progress');

var _progress2 = _interopRequireDefault(_progress);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
var previewFile = function previewFile(file, callback) {
    var reader = new FileReader();
    reader.onloadend = function () {
        return callback(reader.result);
    };
    reader.readAsDataURL(file);
};

var UploadList = function (_React$Component) {
    (0, _inherits3['default'])(UploadList, _React$Component);

    function UploadList() {
        (0, _classCallCheck3['default'])(this, UploadList);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (UploadList.__proto__ || Object.getPrototypeOf(UploadList)).apply(this, arguments));

        _this.handleClose = function (file) {
            var onRemove = _this.props.onRemove;
            if (onRemove) {
                onRemove(file);
            }
        };
        _this.handlePreview = function (file, e) {
            var onPreview = _this.props.onPreview;

            if (!onPreview) {
                return;
            }
            e.preventDefault();
            return onPreview(file);
        };
        return _this;
    }

    (0, _createClass3['default'])(UploadList, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
                return;
            }
            (this.props.items || []).forEach(function (file) {
                if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File) || file.thumbUrl !== undefined) {
                    return;
                }
                /*eslint-disable */
                file.thumbUrl = '';
                /*eslint-enable */
                previewFile(file.originFileObj, function (previewDataUrl) {
                    /*eslint-disable */
                    file.thumbUrl = previewDataUrl;
                    /*eslint-enable */
                    _this2.forceUpdate();
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this,
                _classNames2;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                _props$items = _props.items,
                items = _props$items === undefined ? [] : _props$items,
                listType = _props.listType,
                showPreviewIcon = _props.showPreviewIcon,
                showRemoveIcon = _props.showRemoveIcon,
                locale = _props.locale;

            var list = items.map(function (file) {
                var _classNames;

                var progress = void 0;
                var icon = _react2['default'].createElement(_icon2['default'], { type: file.status === 'uploading' ? 'loading' : 'paper-clip' });
                if (listType === 'picture' || listType === 'picture-card') {
                    if (file.status === 'uploading' || !file.thumbUrl && !file.url) {
                        if (listType === 'picture-card') {
                            icon = _react2['default'].createElement(
                                'div',
                                { className: prefixCls + '-list-item-uploading-text' },
                                locale.uploading
                            );
                        } else {
                            icon = _react2['default'].createElement(_icon2['default'], { className: prefixCls + '-list-item-thumbnail', type: 'picture' });
                        }
                    } else {
                        icon = _react2['default'].createElement(
                            'a',
                            { className: prefixCls + '-list-item-thumbnail', onClick: function onClick(e) {
                                    return _this3.handlePreview(file, e);
                                }, href: file.url || file.thumbUrl, target: '_blank', rel: 'noopener noreferrer' },
                            _react2['default'].createElement('img', { src: file.thumbUrl || file.url, alt: file.name })
                        );
                    }
                }
                if (file.status === 'uploading') {
                    // show loading icon if upload progress listener is disabled
                    var loadingProgress = 'percent' in file ? _react2['default'].createElement(_progress2['default'], (0, _extends3['default'])({ type: 'line' }, _this3.props.progressAttr, { percent: file.percent })) : null;
                    progress = _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-list-item-progress', key: 'progress' },
                        loadingProgress
                    );
                }
                var infoUploadingClass = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-list-item', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-list-item-' + file.status, true), _classNames));
                var preview = file.url ? _react2['default'].createElement(
                    'a',
                    { href: file.url, target: '_blank', rel: 'noopener noreferrer', className: prefixCls + '-list-item-name', onClick: function onClick(e) {
                            return _this3.handlePreview(file, e);
                        }, title: file.name },
                    file.name
                ) : _react2['default'].createElement(
                    'span',
                    { className: prefixCls + '-list-item-name', onClick: function onClick(e) {
                            return _this3.handlePreview(file, e);
                        }, title: file.name },
                    file.name
                );
                var style = file.url || file.thumbUrl ? undefined : {
                    pointerEvents: 'none',
                    opacity: 0.5
                };
                var previewIcon = showPreviewIcon ? _react2['default'].createElement(
                    'a',
                    { href: file.url || file.thumbUrl, target: '_blank', rel: 'noopener noreferrer', style: style, onClick: function onClick(e) {
                            return _this3.handlePreview(file, e);
                        }, title: locale.previewFile },
                    _react2['default'].createElement(_icon2['default'], { type: 'eye-o' })
                ) : null;
                var removeIcon = showRemoveIcon ? _react2['default'].createElement(_icon2['default'], { type: 'delete', title: locale.removeFile, onClick: function onClick() {
                        return _this3.handleClose(file);
                    } }) : null;
                var removeIconCross = showRemoveIcon ? _react2['default'].createElement(_icon2['default'], { type: 'cross', title: locale.removeFile, onClick: function onClick() {
                        return _this3.handleClose(file);
                    } }) : null;
                var actions = listType === 'picture-card' && file.status !== 'uploading' ? _react2['default'].createElement(
                    'span',
                    { className: prefixCls + '-list-item-actions' },
                    previewIcon,
                    removeIcon
                ) : removeIconCross;
                var message = file.response || file.error && file.error.statusText || locale.uploadError;
                var iconAndPreview = file.status === 'error' ? _react2['default'].createElement(
                    _tooltip2['default'],
                    { title: message },
                    icon,
                    preview
                ) : _react2['default'].createElement(
                    'span',
                    null,
                    icon,
                    preview
                );
                return _react2['default'].createElement(
                    'div',
                    { className: infoUploadingClass, key: file.uid },
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-list-item-info' },
                        iconAndPreview
                    ),
                    actions,
                    _react2['default'].createElement(
                        _rcAnimate2['default'],
                        { transitionName: 'fade', component: '' },
                        progress
                    )
                );
            });
            var listClassNames = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-list', true), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-list-' + listType, true), _classNames2));
            var animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
            return _react2['default'].createElement(
                _rcAnimate2['default'],
                { transitionName: prefixCls + '-' + animationDirection, component: 'div', className: listClassNames },
                list
            );
        }
    }]);
    return UploadList;
}(_react2['default'].Component);

exports['default'] = UploadList;

UploadList.defaultProps = {
    listType: 'text',
    progressAttr: {
        strokeWidth: 2,
        showInfo: false
    },
    prefixCls: 'ant-upload',
    showRemoveIcon: true,
    showPreviewIcon: true
};
module.exports = exports['default'];