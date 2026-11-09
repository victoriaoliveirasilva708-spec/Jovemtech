class Personagem {
  nome: string;
  vidas: number;
  pontos: number;

  constructor(nome: string) {
    this.nome = nome;
    this.vidas = 3;
    this.pontos = 0;
  }

  pular(): void {
    console.log(`${this.nome} pulou!`);
  }
}

// Exemplo de uso para testar no terminal:
const heroi = new Personagem("Mario");
heroi.pular();
