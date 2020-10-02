import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
orderForm: {
        name: {
            inputType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: ''
        },
        email: {
            inputType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: ''
        },
        street: {
            inputType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: ''
        },
        zip: {
            inputType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zipcode'
            },
            value: ''
        },
        country: {
            inputType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: ''
        },
        deliveryMethod: {
            inputType: 'select',
            elementConfig: {
                options: [{value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'}]
            },
            value: ''
        },
    },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }

    render () {
        const formArray = [];
        for (let key in this.state.orderForm){
            formArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form>
                {formArray.map(formElement => (
                    <Input key={formElement.id}
                    elementType={formElement.config.type} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
            );
        if (this.state.loading) {
            form = <Spinner />
        }
        return(
        <div className={classes.ContactData} >
            <h4>Enter Information</h4>
            {form}
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);