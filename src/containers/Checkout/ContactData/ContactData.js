import React, { Component } from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component{
    state = {
        orderForm:{
            fName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Priority Delivery'},
                        {value: 'standard', displayValue: 'Standard Delivery'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) =>{
        // default is to reload the page and send request
        event.preventDefault()
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            // production ready application should calculate final price on
            // the server because you probably have your product stored on the
            // server there to make sure that the user isn't manipulating the code
            // before sending it and manipulates the price which you are using
            price: this.props.totalPrice
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
    render(){
        let form = (
            <form>
                <Input elementType="" elementConfig="" value="" />
                <Input inputtype="input" type="text" name="street" placeholder="Address" />
                <Input inputtype="input" type="text" name="zip" placeholder="Zip Code" />
                <Input inputtype="input" type="email" name="email" placeholder="Email" />
                <Input inputtype="input" type="text" name="phoneNumber" placeholder="Phone Number" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData