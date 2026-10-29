const prompt = require('prompt-sync')();
//simula a leitura de idade do usuário
let idade =prompt("Digite sua idade: ");
if(idade >=16){
    console.log("Você pode votar!");
}else{
    console.log("você não pode votar!");
}