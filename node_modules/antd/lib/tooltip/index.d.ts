/// <reference types="react" />
import React from 'react';
export declare type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export interface AbstractTooltipProps {
    prefixCls?: string;
    overlayClassName?: string;
    style?: React.CSSProperties;
    overlayStyle?: React.CSSProperties;
    placement?: TooltipPlacement;
    builtinPlacements?: Object;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    transitionName?: string;
    trigger?: 'hover' | 'focus' | 'click';
    openClassName?: string;
    arrowPointAtCenter?: boolean;
    getTooltipContainer?: (triggerNode: Element) => HTMLElement;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    children?: React.ReactNode;
}
export interface TooltipProps extends AbstractTooltipProps {
    title?: React.ReactNode;
    overlay?: React.ReactNode;
}
export default class Tooltip extends React.Component<TooltipProps, any> {
    static defaultProps: {
        prefixCls: string;
        placement: string;
        transitionName: string;
        mouseEnterDelay: number;
        mouseLeaveDelay: number;
        arrowPointAtCenter: boolean;
    };
    refs: {
        tooltip: any;
    };
    constructor(props: TooltipProps);
    componentWillReceiveProps(nextProps: TooltipProps): void;
    onVisibleChange: (visible: any) => void;
    getPopupDomNode(): any;
    getPlacements(): any;
    isHoverTrigger(): boolean;
    getDisabledCompatibleChildren(element: any): any;
    isNoTitle(): boolean;
    onPopupAlign: (domNode: any, align: any) => void;
    render(): JSX.Element;
}
