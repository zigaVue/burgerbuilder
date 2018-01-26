import React from 'react';
import styles from './Order.css';

const order = (props) => {
    
    let tIngredients = Object.keys(props.ingredients)
        .map((iKey, i) => {
            return <span
                style={{ 
                    textTransform: 'capitalize', 
                    display: 'inline-block',
                    marginRight: '5px',
                    padding: '0 5px',
                    border: '1px solid #ccc'
                }} 
                key={i}>{iKey} ({props.ingredients[iKey]}) </span>
        });
    
    return (
        <div className={styles.Order}>
            <p>Ingredients: <br /> {tIngredients}</p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    )
};
    


export default order;