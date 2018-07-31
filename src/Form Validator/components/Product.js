import React, { Component } from 'react';
import {formatNumber} from '../util';

export default class Pruduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item.quantity,
      isHidden: false,
    }
  }

  handleOnDelete = () => {
    this.setState({
      quantity: 0,
      isHidden: true
    });

    this.props.onProductsDelete(this.state.quantity * this.props.item.cost);
  }

  handleOnIncrease = () => {
    this.setState({
      quantity: this.state.quantity + 1
    });

    this.props.onProductsQuantityChange(this.props.item.cost, 'increase');
  }

  handleOnDecrease = () => {
    if (this.state.quantity > 0) {
      this.setState({
        quantity: this.state.quantity - 1
      });
      this.props.onProductsQuantityChange(this.props.item.cost, 'decrease');
    } else {
      this.setState({
        quantity: 0
      });
    }
  }

  render() {
    const { name, cost, image, description, color } = this.props.item;
    console.log(description);
    const thumbnail = image === ''
      ? <img src='http://via.placeholder.com/60x100' alt='Default'/>
      : <img src={image} alt='Not Default' />;
    const visibility = this.state.isHidden ? { display: 'none' } : null;
    return (
      <div className="product" style={visibility}>
        <div className="product-thumbnail">
          {thumbnail}
          <button onClick={this.handleOnDelete} className="product-info--item">Delete</button>
        </div>
        <div className="product-info">
          <div className="product-info--row">
            <p className="text-bold">{name}</p>
            <p className="text-money">{formatNumber(cost)}</p>
          </div>
          <ul>
            {
              description.map(element => (
                <li key={element.toString()}>{element}</li>
              ))
            }
          </ul>
          <div className="product-info--row">
          <p>Màu: {color}</p>
          <div className="btn-group">
            <button className="btn" onClick={this.handleOnDecrease}>-</button>
            <button className="btn">{this.state.quantity}</button>
            <button className="btn" onClick={this.handleOnIncrease}>+</button>
          </div>
          </div>
        </div>
      </div>
    );
  }
}