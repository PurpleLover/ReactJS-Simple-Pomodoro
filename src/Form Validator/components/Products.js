import React, { Component } from 'react';
import Product from './Product';
import { productData } from './productData';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: productData, //in real -> get fetch here
    };
  }

  setTotalPrice = (amount, type) => {
    const signed = type === 'increase' ? 1 : -1;
    this.props.onProductsTotalPriceChange(amount * signed);
  }

  getProductsDelete = (amount) => {
    this.props.onProductsDelete(amount);
  }

  render() {
    return (
      <div className="products">
        <Product
          onProductsDelete={this.getProductsDelete}
          onProductsQuantityChange={this.setTotalPrice}
          item={this.state.data[0]} />
        <Product
          onProductsDelete={this.getProductsDelete}
          onProductsQuantityChange={this.setTotalPrice}
          item={this.state.data[1]}
        />
      </div>
    );
  }
}