import React, { Component } from 'react';
import Wrapper from '../../../hoc/wrappers/Wrapper';
import Button from '../../UI/button/Button';


class OrderSummary extends Component {
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map((iKey, i) => {
            return (
                <li key={i}>
                    <span style={{ textTransform: 'capitalize' }}>{iKey}</span>: 
                    {this.props.ingredients[iKey]}
                </li>
            )
        });

        return (
            <Wrapper>
                <h3>Your Order</h3>
                <p>A delicious burger with the followwing ingredintes:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to CheckOut?</p>
                <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinue} btnType="Success">CONTINUE</Button>
            </Wrapper>
        );
    }
}



export default OrderSummary;
