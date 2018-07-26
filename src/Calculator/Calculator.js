// LIBRARIES
import React, { Component } from 'react';
// STYLES
import './style.css';
// HELPERS
import CalculatorHelper from './CalculatorHelper';
import * as NUMBER from './constant/Number';
import { ADD, SUBTRACT, MULTIPLY, DIVIDE } from './constant/Operator';

const calculus = new CalculatorHelper();

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      value: 0
    };
  }
  // BUTTON NUMBER
  handleOnDigit = (number) => {
    calculus.inputDigit(number);
    //event.target.value -> user may change value via inspector => bind(value)
    //solution: bind(value) when invoke
    this.setState({
      value: calculus.getValue(),
      expression: calculus.getExpression()
    });
  }
  // BUTTON .
  handleOnDecimal = () => {
    calculus.inputDecimal();
    this.setState({
      value: calculus.getValue()
    });
  }
  // BUTTON AC
  handleOnClearAll = () => {
    calculus.clearAll();
    this.setState({
      expression: calculus.getExpression(),
      value: 0
    });
  }
  // All operator pressed go here
  handleOnOperate = (operator) => {
    calculus.pressOperate(operator);
    this.setState({
      expression: calculus.getExpression(),
      value: calculus.getValue().toString()
    });
  }
  // BUTTON =
  handleOnEquals = () => {
    calculus.equals();
    this.setState({
      expression: calculus.getExpression(),
      value: calculus.getResult()
    });
  }
  render() {
    return (
      <div className="container">
        <span className="item-sub-header">{this.state.expression}</span>
        <span className="item-header">{this.state.value}</span>
        <button className="btn clear" onClick={this.handleOnClearAll}>AC</button>
        <button className="btn operators" onClick={this.handleOnOperate.bind(this, DIVIDE)}>/</button>
        <button className="btn operators" onClick={this.handleOnOperate.bind(this, MULTIPLY)}>x</button>

        <button className="btn" onClick={this.handleOnDigit.bind(this, NUMBER.SEVEN)}>7</button>
        <button className="btn" onClick={this.handleOnDigit.bind(this, NUMBER.EIGHT)}>8</button>
        <button className="btn" onClick={this.handleOnDigit.bind(this, NUMBER.NINE)}>9</button>
        <button className="btn operators" onClick={this.handleOnOperate.bind(this, SUBTRACT)}>-</button>

        <button className="btn" onClick={this.handleOnDigit.bind(this, NUMBER.FOUR)}>4</button>
        <button className="btn" onClick={this.handleOnDigit.bind(this, NUMBER.FIVE)}>5</button>
        <button className="btn" onClick={this.handleOnDigit.bind(this, NUMBER.SIX)}>6</button>
        <button className="btn operators" onClick={this.handleOnOperate.bind(this, ADD)}>+</button>

        <button className="btn" onClick={this.handleOnDigit.bind(this, NUMBER.ONE)}>1</button>
        <button className="btn" onClick={this.handleOnDigit.bind(this, NUMBER.TWO)}>2</button>
        <button className="btn" onClick={this.handleOnDigit.bind(this, NUMBER.THREE)}>3</button>
        <button className="btn equals" onClick={this.handleOnEquals}>=</button>

        <button className="btn zero" onClick={this.handleOnDigit.bind(this, NUMBER.ZERO)}>0</button>
        <button className="btn" onClick={this.handleOnDecimal}>.</button>
      </div>
    );
  }
}

export default Calculator;