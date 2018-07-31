import React, {Component} from 'react';

export default class PaymentButton extends Component {
  render() {
    const {type, content} = this.props;
    return (
      <button className="payment-button" style={paymentType[type]}>{content}</button>
    );
  }
}

const paymentType = {
  online: {backgroundColor: 'orange'},
  cod: {backgroundColor: 'cyan'}
}