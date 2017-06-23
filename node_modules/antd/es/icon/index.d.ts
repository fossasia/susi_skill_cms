/// <reference types="react" />
import React from 'react';
export interface IconProps {
    type: string;
    className?: string;
    title?: string;
    onClick?: React.MouseEventHandler<any>;
    spin?: boolean;
    style?: React.CSSProperties;
}
declare const Icon: (props: IconProps) => JSX.Element;
export default Icon;
