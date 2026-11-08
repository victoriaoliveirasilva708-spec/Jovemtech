// ler 6 números e armazenar em um vetor. Após a leitura, mostrar os pares e os ímpares.

const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js


let numeros = []; // criar um vetor vazio para armazenar os números.
for (let i = 0; i < 6; i++){
   let numero = parseInt(prompt(`Digite o ${i + 1}º número: `)); // solicitar que o usuário digite um número e converter para inteiro
}

let impares = numeros.filter(num => num % 2 !== 0); // filtrar os números ímpares do vetor
let pares = numeros.filter(num => num % 2 === 0); // filtrar os números pares do vetor

console.log(`Números pares: ${pares}`);
console.log(`Números ímpares: ${impares}`);
