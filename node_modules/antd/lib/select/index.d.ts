/// <reference types="react" />
import React from 'react';
export interface AbstractSelectProps {
    prefixCls?: string;
    className?: string;
    size?: 'default' | 'large' | 'small';
    notFoundContent?: React.ReactNode | null;
    transitionName?: string;
    choiceTransitionName?: string;
    showSearch?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    placeholder?: string;
    dropdownClassName?: string;
    dropdownStyle?: React.CSSProperties;
    dropdownMenuStyle?: React.CSSProperties;
    onSearch?: (value: string) => any;
    filterOption?: boolean | ((inputValue: string, option: Object) => any);
}
export interface LabeledValue {
    key: string;
    label: React.ReactNode;
}
export declare type SelectValue = string | any[] | LabeledValue | LabeledValue[];
export interface SelectProps extends AbstractSelectProps {
    value?: SelectValue;
    defaultValue?: SelectValue;
    mode?: 'default' | 'multiple' | 'tags' | 'combobox';
    multiple?: boolean;
    tags?: boolean;
    combobox?: boolean;
    optionLabelProp?: string;
    onChange?: (value: SelectValue) => void;
    onSelect?: (value: SelectValue, option: Object) => any;
    onDeselect?: (value: SelectValue) => any;
    dropdownMatchSelectWidth?: boolean;
    optionFilterProp?: string;
    defaultActiveFirstOption?: boolean;
    labelInValue?: boolean;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    tokenSeparators?: string[];
    getInputElement?: () => React.ReactElement<any>;
}
export interface OptionProps {
    disabled?: boolean;
    value?: any;
}
export interface OptGroupProps {
    label?: string | React.ReactElement<any>;
}
export interface SelectContext {
    antLocale?: {
        Select?: any;
    };
}
export default class Select extends React.Component<SelectProps, any> {
    static Option: React.ClassicComponentClass<OptionProps>;
    static OptGroup: React.ClassicComponentClass<OptGroupProps>;
    static defaultProps: {
        prefixCls: string;
        showSearch: boolean;
        transitionName: string;
        choiceTransitionName: string;
    };
    static propTypes: {
        prefixCls: any;
        className: any;
        size: any;
        combobox: any;
        notFoundContent: any;
        showSearch: any;
        optionLabelProp: any;
        transitionName: any;
        choiceTransitionName: any;
    };
    static contextTypes: {
        antLocale: any;
    };
    context: SelectContext;
    getLocale(): any;
    render(): JSX.Element;
}
