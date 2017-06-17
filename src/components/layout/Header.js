import React from 'react'
import { Menu, Icon, Popover } from 'antd'
import styles from './main.less'
import Menus from './Menus';

import FontAwesome  from 'react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';

const SubMenu = Menu.SubMenu

function Header ({ user, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, logout, switchSider }) {

  let handleClickMenu = e => e.key==='logout' && logout();

  const menusProps = {
    siderFold: true,
    darkTheme: true,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location
  };
  return (
    <div className={styles.header}>
      {
        isNavbar ?
          <Popover placement='bottomLeft' onVisibleChange={switchMenuPopover} visible={menuPopoverVisible}
                   overlayClassName={styles.popovermenu} trigger='hover' content={<Menus {...menusProps} />}>
            <div className={styles.siderbutton}>
              <Icon type='bars'/>
            </div>
          </Popover>
          :
          <div className={styles.siderbutton} onClick={switchSider}>
            <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'}/>
          </div>
      }
      

    </div>
  )
}

export default Header;
