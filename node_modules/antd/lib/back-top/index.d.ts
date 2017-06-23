/// <reference types="react" />
import React from 'react';
export interface BackTopProps {
    visibilityHeight?: number;
    onClick?: React.MouseEventHandler<any>;
    target?: () => HTMLElement | Window;
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
}
export default class BackTop extends React.Component<BackTopProps, any> {
    static defaultProps: {
        visibilityHeight: number;
    };
    scrollEvent: any;
    constructor(props: any);
    getCurrentScrollTop: () => number;
    scrollToTop: (e: any) => void;
    setScrollTop(value: any): void;
    handleScroll: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
