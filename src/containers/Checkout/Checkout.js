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