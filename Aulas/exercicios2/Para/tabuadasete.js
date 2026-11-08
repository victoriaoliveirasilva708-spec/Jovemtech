// Programa que imprime a tabuada do 7
console.log("Tabuada do 7:");

for (let i = 1; i <= 10; i++) {
    let resultado = 7 * i;
    console.log(`7 x ${i} = ${resultado}`); // contador começa com 1(let i=1), roda até chegar em 10(i<=10), aumenta a contagem de 1em1(i++), usar as crases (Template Strings) para montar o texto da tabuada bonitinho no console(${i} e (${resultado})
}