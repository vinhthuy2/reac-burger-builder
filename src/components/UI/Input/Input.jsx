import React from 'react';
import classes from './Input.css';
const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = props.errorMessages.map((err, idx) => (
      <span
        className={classes.ValidationError}
        key={'error' + idx + props.elementConfig.placeholder.replace(' ', '')}
      >
        {err}
      </span>
    ));
  }

  switch (props.elementType) {
    case 'text':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
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
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.elementConfig.placeholder}</label>
      {inputElement}
      {validationError}
    </div>
  );
};
export default input;
