//Simulado de aposentadoria
const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js
let idade = Number(prompt("Digite a sua idade: ")); //variavel para armazenar a idade do usuário
if (idade >= 60){
    console.log("Você já pode se aposentar!"); //condição para aprovar aposentadoria
}
else{
    console.log("Trabalho formal"); 
}