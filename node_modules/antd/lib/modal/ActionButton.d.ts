/// <reference types="react" />
import React from 'react';
export interface ActionButtonProps {
    type?: 'primary' | 'dashed';
    actionFn: Function;
    closeModal: Function;
    autoFocus?: Boolean;
}
export default class ActionButton extends React.Component<ActionButtonProps, any> {
    timeoutId: number;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onClick: () => void;
    render(): JSX.Element;
}
