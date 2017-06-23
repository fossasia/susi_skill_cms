/// <reference types="react" />
import React from 'react';
import IDialogPropTypes from './IDialogPropTypes';
export default class Dialog extends React.Component<IDialogPropTypes, any> {
    static defaultProps: {
        afterClose: () => void;
        className: string;
        mask: boolean;
        visible: boolean;
        keyboard: boolean;
        closable: boolean;
        maskClosable: boolean;
        prefixCls: string;
        onClose: () => void;
    };
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    onAnimateLeave: () => void;
    onMaskClick: (e: any) => void;
    onKeyDown: (e: any) => void;
    getDialogElement: () => JSX.Element;
    getZIndexStyle: () => any;
    getWrapStyle: () => any;
    getMaskStyle: () => any;
    getMaskElement: () => any;
    getMaskTransitionName: () => string | undefined;
    getTransitionName: () => string | undefined;
    getElement: (part: any) => React.ReactInstance;
    setScrollbar: () => void;
    addScrollingEffect: () => void;
    removeScrollingEffect: () => void;
    close: (e: any) => void;
    checkScrollbar: () => void;
    resetScrollbar: () => void;
    adjustDialog: () => void;
    resetAdjustments: () => void;
    render(): JSX.Element;
}
