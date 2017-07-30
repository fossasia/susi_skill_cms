import React from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';
import colors from "../../Utils/colors";



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
                <Link to="/">
                    <img style={styles.logo} src={require('../images/SUSIAI-white.png')}  alt=""/>
                </Link>

                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 240 , backgroundColor:colors.sidebarElements}}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <Menu.Item key="SkillEditor">
                        <Icon type="code" />
                        Skill Editor
                        <Link to="/skillEditor"></Link>
                    </Menu.Item>

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
        background: colors.sidebar,
        zIndex: 10
    },
    logo: {
        width: '150px',
        padding: '20px'
    }
}
