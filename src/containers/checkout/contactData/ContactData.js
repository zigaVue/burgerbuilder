import React , { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/button/Button';
import Input from '../../../components/UI/input/Input';
import Spinner from '../../../components/UI/spinner/Spinner';
import styles from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', label: 'Fastest' },
                        { value: 'chipest', label: 'Chipest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({ loading: true });
        
        const formData = {};
        for (let el in this.state.orderForm){
            formData[el] = this.state.orderForm[el].value;
        }
        
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    checkValidity(value, rules){
        let isValid = true
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { ...updatedOrderForm[inputIdentifier] };

        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;

        updatedOrderForm[inputIdentifier] = updatedElement;


        let formIsValid = true;
        for (let i in updatedOrderForm){
            formIsValid = updatedOrderForm[i].valid && formIsValid;
        }

        this.setState({ 
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }

    render () {
        const formElements = [];
        for (let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map((el) => (
                    <Input
                        key={el.id} 
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(e) => this.inputChangedHandler(e, el.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.state.loading) form = <Spinner />;
        return (
            <div className={styles.ContactData}>
                <h4>Enter your data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};


export default connect(mapStateToProps)(ContactData);