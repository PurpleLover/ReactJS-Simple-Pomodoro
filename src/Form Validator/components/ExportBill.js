import React, {Component} from 'react';
import {formatNumber} from '../util';

class ExportBill extends Component {

  onClick = () => {
    this.props.onButtonCouponClicked();
  }

  render() {
    return(
      <div className="payment-summary">
        <div className="product-info--row">
          <p>Tổng tiền</p>
          <p className="text-money">{formatNumber(this.props.productsTotalPriceChange)}</p>
        </div>
        <div className="product-info--row">
          <p>Giảm</p>
          <p></p>
        </div>
        <div className="product-info--row">
          <p className="text-bold">Cần thanh toán</p>
          <p className="text-money">{formatNumber(this.props.productsTotalPriceChange)}</p>
        </div>
        <span className="payment-coupon">
        <a onClick={this.onClick}>Sử dụng mã giảm giá</a>
        </span>
      </div>
    );
  }
}

export default ExportBill;