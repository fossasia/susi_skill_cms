/// <reference types="react" />
import React from 'react';
export interface SiderProps {
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    collapsible?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    reverseArrow?: boolean;
    onCollapse?: (collapsed: boolean, type: 'clickTrigger' | 'responsive') => void;
    trigger?: React.ReactNode;
    width?: number | string;
    collapsedWidth?: number | string;
    breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
export default class Sider extends React.Component<SiderProps, any> {
    static __ANT_LAYOUT_SIDER: any;
    static defaultProps: {
        prefixCls: string;
        collapsible: boolean;
        defaultCollapsed: boolean;
        reverseArrow: boolean;
        width: number;
        collapsedWidth: number;
        style: {};
    };
    private mql;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    responsiveHandler: (mql: any) => void;
    setCollapsed: (collapsed: any, type: any) => void;
    toggle: () => void;
    belowShowChange: () => void;
    render(): JSX.Element;
}
