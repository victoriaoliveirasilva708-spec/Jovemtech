// úmeros positivos, e só pare quando o usuário digitar zero. 

const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let numero;

console.log("Digite números positivos. O programa só vai parar quando você digitar 0.");

do {
    // Lê um número do usuário
    numero = Number(prompt("Digite um número: "));

    // Se o número for positivo, mostra uma mensagem de confirmação
    if (numero > 0) {
        console.log(`Número ${numero} registrado!`);
    } else if (numero < 0) {
        console.log("Atenção: Você digitou um número negativo, mas o programa continua até digitar 0.");
    }

// O laço REPETE ENQUANTO o número digitado for DIFERENTE de zero
} while (numero !== 0);

console.log("\nPrograma encerrado! Você digitou o número 0.");
