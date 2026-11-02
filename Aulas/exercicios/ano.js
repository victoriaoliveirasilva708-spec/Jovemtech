const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js
let ano = prompt("Digite o ano de seu nascimento:"); //cria a variavel ano e solicita que o usuário dígite o ano de nascimento e quanda na memoria
console.log("Você nasceu em " + ano);//exibe na tela o ano de nascimento
let anoAtual = 2026;
console.log( "Então você tem: " + (anoAtual - ano) + " anos");//mostra na tela a idade do usuario. 

