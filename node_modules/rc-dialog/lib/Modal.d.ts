/// <reference types="react" />
import React from 'react';
export interface IModalPropTypes {
    wrapStyle?: {};
    maskStyle?: {};
    style?: {};
    animationType: 'none' | 'fade' | 'slide-up' | 'slide-down';
    animationDuration?: number;
    visible: boolean;
    maskClosable?: boolean;
    animateAppear?: boolean;
    onClose?: () => void;
    onAnimationEnd?: (visible: boolean) => void;
}
export default class RCModal extends React.Component<IModalPropTypes, any> {
    static defaultProps: {
        wrapStyle: {
            flex: number;
            backgroundColor: string;
        };
        maskStyle: {
            backgroundColor: string;
            opacity: number;
        };
        animationType: string;
        animateAppear: boolean;
        animationDuration: number;
        visible: boolean;
        maskClosable: boolean;
        onClose(): void;
        onAnimationEnd(_visible: boolean): void;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    animateMask: (visible: any) => void;
    stopMaskAnim: () => void;
    stopDialogAnim: () => void;
    animateDialog: (visible: any) => void;
    close: () => void;
    onMaskClose: () => void;
    getPosition: (visible: any) => number;
    getScale: (visible: any) => 1 | 1.05;
    getOpacity: (visible: any) => 0 | 1;
    render(): any;
}
