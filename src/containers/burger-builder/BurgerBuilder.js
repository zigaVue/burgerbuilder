import React, { Component } from 'react';

import Wrapper from '../../hoc/wrappers/Wrapper';
import Burger from '../../components/burger/Burger';
import Controls from '../../components/burger/buildControls/BuildControls';
import Modal from '../../components/UI/modal/Modal';
import OrderSummary from '../../components/burger/orderSummary/OrderSummary';


const INGREDIENTS_PRICES = {
    salad: 0.2,
    bacon: 0.5,
    cheese: 0.3,
    meat: 1
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = oldCount + 1;
        const newPrice = oldPrice + INGREDIENTS_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.upgradePurchasableState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        if (oldCount > 0){
            updatedIngredients[type] = oldCount - 1;
            const newPrice = oldPrice - INGREDIENTS_PRICES[type];

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            })

            this.upgradePurchasableState(updatedIngredients);
        }
    }

    upgradePurchasableState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(iKey => {
                return ingredients[iKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)

        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert("continue!");
        return false;
    }

    render () {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Wrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        price={this.state.totalPrice} 
                        ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <Controls
                    price={this.state.totalPrice} 
                    disabled={disabledInfo} 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Wrapper>
        );
    }
}

export default BurgerBuilder;