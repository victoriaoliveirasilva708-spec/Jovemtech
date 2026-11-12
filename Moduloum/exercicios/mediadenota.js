//Simulador de media de notas de uma aluno
const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let nomealuno = prompt("Digite o nome do aluno: ");  //Variavel para digitar nome do aluno

let nota1 = Number(prompt("Digite a primeira nota: ")); /* Variavel para digitar as notas */
let nota2 = Number(prompt("Digite a segunda nota: "));
let nota3 = Number(prompt("Digite a terceira nota: "));
let media = (nota1 + nota2 + nota3) / 3; // soma das notas e divide por 3 para calcular a media
if (media >= 7){    //condição para verificar se foi aprovado ou não.
    console.log("Aluno aprovado!");
}
else{
    console.log("Aluno reprovado!");
}

console.log("-----" + nomealuno + "-----"); //mostra na tela o nome do aluno
console.log("- Média final: " + media);//mostra na tela a media final 

