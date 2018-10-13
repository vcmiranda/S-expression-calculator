const path = require("path");

let result = 0;
const filename = path.basename(__filename); // It uses built-in node library path to return filename
let entry = process.argv[process.argv.findIndex(arg => path.basename(arg) === filename) + 1]; // Get string after filename and set as entry data


/**
 * @description - Check whether entry string has chars after or before initial and final parenthesis
 * @param {String}  data - Expression brought from single argument entered by user.
 * @return {Boolean} - Returns true if no extra chars.
*/
const checkEntry = (data) => {
  const checkStart = data.substring(0, data.indexOf('('));
  const checkEnd = data.substring(data.lastIndexOf(')') + 1);
  return checkStart || checkEnd ? true : false;
}


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
  if (data.length === 3) {  // Check whether array has exactly 3 elements (operation, input1 and input2)
    if (!isNaN(input1) && !isNaN(input2)) { // Check whether both inputs are numbers
      if (operation === 'add') { // Run if operation is addition
        return add(input1, input2);
      } else if (operation === 'multiply') { // Run if operation is multiplication
        return multiply(input1, input2);
      } else {
        throw new Error('Invalid operation!'); // Throw error if neither addition nor multiplication
      }
    } else {
      throw new Error('Invalid input!'); // Throw error if inputs are not number
    }
  } else {
    throw new Error('Invalid input!'); // Throw error if less or more than 3 arguments
  }
}


/**
 * @description - Evaluate entered expression, call each operation individually, set data for next operation, and return final result
 * @param {String}  entry - Expression brought from single argument entered by user.
 * @return {Number} - Returns final calculation.
*/
const main = (entry) => {
  if (entry) {
    const start = entry.lastIndexOf('('); // Get last start parenthesis
    const end = entry.indexOf(')', start); // Get first end parenthesis after previous start parenthesis
    const string = entry.substring(start + 1, end); // Set string to be used
    if (start > -1) { // Run if parenthesis is found
      result = calc(string); // Return calculation
      entry = entry.replace(entry.slice(start, end + 1), result); // Reset entry string
    } else {
      entry = null; // Define entry as null when no more parenthesis found
    }
    main(entry); // Recall function
  }
}

try {
  if (checkEntry(entry)) {
    throw new Error('Invalid input!'); // Throw error if input
  } else {
    main(entry);
    result = (`\nResult: ${result}\n`);
  }
}
catch(err) {
  result = `\n${err.name}: ${err.message}\n`;
}
finally {
  console.log(result);
}
