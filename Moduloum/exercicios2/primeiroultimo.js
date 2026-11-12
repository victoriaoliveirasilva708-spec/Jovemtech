// 10 números inteiros. Depois, inverta os valores do vetor
const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let numeros = []; 

for (let i = 0; i < 10; i++){
    let num = Number(prompt(`Digite o ${i + 1}º número: `)); 
    numeros.push(num); // Guarda o número dentro do vetor!
}

// Inverte o vetor usando a função pronta do JS
numeros.reverse();

console.log("Vetor invertido: " + numeros);
