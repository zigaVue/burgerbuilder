import React from 'react';

import Logo from '../../logo/Logo';
import NavigationItems from '../navigationItems/NavigationItems';
import Backdrop from '../../UI/backdrop/Backdrop';
import Wrapper from '../../../hoc/wrappers/Wrapper';

import styles from './SideDrawer.css';

const sideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer];
    attachedClasses.push( (props.open) ? styles.Open : styles.Close )
    
    return (
        <Wrapper>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}><Logo /></div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Wrapper>
    );
};

export default sideDrawer;