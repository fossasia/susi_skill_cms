/// <reference types="react" />
import React from 'react';
import { Store } from './createStore';
export interface SelectionDecorator {
    key: string;
    text: React.ReactNode;
    onSelect: (changeableRowKeys: string[]) => void;
}
export interface SelectionCheckboxAllProps {
    store: Store;
    locale: any;
    disabled: boolean;
    getCheckboxPropsByItem: (item: any, index: number) => any;
    getRecordKey: (record: any, index?: number) => string;
    data: any[];
    prefixCls: string | undefined;
    onSelect: (key: string, index: number, selectFunc: any) => void;
    selections?: SelectionDecorator[] | boolean;
    getPopupContainer: (triggerNode?: Element) => HTMLElement;
}
export default class SelectionCheckboxAll extends React.Component<SelectionCheckboxAllProps, any> {
    unsubscribe: () => void;
    defaultSelections: SelectionDecorator[];
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    subscribe(): void;
    checkSelection(data: any, type: any, byDefaultChecked: any): any;
    setCheckState(props: any): void;
    getCheckState(props: any): any;
    getIndeterminateState(props: any): any;
    handleSelectAllChagne: (e: any) => void;
    renderMenus(selections: SelectionDecorator[]): JSX.Element[];
    render(): JSX.Element;
}
