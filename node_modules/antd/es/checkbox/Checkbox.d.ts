/// <reference types="react" />
import React from 'react';
import CheckboxGroup from './Group';
export interface AbstractCheckboxProps {
    prefixCls?: string;
    className?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
    onChange?: React.FormEventHandler<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
    onMouseLeave?: React.MouseEventHandler<any>;
    value?: any;
    name?: string;
}
export interface CheckboxProps extends AbstractCheckboxProps {
    indeterminate?: boolean;
}
export default class Checkbox extends React.Component<CheckboxProps, any> {
    static Group: typeof CheckboxGroup;
    static defaultProps: {
        prefixCls: string;
        indeterminate: boolean;
    };
    static contextTypes: {
        checkboxGroup: any;
    };
    shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any): boolean;
    render(): JSX.Element;
}
