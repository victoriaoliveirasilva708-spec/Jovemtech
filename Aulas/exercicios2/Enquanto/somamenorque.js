//Continua lendo até a soma deles for menor que 100

const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let soma = 0; // Variável para acumular o total dos números

// O laço roda ENQUANTO a soma for menor que 100
while (soma < 100) {
    let numero = Number(prompt(`A soma atual é ${soma}. Digite um número para somar: `));
    
    soma += numero; // Adiciona o número digitado ao total acumulado
}

console.log(`\nParabéns! A soma final foi de ${soma}, atingindo o limite de 100 ou mais.`);
