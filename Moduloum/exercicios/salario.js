//Simulador de salario por horas trabanhadas
const prompt = require('prompt-sync')();
let horasTrabalhadas = Number(prompt("Digite o número de horas trabalhadas: "));// ler o numero de horas trabanlhadas que o usuario digitou 
let valorhora = 51.90;// valor da hora
let salario = horasTrabalhadas * valorhora; //calcula o salario multiplicando o numero de horas pelo valor da hora
console.log("O salario é:" + salario);//mostra na tela o salario do usuario