import React from 'react';
import { EditorState, CompositeDecorator, DraftBlockRenderConfig, DraftInlineStyle } from 'draft-js';
import { List, Map } from 'immutable';
import 'setimmediate';
import exportText from './export/exportText';
export declare type DraftHandleValue = 'handled' | 'not-handled';
export interface Plugin {
    name: string;
    decorators?: Array<any>;
    component?: Function;
    onChange: (editorState: EditorState) => EditorState;
    customStyleFn?: Function;
    blockRendererFn?: Function;
    callbacks: {
        onUpArrow?: Function;
        onDownArrow?: Function;
        handleReturn?: Function;
        handleKeyBinding?: Function;
        setEditorState: (editorState: EditorState) => void;
        getEditorState: () => EditorState;
    };
    config?: Object;
}
export interface EditorProps {
    multiLines: boolean;
    plugins: Array<Plugin>;
    pluginConfig?: Object;
    prefixCls: string;
    onChange?: (editorState: EditorState) => EditorState;
    toolbars: Array<any>;
    splitLine: String;
    onKeyDown?: (ev: any) => boolean;
    defaultValue?: EditorState;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    style?: Object;
    value?: EditorState | any;
    readOnly?: boolean;
}
export interface EditorCoreState {
    editorState?: EditorState;
    inlineStyleOverride?: DraftInlineStyle;
    customStyleMap?: Object;
    customBlockStyleMap?: Object;
    blockRenderMap?: Map<String, DraftBlockRenderConfig>;
    toolbarPlugins?: List<Plugin>;
    plugins?: Array<Plugin>;
    compositeDecorator?: CompositeDecorator;
}
declare class EditorCore extends React.Component<EditorProps, EditorCoreState> {
    static ToEditorState(text: string): EditorState;
    static GetText: typeof exportText;
    static GetHTML: (editorState: any) => any;
    Reset(): void;
    SetText(text: string): void;
    state: EditorCoreState;
    private plugins;
    private controlledMode;
    private _editorWrapper;
    private forceUpdateImmediate;
    private _focusDummy;
    constructor(props: EditorProps);
    refs: {
        [string: string]: any;
        editor?: any;
    };
    static defaultProps: {
        multiLines: boolean;
        plugins: never[];
        prefixCls: string;
        pluginConfig: {};
        toolbars: never[];
        spilitLine: string;
    };
    static childContextTypes: {
        getEditorState: any;
        setEditorState: any;
    };
    getChildContext(): {
        getEditorState: (needFocus?: boolean) => any;
        setEditorState: (editorState: any, focusEditor?: boolean) => void;
    };
    reloadPlugins(): Array<Plugin>;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    private cancelForceUpdateImmediate;
    generatorDefaultValue(editorState: EditorState): EditorState;
    getStyleMap(): Object;
    setStyleMap(customStyleMap: any): void;
    initPlugins(): Array<any>;
    private focusEditor(ev);
    focus(ev: any): void;
    getPlugins(): Array<Plugin>;
    getEventHandler(): Object;
    getEditorState(needFocus?: boolean): EditorState;
    setEditorState(editorState: EditorState, focusEditor?: boolean): void;
    handleKeyBinding(ev: any): any;
    handleKeyCommand(command: String): DraftHandleValue;
    getBlockStyle(contentBlock: any): String;
    blockRendererFn(contentBlock: any): null;
    eventHandle(eventName: any, ...args: any[]): DraftHandleValue;
    generatorEventHandler(eventName: any): Function;
    customStyleFn(styleSet: any): Object;
    handlePastedText: (text: string, html: string) => "handled" | "not-handled";
    render(): any;
}
export default EditorCore;
