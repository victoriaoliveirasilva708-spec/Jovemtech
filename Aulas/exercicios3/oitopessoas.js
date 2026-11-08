// Ler idade de 8 pessoas e guardar no vetor

const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let idades = [];
let somaIdades = 0;

// 1. Leitura das 8 idades e acúmulo da soma
console.log("Digite a idade de 8 pessoas:");
for (let i = 0; i < 8; i++) {
    let idade = parseInt(prompt(`Idade da pessoa ${i + 1}: `));
    idades.push(idade);
    somaIdades += idade; // Acumula o valor para calcular a média depois
}

// 2. Cálculos solicitados
// a) Média de idade
let media = somaIdades / 8;

// c) Maior idade digitada (usando o Math.max com espelhamento)
let maiorIdade = Math.max(...idades);


// 3. Exibição dos Resultados na Tela
console.log(`\n--- RELATÓRIO FINAL ---`);

// Resposta A
console.log(`a) A média de idade das pessoas cadastradas é: ${media.toFixed(1)} anos`);

// Resposta B
console.log(`b) Posições com pessoas com mais de 25 anos:`);
let encontrouMais25 = false;
for (let i = 0; i < idades.length; i++) {
    if (idades[i] > 25) {
        console.log(`   -> Posição ${i} (Idade: ${idades[i]})`);
        encontrouMais25 = true;
    }
}
if (!encontrouMais25) {
    console.log("   -> Nenhuma pessoa com mais de 25 anos foi cadastrada.");
}

// Resposta C
console.log(`c) A maior idade digitada foi: ${maiorIdade} anos`);

// Resposta D
console.log(`d) Posições onde a maior idade foi digitada:`);
for (let i = 0; i < idades.length; i++) {
    if (idades[i] === maiorIdade) {
        console.log(`   -> Posição ${i}`);
    }
}
