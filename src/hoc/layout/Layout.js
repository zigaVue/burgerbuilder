import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                    <Toolbar
                        isAuthenticated={this.props.isAuthenticated}  
                        sideDrawerOpener={this.sideDrawerOpenedHandler} 
                    />
                    <SideDrawer
                        isAuthenticated={this.props.isAuthenticated} 
                        open={this.state.showSideDrawer} 
                        closed={this.sideDrawerClosedHandler} 
                    /> 
                </div>
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);