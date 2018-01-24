import React from 'react';

import styles from './Burger.css';
import BurgerIngredient from './burgerIngredient/BurgerIngredient';

const Burger = ( props ) => {

    let tIngredients = Object.keys(props.ingredients)
        .map(iKey => {
            return [...Array(props.ingredients[iKey])].map((_, i) => {
                return <BurgerIngredient key={iKey + i} type={iKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
      
    if (tIngredients.length === 0) {
        tIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {tIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};


export default Burger;