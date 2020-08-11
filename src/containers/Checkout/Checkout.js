import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    // checkout summary form
    // button to continue
    // button to cancel checkout process
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let totalPrice = 0
        for (let param of query.entries()){
            // ['salad', '1']
            if (param[0] === 'price'){
                totalPrice = param[1]
            }
            else{
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients: ingredients, totalPrice: totalPrice})
    }

    cancelCheckoutHandler = () =>{
        this.props.history.goBack()
    }

    continueCheckoutHandler = () =>{
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continueCheckout={this.continueCheckoutHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) =>(<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout