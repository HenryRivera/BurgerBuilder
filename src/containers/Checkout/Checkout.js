import React, { Component } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    // checkout summary form
    // button to continue
    // button to cancel checkout process
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for (let param of query.entries()){
            // ['salad', '1']
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients})
    }

    cancelCheckoutHandler = () =>{
        this.props.history.goback()
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
            </div>
        )
    }
}

export default Checkout