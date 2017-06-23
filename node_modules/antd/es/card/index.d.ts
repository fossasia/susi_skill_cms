/// <reference types="react" />
import React from 'react';
export interface CardProps {
    prefixCls?: string;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    bordered?: boolean;
    bodyStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    loading?: boolean;
    children?: any;
    id?: string;
    className?: string;
}
declare const _default: (props: CardProps) => JSX.Element;
export default _default;
