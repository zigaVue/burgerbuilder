import React, { Component } from 'react';
import { connect } from 'react-redux';

import Wrapper from '../../hoc/wrappers/Wrapper';
import Burger from '../../components/burger/Burger';
import Controls from '../../components/burger/buildControls/BuildControls';
import Modal from '../../components/UI/modal/Modal';
import OrderSummary from '../../components/burger/orderSummary/OrderSummary';
import Spinner from '../../components/UI/spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';




class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // axios.get('https://myburgerzv.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {});
    }

    getIsPurchasable = () => {
        const ingredients = this.props.ings;
        const sum = Object.keys(this.props.ings)
            .map(name => {
                return ingredients[name];
            })
            .reduce((sum, value) => {
                return sum + value;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner />;
             
       
        if (this.props.ings) {
            burger = (
                <Wrapper>
                    <Burger ingredients={this.props.ings} />
                    <Controls
                        price={this.props.price} 
                        disabled={disabledInfo} 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.getIsPurchasable()}
                        ordered={this.purchaseHandler} />
                </Wrapper>
            ); 
            
            orderSummary = <OrderSummary 
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price} 
                ingredients={this.props.ings} />
        }

        if (this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Wrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                { burger }
            </Wrapper>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName }),
        onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));