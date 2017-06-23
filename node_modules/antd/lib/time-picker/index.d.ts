/// <reference types="react" />
import React from 'react';
import moment from 'moment';
export interface TimePickerProps {
    className?: string;
    size?: 'large' | 'default' | 'small';
    value?: moment.Moment;
    defaultValue?: moment.Moment;
    open?: boolean;
    format?: string;
    onChange?: (time: moment.Moment, timeString: string) => void;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    placeholder?: string;
    hideDisabledOptions?: boolean;
    disabledHours?: () => number[];
    disabledMinutes?: (selectedHour: number) => number[];
    disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
    style?: React.CSSProperties;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    addon?: Function;
    use12Hours?: boolean;
}
declare const _default: React.ComponentClass<TimePickerProps>;
export default _default;
