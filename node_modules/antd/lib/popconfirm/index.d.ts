/// <reference types="react" />
import React from 'react';
import { AbstractTooltipProps } from '../tooltip';
export interface PopconfirmProps extends AbstractTooltipProps {
    title: React.ReactNode;
    onConfirm?: (e: React.MouseEvent<any>) => void;
    onCancel?: (e: React.MouseEvent<any>) => void;
    okText?: React.ReactNode;
    cancelText?: React.ReactNode;
}
declare const _default: React.ComponentClass<PopconfirmProps>;
export default _default;
