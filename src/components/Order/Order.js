import React from 'react';
import classes from './Order.css';

const order = props => {
  const ingredients = [];
  for (let ing in props.ingredients) {
    ingredients.push({ name: ing, amount: props.ingredients[ing] });
  }

  const ingOutput = ingredients.map(ig => {
    return (
      <span>
        {ig.name}: {ig.amount}
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      {ingOutput}
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
