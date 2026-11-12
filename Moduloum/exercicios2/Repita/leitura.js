//Repetir a leitura que o usuário digite um número múltiplo de 5

const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let numero;

do {
    // Lê um número do usuário a cada repetição
    numero = parseInt(prompt("Digite um número: "));

    // Se não for múltiplo de 5, avisa o usuário que vai continuar
    if (numero % 5 !== 0) {
        console.log(`${numero} não é múltiplo de 5. Tente novamente!`);
    }

//  O laço REPETE ENQUANTO o resto da divisão por 5 for DIFERENTE de zero
} while (numero % 5 !== 0);

console.log(`\nFim do programa! O número ${numero} é múltiplo de 5.`);
