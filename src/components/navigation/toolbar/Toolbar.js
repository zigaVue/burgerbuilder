import React from 'react';

import Logo from '../../logo/Logo';
import NavigationItems from '../../navigation/navigationItems/NavigationItems';
import styles from './Toolbar.css';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div className={styles.MobileOnly} onClick={props.sideDrawerOpener}>MENU</div>
        <div className={styles.Logo}><Logo /></div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;