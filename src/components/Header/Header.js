import React from 'react';
import { Dropdown, Avatar, Icon, Menu } from 'antd';

export default class Header extends React.Component {

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a>Logout</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div style={styles.header}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <div className="ant-dropdown-link" style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
                        <Avatar shape="square" size="small" icon="user"/>
                        <span style={{padding: "0 10px"}}>User</span>
                        <Icon type="caret-down" style={{fontSize: "14px"}}/>
                    </div>
                </Dropdown>
            </div>
        );
    }
}

const styles = {
    header: {
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        background: "#607D8B",
        zIndex: 97,
        padding: "0 30px",
        color: "#fff",
        fontSize: "16px",
    }
};
