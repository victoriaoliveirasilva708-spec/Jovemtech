//Imprime os numeros pares menores que o digitado.

const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

// Lê o número limite do usuário
let numeroLimite = parseInt(prompt("Digite um número: "));

// Inicia o contador no primeiro número par positivo
let contador = 2;

console.log(`Números pares menores que ${numeroLimite}:`);

//  O laço roda ENQUANTO o contador for menor que o número digitado
while (contador < numeroLimite) {
    console.log(contador);
    contador += 2; // Avança de 2 em 2 para pegar apenas os pares
}
