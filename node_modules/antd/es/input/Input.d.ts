/// <reference types="react" />
import React from 'react';
import { Component } from 'react';
export interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}
export interface InputProps {
    prefixCls?: string;
    className?: string;
    type?: string;
    id?: number | string;
    name?: string;
    value?: any;
    defaultValue?: any;
    placeholder?: string;
    size?: 'large' | 'default' | 'small';
    disabled?: boolean;
    readOnly?: boolean;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    onKeyDown?: React.FormEventHandler<any>;
    onChange?: React.FormEventHandler<any>;
    onPressEnter?: React.FormEventHandler<any>;
    onClick?: React.FormEventHandler<any>;
    onFocus?: React.FormEventHandler<any>;
    onBlur?: React.FormEventHandler<any>;
    autosize?: boolean | AutoSizeType;
    autoComplete?: 'on' | 'off';
    style?: React.CSSProperties;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    spellCheck?: boolean;
    autoFocus?: boolean;
}
export default class Input extends Component<InputProps, any> {
    static Group: any;
    static Search: any;
    static defaultProps: {
        disabled: boolean;
        prefixCls: string;
        type: string;
        autosize: boolean;
    };
    static propTypes: {
        type: any;
        id: any;
        size: any;
        disabled: any;
        value: any;
        defaultValue: any;
        className: any;
        addonBefore: any;
        addonAfter: any;
        prefixCls: any;
        autosize: any;
        onPressEnter: any;
        onKeyDown: any;
        onFocus: any;
        onBlur: any;
        prefix: any;
        suffix: any;
    };
    nextFrameActionId: number;
    refs: {
        input: any;
    };
    state: {
        textareaStyles: null;
        isFocus: boolean;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    handleKeyDown: (e: any) => void;
    handleTextareaChange: (e: any) => void;
    resizeTextarea: () => void;
    focus(): void;
    renderLabeledInput(children: any): any;
    renderLabeledIcon(children: any): any;
    renderInput(): any;
    render(): any;
}
