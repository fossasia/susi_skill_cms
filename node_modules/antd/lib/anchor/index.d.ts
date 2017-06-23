/// <reference types="react" />
import React from 'react';
import AnchorLink from './AnchorLink';
import AnchorHelper from './anchorHelper';
export interface AnchorProps {
    target?: () => HTMLElement | Window;
    children?: React.ReactNode;
    prefixCls?: string;
    offsetTop?: number;
    bounds?: number;
    className?: string;
    style?: React.CSSProperties;
    affix?: boolean;
    showInkInFixed?: boolean;
}
export default class Anchor extends React.Component<AnchorProps, any> {
    static Link: typeof AnchorLink;
    static defaultProps: {
        prefixCls: string;
        affix: boolean;
        showInkInFixed: boolean;
    };
    static childContextTypes: {
        anchorHelper: any;
    };
    refs: {
        ink?: any;
    };
    private scrollEvent;
    private anchorHelper;
    private _avoidInk;
    constructor(props: AnchorProps);
    handleScroll: () => void;
    getChildContext(): {
        anchorHelper: AnchorHelper;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    updateInk: () => void;
    clickAnchorLink: (href: string, component: HTMLElement) => void;
    renderAnchorLink: (child: React.ReactElement<any>) => React.ReactElement<any>;
    render(): JSX.Element;
}
