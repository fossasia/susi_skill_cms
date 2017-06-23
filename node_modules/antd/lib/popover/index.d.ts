/// <reference types="react" />
import React from 'react';
import Tooltip from '../tooltip';
import { AbstractTooltipProps } from '../tooltip';
export interface PopoverProps extends AbstractTooltipProps {
    title?: React.ReactNode;
    content?: React.ReactNode;
}
export default class Popover extends React.Component<PopoverProps, any> {
    static defaultProps: {
        prefixCls: string;
        placement: string;
        transitionName: string;
        trigger: string;
        mouseEnterDelay: number;
        mouseLeaveDelay: number;
        overlayStyle: {};
    };
    refs: {
        tooltip: Tooltip;
    };
    getPopupDomNode(): any;
    getOverlay(): JSX.Element;
    render(): JSX.Element;
}
