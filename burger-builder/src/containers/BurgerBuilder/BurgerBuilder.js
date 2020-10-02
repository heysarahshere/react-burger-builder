import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from'../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './BurgerBuilder.module.css';
import { connect }  from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://burger-builder-b2cc9.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data})
        // }).catch(error => {this.setState({error: true})});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler= () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <h3>There was a problem loading ingredients. Please try again later.</h3> : <div className={classes.Spinner}><Spinner /></div>;
        if(this.props.ings){
                    burger = <React.Fragment>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}/>
                    </React.Fragment>;
                    orderSummary = <OrderSummary 
                            purchaseCanceled={this.purchaseCancelHandler} 
                            purchaseContinued={this.purchaseContinueHandler}
                            price={this.props.price}
                            ingredients={this.props.ings}/>;
        }

        if(this.state.loading){
            orderSummary = <Spinner/>
        }
    
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                 {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingName})
    };
}

export default connect( mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));