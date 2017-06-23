/// <reference types="react" />
import React from 'react';
export interface SliderMarks {
    [key: number]: React.ReactNode | {
        style: React.CSSProperties;
        label: React.ReactNode;
    };
}
export declare type SliderValue = number | [number, number];
export interface SliderProps {
    prefixCls?: string;
    tooltipPrefixCls?: string;
    range?: boolean;
    min?: number;
    max?: number;
    step?: number | void;
    marks?: SliderMarks;
    dots?: boolean;
    value?: SliderValue;
    defaultValue?: SliderValue;
    included?: boolean;
    disabled?: boolean;
    vertical?: boolean;
    onChange?: (value: SliderValue) => void;
    onAfterChange?: (value: SliderValue) => void;
    tipFormatter?: void | ((value: number) => React.ReactNode);
}
export default class Slider extends React.Component<SliderProps, any> {
    static defaultProps: {
        prefixCls: string;
        tooltipPrefixCls: string;
        tipFormatter(value: any): any;
    };
    constructor(props: any);
    toggleTooltipVisible: (index: any, visible: any) => void;
    handleWithTooltip: ({value, dragging, index, ...restProps}: {
        [x: string]: any;
        value: any;
        dragging: any;
        index: any;
    }) => JSX.Element;
    render(): JSX.Element;
}
