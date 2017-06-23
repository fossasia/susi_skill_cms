/// <reference types="react" />
import React from 'react';
export interface TransferOperationProps {
    className?: string;
    leftArrowText?: string;
    rightArrowText?: string;
    moveToLeft?: React.FormEventHandler<any>;
    moveToRight?: React.FormEventHandler<any>;
    leftActive?: boolean;
    rightActive?: boolean;
}
export default class TransferOperation extends React.Component<TransferOperationProps, any> {
    static defaultProps: {
        leftArrowText: string;
        rightArrowText: string;
        moveToLeft: () => void;
        moveToRight: () => void;
    };
    render(): JSX.Element;
}
