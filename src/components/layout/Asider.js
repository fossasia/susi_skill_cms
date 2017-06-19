import React from 'react'
import styles from './main.less'
import config  from '../../utils/config';
import Menus from './Menus';

function Asider ({ siderFold, location, handleClickNavMenu, menuOpenKeys }) {

    const menusProps = {
        siderFold,
        location,
        handleClickNavMenu,
        menuOpenKeys,
    }
    return (
        <div>
          <div className={styles.logo}>
            <img className={styles.logoImage} src={config.logoSrc}/>
              {siderFold ? '' : <span>{config.logoText}</span>}
          </div>
          <Menus {...menusProps}/>
        </div>

    )
}

export default Asider;