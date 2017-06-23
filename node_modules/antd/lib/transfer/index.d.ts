/// <reference types="react" />
import React from 'react';
import { TransferListProps } from './list';
export interface TransferItem {
    key: string;
    title: string;
    description?: string;
    disabled?: boolean;
}
export interface TransferProps {
    prefixCls?: string;
    className?: string;
    dataSource: TransferItem[];
    targetKeys: string[];
    selectedKeys?: string[];
    render?: (record: TransferItem) => React.ReactNode;
    onChange?: (targetKeys: string[], direction: string, moveKeys: any) => void;
    onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
    style?: React.CSSProperties;
    listStyle?: React.CSSProperties;
    titles?: string[];
    operations?: string[];
    showSearch?: boolean;
    filterOption: (inputValue: any, item: any) => boolean;
    searchPlaceholder?: string;
    notFoundContent?: React.ReactNode;
    footer?: (props: TransferListProps) => React.ReactNode;
    body?: (props: TransferListProps) => React.ReactNode;
    rowKey?: (record: TransferItem) => string;
    onSearchChange?: (direction: 'left' | 'right', e: Event) => void;
    lazy?: {};
    onScroll?: (direction: 'left' | 'right', e: Event) => void;
}
declare const _default: React.ComponentClass<TransferProps>;
export default _default;
