//simulador de antecesor e sucessor de um numero inteiro
const prompt = require('prompt-sync')();
let numero = Number(prompt("Digite um número inteiro:")); //ler o numero que o usuario digitou
console.log("O antecessor de " + numero + " é " + (numero - 1)); //calcula o antecessor do numero digitado
console.log("O sucessor de " + numero + " é " + (numero + 1)); //calcula o sucessor do numero digitado e monstra na tela
//obs: foi usado o Number() para que o prompt entendesse que o valor digitado é um numero inteiro para que assim pudesse ser feito a soma e a subtração do mesmo, caso controrio o prompt iria entender que o valor digitado era um texto.