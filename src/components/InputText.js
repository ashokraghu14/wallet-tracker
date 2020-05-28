import React from 'react';

export default function InputText(props) {
  return(
    <React.Fragment>
      <label htmlFor="description">{props.label}</label>
      <input
        id={props.id}
        className={props.errors ? "form-control field-error" : "form-control"}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
      {props.errors && <p className="error">{props.errors}</p>}
    </React.Fragment>
  );
}
