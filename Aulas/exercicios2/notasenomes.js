// Simulado de 10 alunos com notas e nomes
const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let alunos = [];

for (let i = 0; i < 10; i++){
    let nome = prompt("Digite o nome do aluno: "); // solicita que o usuário digite o nome do aluno
    let nota = Number(prompt("Digite a nota do aluno: ")); // solicita que o usuário digite a nota do aluno
    alunos.push({ nome, nota }); // adiciona o aluno ao array
}