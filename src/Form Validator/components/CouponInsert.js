import React, {Component} from 'react';

class CouponInsert extends Component {

  onClick = () => {
    this.props.onButtonCouponClicked();
  }

  render() {
    const customStyle = this.props.isHidden ? {display: 'none'} : {display: 'flex'};
    return(
      <div className="product-info--row" style={customStyle}>
        <input className="input-field"/>
        <button className="payment-button" style={{backgroundColor: 'blue'}}>Áp dụng</button>
      </div>
    );
  }
}

export default CouponInsert;