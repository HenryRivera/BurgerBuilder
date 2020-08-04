import React, { Component } from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{
    // This could be a functional component
    // Does not have to be a class
    // componentWillUpdate(){
    //     console.log('[OrderSummary]: Component will update')
    // }
    
    render(){
        const ingSummary = Object.keys(this.props.ings).map(ingKey =>{
            return (
            <li key={ingKey}>
                <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ings[ingKey]}
            </li>)
        })

        return(
            <Aux>
                <h3>Your Order</h3>
                <h3>Total: <strong>${this.props.price}</strong></h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingSummary}
                </ul>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelOrder}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.makeOrder}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary