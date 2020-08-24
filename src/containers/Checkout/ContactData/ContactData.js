import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component{
    state = {
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
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
                    required: true,
                    minLength: 5,
                    maxLength: 5
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
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number'
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
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Priority Delivery'},
                        {value: 'standard', displayValue: 'Standard Delivery'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formValid: false,
        loading: false
    }

    orderHandler = (event) =>{
        // default is to reload the page and send request automatically
        event.preventDefault()
        this.setState({loading: true})
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            // production ready application should calculate final price on
            // the server because you probably have your product stored on the
            // server there to make sure that the user isn't manipulating the code
            // before sending it and manipulates the price which you are using
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    validityCheck(value, rules){
        let isValid = true
        if (rules.required){
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.validityCheck(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formValid = true
        for (let inputIdentifier in updatedOrderForm){
            formValid = updatedOrderForm[inputIdentifier].valid && formValid
        }
        this.setState({orderForm: updatedOrderForm, formValid: formValid})
    }
    render(){
        const formElements = []
        for (let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler} >
                {formElements.map(curr =>(
                    <Input 
                        key={curr.id}
                        elementType={curr.config.elementType} 
                        elementConfig={curr.config.elementConfig}
                        value={curr.config.value}
                        invalid={!curr.config.valid}
                        shouldValidate={curr.config.validation}
                        touched={curr.config.touched}
                        changed={(event) => this.inputChangedHandler(event, curr.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
            </form>
        )
        if (this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact information:</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData)