import React from 'react';
import classes from './Spinner.css';
const spinner = props => {
  return (
    <div className={classes['Lds-ring']}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
export default spinner;
