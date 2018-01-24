import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';
import Burger from '../../components/burger/Burger';
import Controls from '../../components/burger/buildControls/BuildControls';

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
        totalPrice: 4
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
        })

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
        }
    }

    render () {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Wrapper>
                <Burger ingredients={this.state.ingredients} />
                <Controls
                    price={this.state.totalPrice} 
                    disabled={disabledInfo} 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                />
            </Wrapper>
        );
    }
}

export default BurgerBuilder;