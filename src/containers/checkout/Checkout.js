import React, { Component } from 'react';

import CheckoutSummary from '../../components/order/checkoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 2
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of query.entries()){
            ingredients[param[0]] = +param[1]; 
        }
        this.setState({ ingredients: ingredients });

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} 
                    ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;