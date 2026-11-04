// CAÇA AO TESOURO 
const readline = require('readline');

// Cores ANSI (função/constantes próprias - toda cor termina com RESET)
const AMARELO = '\x1b[33m';
const CIANO = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const VERMELHO = '\x1b[31m';
const VERDE = '\x1b[32m';
const RESET = '\x1b[0m';

// Mapa (vetor de textos = matriz): # parede | . caminho | $ tesouro
const mapa = [
  '###########',
  '#...#.....#',
  '#.#.#.###.#',
  '#.#...#...#',
  '#.#####.#.#',
  '#.......#$#',
  '###########',
];

// Cada tecla muda x (coluna) e y (linha)
const direcoes = {
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

// Cria o jogador (objeto) na linha 1, coluna 1
function criarJogador() {
  return { x: 1, y: 1, passos: 0 };
}

// Valida o que foi digitado. Retorna { valido, tecla }
function lerComando(entrada) {
  const tecla = String(entrada).trim().toLowerCase();
  const valido = ['w', 'a', 's', 'd', 'sair'].includes(tecla);
  return { valido, tecla };
}

// Diz se dá para andar até (x, y): precisa estar dentro do mapa e não ser parede
function podeAndar(mapaAtual, x, y) {
  if (y < 0 || y >= mapaAtual.length) return false;
  if (x < 0 || x >= mapaAtual[y].length) return false;
  return mapaAtual[y][x] !== '#';
}

// Move o jogador. Retorna true se andou, false se bateu na parede
function mover(mapaAtual, jogador, tecla) {
  const novoX = jogador.x + direcoes[tecla].x;
  const novoY = jogador.y + direcoes[tecla].y;

  if (!podeAndar(mapaAtual, novoX, novoY)) {
    return false;
  }

  jogador.x = novoX;
  jogador.y = novoY;
  jogador.passos++;
  return true;
}

// Diz se o jogador está em cima do tesouro
function chegouNoTesouro(mapaAtual, jogador) {
  return mapaAtual[jogador.y][jogador.x] === '$';
}

function desenhar(jogador, mensagem) {
  console.clear();
  console.log(CIANO + '=== CAÇA AO TESOURO ===' + RESET);
  console.log('Passos: ' + jogador.passos + '\n');

  for (let y = 0; y < mapa.length; y++) {
    let linha = '  ';
    for (let x = 0; x < mapa[y].length; x++) {
      if (x === jogador.x && y === jogador.y) {
        linha += AMARELO + '@' + RESET;
      } else if (mapa[y][x] === '#') {
        linha += CIANO + '█' + RESET;
      } else if (mapa[y][x] === '$') {
        linha += MAGENTA + '$' + RESET;
      } else {
        linha += '.';
      }
    }
    console.log(linha);
  }

  console.log('\n@ você | █ parede | $ tesouro');
  console.log('w = cima | s = baixo | a = esquerda | d = direita | sair');
  console.log(mensagem);
}

function jogar() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const jogador = criarJogador();

  function proximaJogada() {
    rl.question('\n> ', function (resposta) {
      const comando = lerComando(resposta);
      let mensagem = '';

      if (comando.valido && comando.tecla === 'sair') {
        console.log('Até a próxima!');
        rl.close();
        return;
      }

      if (!comando.valido) {
        mensagem = VERMELHO + '[ERRO] Comando inválido! Use w, a, s, d ou sair.' + RESET;
      } else if (!mover(mapa, jogador, comando.tecla)) {
        mensagem = VERMELHO + '[ERRO] Bateu na parede!' + RESET;
      }

      desenhar(jogador, mensagem);

      if (chegouNoTesouro(mapa, jogador)) {
        console.log(VERDE + '[OK] Parabéns! Você terminou em ' + jogador.passos + ' passos.' + RESET);
        rl.close();
      } else {
        proximaJogada();
      }
    });
  }

  desenhar(jogador, '');
  proximaJogada();
}

// Só inicia o jogo quando rodar "node jogo.js" (permite importar nos testes)
if (require.main === module) {
  jogar();
}

module.exports = { mapa, criarJogador, lerComando, podeAndar, mover, chegouNoTesouro };