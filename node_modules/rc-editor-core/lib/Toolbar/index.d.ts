import Toolbar from './Toolbar';
export declare function createToolbar(config?: {}): {
    name: string;
    decorators: never[];
    callbacks: {
        onChange: (editorState: any) => void;
        onUpArrow: (args: any) => any;
        onDownArrow: (args: any) => any;
        getEditorState: (args: any) => any;
        setEditorState: (args: any) => any;
        handleReturn: (args: any) => any;
    };
    onChange(editorState: any): any;
    component: typeof Toolbar;
};
