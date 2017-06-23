/// <reference types="react" />
import React from 'react';
export interface ColSize {
    span?: number;
    order?: number;
    offset?: number;
    push?: number;
    pull?: number;
}
export interface ColProps {
    className?: string;
    span?: number;
    order?: number;
    offset?: number;
    push?: number;
    pull?: number;
    xs?: number | ColSize;
    sm?: number | ColSize;
    md?: number | ColSize;
    lg?: number | ColSize;
    xl?: number | ColSize;
    prefixCls?: string;
    style?: React.CSSProperties;
}
export default class Col extends React.Component<ColProps, any> {
    static propTypes: {
        span: any;
        order: any;
        offset: any;
        push: any;
        pull: any;
        className: any;
        children: any;
        xs: any;
        sm: any;
        md: any;
        lg: any;
        xl: any;
    };
    render(): JSX.Element;
}
