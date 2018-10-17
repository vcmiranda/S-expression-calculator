const path = require("path");

let result = 0;
const filename = path.basename(__filename); // It uses built-in node library path to return filename
let entry = process.argv[process.argv.findIndex(arg => path.basename(arg) === filename) + 1]; // Get string after filename and set as entry data

/**
 * @description - Adds two numbers
 * @param {Number}  x - Number.
 * @param {Number}  y - Number.
 * @return {Number} - Returns result of numbers added.
*/
const add = (x, y) => x + y;


/**
 * @description - Multiplies two numbers
 * @param {Numbe}  x - Number.
 * @param {Numbe}  y - Number.
 * @return {Number} - Returns result of numbers multiplied.
*/
const multiply = (x, y) => x * y;


/**
 * @description - Evaluates what operation needs to be executed
 * @param {String}  expression - Expression that needs to be splitted and analyzed.
 * @return {Number} - Returns result of chosen calculation or error.
*/
const calc = (expression) => {
  const data = expression.split(' ');
  const operation = data[0],
    input1 = parseFloat(data[1]);
    input2 = parseFloat(data[2]);
  if (data.length === 3) {  // Checks whether array has exactly 3 elements (operation, input1 and input2)
    if (!isNaN(input1) && !isNaN(input2)) { // Checks whether both inputs are numbers
      if (operation === 'add') { // Checks if operation is addition
        return add(input1, input2);
      } else if (operation === 'multiply') { // Checks if operation is multiplication
        return multiply(input1, input2);
      } else {
        throw new Error('Invalid operation!'); // Throws error if neither addition nor multiplication
      }
    } else {
      throw new Error('Invalid input!'); // Throws error if inputs are not number
    }
  } else {
    throw new Error('Invalid input!'); // Throws error if less or more than 3 arguments
  }
}


/**
 * @description - Evaluates entered expression, call each operation individually, set data for next operation, and return final result
 * @param {String}  entry - Expression brought from single argument entered by user.
 * @return {Number} - Returns final calculation.
*/
const main = (entry) => {
  if (entry) {
    const start = entry.lastIndexOf('('); // Gets last start parenthesis
    const end = entry.indexOf(')', start); // Gets first end parenthesis after previous start parenthesis
    const string = entry.substring(start + 1, end); // Sets string to be used
    if (start > -1) { // Checks if parenthesis is found
      result = calc(string); // Returns calculation
      entry = entry.replace(entry.slice(start, end + 1), result); // Resets entry string
    } else {
      entry = null; // Defines entry as null when no more parenthesis found
    }
    main(entry); // Recalls function
  }
}

/**
 * @description - Checks whether entry string has chars after or before initial and final parenthesis
 * @param {String}  data - Expression brought from single argument entered by user.
 * @return {Boolean} - Returns true if no extra chars.
*/
const start = (data) => {
  if (!isNaN(data)) {
    result = (`\nResult: ${data}\n`); // Sets valid result
  } else {
    const checkStart = data.substring(0, data.indexOf('(')); // Checks whether there are characters before initial parenthesis 
    const checkEnd = data.substring(data.lastIndexOf(')') + 1); // Checks whether there are characters after final parenthesis
    const checkEntry = checkStart || checkEnd ? true : false; // Returns true if exists characters
    if (checkEntry) {
      throw new Error('Invalid input!'); // Throws error if invalid input
    } else {
      main(entry); // Runs main code
      result = (`\nResult: ${result}\n`); // Sets valid result
    }
  }
}

try {
  start(entry);
}
catch(err) {
  result = `\n${err.name}: ${err.message}\n`; // Sets error message
}
finally {
  console.log(result); // Returns final result
}
