CAÇA AO DESOURO LABIRINTO 

Squad: (Kauã, Victoria, Clara e Paula)

Como rodar:

```bash
node jogo.js     # jogar
node teste.js    # rodar os testes
```
Como jogar:

Leve o jogador `@` até o tesouro `$` sem bater nas paredes `█`. Digite o comando e aperte ENTER.

Comandos: 
(`w`) cima 
(`s`)baixo 
(`a`) esquerda
(`d`)direita 
`sair` encerra o jogo 

Símbolos e cores:

| Símbolo | Significado | Cor |

| `@` | jogador - Amarelo
| `█` | parede - Ciano
| `.` | caminho - Sem cor
| `$` | tesouro - Magenta

Erros e sucesso aparecem com prefixo de texto (`[ERRO]`, `[OK]`), então nenhuma informação depende só da cor.

Decisão sobre as cores ANSI colocadas pelo claude:

Não usamos a função fornecida pela instrutora. Criamos constantes de cor próprias (`AMARELO`, `CIANO`, `MAGENTA`, `VERMELHO`, `VERDE`), e todo texto colorido termina com `RESET` (`\x1b[0m`).

Conteúdos do módulo aplicados:

- **Matriz/vetor:** `mapa` é um vetor de textos, percorrido como matriz (linha `y`, coluna `x`).
- **Laços:** `for` aninhados para desenhar o mapa; o loop do jogo repete a pergunta até vencer ou sair.
- **Condicionais:** decidem parede, limite do mapa, comando inválido e chegada no tesouro.
- **Funções:** `criarJogador`, `lerComando`, `podeAndar`, `mover`, `chegouNoTesouro`, `desenhar`, `jogar`.
- **Objetos:** `jogador` (`{x, y, passos}`) e `direcoes` (deslocamento de cada tecla).
- **Validação de entrada:** `lerComando` trata texto vazio, maiúsculas, espaços e comandos inexistentes.
- **Tratamento defensivo:** `podeAndar` confere os limites do mapa antes de acessar a matriz.
- **Testes:** `teste.js` com 7 testes automatizados.

📁 Estrutura

├── jogo.js
├── teste.js
└── README.md

 Fluxo de Git:

- Uma branch para cada tarefa (ex.: `feature/mapa`, `feature/movimento`, `test/validacoes`).
- Commits pequenos, com mensagens claras.
- Mudanças entram na `main` por Pull Request, com revisão de outro integrante.