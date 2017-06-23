/// <reference types="react" />
import React from 'react';
export interface ComponentProps {
    locale?: any;
}
export interface ComponentContext {
    antLocale?: {
        [key: string]: any;
    };
}
declare const _default: (componentName: string, defaultLocale: any) => <P>(Component: typeof React.Component) => React.ComponentClass<P>;
export default _default;
