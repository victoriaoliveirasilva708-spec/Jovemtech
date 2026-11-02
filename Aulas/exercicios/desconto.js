//Simulador de desconto no valor total de compra
const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js
let nomecliente = prompt("Digite o nome do cliente: "); //variavel para armazenar o nome do cliente
let valorcompra = Number(prompt("Digite o valor total da compra: ")); //cria a variavel valorcompra e solicita que o usuário dígite o valor total da compra e quanda na memoria
let desconto = 0.15;//valor do desconto de 15%
let valorfinal = valorcompra - (valorcompra * desconto); //calcula o valor final da compra aplicando o desconto

console.log("-----" + nomecliente + "-----");
console.log("- Valor da compra: " + valorcompra);
console.log("- Desconto aplicado: " + desconto * 100 + "%");
console.log("- Valor final : " + valorfinal);
 //mostra na tela o nome do cliente, o valor da compra e desconto aplicado e valor final.

