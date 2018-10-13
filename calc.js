const path = require("path");

const filename = path.basename(__filename);
let entry = process.argv[process.argv.findIndex(arg => path.basename(arg) === filename) + 1];
let result = 0;

/**
 * @description - Add two numbers
 * @param {Number}  x - Number.
 * @param {Number}  y - Number.
 * @return {Number} - Returns result of numbers added.
*/
const add = (x, y) => x + y;

/**
 * @description - Multiply two numbers
 * @param {Numbe}  x - Number.
 * @param {Numbe}  y - Number.
 * @return {Number} - Returns result of numbers multiplied.
*/
const multiply = (x, y) => x * y;

/**
 * @description - Evaluate what operation needs to be executed
 * @param {String}  expression - Expression that needs to be splitted and analyzed.
 * @return {Number} - Returns result of chosen calculation or error.
*/
const calc = (expression) => {
  const data = expression.split(' ');
  const operation = data[0],
    input1 = parseFloat(data[1]);
    input2 = parseFloat(data[2]);
  if (data.length === 3) {
    if (!isNaN(input1) && !isNaN(input2)) {
      if (operation === 'add') {
        return add(input1, input2);
      } else if (operation === 'multiply') {
        return multiply(input1, input2);
      } else {
        throw new Error('Invalid operation!');
      }
    } else {
      throw new Error('Invalid input format!');
    }
  } else {
    throw new Error('Invalid input format!');
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
