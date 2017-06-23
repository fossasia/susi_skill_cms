/// <reference types="react" />
import React from 'react';
export interface SpinProps {
    prefixCls?: string;
    className?: string;
    spinning?: boolean;
    size?: 'small' | 'default' | 'large';
    tip?: string;
    delay?: number;
    wrapperClassName?: string;
}
export default class Spin extends React.Component<SpinProps, any> {
    static defaultProps: {
        prefixCls: string;
        spinning: boolean;
        size: string;
        wrapperClassName: string;
    };
    static propTypes: {
        prefixCls: any;
        className: any;
        spinning: any;
        size: any;
        wrapperClassName: any;
    };
    debounceTimeout: number;
    delayTimeout: number;
    constructor(props: any);
    isNestedPattern(): boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
}
