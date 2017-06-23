/// <reference types="react" />
import React from 'react';
export interface ModalProps {
    /** 对话框是否可见*/
    visible?: boolean;
    /** 确定按钮 loading*/
    confirmLoading?: boolean;
    /** 标题*/
    title?: React.ReactNode | string;
    /** 是否显示右上角的关闭按钮*/
    closable?: boolean;
    /** 点击确定回调*/
    onOk?: (e: React.MouseEvent<any>) => void;
    /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
    onCancel?: (e: React.MouseEvent<any>) => void;
    afterClose?: () => void;
    /** 宽度*/
    width?: string | number;
    /** 底部内容*/
    footer?: React.ReactNode;
    /** 确认按钮文字*/
    okText?: string;
    /** 取消按钮文字*/
    cancelText?: string;
    /** 点击蒙层是否允许关闭*/
    maskClosable?: boolean;
    style?: React.CSSProperties;
    wrapClassName?: string;
    maskTransitionName?: string;
    transitionName?: string;
    className?: string;
    getContainer?: (instance: React.ReactInstance) => HTMLElement;
}
export interface ModalContext {
    antLocale?: {
        Modal?: any;
    };
}
export interface ModalFuncProps {
    visible?: boolean;
    title?: React.ReactNode | string;
    content?: React.ReactNode | string;
    onOk?: (func: Function) => any;
    onCancel?: (func: Function) => any;
    width?: string | number;
    iconClassName?: string;
    okText?: string;
    cancelText?: string;
    iconType?: string;
}
export declare type ModalFunc = (props: ModalFuncProps) => {
    destroy: () => void;
};
export default class Modal extends React.Component<ModalProps, any> {
    static info: ModalFunc;
    static success: ModalFunc;
    static error: ModalFunc;
    static warn: ModalFunc;
    static warning: ModalFunc;
    static confirm: ModalFunc;
    static defaultProps: {
        prefixCls: string;
        width: number;
        transitionName: string;
        maskTransitionName: string;
        confirmLoading: boolean;
        visible: boolean;
    };
    static propTypes: {
        prefixCls: any;
        onOk: any;
        onCancel: any;
        okText: any;
        cancelText: any;
        width: any;
        confirmLoading: any;
        visible: any;
        align: any;
        footer: any;
        title: any;
        closable: any;
    };
    static contextTypes: {
        antLocale: any;
    };
    context: ModalContext;
    handleCancel: (e: any) => void;
    handleOk: (e: any) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
