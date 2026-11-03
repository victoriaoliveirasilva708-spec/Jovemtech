//Simulador de seleção para estágios 
const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let idade = Number(prompt("Digite sua idade: ")); //cria a variavel e solicita que o usuário dígite a idade
if (idade <= 17){
    console.log(" Otimo! Vamos continuar!"); //mostra na tela que o usuário é menor de idade e pode passar para proxima pergunta
    let ensino = prompt("Voce está cursando o ensino médio? (sim/não) "); //verifica se o usuário está cursando o ensino médio 
if (ensino === "sim") {
    console.log(" Você foi aprovado para próxima fase. "); //mostra na tela que o usuário está cursando o ensino médio e pode passar para proxima fase
}
else {
    console.log(" Desculpe, você não atende os critérios. "); // mostra na tela que o usuário tem a idade, mas não está cursando o ensino médio e não pode se candidatar ao estágio
}
}
else {
    console.log(" Desculpe, você não atende os critérios. "); // mostra na tela que o usuário não tem a idade mínima para se candidatar ao estágio
}

