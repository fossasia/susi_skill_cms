/// <reference types="react" />
import React from 'react';
import { AbstractCheckboxGroupProps } from '../checkbox/Group';
export interface RadioGroupProps extends AbstractCheckboxGroupProps {
    defaultValue?: string | number;
    value?: string | number;
    onChange?: React.FormEventHandler<any>;
    size?: 'large' | 'default' | 'small';
    onMouseEnter?: React.FormEventHandler<any>;
    onMouseLeave?: React.FormEventHandler<any>;
}
export default class RadioGroup extends React.Component<RadioGroupProps, any> {
    static defaultProps: {
        disabled: boolean;
    };
    static childContextTypes: {
        radioGroup: any;
    };
    constructor(props: any);
    getChildContext(): {
        radioGroup: {
            onChange: (ev: any) => void;
            value: any;
            disabled: boolean | undefined;
        };
    };
    componentWillReceiveProps(nextProps: any): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    onRadioChange: (ev: any) => void;
    render(): JSX.Element;
}
