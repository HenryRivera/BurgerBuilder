import React, { Component } from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address:{
            street: '',
            zipCode: ''
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
            price: this.props.totalPrice,
            customer: {
                fName: 'Henry',
                lName: 'Rivera',
                address: {
                    street: 'David St',
                    city: 'Fairview',
                    state: 'New Jersey',
                    country: 'USA',
                    zipCode: '08882'
                },
                phoneNumber: '2016745464',
                email: 'mcr545@gmail.com'
            },
            deliveryMethod: 'fastest'
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
                <Input inputType="input" type="text" name="name" placeholder="Name" />
                <Input inputType="input" type="email" name="email" placeholder="Email" />
                <Input inputType="input" type="text" name="street" placeholder="Address" />
                <Input inputType="input" type="text" name="zip" placeholder="Zip Code" />
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