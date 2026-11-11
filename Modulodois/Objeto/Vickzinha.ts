// Vickzinha e Capitão Yami VS Deminio 

abstract class Heroi { //Classe pai, molde para as filhas
  vidas = 5;
  ataquesDados = 0;
 
  constructor(public nome: string, public nomeDoPoder: string, public dano: number) {} // simplificação para criação de atributos 
 
  atacar(demonio: Demonio): void { // mostra a quantidade de vida do demonio após ataque das filhas 
    demonio.receberDano(this.dano);
    this.ataquesDados++;
    console.log(
      `${this.nome} usou ${this.nomeDoPoder}! Dano: ${this.dano} | Vida do Demônio: ${demonio.vida}/100`
    );
  }
 
  perderVida(): void {
    this.vidas--;
  }
}
 
// As filhas seriam a classe maga e guerreiro
class Maga extends Heroi { // filha herda tudo do pais (Heroi)
  constructor(nome: string) {
    super(nome, "BOLA DE FOGO", 25); //Poder expecifico da maga
  }
}
 
class Guerreiro extends Heroi { // acontece a mesma coisa, a base é do pai só vai acrescentar o golpe especifico
  constructor(nome: string) {
    super(nome, "GOLPE DE ESPADA", 35);
  }
}
 
//Criação do inimigo: Demonio 
class Demonio {
  vida = 100;
  dano = 20; // dano causado pelo demonio com o poder da escuridão
  ataquesDados = 0;
 
  get derrotado(): boolean {  
    return this.vida <= 0;
  }
 
  receberDano(dano: number): void {
    this.vida = Math.max(this.vida - dano, 0); // Faz a contagem de vida do demonio 
  }
 
  atacar(alvo: Heroi): void { // O ataque do demonio faz as filhas perderem 1 de vida 
    alvo.perderVida();
    this.ataquesDados++;
    console.log(
      `O Demônio usou PODER DA ESCURIDÃO em ${alvo.nome}! Dano: ${this.dano} | ${alvo.nome} perdeu 1 vida (restam ${alvo.vidas})`
    );
  }
}
 
// Começo da batalha 
const vickzinha = new Maga("Vickzinha");// Nome da maga 
const yami = new Guerreiro("Capitão Yami"); // Nome do guerreiro
const demonio = new Demonio();
const herois: Heroi[] = [vickzinha, yami]; // array polimórfico 
 
console.log(" A BATALHA COMEÇOU! Vickzinha e Capitão Yami vs. Demônio\n");// TEXTO indicando o inicio da batalha
 
let rodada = 1; // primeira rodada 
while (!demonio.derrotado) {
  console.log(`>>> Rodada ${rodada} <<<`);
 
  for (const heroi of herois) { 
    if (demonio.derrotado) break;
    heroi.atacar(demonio);
  }
 
  // O demônio contra-ataca, alternando entre os heróis
  if (!demonio.derrotado) {
    const alvo = herois[(rodada - 1) % herois.length];
    if (alvo) {
      demonio.atacar(alvo);
    }
  }
 
  console.log("");
  rodada++; // caso precise de mais de uma rodada para finalizar o Demonio ele vai rodar mais uma vez 
}
 
//Resultado do final da batalha 
console.log("==============================");
console.log(" VITÓRIA! Vickzinha e Capitão Yami derrotaram o Demônio!"); // Texto de vitoria 
console.log("==============================\n");
 
console.log("Ataques ao Demônio:"); // Mostra a quantidade de ataques que os herois deram 
for (const heroi of herois) {
  console.log(`  ${heroi.nome}: ${heroi.ataquesDados} ataque(s)`);
}
 
console.log("\nVidas restantes:"); // Mostra vidas que restou para os herois 
for (const heroi of herois) {
  console.log(`  ${heroi.nome}: ${heroi.vidas}/5`);
}
 
console.log("\nStatus do Demônio:"); // Mostra a vida e o status do inimigo no final, mostrando que ele foi finalizado. 
console.log(`  Vida: ${demonio.vida}/100`);
console.log(`  Situação: ${demonio.derrotado ? "DERROTADO" : "de pé"}`);
console.log(`  Ataques dados: ${demonio.ataquesDados}`);