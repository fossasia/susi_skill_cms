/// <reference types="react" />
import React from 'react';
import { AbstractSelectProps, SelectValue, OptionProps, OptGroupProps } from '../select';
export interface DataSourceItemObject {
    value: string;
    text: string;
}
export declare type DataSourceItemType = string | DataSourceItemObject;
export interface InputProps {
    onChange?: React.FormEventHandler<any>;
    value: any;
}
export declare type ValidInputElement = HTMLInputElement | HTMLTextAreaElement | React.ReactElement<InputProps>;
export interface AutoCompleteProps extends AbstractSelectProps {
    value?: SelectValue;
    defaultValue?: SelectValue;
    dataSource: DataSourceItemType[];
    optionLabelProp?: string;
    onChange?: (value: SelectValue) => void;
    onSelect?: (value: SelectValue, option: Object) => any;
    children?: ValidInputElement | React.ReactElement<OptionProps> | Array<React.ReactElement<OptionProps>>;
}
export default class AutoComplete extends React.Component<AutoCompleteProps, any> {
    static Option: React.ClassicComponentClass<OptionProps>;
    static OptGroup: React.ClassicComponentClass<OptGroupProps>;
    static defaultProps: {
        prefixCls: string;
        transitionName: string;
        optionLabelProp: string;
        choiceTransitionName: string;
        showSearch: boolean;
        filterOption: boolean;
    };
    getInputElement: () => JSX.Element;
    render(): JSX.Element;
}
