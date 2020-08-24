import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actiontypes from '../../store/actions'

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props)
    //     this.state = {...}
    // }
    state = {
        // local UI state
        purchasing: false, // used to show or hide modal
        loading: false, // used to display spinner
        errorState: false
    }

    componentDidMount(){
        console.log(this.props)
        // axios.get('https://react-my-burger-bfc7c.firebaseio.com/ingredients.json').then(response =>{
        //     this.setState({ingredients: response.data})
        // }).catch(error => {
        //     this.setState({errorState: true})
        // })
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
        return sum > 0
    }

    // addIngHandler = (type) =>{
    //     const oldCount = this.state.ingredients[type]
    //     const updatedCount = oldCount + 1
    //     const updatedIngs = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngs[type] = updatedCount

    //     const addPrice = ING_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + addPrice
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngs
    //     })
    //     this.canPurchase(updatedIngs)
    // }

    // removeIngHandler = (type) =>{
    //     const oldCount = this.state.ingredients[type]
    //     if (oldCount <= 0){
    //         return
    //     }
    //     const updatedCount = oldCount - 1
    //     const updatedIngs = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngs[type] = updatedCount

    //     const subPrice = ING_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - subPrice
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngs
    //     })
    //     this.canPurchase(updatedIngs)
    // }

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

        const queryParams = []
        for (let i in this.state.ingredients){
            // setting property name = property value for said name
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }

        // works on copied object
        // {salad: true, meat: false, ...}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.errorState ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchase={this.canPurchase(this.props.ings)}
                        price={this.props.price}
                        orderBurger={this.purchaseHandler}/>
                </Aux>
            )
            orderSummary = <OrderSummary 
                ings={this.props.ings}
                cancelOrder={this.cancelPurchaseHandler}
                makeOrder={this.makePurchaseHandler}
                price={this.props.price}
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

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName) => dispatch({type: actiontypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actiontypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))