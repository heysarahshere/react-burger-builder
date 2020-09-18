import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';

class OrderSummary extends Component {
    componentDidUpdate(){
        
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey === 'alettuce' ? 'lettuce' : igKey}</span>: {this.props.ingredients[igKey]}
                </li>
        });
        return (
            <div className={classes.OrderSummary}>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <div className={classes.OrderList}>
                {ingredientSummary}
            </div>
            <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={this.props.purchaseCanceled} btnType='Danger'>Cancel</Button>
            <Button clicked={this.props.purchaseContinued} btnType='Success'>Continue</Button>
        </div>
        );
    }
}

export default OrderSummary;