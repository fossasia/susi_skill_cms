/// <reference types="react" />
import React from 'react';
export interface ILazyRenderBoxPropTypes {
    className?: string;
    visible?: boolean;
    hiddenClassName?: string;
    role?: string;
    style?: {};
}
export default class LazyRenderBox extends React.Component<ILazyRenderBoxPropTypes, any> {
    shouldComponentUpdate(nextProps: any): boolean;
    render(): JSX.Element;
}
