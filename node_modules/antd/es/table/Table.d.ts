/// <reference types="react" />
import React from 'react';
import { PaginationProps } from '../pagination';
import { SpinProps } from '../spin';
import { Store } from './createStore';
import { SelectionDecorator } from './SelectionCheckboxAll';
import Column, { ColumnProps } from './Column';
import ColumnGroup from './ColumnGroup';
export declare type TableColumnConfig<T> = ColumnProps<T>;
export interface TableRowSelection<T> {
    type?: 'checkbox' | 'radio';
    selectedRowKeys?: string[] | number[];
    onChange?: (selectedRowKeys: string[] | number[], selectedRows: Object[]) => any;
    getCheckboxProps?: (record: T) => Object;
    onSelect?: (record: T, selected: boolean, selectedRows: Object[]) => any;
    onSelectAll?: (selected: boolean, selectedRows: Object[], changeRows: Object[]) => any;
    onSelectInvert?: (selectedRows: Object[]) => any;
    selections?: SelectionDecorator[] | boolean;
}
export interface TableProps<T> {
    prefixCls?: string;
    dropdownPrefixCls?: string;
    rowSelection?: TableRowSelection<T>;
    pagination?: PaginationProps | boolean;
    size?: 'default' | 'middle' | 'small';
    dataSource?: T[];
    columns?: ColumnProps<T>[];
    rowKey?: string | ((record: T, index: number) => string);
    rowClassName?: (record: T, index: number) => string;
    expandedRowRender?: any;
    defaultExpandedRowKeys?: string[] | number[];
    expandedRowKeys?: string[] | number[];
    expandIconAsCell?: boolean;
    expandIconColumnIndex?: number;
    onExpandedRowsChange?: (expandedRowKeys: string[] | number[]) => void;
    onExpand?: (expanded: boolean, record: T) => void;
    onChange?: (pagination: PaginationProps | boolean, filters: string[], sorter: Object) => any;
    loading?: boolean | SpinProps;
    locale?: Object;
    indentSize?: number;
    onRowClick?: (record: T, index: number) => any;
    useFixedHeader?: boolean;
    bordered?: boolean;
    showHeader?: boolean;
    footer?: (currentPageData: Object[]) => React.ReactNode;
    title?: (currentPageData: Object[]) => React.ReactNode;
    scroll?: {
        x?: boolean | number;
        y?: boolean | number;
    };
    childrenColumnName?: string;
    bodyStyle?: React.CSSProperties;
    className?: string;
    style?: React.CSSProperties;
}
export interface TableContext {
    antLocale?: {
        Table?: any;
    };
}
export default class Table<T> extends React.Component<TableProps<T>, any> {
    static Column: typeof Column;
    static ColumnGroup: typeof ColumnGroup;
    static propTypes: {
        dataSource: any;
        columns: any;
        prefixCls: any;
        useFixedHeader: any;
        rowSelection: any;
        className: any;
        size: any;
        loading: any;
        bordered: any;
        onChange: any;
        locale: any;
        dropdownPrefixCls: any;
    };
    static defaultProps: {
        dataSource: never[];
        prefixCls: string;
        useFixedHeader: boolean;
        rowSelection: null;
        className: string;
        size: string;
        loading: boolean;
        bordered: boolean;
        indentSize: number;
        locale: {};
        rowKey: string;
        showHeader: boolean;
    };
    static contextTypes: {
        antLocale: any;
    };
    context: TableContext;
    CheckboxPropsCache: Object;
    store: Store;
    columns: ColumnProps<T>[];
    constructor(props: any);
    getCheckboxPropsByItem: (item: any, index: any) => any;
    getDefaultSelection(): string[];
    getDefaultPagination(props: any): any;
    getLocale(): any;
    componentWillReceiveProps(nextProps: any): void;
    setSelectedRowKeys(selectedRowKeys: any, {selectWay, record, checked, changeRowKeys}: any): void;
    hasPagination(props?: any): boolean;
    isFiltersChanged(filters: any): boolean;
    getSortOrderColumns(columns?: any): any;
    getFilteredValueColumns(columns?: any): any;
    getFiltersFromColumns(columns?: any): {};
    getSortStateFromColumns(columns?: any): {
        sortColumn: any;
        sortOrder: any;
    };
    getSorterFn(): ((a: any, b: any) => any) | undefined;
    toggleSortOrder(order: any, column: any): void;
    handleFilter: (column: any, nextFilters: any) => void;
    handleSelect: (record: any, rowIndex: any, e: any) => void;
    handleRadioSelect: (record: any, rowIndex: any, e: any) => void;
    handleSelectRow: (selectionKey: any, index: any, onSelectFunc: any) => any;
    handlePageChange: (current: any, ...otherArguments: any[]) => void;
    renderSelectionBox: (type: any) => (_: any, record: any, index: any) => JSX.Element;
    getRecordKey: (record: any, index: any) => string;
    getPopupContainer: () => HTMLElement;
    renderRowSelection(): ColumnProps<T>[];
    getColumnKey(column: any, index?: any): any;
    getMaxCurrent(total: any): any;
    isSortColumn(column: any): boolean;
    renderColumnsDropdown(columns: any): any[];
    handleShowSizeChange: (current: any, pageSize: any) => void;
    renderPagination(): JSX.Element | null;
    prepareParamsArguments(state: any): [any, string[], Object];
    findColumn(myKey: any): any;
    getCurrentPageData(): T[];
    getFlatData(): Object[];
    getFlatCurrentPageData(): Object[];
    recursiveSort(data: any, sorterFn: any): any;
    getLocalData(): T[];
    render(): JSX.Element;
}
