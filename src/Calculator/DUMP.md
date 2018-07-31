import {OPERATOR_CHECKER} from './constant/Operator';

let currentValue = '', result = '', stack = [], history = '';
class CalculatorHelper {
  constructor() {
    currentValue = '';
    result = '';
    stack = [];
    history = '';
  }
  //Press number
  inputDigit(digit) {
    if (Number.isNaN(digit)) {
      throw Error('Only Number allowed!');
    }
    if (result !== '') {
      result = '';
      currentValue = '';
    }
    if (digit === '0' && currentValue === '') {
      return;
    }
    if (currentValue.match(/[\+\-\*\/]/g)) {
      currentValue = digit;
      return;
    }
    currentValue += digit;
  }
  //Press .
  inputDecimal() {
    if (result !== '') {
      result = '';
      currentValue = '';
    }
    if (currentValue.indexOf('.') >= 0) {
      return;
    }
    if (currentValue === '' || currentValue.match(OPERATOR_CHECKER)) {
      currentValue = '0.';
    } else {
      currentValue += '.';
    }
  }
  //Press AC
  clearAll() {
    currentValue = '';
    result = '';
    stack = [];
  }
  //Press +
  pressOperate(operator) {
    if (currentValue.match(OPERATOR_CHECKER) && currentValue.length===1) {
      this._checkDuplicate(operator);
      return;
    }
    stack.push(currentValue, operator);

    currentValue = operator;
  }
  add() {
    if (currentValue.match(OPERATOR_CHECKER) && currentValue.length===1) {
      this._checkDuplicate('+');
      return;
    }
    stack.push(currentValue, '+');

    currentValue = '+';
  }
  //Press -
  subtract() {
    if (currentValue.match(OPERATOR_CHECKER) && currentValue.length ===1) {
      this._checkDuplicate('-');
      return;
    }
    stack.push(currentValue, '-');

    currentValue = '-';
  }
  //Press x
  multiply() {
    if (currentValue === '') {
      this._checkDuplicate('*');
      return;
    }
    stack.push(currentValue, '*');
    currentValue = '';
  }
  //Press /
  divide() {
    if (currentValue === '') {
      this._checkDuplicate('/');
      return;
    }
    stack.push(currentValue, '/');

    currentValue = '';
  }
  //Press =
  equals() {
    if (currentValue === '') {
      return;
    }
    history = '';
    stack.push(currentValue);
    const expression = stack.join('');
    result = eval(expression);
    currentValue = result.toString();
    history = expression.concat(`=${currentValue}`);
    stack = [];
  }
  getValue() {
    return currentValue === '' ? '0' : currentValue;
  }
  getExpression() {
    if (arguments[0]===1) {
      return history;
    }
    return stack.join('');
  }
  getResult() {
    return result === '' ? '0' : result;
  }
  _checkLastElement(stack = []) {
    const lastIndex = stack.length - 1;
    if (lastIndex < 0) {
      return { flag: 0 }
    }
    const lastElement = stack[lastIndex];
    if (lastElement.match(/[\+\-\*\/]/g)) {
      return { flag: 1, value: lastIndex };
    }
    return { flag: 0 };
  }
  _checkDuplicate(operator) {
    const check = this._checkLastElement(stack);
    switch (check.flag) {
      case 0: {
        break;
      }
      case 1: {
        stack[check.value] = operator;
        currentValue = operator;
        break;
      }
    }
  }
}

export default CalculatorHelper;