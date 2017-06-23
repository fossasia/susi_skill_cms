/// <reference types="react" />
import React from 'react';
export interface CheckableTagProps {
    prefixCls?: string;
    className?: string;
    checked: boolean;
    onChange?: (checked: Boolean) => void;
}
export default class CheckableTag extends React.Component<CheckableTagProps, any> {
    handleClick: () => void;
    render(): JSX.Element;
}
