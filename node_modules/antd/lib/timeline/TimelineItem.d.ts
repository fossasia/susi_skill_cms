/// <reference types="react" />
import React from 'react';
export interface TimeLineItemProps {
    prefixCls?: string;
    className?: string;
    color?: string;
    dot?: React.ReactNode;
    pending?: boolean;
    last?: boolean;
    style?: React.CSSProperties;
}
export default class TimelineItem extends React.Component<TimeLineItemProps, any> {
    static defaultProps: {
        prefixCls: string;
        color: string;
        last: boolean;
        pending: boolean;
    };
    render(): JSX.Element;
}
