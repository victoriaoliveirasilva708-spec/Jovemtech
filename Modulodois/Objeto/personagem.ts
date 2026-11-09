// Criar a classe Personagem com construtor
class Personagem {
  nome: string;
  vidas: number;
  pontos: number;

  constructor(nome: string) {
    this.nome = nome;
    this.vidas = 5;
    this.pontos = 0;
  }

  // Transformar as funções do personagem em métodos
  atirarBolaDeFogo(): void {
    console.log(`🔥 ${this.nome} lançou uma BOLA DE FOGO!`);
    this.pontos += 10;
    console.log(`Pontos atuais de ${this.nome}: ${this.pontos}`);
  }

  exibirStatus(): void {
    console.log(`\n--- STATUS DE ${this.nome.toUpperCase()} ---`);
    console.log(`Vidas: ${this.vidas}`);
    console.log(`Pontuação Total: ${this.pontos}\n`);
  }
}

// Identificar o personagem principal do jogo
// Substituir os objetos literais por instâncias
const heroi = new Personagem("Vickzinha");

// Testar o jogo funcionando
console.log(" INICIANDO O JOGO...");
heroi.exibirStatus();

// Vickzinha executa suas ações
heroi.atirarBolaDeFogo();
heroi.atirarBolaDeFogo();

// Conferindo o resultado final do teste
heroi.exibirStatus();