/// <reference types="react" />
import React from 'react';
import { ButtonGroupProps } from '../button/button-group';
export interface DropdownButtonProps extends ButtonGroupProps {
    type?: 'primary' | 'ghost' | 'dashed';
    onClick?: React.MouseEventHandler<any>;
    trigger?: ('click' | 'hover')[];
    align?: any;
    overlay: React.ReactNode;
    visible?: boolean;
    disabled?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    children?: any;
    placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
}
export default class DropdownButton extends React.Component<DropdownButtonProps, any> {
    static defaultProps: {
        placement: string;
        type: string;
        prefixCls: string;
    };
    render(): JSX.Element;
}
