/// <reference types="react" />
import React from 'react';
import { TimeLineItemProps } from './TimelineItem';
export interface TimelineProps {
    prefixCls?: string;
    className?: string;
    /** 指定最后一个幽灵节点是否存在或内容 */
    pending?: React.ReactNode;
    style?: React.CSSProperties;
}
export default class Timeline extends React.Component<TimelineProps, any> {
    static Item: React.ClassicComponentClass<TimeLineItemProps>;
    static defaultProps: {
        prefixCls: string;
    };
    render(): JSX.Element;
}
