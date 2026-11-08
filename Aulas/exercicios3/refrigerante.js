// Calculo de litros

const prompt = require('prompt-sync')();

let latas = parseInt(prompt("Quantidade de latas de 350ml: "));
let garrafas600 = parseInt(prompt("Quantidade de garrafas de 600ml: "));
let garrafas2L = parseInt(prompt("Quantidade de garrafas de 2 Litros: "));

// Calcula o total convertendo tudo direto para litros
let totalLitros = (latas * 0.35) + (garrafas600 * 0.60) + (garrafas2L * 2.0);

console.log(`\nO comerciante comprou um total de ${totalLitros.toFixed(2)} litros de refrigerante.`);
