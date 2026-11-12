//Simulador de numeros positivos

const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

console.log("Digite números positivos. O programa vai parar quando digitar um número negativo ou zero.");

// Lê o primeiro número antes de entrar no laço
let numero = Number(prompt("Digite um número: "));

//  O laço 'while' continua rodando ENQUANTO o número for positivo (maior que zero)
while (numero > 0) {
    console.log(`Você digitou o número positivo: ${numero}`);
    
    //  Lê o próximo número para reavaliar a condição do laço
    numero = Number(prompt("Digite outro número: "));
}

console.log("\nPrograma encerrado! Você digitou um valor menor ou igual a zero.");
