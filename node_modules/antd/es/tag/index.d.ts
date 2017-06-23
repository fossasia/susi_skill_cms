/// <reference types="react" />
import React from 'react';
import CheckableTag from './CheckableTag';
export interface TagProps {
    prefixCls?: string;
    className?: string;
    color?: string;
    /** 标签是否可以关闭 */
    closable?: boolean;
    /** 关闭时的回调 */
    onClose?: Function;
    /** 动画关闭后的回调 */
    afterClose?: Function;
    style?: React.CSSProperties;
}
export default class Tag extends React.Component<TagProps, any> {
    static CheckableTag: typeof CheckableTag;
    static defaultProps: {
        prefixCls: string;
        closable: boolean;
    };
    constructor(props: TagProps);
    close: (e: any) => void;
    animationEnd: (_: any, existed: any) => void;
    isPresetColor(color: any): boolean;
    render(): JSX.Element;
}
