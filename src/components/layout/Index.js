import React from 'react';
import classnames from 'classnames';
import Asider from './Asider';
import Header from './Header';
import Footer from './Footer';

import config from '../../utils/config';

//CSS
import styles from './main.less';

function Index ({ isNavbar, siderFold, siderProps, headerProps, children, location }) {

    const layoutClass = classnames(
        styles.layout,
        { [styles.fold]: isNavbar ? false : siderFold },
        { [styles.withnavbar]: isNavbar }
    );

    const asideClass = classnames(
        styles.sider,
        { [styles.light]: false }
    );

    const contentClass = classnames(
        styles.content,
        {  }
    )

    return (
        <div className={layoutClass}>
            {!isNavbar ?
                <aside className={asideClass}>
                  <Asider {...siderProps} />
                </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            <div className={styles.container}>
              <div className={contentClass} id="content">
                  {children}
              </div>
            </div>
              {config.needFooter ? <Footer /> : ''}
          </div>
        </div>
    );
}

export default Index;
