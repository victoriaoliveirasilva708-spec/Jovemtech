//Ler idade de 5 pessoas e armazenar em um vetor. Após a leitura, e mostre a maior e a menor idade digitadas.
const prompt = require('prompt-sync')();

let idades = []; // criar um vetor vazio para armazenar as idades
for (let i = 0; i < 5; i++) { // loop para ler as idades de 5 pessoas
    let idade = parseInt(prompt (`Digite a idade da pessoa ${i + 1}: `)); // usar parseInt para converter a entrada em número inteiro
    idades.push(idade);
}

let maiorIdade = Math.max(...idades); // usar Math.max para encontrar a maior idade no vetor 
let menorIdade = Math.min(...idades);// usar Math.min para encontrar a menor idade no vetor

console.log(`A maior idade digitada é: ${maiorIdade}`); // mostrar a maior idade digitada
console.log(`A menor idade digitada é: ${menorIdade}`); // mostrar a menor idade digitada