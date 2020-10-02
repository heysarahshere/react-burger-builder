import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        alettuce: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4.00,
};

const INGREDIENT_PRICES = {
    alettuce: 0.15,
    cheese: 0.55,
    meat: 1.85,
    bacon: 0.75
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
            }
            default:
                return state;
    }
};

export default reducer;