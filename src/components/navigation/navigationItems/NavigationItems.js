import React from 'react';

import NavigationItem from './NavigationItem';
import styles from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {props.isAuthenticated 
            ? <NavigationItem link="/logout">Logout</NavigationItem> 
            : <NavigationItem link="/auth">Authenticate</NavigationItem> 
        }
    </ul>
);

export default navigationItems;