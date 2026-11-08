//Sexta parte de um numero real 

const prompt = require('prompt-sync')();

let numero = Number(prompt("Digite um número real qualquer: "));
let sextaParte = numero / 6;

console.log(`A sexta parte de ${numero} é: ${sextaParte.toFixed(2)}`); 
