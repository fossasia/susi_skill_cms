import React from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';

const SubMenu = Menu.SubMenu;

export default class Sidebar extends React.Component {
    state = {
        theme: 'dark',
        current: '1',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <div style={styles.sidebar}>
                <img style={styles.logo} src="http://chat.susi.ai/static/media/susi-white.67ab81e8.svg" alt=""/>

                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 240 , backgroundColor:'#607D8B'}}

                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <Menu.Item key="home">
                        <Icon type="home" />
                        Home
                        <Link to="/home"><span><Icon type="delete" /></span></Link>
                    </Menu.Item>

                    <Menu.Item key="something else">
                        <Icon type="Something Else" />
                        Something Else
                        <Link to="/chat"><span><Icon type="delete" /></span></Link>
                    </Menu.Item>


                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Settings</span></span>}>
                        <Menu.Item key="9">Option 1</Menu.Item>
                        <Menu.Item key="10">Option 2</Menu.Item>
                        <Menu.Item key="11">Option 3</Menu.Item>
                        <Menu.Item key="12">Option 4</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

const styles = {
    sidebar: {
        display: 'flex',
        alignItems : "center",
        flexDirection: "column",
        width: '240px',
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        background: '#37474F',
        zIndex: 98
    },
    logo: {
        width: '150px',
        padding: '20px'
    }
}