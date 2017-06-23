/// <reference types="react" />
import React from 'react';
export interface RowProps {
    className?: string;
    gutter?: number;
    type?: 'flex';
    align?: 'top' | 'middle' | 'bottom';
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
    style?: React.CSSProperties;
    prefixCls?: string;
}
export default class Row extends React.Component<RowProps, any> {
    static defaultProps: {
        gutter: number;
    };
    static propTypes: {
        type: any;
        align: any;
        justify: any;
        className: any;
        children: any;
        gutter: any;
        prefixCls: any;
    };
    render(): JSX.Element;
}
