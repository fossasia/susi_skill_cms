/// <reference types="react" />
import React from 'react';
export interface MentionProps {
    prefixCls?: string;
    suggestionStyle?: React.CSSProperties;
    suggestions?: Array<any>;
    onSearchChange?: Function;
    onChange?: Function;
    notFoundContent?: any;
    loading?: Boolean;
    style?: React.CSSProperties;
    defaultValue?: any;
    value?: any;
    className?: string;
    multiLines?: Boolean;
    prefix?: string;
    placeholder?: string;
    getSuggestionContainer?: (triggerNode: Element) => HTMLElement;
    onFocus?: Function;
    onBlur?: Function;
    readOnly?: boolean;
    disabled?: boolean;
}
export interface MentionState {
    suggestions?: Array<any>;
    focus?: Boolean;
}
export default class Mention extends React.Component<MentionProps, MentionState> {
    static getMentions: any;
    static defaultProps: {
        prefixCls: string;
        notFoundContent: string;
        loading: boolean;
        multiLines: boolean;
    };
    static Nav: any;
    static toString: any;
    static toContentState: any;
    static toEditorState: (text: any) => any;
    constructor(props: any);
    componentWillReceiveProps(nextProps: MentionProps): void;
    onSearchChange: (value: any, prefix: any) => any;
    onChange: (editorState: any) => void;
    defaultSearchChange(value: String): void;
    onFocus: (ev: any) => void;
    onBlur: (ev: any) => void;
    render(): JSX.Element;
}
