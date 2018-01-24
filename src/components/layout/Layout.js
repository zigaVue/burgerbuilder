import React from 'react';

import Wrapper from '../../hoc/Wrapper';
import styles from './Layout.css';

const Layout = ( props ) => (
    <Wrapper>
        <div>
            Toolbar,
            SideDrawer, 
            Backdrop
        </div>
        <main className={styles.content}>
            {props.children}
        </main>
    </Wrapper>
);

export default Layout;