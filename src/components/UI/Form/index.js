import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'

export default class App extends Component { 
  render(){

    const {
      onSubmit,
      Inputs,
      SubmitText,
      initialValues
    } = this.props;

    const inputsArray = Inputs.map((input) => {
      const {
        name,
        type,
        label,
        value,
        ...rest
      } = input;
      if (type == "INPUT" || type == "SUM") {
        return [<label>{label}</label>,
              <Field 
                name={name}
                parse={value} 
                {...rest}
                component="input" />]
      }
      if (type == "TEXTAREA") {
        return [<Field 
                name={input.name} 
                {...rest}
                component="textarea" />] 
      }
      if (type == "RADIO") {
        return [<Field 
                name={input.name} 
                {...rest}
                component="select" />]
      }
      
    });
    console.log(inputsArray);
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          {inputsArray}
          <button type="submit" disabled={pristine || invalid}>
            {SubmitText}
          </button>
        </form>
      )}
    />
  )
  }
}