import React from 'react'

// withRouter gives direct access to match, history, and location
// import { withRouter } from 'react-router-dom'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = ( props ) =>{
    // keys returns an array
    // transforming object of key, value pairs into an array of burger ingredients
    // where the value of an object is important for me to decide how many
    // ingredients I need. Key is important for which type of ingredient I need
    let listIngredients = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, ind) =>{
            return <BurgerIngredient key={ingKey + ind} type={ingKey} />
        })
    }).reduce((arr, curr) =>{
        return arr.concat(curr)
    }, [])
    if (listIngredients.length === 0){
        listIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {listIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

// export default withRouter(burger)
export default burger
