// Verificador de quantidades de ferraduras

const prompt = require('prompt-sync')();

let cavalos = parseInt(prompt("Digite a quantidade de cavalos comprados: "));
let totalFerraduras = cavalos * 4;

console.log(`Para equipar ${cavalos} cavalos, serão necessárias ${totalFerraduras} ferraduras.`);
