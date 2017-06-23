/// <reference types="react" />
import React from 'react';
export interface BadgeProps {
    /** Number to show in badge */
    count?: number | string;
    showZero?: boolean;
    /** Max count to show */
    overflowCount?: number;
    /** whether to show red dot without number */
    dot?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
    text?: string;
}
export default class Badge extends React.Component<BadgeProps, any> {
    static defaultProps: {
        prefixCls: string;
        count: null;
        showZero: boolean;
        dot: boolean;
        overflowCount: number;
    };
    static propTypes: {
        count: any;
        showZero: any;
        dot: any;
        overflowCount: any;
    };
    render(): JSX.Element;
}
