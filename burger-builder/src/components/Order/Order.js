import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = []; 
    for (let ingredient in props.ingredients) {
        if(ingredient === 'alettuce'){
            let newName = ingredient.substr(1);
            ingredients.push({name: newName, amount: props.ingredients[ingredient]});
        } else {
                ingredients.push({name: ingredient, amount: props.ingredients[ingredient]});
        }
     }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
        style={{textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
    }}
        key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    return (
    <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    );
};

export default order;