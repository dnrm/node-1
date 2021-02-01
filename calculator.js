"use strict"

var params = process.argv.slice(2);

let num1 = parseFloat(params[0]);
let num2 = parseFloat(params[1]);

let template = `
    Sum: ${num1 + num2}
    Differrence: ${num1 - num2}
    Producto: ${num1 * num2}
    Quotient: ${num1 / num2}
    Power of first number to the second number: ${num1 ** num2}
    Power of second number to the first number: ${num2 ** num1}
`

console.log(template);
console.log('hello node!');