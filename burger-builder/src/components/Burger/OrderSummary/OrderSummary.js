import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
    });
    return (
        <div className={classes.OrderSummary}>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <div className={classes.OrderList}>
                {ingredientSummary}
            </div>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.purchaseCanceled} btnType='Danger'>Cancel</Button>
            <Button clicked={props.purchaseContinued} btnType='Success'>Continue</Button>
        </div>
    );
};

export default orderSummary;