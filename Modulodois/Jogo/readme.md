Batalha contra o Demônio

Jogo de batalha por turnos no terminal, feito em **TypeScript** para praticar orientação a objetos (herança, polimorfismo e encapsulamento). Você monta uma equipe de 1 ou 2 heróis, escolhe nome e classe de cada um e enfrenta o Demônio.

```
   ,-,            ___          \|/ \|/
  (o.o)          [o_o]          (>_<)
 /|#|)->        --|#|-+        /|VVV|\
   |#|            |#|           |   |
   / \            / \           /   \

Herói 1           Herói 2        Demonio
HP [#####] 5/5 HP [#####] 5/5 HP [########] // As vidas de cada personagem
```

Como rodar?

Jogar o comando abaixo para iniciar o jogo:
```bash
npx tsx jogobatalha.ts
```
Não precisa instalar nada além do Node: o `npx` baixa o `tsx` (que executa TypeScript) na primeira vez.

Como jogar?

1. Escolha a quantidade de heróis que vão para a batalha (1 ou 2).
2. Para cada herói, digite o nome e escolha a classe.
3. A cada rodada, cada herói escolhe uma ação (menu abaixo) e depois o Demônio ataca.
4. A batalha termina quando o Demônio chega a 0 de vida ou quando todos os heróis morrem.

No final, o jogo mostra quantos ataques cada herói deu, as vidas restantes e a vida final do Demônio.

Ações do herói:

| Tecla | Ação | Efeito |

| 1 | Ataque básico | Causa 60% do dano do poder especial e recupera 10 de mana.
| 2 | Poder especial | Causa o dano da classe e gasta mana. Tem 25% de chance de crítico (dano dobrado).
| 3 | Defender | Bloqueia o próximo ataque do Demônio e recupera 15 de mana.
| 4 | Curar | Recupera 1 vida e gasta 20 de mana.

Todo herói começa com 5 vidas e 50 de mana (o máximo). Se você escolher uma ação impossível (sem mana, ou curar com a vida cheia), o menu aparece de novo.

Classes: 

| Classe | Poder especial | Dano | Custo de mana | Ataque básico |

| Maga | 🔥 Bola de Fogo | 30 | 25 | 18 |
| Guerreiro | 🗡️ Golpe de Espada | 40 | 20 | 24 |
| Arqueiro | 🏹 Chuva de Flechas | 35 | 22 | 21 |

O Demônio:

A cada turno ele escolhe um de dois ataques:

- **🌑 Poder da Escuridão** (60% das vezes): um herói vivo, escolhido ao acaso, perde 2 vidas.
- **🌀 Onda de Trevas** (40% das vezes): todos os heróis vivos perdem 2 vidas.

A Defesa bloqueia qualquer um dos dois ataques. A vida do Demônio se ajusta ao tamanho da equipe:

| Equipe | Vida do Demônio |

| 1 herói | 90 |
| 2 heróis | 200 |

Esses valores foram escolhidos com simulações para que a luta fique equilibrada: com 1 herói as três classes ganham cerca de 44% das vezes, e com 2 heróis a taxa varia com a dupla escolhida.

Estrutura do código:

Tudo está em um único arquivo, dividido em seções numeradas:

| Seção | O que contém |

| 1. `CONFIG` | Todos os números do jogo (vidas, mana, danos, chances) |
| 2. `ARTE` | Os desenhos ASCII dos personagens e da lápide |
| 3. Funções auxiliares | Barra de vida e animação dos ataques |
| 4. Classes | `Heroi`, `Maga`, `Guerreiro`, `Arqueiro` e `Demonio` |
| 5. Tela | Cena lado a lado, menu e resultado final |
| 6. Lógica da batalha | Criação dos heróis, turnos e rodadas |

Árvore de classes:

```
Heroi (abstrata)
├── Maga        -> Bola de Fogo
├── Guerreiro   -> Golpe de Espada
└── Arqueiro    -> Chuva de Flechas

Demonio (inimigo, com ataques próprios)
```
Bom jogo!!!
FIM.