import React, { Component } from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

const ING_PRICES = {
    salad: 0.50,
    cheese: 0.75,
    meat: 1.5,
    bacon: 1.25
}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props)
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 2,
        purchase: false,
        purchasing: false,
        loading: false,
        errorState: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-bfc7c.firebaseio.com/ingredients.json').then(response =>{
            this.setState({ingredients: response.data})
        }).catch(error => {
            this.setState({errorState: true})
        })
    }

    canPurchase (ings){
        // const ings = {
        //     ...this.state.ingredients
        // }
        const sum = Object.keys(ings).map(ingKey =>{
            // getting amount of ingredient
            return ings[ingKey]
        }).reduce((currSum, curr) =>{
            return currSum + curr
        }, 0)
        this.setState({purchase: sum > 0})
    }

    addIngHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngs = {
            ...this.state.ingredients
        }
        updatedIngs[type] = updatedCount

        const addPrice = ING_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + addPrice
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngs
        })
        this.canPurchase(updatedIngs)
    }

    removeIngHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0){
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngs = {
            ...this.state.ingredients
        }
        updatedIngs[type] = updatedCount

        const subPrice = ING_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - subPrice
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngs
        })
        this.canPurchase(updatedIngs)
    }

    // will NOT work because method is triggered through event
    // this does not refer to the class
    // purchaseHandler(){
    //     this.setState({purchasing: true})
    // }

    purchaseHandler = () =>{
        this.setState({purchasing: true})
    }

    cancelPurchaseHandler = () =>{
        this.setState({purchasing: false})
    }

    makePurchaseHandler = () =>{
        // alert('Order will open in new tab!')
        // this.setState({loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     // production ready application should calculate final price on
        //     // the server because you probably have your product stored on the
        //     // server there to make sure that the user isn't manipulating the code
        //     // before sending it and manipulates the price which you are using
        //     price: this.state.totalPrice,
        //     customer: {
        //         fName: 'Henry',
        //         lName: 'Rivera',
        //         address: {
        //             street: 'David St',
        //             city: 'Fairview',
        //             state: 'New Jersey',
        //             country: 'USA',
        //             zipCode: '08882'
        //         },
        //         phoneNumber: '2016745464',
        //         email: 'mcr545@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         console.log(response)
        //         this.setState({ loading: false, purchasing: false })
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({ loading: false, purchasing: false })
        //     })
        this.props.history.push('/checkout')
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        // works on copied object
        // {salad: true, meat: false, ...}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.errorState ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngHandler}
                        ingredientRemoved={this.removeIngHandler}
                        disabled={disabledInfo}
                        purchase={this.state.purchase}
                        price={this.state.totalPrice}
                        orderBurger={this.purchaseHandler}/>
                </Aux>
            )
            orderSummary = <OrderSummary 
                ings={this.state.ingredients}
                cancelOrder={this.cancelPurchaseHandler}
                makeOrder={this.makePurchaseHandler}
                price={this.state.totalPrice}
            />
        }

        if (this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)