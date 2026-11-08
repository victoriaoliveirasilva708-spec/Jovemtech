// Lados de um triangulo retangulo

const prompt = require('prompt-sync')();

let base = Number(prompt("Digite a medida da base (um dos lados): "));
let altura = Number(prompt("Digite a medida da altura (o outro lado): "));

let area = (base * altura) / 2;

console.log(`A área do triângulo retângulo é: ${area} m²`);
