// Números inteitos no vetor

const prompt = require('prompt-sync')();

let inteiros = [];

for (let i = 0; i < 10; i++) {
    inteiros.push(parseInt(prompt(`Digite o ${i + 1}º número inteiro: `)));
}

console.log("\nAnálise dos números pares:");
for (let i = 0; i < inteiros.length; i++) {
    if (inteiros[i] % 2 === 0) {
        console.log(`O número par ${inteiros[i]} está armazenado na posição ${i}`);
    }
}
