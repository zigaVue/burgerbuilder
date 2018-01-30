import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/layout/Layout';
import Auth from './containers/auth/Auth';
import Logout from './containers/auth/logout/Logout';
import BurgerBuilder from './containers/burger-builder/BurgerBuilder';
import Checkout from './containers/checkout/Checkout';
import Orders from './containers/orders/Orders';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/auth" component={Auth} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>                   
                </Layout>
            </div>
        );
    }
}

export default App;