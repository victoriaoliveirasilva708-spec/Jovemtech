//Simulador de fidelidade para desconto em compras
const prompt = require('prompt-sync')(); // garante que o prompt funcione no node.js
let valorcompra = Number(prompt("Digite o valor total da compra: ")); //cria a variavel e solicita que o usuário dígite o valor total da compra e quanda na memoria
let fidelidade = prompt(" Você é cliente fidelidade? (sim/não) "); //verifica se o cliente é fidelidade ou não
if (fidelidade === "sim") {
    let desconto = 0.20; // valor do desconto de 20%
    let valorfinal = valorcompra - (valorcompra * desconto); // calcula o valor final da compra aplicando o desconto para clientes fidelidade
    console.log("----- Cliente fidelidade -----");
    console.log("- Valor da compra: " + valorcompra);
    console.log("- Desconto aplicado: " + desconto * 100 + "%");
    console.log("- Valor final : " + valorfinal);
}
else {
    let desconto = 0.20; // valor do desconto de 20% com uma condição caso ele não seja fidelidade
    if (valorcompra >= 500) {
        let valorfinal = valorcompra - (valorcompra * desconto); // calcula o valor final da compra aplicando o desconto para clientes que não são fidelidade, mas que atingiram o valor minimo de compra
        console.log("-----Parabéns você é elegível para desconto! -----");
        console.log("- Valor da compra: " + valorcompra);
        console.log("- Desconto aplicado: " + desconto * 100 + "%");
        console.log("- Valor final : " + valorfinal);
    }
    else {
        console.log("-----Compra-----");
        console.log("- Valor da compra: " + valorcompra);
              console.log(" Você não atingiu os critérios para desconto ") //mostra na tela o valor da compra caso o cliente não seja fidelidade e não atingiu o valor minimo de compra para desconto
              

    }
}