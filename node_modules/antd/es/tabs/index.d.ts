/// <reference types="react" />
import React from 'react';
export declare type TabsType = 'line' | 'card' | 'editable-card';
export declare type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export interface TabsProps {
    activeKey?: string;
    defaultActiveKey?: string;
    hideAdd?: boolean;
    onChange?: (activeKey: string) => void;
    onTabClick?: Function;
    onPrevClick?: React.MouseEventHandler<any>;
    onNextClick?: React.MouseEventHandler<any>;
    tabBarExtraContent?: React.ReactNode | null;
    tabBarStyle?: React.CSSProperties;
    type?: TabsType;
    tabPosition?: TabsPosition;
    onEdit?: (targetKey: string, action: any) => void;
    size?: 'default' | 'small';
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    animated?: boolean | {
        inkBar: boolean;
        tabPane: boolean;
    };
}
export interface TabPaneProps {
    /** 选项卡头显示文字 */
    tab?: React.ReactNode | string;
    style?: React.CSSProperties;
    closable?: boolean;
    className?: string;
    disabled?: boolean;
}
export default class Tabs extends React.Component<TabsProps, any> {
    static TabPane: React.ClassicComponentClass<TabPaneProps>;
    static defaultProps: {
        prefixCls: string;
        hideAdd: boolean;
    };
    createNewTab: (targetKey: any) => void;
    removeTab: (targetKey: any, e: any) => void;
    handleChange: (activeKey: any) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
