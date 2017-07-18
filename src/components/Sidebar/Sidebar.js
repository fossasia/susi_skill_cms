import React from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';



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
                    style={{ width: 240 , backgroundColor:'#607D8B'}}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <Menu.Item key="BrowseSkill">
                        <Icon type="book" />
                        Browse Skills
                        <Link to="/browseSKill"></Link>
                    </Menu.Item>

                    <Menu.Item key="SkillEditor">
                        <Icon type="code" />
                        Skill Editor
                        <Link to="/skillEditor"></Link>
                    </Menu.Item>

                    <Menu.Item key="BrowseRevision">
                        <Icon type="fork" />
                        Browse Skills Revision
                        <Link to="/browseHistory"></Link>
                    </Menu.Item>

                    <Menu.Item key="BrowseExamples">
                        <Icon type="file" />
                        Browse Examples
                        <Link to="/browseExamples"></Link>
                    </Menu.Item>

                    <Menu.Item key="VisualEditor">
                        <Icon type="api" />
                        Visual Skill Editor
                        <Link to="/visualEditor"></Link>
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
        background: '#37474F',
        zIndex: 10
    },
    logo: {
        width: '150px',
        padding: '20px'
    }
}