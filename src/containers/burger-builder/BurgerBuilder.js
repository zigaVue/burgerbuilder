import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';
import Burger from '../../components/burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 1
        }
    }

    render () {
        return (
            <Wrapper>
                <Burger ingredients={this.state.ingredients} />
                <div>Build Controls</div>
            </Wrapper>
        );
    }
}

export default BurgerBuilder;