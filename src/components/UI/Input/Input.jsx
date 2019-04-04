import React from 'react';
import classes from './Input.css';
const input = props => {
  let inputElement = null;
  switch (props.elementType) {
    case 'text':
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map((opt, idx) => {
            return (
              <option value={opt.value} key={idx}>
                {opt.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
