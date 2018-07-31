import React, { Component } from 'react';
import { validateInput } from '../util';

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    const {name} = this.props;
    this.state = {
      [name]: {
        value: '',
        errorMessage: ''
      }
    }
  }

  handleInput = (event) => {
    const { value, name } = event.target;
    const newState = { ...this.state[name] };
    newState.value = value;
    this.setState({
      [name]: newState
    });
  }
  
  handleInputValidation = (event) => {
    const { name } = event.target;
    const { isInputValid, errorMessage } = validateInput(this.state[name].value, name);
    const newState = { ...this.state[name] };
    newState.isInputValid = isInputValid;
    newState.errorMessage = errorMessage;
    this.setState({
      [name]: newState
    });
  }

  render() {
    const {name} = this.props;
    return (
      <div className="input-container">
        <input
          name={name}
          onChange={this.handleInput}
          onBlur={this.handleInputValidation}
          placeholder={inputTypes[name]}
          className="input-field"
        />
        <FormError
          type={name}
          isHidden={this.state[name].isInputValid}
          errorMessage={this.state[name].errorMessage}
        />
      </div>
    );
  }
}

const FormError = (props, type) => {
  if (props.isHidden) {
    return null;
  }
  return (
    <p className="error-message">{props.errorMessage}</p>
  );
}

const inputTypes = {
  fullname: 'Họ và tên',
  phonenumber: 'Số điện thoại'
}