/// <reference types="react" />
import React from 'react';
import { Store } from './createStore';
export interface SelectionBoxProps {
    store: Store;
    type: string;
    defaultSelection: string[];
    rowIndex: string;
    disabled?: boolean;
    onChange: (e) => void;
}
export default class SelectionBox extends React.Component<SelectionBoxProps, any> {
    unsubscribe: () => void;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    subscribe(): void;
    getCheckState(props: any): boolean;
    render(): JSX.Element;
}
