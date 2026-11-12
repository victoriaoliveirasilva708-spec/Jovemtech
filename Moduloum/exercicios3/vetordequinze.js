// Multiplos de 10 

const prompt = require('prompt-sync')();

let numeros = [];

for (let i = 0; i < 15; i++) {
    numeros.push(parseInt(prompt(`Digite o ${i + 1}º número: `)));
}

console.log("\nVetor completo:", numeros);

console.log("\nMúltiplos de 10 encontrados nas posições:");
for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 10 === 0) {
        console.log(`-> O número ${numeros[i]} está na posição ${i}`);
    }
}
