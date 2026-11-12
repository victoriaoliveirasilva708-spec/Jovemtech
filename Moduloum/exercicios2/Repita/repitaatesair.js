//Repita o nemu até o usuário escolher sair

const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js

let opcao;

do {
    //  Exibe o menu de opções na tela
    console.log("\n--- MENU PRINCIPAL ---");
    console.log("1. Cadastrar Usuário");
    console.log("2. Listar Dados");
    console.log("3. Configurações");
    console.log("4. Sair");
    
    // Lê a escolha do usuário
    opcao = parseInt(prompt("Escolha uma opção (1-4): "));

    //  Executa a ação dependendo da opção escolhida
    switch (opcao) {
        case 1:
            console.log("\n-> Executando: Cadastro de Usuário...");
            break;
        case 2:
            console.log("\n-> Executando: Listando Dados...");
            break;
        case 3:
            console.log("\n-> Executando: Abrindo Configurações...");
            break;
        case 4:
            console.log("\nSaindo do sistema... Até logo!");
            break;
        default:
            console.log("\nOpção inválida! Tente novamente.");
    }

//  O laço REPETE enquanto a opção escolhida for DIFERENTE de 4
} while (opcao !== 4);
