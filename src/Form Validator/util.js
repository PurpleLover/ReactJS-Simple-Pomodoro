export const validateInput = (checkingInput, type) => {
  if (type === 'phonenumber') {
    const regexp = /\d{9,11}/;
    const checkingResult = regexp.exec(checkingInput);
    if (checkingResult !== null) {
      return {
        isInputValid: true,
        errorMessage: ''
      };
    } else {
      return {
        isInputValid: false,
        errorMessage: 'Mobile phone must be 9 to 11 characters'
      };
    }
  }
  if (type === 'fullname') {
    const regexp = /[a-zA-z ]/gm;
    const checkingResult = regexp.exec(checkingInput);
    if (checkingResult !== null) {
      return {
        isInputValid: true,
        errorMessage: ''
      };
    } else {
      return {
        isInputValid: false,
        errorMessage: 'Name must not containe number characters'
      };
    }
  }
}

export const formatNumber = (stringNumber) => {
  stringNumber = typeof stringNumber === 'string'
    ? parseInt(stringNumber, 10)
    : stringNumber;
  return stringNumber.toLocaleString('en-US');
}