/// <reference types="react" />
import React from 'react';
export interface AvatarProps {
    /** Shape of avatar, options:`circle`, `square` */
    shape?: 'circle' | 'square';
    /** Size of avatar, options:`large`, `small`, `default` */
    size?: 'large' | 'small' | 'default';
    /** Src of image avatar */
    src?: string;
    /** Type of the Icon to be used in avatar */
    icon?: string;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    children?: any;
}
export default class Avatar extends React.Component<AvatarProps, any> {
    static defaultProps: {
        prefixCls: string;
        shape: string;
        size: string;
    };
    private avatarChildren;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    setScale: () => void;
    render(): JSX.Element;
}
