import React from 'react';

export default class Body extends React.Component {

    render() {
        return (
            <div style={styles.body}>
                {this.props.children}
            </div>
        );
    }
}

const styles = {
    body: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "80px 30px 30px",
        width: "100%",
        overflowY: "scroll"
    }
};
