//Simulador de soma em um vetor de 8 números
const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let numeros = [];
let soma = 0; // Criamos a variável aqui em cima

for (let i = 0; i < 8; i++){
    let numero = Number(prompt(`Digite o ${i + 1}º número: `));
    numeros.push(numero);
    soma += numero; // Soma direto aqui!
}

console.log("A soma dos números é: " + soma);
