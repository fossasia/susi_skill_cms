/// <reference types="react" />
import React from 'react';
export interface LocaleProviderProps {
    locale: {
        Pagination?: Object;
        DatePicker?: Object;
        TimePicker?: Object;
        Calendar?: Object;
        Table?: Object;
        Modal?: Object;
        Popconfirm?: Object;
        Transfer?: Object;
        Select?: Object;
    };
    children?: React.ReactElement<any>;
}
export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
    static propTypes: {
        locale: any;
    };
    static childContextTypes: {
        antLocale: any;
    };
    getChildContext(): {
        antLocale: {
            exist: boolean;
            Pagination?: Object | undefined;
            DatePicker?: Object | undefined;
            TimePicker?: Object | undefined;
            Calendar?: Object | undefined;
            Table?: Object | undefined;
            Modal?: Object | undefined;
            Popconfirm?: Object | undefined;
            Transfer?: Object | undefined;
            Select?: Object | undefined;
        };
    };
    componentWillMount(): void;
    componentDidUpdate(): void;
    componentWillUnMount(): void;
    render(): React.ReactElement<any>;
}
