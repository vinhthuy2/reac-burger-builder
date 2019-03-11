import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];
const buildControls = props => (
  <div className={classes.BuildControls}>
    <button onClick={props.reset} className={classes.ResetButton}>
      Reset
    </button>
    <p>
      Current price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientsAdd(ctrl.type)}
        removed={() => props.ingredientsRemove(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      onClick={props.ordered}
      disabled={props.purchasable}
      className={classes.OrderButton}
    >
      ORDER NOW
    </button>
  </div>
);
export default buildControls;
