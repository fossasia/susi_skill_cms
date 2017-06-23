/// <reference types="react" />
import React from 'react';
export interface SwitchProps {
    prefixCls?: string;
    size?: 'small' | 'default';
    className?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => any;
    checkedChildren?: React.ReactNode;
    unCheckedChildren?: React.ReactNode;
    disabled?: boolean;
}
export default class Switch extends React.Component<SwitchProps, any> {
    static defaultProps: {
        prefixCls: string;
    };
    static propTypes: {
        prefixCls: any;
        size: any;
        className: any;
    };
    render(): JSX.Element;
}
