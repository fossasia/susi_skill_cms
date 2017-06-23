/// <reference types="react" />
import React from 'react';
export interface CheckboxOptionType {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface AbstractCheckboxGroupProps {
    prefixCls?: string;
    className?: string;
    options?: Array<CheckboxOptionType | string>;
    disabled?: boolean;
    style?: React.CSSProperties;
}
export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
    defaultValue?: Array<string>;
    value?: Array<string>;
    onChange?: (checkedValue: Array<string>) => void;
}
export interface CheckboxGroupState {
    value: any;
}
export default class CheckboxGroup extends React.Component<CheckboxGroupProps, CheckboxGroupState> {
    static defaultProps: {
        options: never[];
        prefixCls: string;
    };
    static propTypes: {
        defaultValue: any;
        value: any;
        options: any;
        onChange: any;
    };
    static childContextTypes: {
        checkboxGroup: any;
    };
    constructor(props: any);
    getChildContext(): {
        checkboxGroup: {
            toggleOption: (option: any) => void;
            value: any;
            disabled: boolean | undefined;
        };
    };
    componentWillReceiveProps(nextProps: any): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    getOptions(): CheckboxOptionType[];
    toggleOption: (option: any) => void;
    render(): JSX.Element;
}
