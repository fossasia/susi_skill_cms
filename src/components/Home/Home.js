import React from 'react';
import { Icon } from 'antd';
import CodeMirror from 'react-codemirror';
import Chatbox from "../Chatbox/Chatbox";

export default class Container extends React.Component {
    state = {
        code: "//code"
    };

    updateCode = (newCode) => {
        this.setState({
            code: newCode,
        });
    }

    render() {
        const options = {
            lineNumbers: true
        };
        return (
            <div style={styles.home}>
                <div style={styles.toolbar}>
                    <span style={styles.button}><Icon type="caret-right" style={styles.icon} />Run</span>
                    <span style={styles.button}><Icon type="cloud-download" style={styles.icon}/>Save</span>
                    <span style={styles.button}><Icon type="menu-unfold" style={styles.icon} />Indent</span>
                </div>
                < CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
                <Chatbox />

            </div>
        );
    }
}

const styles = {
    home: {
        width: '1040px',
        marginTop: "80px",
        padding: "30px",
        position: "absolute",
        right: 0,
        top: 0
    },
    toolbar: {
        width: "100%",
        height: "50px",
        background: "#fff",
        borderBottom: "2px solid #eee",
        display: "flex",
        alignItems: "stretch",
        padding: "0 25px",
        fontSize: "14px"
    },
    button: {
        display: "flex",
        marginRight: "30px",
        alignItems: "center",
        cursor: "pointer"
    },
    icon: {
        marginRight: "5px"
    }
}