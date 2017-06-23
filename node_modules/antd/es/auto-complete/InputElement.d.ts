/// <reference types="react" />
import React from 'react';
export default class InputElement extends React.Component<any, any> {
    private ele;
    focus: () => void;
    blur: () => void;
    render(): React.DOMElement<any, Element>;
}
