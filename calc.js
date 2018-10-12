const path = require("path");

(() => {
  const filename = path.basename(__filename);
  let entry = process.argv[process.argv.findIndex(arg => path.basename(arg) === filename) + 1];
  let result = 0;

  /**
   * @description - Add two numbers
   * @param {String}  x - Number in string format.
   * @param {String}  y - Number in string format.
   * @return {Number} - Returns result of numbers added.
  */
  const add = (x, y) => parseFloat(x) + parseFloat(y);

  /**
   * @description - Multiply two numbers
   * @param {String}  x - Number in string format.
   * @param {String}  y - Number in string format.
   * @return {Number} - Returns result of numbers multiplied.
  */
  const multiply = (x, y) => parseFloat(x) * parseFloat(y);

  /**
   * @description - Evaluate what operation needs to be executed
   * @param {String}  expression - Expression that needs to be splitted and analyzed.
   * @return {Number} - Returns result of chosen calculation or error.
  */
  const calc = (expression) => {
    const data = expression.split(' ');
    if (data.length === 3) {
      if (data[0] === 'add') {
        return add(data[1], data[2]);
      } else if ((data[0] === 'multiply')) {
        return multiply(data[1], data[2]);
      } else {
        throw new Error('There is an invalid operation!');
      }
    } else {
      throw new Error('There are more or less than 3 arguments into one of the operations.');
    }
  }

  /**
   * @description - Evaluate entered expression, call each operation individually, set data for next operation, and return final result
   * @param {String}  entry - Expression brought from single argument entered by user.
   * @return {Number} - Returns final calculation.
  */
  const main = (entry) => {
    if (entry) {
      const start = entry.lastIndexOf('(');
      const end = entry.indexOf(')', start);
      const string = entry.substring(start + 1, end);
      if (start > -1) {
        result = calc(string);
        entry = entry.replace(entry.slice(start, end + 1), result);
      } else {
        entry = null;
      }
      main(entry);
    }
  }

  try {
    main(entry);
  }
  catch(err) {
    result = `${err.name}: ${err.message}`;
  }
  finally {
    console.log(result);
  }
})();

