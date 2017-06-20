import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import menu from '../../utils/menu';
import config from '../../utils/config';

const topMenus = menu.map(item => item.key);
const SubMenu = Menu.SubMenu;


const getMenus = function (menuArray, siderFold, parentPath = '/') {
    return menuArray.map(item => {
        if (item.child) {
            return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
              {item.icon ? <Icon type={item.icon}/> : ''}
                            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
            </span>
                    }
                >
                    {getMenus(item.child, siderFold, parentPath + item.key + '/')}
                </SubMenu>
            )
        } else {
            return (
                <Menu.Item key={item.key}>
                    <Link to={parentPath + item.key}>
                        {item.icon ? <Icon type={item.icon}/> : ''}
                        {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
                    </Link>
                </Menu.Item>
            )
        }
    })
}

function Menus ({ siderFold, location, handleClickNavMenu, className, menuOpenKeys }) {
    const menuItems = getMenus(menu, siderFold);
    return (
        <Menu
            className={className}
            mode={siderFold ? 'vertical' : 'inline'}
            theme='dark'
            openKeys={menuOpenKeys}
            onOpenChange={handleClickNavMenu}
            defaultOpenKeys={ siderFold ? null : [location.pathname.split('/')[1]] }
            defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || config.defaultSelectMenu]}
        >
            {menuItems}
        </Menu>
    )
}

export default Menus;