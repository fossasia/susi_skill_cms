/// <reference types="react" />
import React from 'react';
export interface InputNumberProps {
    prefixCls?: string;
    min?: number;
    max?: number;
    value?: number;
    step?: number | string;
    defaultValue?: number;
    onChange?: (value: number | string | undefined) => void;
    disabled?: boolean;
    size?: 'large' | 'small' | 'default';
    formatter?: (value: number | string | undefined) => string;
    parser?: (displayValue: string | undefined) => number;
    placeholder?: string;
    style?: React.CSSProperties;
    className?: string;
    name?: string;
}
export default class InputNumber extends React.Component<InputNumberProps, any> {
    static defaultProps: {
        prefixCls: string;
        step: number;
    };
    render(): JSX.Element;
}
