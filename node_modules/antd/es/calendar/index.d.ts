/// <reference types="react" />
import React from 'react';
import moment from 'moment';
export interface CalendarContext {
    antLocale?: {
        Calendar?: any;
    };
}
export declare type CalendarMode = 'month' | 'year';
export interface CalendarProps {
    prefixCls?: string;
    className?: string;
    value?: moment.Moment;
    defaultValue?: moment.Moment;
    mode?: CalendarMode;
    fullscreen?: boolean;
    dateCellRender?: (date: moment.Moment) => React.ReactNode;
    monthCellRender?: (date: moment.Moment) => React.ReactNode;
    dateFullCellRender?: (date: moment.Moment) => React.ReactNode;
    monthFullCellRender?: (date: moment.Moment) => React.ReactNode;
    locale?: any;
    style?: React.CSSProperties;
    onPanelChange?: (date?: moment.Moment, mode?: CalendarMode) => void;
    onSelect?: (date?: moment.Moment) => void;
    disabledDate?: (current: moment.Moment) => boolean;
}
export interface CalendarState {
    value?: moment.Moment;
    mode?: CalendarMode;
}
export default class Calendar extends React.Component<CalendarProps, CalendarState> {
    static defaultProps: {
        locale: {};
        fullscreen: boolean;
        prefixCls: string;
        mode: string;
        onSelect: () => null;
        onPanelChange: () => null;
    };
    static propTypes: {
        monthCellRender: any;
        dateCellRender: any;
        monthFullCellRender: any;
        dateFullCellRender: any;
        fullscreen: any;
        locale: any;
        prefixCls: any;
        className: any;
        style: any;
        onPanelChange: any;
        value: any;
        onSelect: any;
    };
    static contextTypes: {
        antLocale: any;
    };
    context: CalendarContext;
    constructor(props: any, context: any);
    componentWillReceiveProps(nextProps: CalendarProps): void;
    monthCellRender: (value: any) => JSX.Element;
    dateCellRender: (value: any) => JSX.Element;
    setValue: (value: any, way: "select" | "changePanel") => void;
    setType: (type: any) => void;
    onHeaderValueChange: (value: any) => void;
    onHeaderTypeChange: (type: any) => void;
    onPanelChange(value: any, mode: any): void;
    onSelect: (value: any) => void;
    render(): JSX.Element;
}
