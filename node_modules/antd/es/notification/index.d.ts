/// <reference types="react" />
import React from 'react';
export declare type notificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export interface ArgsProps {
    message: React.ReactNode;
    description: React.ReactNode;
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number;
    icon?: React.ReactNode;
    placement?: notificationPlacement;
    style?: string;
    className?: string;
}
export interface ConfigProps {
    top?: number;
    bottom?: number;
    duration?: number;
    placement?: notificationPlacement;
    getContainer?: () => HTMLElement;
}
export interface NotificationApi {
    success(args: ArgsProps): void;
    error(args: ArgsProps): void;
    info(args: ArgsProps): void;
    warn(args: ArgsProps): void;
    warning(args: ArgsProps): void;
    open(args: ArgsProps): void;
    close(key: string): void;
    config(options: ConfigProps): void;
    destroy(): void;
}
declare const _default: NotificationApi;
export default _default;
