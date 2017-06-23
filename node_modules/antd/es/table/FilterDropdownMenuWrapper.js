import React from 'react';
export default (function (props) {
    return React.createElement(
        'div',
        { className: props.className, onClick: props.onClick },
        props.children
    );
});