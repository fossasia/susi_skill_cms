/// <reference types="react" />
import React from 'react';
import { ColProps } from '../grid/col';
import { WrappedFormUtils } from './Form';
export interface FormItemColOption extends ColProps {
    span: number;
}
export interface FormItemProps {
    prefixCls?: string;
    id?: string;
    label?: React.ReactNode;
    labelCol?: FormItemColOption;
    wrapperCol?: FormItemColOption;
    help?: React.ReactNode;
    extra?: React.ReactNode;
    validateStatus?: 'success' | 'warning' | 'error' | 'validating';
    hasFeedback?: boolean;
    className?: string;
    required?: boolean;
    style?: React.CSSProperties;
    colon?: boolean;
}
export interface FormItemContext {
    form: WrappedFormUtils;
    vertical: boolean;
}
export default class FormItem extends React.Component<FormItemProps, any> {
    static defaultProps: {
        hasFeedback: boolean;
        prefixCls: string;
        colon: boolean;
    };
    static propTypes: {
        prefixCls: any;
        label: any;
        labelCol: any;
        help: any;
        validateStatus: any;
        hasFeedback: any;
        wrapperCol: any;
        className: any;
        id: any;
        children: any;
        colon: any;
    };
    static contextTypes: {
        form: any;
        vertical: any;
    };
    context: FormItemContext;
    componentDidMount(): void;
    shouldComponentUpdate(...args: any[]): any;
    getHelpMsg(): {} | null | undefined;
    getControls(children: any, recursively: boolean): React.ReactElement<any>[];
    getOnlyControl(): React.ReactElement<any> | null;
    getChildProp(prop: any): any;
    getId(): any;
    getMeta(): any;
    renderHelp(): JSX.Element | null;
    renderExtra(): JSX.Element | null;
    getValidateStatus(): "" | "error" | "success" | "validating";
    renderValidateWrapper(c1: any, c2: any, c3: any): JSX.Element;
    renderWrapper(children: any): JSX.Element;
    isRequired(): any;
    renderLabel(): JSX.Element | null;
    renderChildren(): (JSX.Element | null)[];
    renderFormItem(children: any): JSX.Element;
    render(): JSX.Element;
}
