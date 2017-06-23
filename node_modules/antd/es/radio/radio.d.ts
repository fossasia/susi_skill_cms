/// <reference types="react" />
import React from 'react';
import { AbstractCheckboxProps } from '../checkbox/Checkbox';
import RadioGroup from './group';
import RadioButton from './radioButton';
export declare type RadioProps = AbstractCheckboxProps;
export default class Radio extends React.Component<RadioProps, any> {
    static Group: typeof RadioGroup;
    static Button: typeof RadioButton;
    static defaultProps: {
        prefixCls: string;
        type: string;
    };
    static contextTypes: {
        radioGroup: any;
    };
    shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any): boolean;
    render(): JSX.Element;
}
