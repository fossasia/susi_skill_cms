/// <reference types="react" />
import React from 'react';
export default class Calendar extends React.Component<any, any> {
    static defaultProps: {
        locale: any;
        prefixCls: string;
    };
    render(): JSX.Element;
}
