/// <reference types="react" />
import React from 'react';
export interface ProgressProps {
    prefixCls?: string;
    className?: string;
    type?: 'line' | 'circle' | 'dashboard';
    percent?: number;
    format?: (percent: number) => string;
    status?: 'success' | 'active' | 'exception';
    showInfo?: boolean;
    strokeWidth?: number;
    trailColor?: string;
    width?: number;
    style?: React.CSSProperties;
    gapDegree?: number;
    gapPosition?: 'top' | 'bottom' | 'left' | 'right';
}
export default class Progress extends React.Component<ProgressProps, any> {
    static Line: any;
    static Circle: any;
    static defaultProps: {
        type: string;
        percent: number;
        showInfo: boolean;
        trailColor: string;
        prefixCls: string;
    };
    static propTypes: {
        status: any;
        type: any;
        showInfo: any;
        percent: any;
        width: any;
        strokeWidth: any;
        trailColor: any;
        format: any;
        gapDegree: any;
    };
    render(): JSX.Element;
}
