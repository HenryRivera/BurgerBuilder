import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    // checkout summary form
    // button to continue
    // button to cancel checkout process

    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let totalPrice = 0
    //     for (let param of query.entries()){
    //         // ['salad', '1']
    //         if (param[0] === 'price'){
    //             totalPrice = param[1]
    //         }
    //         else{
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: totalPrice})
    // }

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
                    ingredients={this.props.ings}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continueCheckout={this.continueCheckoutHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    // render={(props) =>(<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)}
                    component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout)