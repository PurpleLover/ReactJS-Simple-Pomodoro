import { OPERATOR_CHECKER } from './constant/Operator';

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
    if (currentValue.match(OPERATOR_CHECKER)) {
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
    history = '';
  }
  //Press + - * /
  pressOperate(operator) {
    history = '';
    if (currentValue.match(OPERATOR_CHECKER) && currentValue.length === 1) {
      this._checkDuplicate(operator);
      return;
    }
    stack.push(currentValue, operator);

    currentValue = operator;
  }
  //Press =
  equals() {
    if (currentValue === '') {
      return;
    }

    if (currentValue.match(OPERATOR_CHECKER)) {
      if (stack[1]===currentValue && stack[0]==='') {
        history = 'NaN';
        currentValue = 'NaN';
        result = 'NaN';
        stack = [];
        return;
      }
      stack.pop();
    } else {
      stack.push(currentValue); 
    }

    const expression = stack.join('');
    if (expression.startsWith('*') || expression.startsWith('/')) {
      result = currentValue;
      stack.pop();
      return;
    }
    const res = parseFloat(eval(expression).toFixed(4)).toString();
    result = res;
    currentValue = result;
    history = expression.concat(`=${currentValue}`);
    stack = [];
  }
  // Getter method
  getValue() {
    return currentValue === '' ? '0' : currentValue;
  }
  getExpression() {
    if (history !== '') {
      return history;
    }
    return stack.join('') + (currentValue.match(/[0-9]/g) ? currentValue : '');
  }
  getResult() {
    return result === '' ? '0' : result;
  }
  // Private method
  _checkLastElement(stack = []) {
    const lastIndex = stack.length - 1;
    if (lastIndex < 0) {
      return { flag: 0 }
    }
    const lastElement = stack[lastIndex];
    if (lastElement.match(OPERATOR_CHECKER)) {
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
  _checkUnsolvable(stack = []) {
    const expression = stack.join('');
    console.log(stack);
    if (expression.substr(0,2).match(/[*/][0-9]/)) {
      return true;
    }
    return false;
  }
}

export default CalculatorHelper;