import React, { Component } from 'react';

import Wrapper from '../wrappers/Wrapper';
import Toolbar from '../../components/navigation/toolbar/Toolbar';
import SideDrawer from '../../components/navigation/sideDrawer/SideDrawer';

import styles from './Layout.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerOpenedHandler = () => {
        this.setState({ showSideDrawer: true });
    }

    render(){
        return (
            <Wrapper>
                <div>
                    <Toolbar sideDrawerOpener={this.sideDrawerOpenedHandler} />
                    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} /> 
                    Backdrop
                </div>
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

export default Layout;