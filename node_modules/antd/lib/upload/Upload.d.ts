/// <reference types="react" />
import React from 'react';
import Dragger from './Dragger';
import { UploadProps } from './interface';
export interface UploadContext {
    antLocale?: {
        Upload?: any;
    };
}
export { UploadProps };
export default class Upload extends React.Component<UploadProps, any> {
    static Dragger: typeof Dragger;
    static defaultProps: {
        prefixCls: string;
        type: string;
        multiple: boolean;
        action: string;
        data: {};
        accept: string;
        beforeUpload: () => boolean;
        showUploadList: boolean;
        listType: string;
        className: string;
        disabled: boolean;
        supportServerRender: boolean;
    };
    static contextTypes: {
        antLocale: any;
    };
    context: UploadContext;
    recentUploadStatus: boolean | PromiseLike<any>;
    progressTimer: any;
    refs: {
        [key: string]: any;
        upload: any;
    };
    constructor(props: any);
    componentWillUnmount(): void;
    getLocale(): any;
    onStart: (file: any) => void;
    autoUpdateProgress(_: any, file: any): void;
    onSuccess: (response: any, file: any) => void;
    onProgress: (e: any, file: any) => void;
    onError: (error: any, response: any, file: any) => void;
    handleRemove(file: any): void;
    handleManualRemove: (file: any) => void;
    onChange: (info: any) => void;
    componentWillReceiveProps(nextProps: any): void;
    onFileDrop: (e: any) => void;
    clearProgressTimer(): void;
    render(): JSX.Element;
}
