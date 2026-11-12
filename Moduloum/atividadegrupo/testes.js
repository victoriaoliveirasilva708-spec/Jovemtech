// Testes simples 
const assert = require('assert');
const J = require('./jogo');
 
function teste(nome, fn) {
  try {
    fn();
    console.log('  ok   - ' + nome);
  } catch (e) {
    console.log('  ERRO - ' + nome + '\n         ' + e.message);
    process.exitCode = 1;
  }
}
 
// Mapa pequeno só para os testes (sem paredes na borda de propósito)
const mini = ['#.$'];
 
console.log('Testes do jogo:');
 
teste('lerComando aceita maiúsculas e espaços', () => {
  assert.strictEqual(J.lerComando('  W ').valido, true);
  assert.strictEqual(J.lerComando('  W ').tecla, 'w');
});
 
teste('lerComando rejeita vazio e comandos inexistentes', () => {
  assert.strictEqual(J.lerComando('').valido, false);
  assert.strictEqual(J.lerComando('xyz').valido, false);
  assert.strictEqual(J.lerComando('constructor').valido, false);
});
 
teste('bater na parede não move o jogador', () => {
  const jogador = { x: 1, y: 0, passos: 0 };
  assert.strictEqual(J.mover(mini, jogador, 'a'), false);
  assert.strictEqual(jogador.x, 1);
  assert.strictEqual(jogador.passos, 0);
});
 
teste('andar em caminho livre conta um passo', () => {
  const jogador = { x: 1, y: 0, passos: 0 };
  assert.strictEqual(J.mover(mini, jogador, 'd'), true);
  assert.strictEqual(jogador.x, 2);
  assert.strictEqual(jogador.passos, 1);
});
 
teste('sair do mapa é bloqueado (sem travar)', () => {
  const jogador = { x: 2, y: 0, passos: 0 };
  assert.strictEqual(J.mover(mini, jogador, 'd'), false);
  assert.strictEqual(J.mover(mini, jogador, 'w'), false);
});
 
teste('chegar no tesouro é detectado', () => {
  const jogador = { x: 1, y: 0, passos: 0 };
  assert.strictEqual(J.chegouNoTesouro(mini, jogador), false);
  J.mover(mini, jogador, 'd');
  assert.strictEqual(J.chegouNoTesouro(mini, jogador), true);
});
 
teste('o mapa do jogo tem solução', () => {
  // teclas que levam do início (1,1) até o $
  const caminho = 'ddssddwwddddssss';
  const jogador = J.criarJogador();
  for (const tecla of caminho) J.mover(J.mapa, jogador, tecla);
  assert.strictEqual(J.chegouNoTesouro(J.mapa, jogador), true);
  assert.strictEqual(jogador.passos, caminho.length);
});