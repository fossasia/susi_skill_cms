/// <reference types="react" />
import React from 'react';
export interface SelectParam {
    key: string;
    keyPath: Array<string>;
    item: any;
    domEvent: any;
    selectedKeys: Array<string>;
}
export interface ClickParam {
    key: string;
    keyPath: Array<string>;
    item: any;
    domEvent: any;
}
export interface MenuProps {
    id?: string;
    /** `light` `dark` */
    theme?: 'light' | 'dark';
    /** enum: `vertical` `horizontal` `inline` */
    mode?: 'vertical' | 'horizontal' | 'inline';
    selectedKeys?: Array<string>;
    defaultSelectedKeys?: Array<string>;
    openKeys?: Array<string>;
    defaultOpenKeys?: Array<string>;
    onOpenChange?: (openKeys: string[]) => void;
    onSelect?: (param: SelectParam) => void;
    onDeselect?: (param: SelectParam) => void;
    onClick?: (param: ClickParam) => void;
    style?: React.CSSProperties;
    openAnimation?: string | Object;
    openTransitionName?: string | Object;
    className?: string;
    prefixCls?: string;
    multiple?: boolean;
    inlineIndent?: number;
}
export default class Menu extends React.Component<MenuProps, any> {
    static Divider: any;
    static Item: any;
    static SubMenu: any;
    static ItemGroup: any;
    static defaultProps: {
        prefixCls: string;
        className: string;
        theme: string;
    };
    switchModeFromInline: boolean;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    handleClick: (e: any) => void;
    handleOpenChange: (openKeys: string[]) => void;
    setOpenKeys(openKeys: any): void;
    render(): JSX.Element;
}
