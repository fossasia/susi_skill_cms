import React from 'react';
import { Icon } from 'antd';

export default class Chatbox extends React.Component {
    state = {
        minimised: false,
    }

    toggleChatbox = () => {
        this.setState(() => ({minimised: !this.state.minimised}))
    }

    render() {
        return (
            <div style={styles.chatbox}>
                <div style={styles.header} onClick={this.toggleChatbox}>
                    <span style={{flex: 1}}>SUSI CHAT</span>
                    <Icon type={(this.state.minimised)?"up-circle-o":"down-circle-o"} style={styles.headerIcon} />
                </div>

                <iframe style={(this.state.minimised)?(styles.minimised):(styles.notMinimised)} src="http://chat.susi.ai/" title="SUSI Chatbot"></iframe>

            </div>
        );
    }
}

const styles = {
    chatbox: {
        display: 'flex',
        alignItems : "center",
        flexDirection: "column",
        width: '380px',
        height: "auto",
        maxHeight: "500px",
        position: "fixed",
        bottom: 0,
        right: "30px",
        background: '#455A64',
        border: '1px solid #ddd',
        borderBottom: 0,
        zIndex: 999
    },
    notMinimised: {
        width: '100%',
        height: '500px',
        position: 'absoulte',
        bottom: 0,
        left: 0,
        border: 'none'
    },
    minimised: {
        width: '100%',
        height: '0',
        position: 'absoulte',
        bottom: 0,
        left: 0,
        border: 'none'
    },
    header: {
        width: '100%',
        height: '40px',
        display: 'flex',
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
        color: "#fff",
        fontSize: "18px"
    },
    headerIcon: {
        color: "#fff",
        fontSize: '20px',
        alignSelf: "flex-end",
    }
}