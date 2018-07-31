import React, {Component} from 'react';

import ValidateForm from './components/ValidateForm';
import Products from './components/Products';
import ExportBill from './components/ExportBill';
import CouponInsert from './components/CouponInsert';

import './App.css';
import {productData} from './components/productData';

export default class App extends Component {
  constructor(props) {
    super(props);
    const calculateTotalPrice = (accumulator, current) => {
      return accumulator + current.cost;
    }
    const intialProductsTotalPrice = productData.reduce(calculateTotalPrice, 0);
    this.state = {
      totalProductsPrice: intialProductsTotalPrice,
      isCouponInsert: true
    };
  }

  getProductsTotalPrice = (amount) => {
    this.setState({
      totalProductsPrice: this.state.totalProductsPrice + amount
    });
  }

  getProductsDelete = (amount) => {
    this.setState({
      totalProductsPrice: this.state.totalProductsPrice - amount
    });
  }

  getButtonCouponStatus = () => {
    this.setState({
      isCouponInsert: !this.state.isCouponInsert
    });
  }

  render() {
    return (
      <div className="container">
        <Products
          onProductsTotalPriceChange={this.getProductsTotalPrice}
          onProductsDelete={this.getProductsDelete}
        />
        <ExportBill
          onButtonCouponClicked={this.getButtonCouponStatus}
          productsTotalPriceChange={this.state.totalProductsPrice}
        />
        <CouponInsert isHidden={this.state.isCouponInsert}/>
        <ValidateForm/>
      </div>
    );
  }
}