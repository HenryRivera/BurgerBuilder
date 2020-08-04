import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
]

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>Running Total: <strong>${props.price}</strong></p>
        {controls.map(ctrl =>(
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                // type={ctrl.type} alternative is to return 
                // function call with param as done below
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchase}
            onClick={props.orderBurger}
            >ORDER NOW</button>
    </div>
)

export default buildControls