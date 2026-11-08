//Ler notas de alunos até que o usuário decida parar. 

const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let continuar;
let contador = 1;

do {
    // 1. Lê a nota do aluno atual
    let nota = Number(prompt(`Digite a nota do aluno ${contador}: `));
    console.log(`Nota ${nota} registrada com sucesso!`);
    
    //  Pergunta ao usuário se ele quer continuar ou parar
    continuar = prompt("Deseja digitar a nota de mais um aluno? (S/N): ").toUpperCase();
    
    contador++; // Aumenta o contador para o próximo aluno

// O laço REPETE ENQUANTO a resposta do usuário for igual a 'S'
} while (continuar === 'S');

console.log("\nPrograma encerrado! Todas as notas foram salvas.");
