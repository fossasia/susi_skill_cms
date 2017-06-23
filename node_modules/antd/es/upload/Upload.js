import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import RcUpload from 'rc-upload';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'object-assign';
import UploadList from './UploadList';
import { T, fileToObject, genPercentAdd, getFileItem, removeFileItem } from './utils';
var defaultLocale = {
    uploading: '文件上传中',
    removeFile: '删除文件',
    uploadError: '上传错误',
    previewFile: '预览文件'
};

var Upload = function (_React$Component) {
    _inherits(Upload, _React$Component);

    function Upload(props) {
        _classCallCheck(this, Upload);

        var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));

        _this.onStart = function (file) {
            var targetItem = void 0;
            var nextFileList = _this.state.fileList.concat();
            if (file.length > 0) {
                targetItem = file.map(function (f) {
                    var fileObject = fileToObject(f);
                    fileObject.status = 'uploading';
                    return fileObject;
                });
                nextFileList = nextFileList.concat(targetItem);
            } else {
                targetItem = fileToObject(file);
                targetItem.status = 'uploading';
                nextFileList.push(targetItem);
            }
            _this.onChange({
                file: targetItem,
                fileList: nextFileList
            });
            // fix ie progress
            if (!window.FormData) {
                _this.autoUpdateProgress(0, targetItem);
            }
        };
        _this.onSuccess = function (response, file) {
            _this.clearProgressTimer();
            try {
                if (typeof response === 'string') {
                    response = JSON.parse(response);
                }
            } catch (e) {}
            var fileList = _this.state.fileList;
            var targetItem = getFileItem(file, fileList);
            // removed
            if (!targetItem) {
                return;
            }
            targetItem.status = 'done';
            targetItem.response = response;
            _this.onChange({
                file: Object.assign({}, targetItem),
                fileList: fileList
            });
        };
        _this.onProgress = function (e, file) {
            var fileList = _this.state.fileList;
            var targetItem = getFileItem(file, fileList);
            // removed
            if (!targetItem) {
                return;
            }
            targetItem.percent = e.percent;
            _this.onChange({
                event: e,
                file: Object.assign({}, targetItem),
                fileList: _this.state.fileList
            });
        };
        _this.onError = function (error, response, file) {
            _this.clearProgressTimer();
            var fileList = _this.state.fileList;
            var targetItem = getFileItem(file, fileList);
            // removed
            if (!targetItem) {
                return;
            }
            targetItem.error = error;
            targetItem.response = response;
            targetItem.status = 'error';
            _this.onChange({
                file: Object.assign({}, targetItem),
                fileList: fileList
            });
        };
        _this.handleManualRemove = function (file) {
            _this.refs.upload.abort(file);
            file.status = 'removed'; // eslint-disable-line
            _this.handleRemove(file);
        };
        _this.onChange = function (info) {
            if (!('fileList' in _this.props)) {
                _this.setState({ fileList: info.fileList });
            }
            var onChange = _this.props.onChange;

            if (onChange) {
                onChange(info);
            }
        };
        _this.onFileDrop = function (e) {
            _this.setState({
                dragState: e.type
            });
        };
        _this.state = {
            fileList: _this.props.fileList || _this.props.defaultFileList || [],
            dragState: 'drop'
        };
        return _this;
    }

    _createClass(Upload, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearProgressTimer();
        }
    }, {
        key: 'getLocale',
        value: function getLocale() {
            var locale = {};
            if (this.context.antLocale && this.context.antLocale.Upload) {
                locale = this.context.antLocale.Upload;
            }
            return assign({}, defaultLocale, locale, this.props.locale);
        }
    }, {
        key: 'autoUpdateProgress',
        value: function autoUpdateProgress(_, file) {
            var _this2 = this;

            var getPercent = genPercentAdd();
            var curPercent = 0;
            this.clearProgressTimer();
            this.progressTimer = setInterval(function () {
                curPercent = getPercent(curPercent);
                _this2.onProgress({
                    percent: curPercent
                }, file);
            }, 200);
        }
    }, {
        key: 'handleRemove',
        value: function handleRemove(file) {
            var _this3 = this;

            var onRemove = this.props.onRemove;

            Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(function (ret) {
                // Prevent removing file
                if (ret === false) {
                    return;
                }
                var removedFileList = removeFileItem(file, _this3.state.fileList);
                if (removedFileList) {
                    _this3.onChange({
                        file: file,
                        fileList: removedFileList
                    });
                }
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('fileList' in nextProps) {
                this.setState({
                    fileList: nextProps.fileList || []
                });
            }
        }
    }, {
        key: 'clearProgressTimer',
        value: function clearProgressTimer() {
            clearInterval(this.progressTimer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames2;

            var _props = this.props,
                _props$prefixCls = _props.prefixCls,
                prefixCls = _props$prefixCls === undefined ? '' : _props$prefixCls,
                showUploadList = _props.showUploadList,
                listType = _props.listType,
                onPreview = _props.onPreview,
                type = _props.type,
                disabled = _props.disabled,
                children = _props.children,
                className = _props.className;

            var rcUploadProps = assign({}, {
                onStart: this.onStart,
                onError: this.onError,
                onProgress: this.onProgress,
                onSuccess: this.onSuccess
            }, this.props);
            delete rcUploadProps.className;
            var showRemoveIcon = showUploadList.showRemoveIcon,
                showPreviewIcon = showUploadList.showPreviewIcon;

            var uploadList = showUploadList ? React.createElement(UploadList, { listType: listType, items: this.state.fileList, onPreview: onPreview, onRemove: this.handleManualRemove, showRemoveIcon: showRemoveIcon, showPreviewIcon: showPreviewIcon, locale: this.getLocale() }) : null;
            if (type === 'drag') {
                var _classNames;

                var dragCls = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-drag', true), _defineProperty(_classNames, prefixCls + '-drag-uploading', this.state.fileList.some(function (file) {
                    return file.status === 'uploading';
                })), _defineProperty(_classNames, prefixCls + '-drag-hover', this.state.dragState === 'dragover'), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _classNames));
                return React.createElement(
                    'span',
                    { className: className },
                    React.createElement(
                        'div',
                        { className: dragCls, onDrop: this.onFileDrop, onDragOver: this.onFileDrop, onDragLeave: this.onFileDrop },
                        React.createElement(
                            RcUpload,
                            _extends({}, rcUploadProps, { ref: 'upload', className: prefixCls + '-btn' }),
                            React.createElement(
                                'div',
                                { className: prefixCls + '-drag-container' },
                                children
                            )
                        )
                    ),
                    uploadList
                );
            }
            var uploadButtonCls = classNames(prefixCls, (_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-select', true), _defineProperty(_classNames2, prefixCls + '-select-' + listType, true), _defineProperty(_classNames2, prefixCls + '-disabled', disabled), _classNames2));
            var uploadButton = React.createElement(
                'div',
                { className: uploadButtonCls, style: { display: children ? '' : 'none' } },
                React.createElement(RcUpload, _extends({}, rcUploadProps, { ref: 'upload' }))
            );
            if (listType === 'picture-card') {
                return React.createElement(
                    'span',
                    { className: className },
                    uploadList,
                    uploadButton
                );
            }
            return React.createElement(
                'span',
                { className: className },
                uploadButton,
                uploadList
            );
        }
    }]);

    return Upload;
}(React.Component);

export default Upload;

Upload.defaultProps = {
    prefixCls: 'ant-upload',
    type: 'select',
    multiple: false,
    action: '',
    data: {},
    accept: '',
    beforeUpload: T,
    showUploadList: true,
    listType: 'text',
    className: '',
    disabled: false,
    supportServerRender: true
};
Upload.contextTypes = {
    antLocale: PropTypes.object
};