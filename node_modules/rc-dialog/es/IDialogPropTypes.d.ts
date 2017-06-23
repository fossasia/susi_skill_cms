/// <reference types="react" />
import { ReactNode } from 'react';
interface IDialogPropTypes {
    className?: string;
    keyboard?: boolean;
    style?: {};
    mask?: boolean;
    children?: any;
    afterClose?: () => void;
    onClose?: () => void;
    closable?: boolean;
    maskClosable?: boolean;
    visible?: boolean;
    mousePosition?: {};
    title?: ReactNode;
    footer?: ReactNode;
    transitionName?: string;
    maskTransitionName?: string;
    animation?: any;
    maskAnimation?: any;
    wrapStyle?: {};
    bodyStyle?: {};
    maskStyle?: {};
    prefixCls?: string;
    wrapClassName?: string;
}
export default IDialogPropTypes;
