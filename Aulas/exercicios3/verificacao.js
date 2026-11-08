// Verificar se um número existe no vetor

const prompt = require('prompt-sync')();

let vetor = [];
console.log("Preencha o vetor com 5 números:");
for (let i = 0; i < 5; i++) {
    vetor.push(Number(prompt(`Posição ${i}: `)));
}

let busca = Number(prompt("Digite o número que deseja procurar no vetor: "));
let posicao = vetor.indexOf(busca); // Procura a posição do número no vetor

if (posicao !== -1) {
    console.log(`O número ${busca} existe no vetor e está na posição (índice): ${posicao}`);
} else {
    console.log(`O número ${busca} NÃO existe no vetor.`);
}
