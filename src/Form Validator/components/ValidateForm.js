/**
 * Validate Form
 */

import React, { Component } from 'react';
import FormInput from './FormInput';
import PaymentButton from './PaymentButton';

class ValidateForm extends Component {
  handleOnSubmit = () => {

  }
  render() {
    return (
      <div className="form-container">
        <form>
          <input type="radio" name="gender" value="male" checked />Anh
          <input type="radio" name="gender" value="female" />Chị
          <div className="form-text">
            <FormInput name="fullname" />
            <FormInput name="phonenumber" />
          </div>
          <input className="input-field" type="text" placeholder="Địa chỉ"/>
          <p>Để được giao hàng nhanh hơn, hãy chọn thêm</p>
          <input type="radio" name="location" value="address" checked />Địa chỉ giao hàng
          <input type="radio" name="location" value="supermarket" />Nhận tại siêu thị
          <div className="payment-buttons">
            <a>
              <PaymentButton type="cod" content="Thanh toan tai nha"/>
            </a>
            <a>
              <PaymentButton type="online" content="Chuyen khoan ATM"/>
            </a>
          </div>
        </form>
      </div>
    );
  }
}



export default ValidateForm;