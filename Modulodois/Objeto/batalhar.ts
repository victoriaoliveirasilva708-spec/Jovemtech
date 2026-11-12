import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

//  1. CONFIGURAÇÃO - todos os números do jogo ficam aqui

const CONFIG = {
  equipe: {
    minimo: 1, // menor equipe que o jogador pode formar
    maximo: 2, // maior equipe que o jogador pode formar
  },
  nomeMaximo: 14, // tamanho máximo do nome (cabe na coluna da cena)
  heroi: {
    vidasMaximas: 5,
    manaMaxima: 50,
    percentualAtaqueBasico: 0.6, // ataque básico = 60% do dano do especial
    manaPorAtaqueBasico: 10,
    manaPorDefesa: 15,
    custoCura: 20,
    chanceCritico: 0.25,
  },
  demonio: {
    // A vida do demônio depende do tamanho da equipe (valores testados em simulação)
    vidaPorTamanhoDeEquipe: { 1: 90, 2: 200 } as Record<number, number>,
    danoNormal: 2, // vidas que 1 herói perde no ataque normal
    chanceOnda: 0.4, // chance de usar a Onda de Trevas
    danoOnda: 2, // vidas que CADA herói perde na Onda de Trevas
  },
  animacao: {
    largura: 30,
    passo: 3,
    msPorQuadro: 40,
  },
  cena: {
    larguraColuna: 15,
  },
} as const;

//  2. FIGURAS (arte ASCII)

const ARTE = {
  maga: [
    "    *    ",
    "   /^\\   ",
    "  /___\\  ",
    "  (o.o)  ",
    " /|~~~|\\ ",
    "   / \\   ",
  ],
  guerreiro: [
    "   ___   ",
    "  [o_o]  ",
    " --|#|-+ ",
    "   |#|   ",
    "   / \\   ",
    "         ",
  ],
  arqueiro: [
    "   ,-,   ",
    "  (o.o)  ",
    " /|#|)-> ",
    "   |#|   ",
    "   / \\   ",
    "         ",
  ],
  demonio: [
    " \\|/ \\|/ ",
    "  (>_<)  ",
    " /|VVV|\\ ",
    "  |   |  ",
    "  /   \\  ",
    "         ",
  ],
  lapide: [
    "         ",
    "  _____  ",
    " | RIP | ",
    " |     | ",
    " |_____| ",
    "         ",
  ],
};


//  3. FUNÇÕES AUXILIARES (visual)

const dormir = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Barra de vida, ex.: [###--]
function barra(atual: number, maximo: number, tamanho = 5): string {
  const cheios = Math.round((atual / maximo) * tamanho);
  return "[" + "#".repeat(cheios) + "-".repeat(tamanho - cheios) + "]";
}

// Faz um símbolo "voar" pela tela e termina com uma explosão
async function animarAtaque(simbolo: string, paraDireita: boolean): Promise<void> {
  const { largura, passo, msPorQuadro } = CONFIG.animacao;

  for (let i = 0; i <= largura; i += passo) {
    const posicao = paraDireita ? i : largura - i;
    // \r volta ao início da linha; \x1b[K apaga o que sobrou dela
    process.stdout.write(`\r\x1b[K${" ".repeat(posicao)}${simbolo}`);
    await dormir(msPorQuadro);
  }

  const posicaoFinal = paraDireita ? largura : 0;
  process.stdout.write(`\r\x1b[K${" ".repeat(posicaoFinal)}💥\n`);
  await dormir(150);
}

//  4. CLASSES

abstract class Heroi {
  vidas = CONFIG.heroi.vidasMaximas;
  mana = CONFIG.heroi.manaMaxima;
  defendendo = false;
  ataquesDados = 0;

  constructor(
    public nome: string,
    public classe: string, // "Maga", "Guerreiro"... aparece no menu de escolha
    public nomeDoPoder: string,
    public danoBase: number,
    public custoManaEspecial: number,
    private arte: string[],
    public iconeBasico: string,
    public iconeEspecial: string
  ) {}

  get estaVivo(): boolean {
    return this.vidas > 0;
  }

  // Lápide quando morto, desenho normal quando vivo
  get figura(): string[] {
    return this.estaVivo ? this.arte : ARTE.lapide;
  }

  // Chamado no início do turno de cada herói
  iniciarTurno(): void {
    this.defendendo = false;
  }

  async atacarBasico(demonio: Demonio): Promise<boolean> {
    await animarAtaque(this.iconeBasico, true);

    const dano = Math.floor(this.danoBase * CONFIG.heroi.percentualAtaqueBasico);
    this.causarDano(demonio, dano);
    this.ganharMana(CONFIG.heroi.manaPorAtaqueBasico);

    console.log(
      `⚔️  ${this.nome} fez um ataque básico! Dano: ${dano} (+${CONFIG.heroi.manaPorAtaqueBasico} Mana) | ` +
        `Vida do Demônio: ${demonio.vida}/${demonio.vidaMaxima}`
    );
    return true;
  }

  async usarEspecial(demonio: Demonio): Promise<boolean> {
    if (this.mana < this.custoManaEspecial) {
      console.log(`❌ ${this.nome} não tem mana suficiente! (Necessário: ${this.custoManaEspecial})`);
      return false;
    }

    this.mana -= this.custoManaEspecial;
    await animarAtaque(this.iconeEspecial, true);

    const critico = Math.random() < CONFIG.heroi.chanceCritico;
    const dano = critico ? this.danoBase * 2 : this.danoBase;
    this.causarDano(demonio, dano);

    console.log(
      `${this.iconeEspecial} ${this.nome} usou ${this.nomeDoPoder}! ${critico ? "💥 CRÍTICO! " : ""}` +
        `Dano: ${dano} | Vida do Demônio: ${demonio.vida}/${demonio.vidaMaxima}`
    );
    return true;
  }

  async defender(): Promise<boolean> {
    this.defendendo = true;
    this.ganharMana(CONFIG.heroi.manaPorDefesa);
    console.log(`🛡️  ${this.nome} entrou em postura defensiva! (Bloqueia o próximo ataque e +${CONFIG.heroi.manaPorDefesa} Mana)`);
    return true;
  }

  async curar(): Promise<boolean> {
    if (this.vidas >= CONFIG.heroi.vidasMaximas) {
      console.log(`⚠️  ${this.nome} já está com a vida cheia!`);
      return false;
    }
    if (this.mana < CONFIG.heroi.custoCura) {
      console.log(`❌ Mana insuficiente para curar! (Necessário: ${CONFIG.heroi.custoCura})`);
      return false;
    }

    this.mana -= CONFIG.heroi.custoCura;
    this.vidas++;
    console.log(`💚 ${this.nome} usou cura e recuperou 1 vida! (Vidas: ${this.vidas}/${CONFIG.heroi.vidasMaximas})`);
    return true;
  }

  // Devolve true se o golpe acertou, false se a defesa bloqueou
  perderVida(dano: number): boolean {
    if (this.defendendo) {
      this.defendendo = false;
      console.log(`🛡️  ${this.nome} bloqueou o ataque do Demônio e não perdeu vida!`);
      return false;
    }
    this.vidas = Math.max(this.vidas - dano, 0);
    return true;
  }

  // ---- Métodos internos (reaproveitados pelas ações acima) ----

  private causarDano(demonio: Demonio, dano: number): void {
    demonio.receberDano(dano);
    this.ataquesDados++;
  }

  private ganharMana(quantidade: number): void {
    this.mana = Math.min(this.mana + quantidade, CONFIG.heroi.manaMaxima);
  }
}

class Maga extends Heroi {
  constructor(nome: string) {
    super(nome, "Maga", "BOLA DE FOGO", 30, 25, ARTE.maga, "✨", "🔥");
  }
}

class Guerreiro extends Heroi {
  constructor(nome: string) {
    super(nome, "Guerreiro", "GOLPE DE ESPADA", 40, 20, ARTE.guerreiro, "💨", "🗡️");
  }
}

class Arqueiro extends Heroi {
  constructor(nome: string) {
    super(nome, "Arqueiro", "CHUVA DE FLECHAS", 35, 22, ARTE.arqueiro, "🎯", "🏹");
  }
}

// Lista de classes disponíveis para o jogador escolher.
// Para criar uma classe nova: faça a classe e acrescente uma linha aqui.
const CLASSES: ((nome: string) => Heroi)[] = [
  (nome) => new Maga(nome),
  (nome) => new Guerreiro(nome),
  (nome) => new Arqueiro(nome),
];

class Demonio {
  vida: number;
  ataquesDados = 0;
  arte = ARTE.demonio;

  // A vida máxima é definida quando o demônio é criado (depende da equipe)
  constructor(public vidaMaxima: number) {
    this.vida = vidaMaxima;
  }

  get derrotado(): boolean {
    return this.vida <= 0;
  }

  receberDano(dano: number): void {
    this.vida = Math.max(this.vida - dano, 0);
  }

  // Decide o ataque do turno: onda em área ou golpe em um herói
  async turno(herois: Heroi[]): Promise<void> {
    const vivos = herois.filter((h) => h.estaVivo);
    if (vivos.length === 0) return;

    if (Math.random() < CONFIG.demonio.chanceOnda) {
      await this.ondaDeTrevas(vivos);
    } else {
      const alvo = vivos[Math.floor(Math.random() * vivos.length)];
      await this.poderDaEscuridao(alvo);
    }
  }

  private async poderDaEscuridao(alvo: Heroi): Promise<void> {
    console.log(`👿 O Demônio mira em ${alvo.nome}...`);
    await animarAtaque("🌑", false);

    this.ataquesDados++;
    if (alvo.perderVida(CONFIG.demonio.danoNormal)) {
      console.log(
        `👿 PODER DA ESCURIDÃO! ${alvo.nome} perdeu ${CONFIG.demonio.danoNormal} vidas ` +
          `(Restam ${alvo.vidas}/${CONFIG.heroi.vidasMaximas})`
      );
    }
  }

  private async ondaDeTrevas(alvos: Heroi[]): Promise<void> {
    console.log(`👿 O Demônio ergue os braços... 🌀 ONDA DE TREVAS!`);
    await animarAtaque("🌀", false);

    this.ataquesDados++;
    for (const alvo of alvos) {
      if (alvo.perderVida(CONFIG.demonio.danoOnda)) {
        console.log(`   ${alvo.nome} perdeu ${CONFIG.demonio.danoOnda} vidas (Restam ${alvo.vidas}/${CONFIG.heroi.vidasMaximas})`);
      }
    }
  }
}

//  5. TELA (cena, menu, resultado)

function desenharCena(herois: Heroi[], demonio: Demonio): void {
  const { larguraColuna } = CONFIG.cena;
  const max = CONFIG.heroi.vidasMaximas;

  const colunas = [
    ...herois.map((h) => ({
      figura: h.figura,
      nome: h.nome.slice(0, larguraColuna - 1),
      hp: `HP ${barra(h.vidas, max)} ${h.vidas}/${max}`,
    })),
    {
      figura: demonio.arte,
      nome: "Demonio",
      hp: `HP ${barra(demonio.vida, demonio.vidaMaxima, 8)}`,
    },
  ];

  const montarLinha = (textos: string[]) => textos.map((t) => t.padEnd(larguraColuna)).join("");

  console.log("");
  for (let i = 0; i < colunas[0].figura.length; i++) {
    console.log(montarLinha(colunas.map((c) => c.figura[i])));
  }
  console.log(montarLinha(colunas.map((c) => c.nome)));
  console.log(montarLinha(colunas.map((c) => c.hp)));
  console.log("");
}

function mostrarMenu(heroi: Heroi): void {
  const { custoCura, manaMaxima, vidasMaximas, manaPorAtaqueBasico, manaPorDefesa } = CONFIG.heroi;

  console.log(`Turno de ${heroi.nome} | ❤️  Vidas: ${heroi.vidas}/${vidasMaximas} | 💧 Mana: ${heroi.mana}/${manaMaxima}`);
  console.log(`1 - Ataque Básico ${heroi.iconeBasico} (+${manaPorAtaqueBasico} Mana)`);
  console.log(`2 - ${heroi.nomeDoPoder} ${heroi.iconeEspecial} (Custa ${heroi.custoManaEspecial} Mana)`);
  console.log(`3 - Defender 🛡️  (Bloqueia o próximo ataque e +${manaPorDefesa} Mana)`);
  console.log(`4 - Curar 💚 +1 Vida (Custa ${custoCura} Mana)`);
}

// ["Ana", "Bia", "Caio"] -> "Ana, Bia e Caio"
function listaDeNomes(herois: Heroi[]): string {
  const nomes = herois.map((h) => h.nome);
  if (nomes.length === 1) return nomes[0];
  return nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1];
}

function mostrarResultado(herois: Heroi[], demonio: Demonio): void {
  const linha = "=".repeat(50);

  desenharCena(herois, demonio);
  console.log(linha);
  console.log(
    demonio.derrotado
      ? `🏆 VITÓRIA! ${listaDeNomes(herois)} derrotaram o Demônio!`
      : "💀 DERROTA! O Demônio venceu a batalha..."
  );
  console.log(linha + "\n");

  console.log("📊 Resumo da Batalha:");
  for (const heroi of herois) {
    console.log(`- ${heroi.nome}: ${heroi.ataquesDados} ataques | Vidas finais: ${heroi.vidas}/${CONFIG.heroi.vidasMaximas}`);
  }
  console.log(`- Demônio: Vida final ${demonio.vida}/${demonio.vidaMaxima} | Ataques realizados: ${demonio.ataquesDados}`);
}
//  6. LÓGICA DA BATALHA

// Cada tecla do menu aponta para uma ação do herói
const ACOES: Record<string, (heroi: Heroi, demonio: Demonio) => Promise<boolean>> = {
  "1": (heroi, demonio) => heroi.atacarBasico(demonio),
  "2": (heroi, demonio) => heroi.usarEspecial(demonio),
  "3": (heroi) => heroi.defender(),
  "4": (heroi) => heroi.curar(),
};

// Repete o menu até o jogador escolher uma ação que dê certo
async function turnoDoHeroi(heroi: Heroi, demonio: Demonio): Promise<void> {
  heroi.iniciarTurno();

  let acaoExecutada = false;
  while (!acaoExecutada) {
    mostrarMenu(heroi);
    const escolha = (await rl.question("👉 Escolha sua ação (1-4): ")).trim();
    console.log("");

    const acao = ACOES[escolha];
    if (acao) {
      acaoExecutada = await acao(heroi, demonio);
    } else {
      console.log("⚠️  Opção inválida! Digite 1, 2, 3 ou 4.\n");
    }
  }
  console.log("");
}

//  CRIAÇÃO DOS HERÓIS (o jogador escolhe nome e classe)

async function perguntar(texto: string): Promise<string> {
  return (await rl.question(texto)).trim();
}

// Mostra as classes e devolve a "fábrica" da classe escolhida
async function escolherClasse(): Promise<(nome: string) => Heroi> {
  console.log("\nClasses disponíveis:");
  CLASSES.forEach((criar, i) => {
    const modelo = criar("modelo"); // herói só para ler os dados e mostrar no menu
    console.log(
      `  ${i + 1} - ${modelo.classe.padEnd(10)} ${modelo.iconeEspecial} ${modelo.nomeDoPoder} ` +
        `| Dano: ${modelo.danoBase} | Custo: ${modelo.custoManaEspecial} mana`
    );
  });

  while (true) {
    const numero = Number(await perguntar("👉 Escolha a classe: "));
    const criar = CLASSES[numero - 1];
    if (criar) return criar;
    console.log(`⚠️  Opção inválida! Digite um número de 1 a ${CLASSES.length}.`);
  }
}

// Pergunta quantos heróis vão para a batalha (entre o mínimo e o máximo)
async function escolherTamanhoDaEquipe(): Promise<number> {
  const { minimo, maximo } = CONFIG.equipe;

  while (true) {
    const resposta = await perguntar(`👥 Quantos heróis na equipe? (${minimo} a ${maximo}): `);
    const quantidade = Number(resposta);

    if (Number.isInteger(quantidade) && quantidade >= minimo && quantidade <= maximo) {
      return quantidade;
    }
    console.log(`⚠️  Opção inválida! Digite um número de ${minimo} a ${maximo}.`);
  }
}

async function criarHerois(quantidade: number): Promise<Heroi[]> {
  const herois: Heroi[] = [];

  for (let i = 1; i <= quantidade; i++) {
    console.log(`\n===== CRIE O HERÓI ${i} =====`);

    // Se o jogador não digitar nada, usa um nome padrão
    const nome = (await perguntar("Nome do herói: ")).slice(0, CONFIG.nomeMaximo) || `Herói ${i}`;
    const criar = await escolherClasse();

    const heroi = criar(nome);
    console.log(`✅ ${heroi.nome} (${heroi.classe}) entrou na batalha!`);
    herois.push(heroi);
  }

  return herois;
}

async function iniciarJogo(): Promise<void> {
  console.clear();
  console.log("=".repeat(50));
  console.log("⚔️  BEM-VINDO À BATALHA CONTRA O DEMÔNIO!");
  console.log("=".repeat(50));

  // Array polimórfico: Maga, Guerreiro e Arqueiro tratados como Heroi
  const quantidade = await escolherTamanhoDaEquipe();
  const herois: Heroi[] = await criarHerois(quantidade);

  // A vida do demônio se ajusta sozinha ao tamanho da equipe
  const demonio = new Demonio(CONFIG.demonio.vidaPorTamanhoDeEquipe[herois.length]);

  console.log("\n" + "=".repeat(50));
  console.log(`⚔️  A BATALHA COMEÇOU! ${listaDeNomes(herois)} vs Demônio`);
  console.log(`👿 O Demônio tem ${demonio.vidaMaxima} de vida para uma equipe de ${herois.length}.`);
  console.log("=".repeat(50));

  const batalhaContinua = () => !demonio.derrotado && herois.some((h) => h.estaVivo);

  for (let rodada = 1; batalhaContinua(); rodada++) {
    console.log(`\n---------------- RODADA ${rodada} ----------------`);
    console.log(`👿 Vida do Demônio: ${demonio.vida}/${demonio.vidaMaxima}`);
    desenharCena(herois, demonio);

    // Turno dos heróis
    for (const heroi of herois) {
      if (demonio.derrotado) break;
      if (heroi.estaVivo) await turnoDoHeroi(heroi, demonio);
    }

    // Turno do demônio
    if (!demonio.derrotado) await demonio.turno(herois);
  }

  mostrarResultado(herois, demonio);
  rl.close();
}

iniciarJogo();