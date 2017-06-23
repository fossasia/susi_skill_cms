/// <reference types="react" />
import React from 'react';
import FormItem from './FormItem';
export interface FormCreateOption {
    onFieldsChange?: (props: any, fields: Array<any>) => void;
    onValuesChange?: (props: any, values: any) => void;
    mapPropsToFields?: (props: any) => void;
    withRef?: boolean;
}
export interface FormProps {
    layout?: 'horizontal' | 'inline' | 'vertical';
    horizontal?: boolean;
    inline?: boolean;
    vertical?: boolean;
    form?: WrappedFormUtils;
    onSubmit?: React.FormEventHandler<any>;
    style?: React.CSSProperties;
    className?: string;
    prefixCls?: string;
    hideRequiredMark?: boolean;
}
export declare type ValidationRule = {
    /** validation error message */
    message?: string;
    /** built-in validation type, available options: https://github.com/yiminghe/async-validator#type */
    type?: string;
    /** indicates whether field is required */
    required?: boolean;
    /** treat required fields that only contain whitespace as errors */
    whitespace?: boolean;
    /** validate the exact length of a field */
    len?: number;
    /** validate the min length of a field */
    min?: number;
    /** validate the max length of a field */
    max?: number;
    /** validate the value from a list of possible values */
    enum?: string | string[];
    /** validate from a regular expression */
    pattern?: RegExp;
    /** transform a value before validation */
    transform?: (value: any) => any;
    /** custom validate function (Note: callback must be called) */
    validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any;
};
export declare type ValidateCallback = (erros: any, values: any) => void;
export declare type WrappedFormUtils = {
    /** 获取一组输入控件的值，如不传入参数，则获取全部组件的值 */
    getFieldsValue(fieldNames?: Array<string>): Object;
    /** 获取一个输入控件的值*/
    getFieldValue(fieldName: string): any;
    /** 设置一组输入控件的值*/
    setFieldsValue(obj: Object): void;
    /** 设置一组输入控件的值*/
    setFields(obj: Object): void;
    /** 校验并获取一组输入域的值与 Error */
    validateFields(fieldNames: Array<string>, options: Object, callback: ValidateCallback): any;
    validateFields(fieldNames: Array<string>, callback: ValidateCallback): any;
    validateFields(options: Object, callback: ValidateCallback): any;
    validateFields(callback: ValidateCallback): any;
    /** 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 */
    validateFieldsAndScroll(fieldNames?: Array<string>, options?: Object, callback?: ValidateCallback): void;
    validateFieldsAndScroll(fieldNames?: Array<string>, callback?: ValidateCallback): void;
    validateFieldsAndScroll(options?: Object, callback?: ValidateCallback): void;
    validateFieldsAndScroll(callback?: ValidateCallback): void;
    /** 获取某个输入控件的 Error */
    getFieldError(name: string): Object[];
    getFieldsError(names?: Array<string>): Object;
    /** 判断一个输入控件是否在校验状态*/
    isFieldValidating(name: string): boolean;
    isFieldTouched(name: string): boolean;
    isFieldsTouched(names?: Array<string>): boolean;
    /** 重置一组输入控件的值与状态，如不传入参数，则重置所有组件 */
    resetFields(names?: Array<string>): void;
    getFieldDecorator(id: string, options?: {
        /** 子节点的值的属性，如 Checkbox 的是 'checked' */
        valuePropName?: string;
        /** 子节点的初始值，类型、可选值均由子节点决定 */
        initialValue?: any;
        /** 收集子节点的值的时机 */
        trigger?: string;
        /** 可以把 onChange 的参数转化为控件的值，例如 DatePicker 可设为：(date, dateString) => dateString */
        getValueFromEvent?: (...args: any[]) => any;
        /** 校验子节点值的时机 */
        validateTrigger?: string | string[];
        /** 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) */
        rules?: ValidationRule[];
        /** 是否和其他控件互斥，特别用于 Radio 单选控件 */
        exclusive?: boolean;
    }): (node: React.ReactNode) => React.ReactNode;
};
export interface FormComponentProps {
    form: WrappedFormUtils;
}
export interface ComponentDecorator<TOwnProps> {
    (component: React.ComponentClass<FormComponentProps & TOwnProps>): React.ComponentClass<TOwnProps>;
}
export default class Form extends React.Component<FormProps, any> {
    static defaultProps: {
        prefixCls: string;
        layout: string;
        hideRequiredMark: boolean;
        onSubmit(e: any): void;
    };
    static propTypes: {
        prefixCls: any;
        layout: any;
        children: any;
        onSubmit: any;
        hideRequiredMark: any;
    };
    static childContextTypes: {
        vertical: any;
    };
    static Item: typeof FormItem;
    static create: <TOwnProps>(options?: FormCreateOption | undefined) => ComponentDecorator<TOwnProps>;
    constructor(props: any);
    shouldComponentUpdate(...args: any[]): any;
    getChildContext(): {
        vertical: boolean | undefined;
    };
    render(): JSX.Element;
}
