# STATUS · <produto>

> Leia primeiro. É a foto do projeto: fase atual, portões com evidência, ambientes e o diário.
> O script `scripts/status-snapshot.mjs` lê este arquivo: mantenha os títulos `##` e as colunas das tabelas.

## Fase atual
**Fase 4 · Spec e arquitetura** (desde AAAA-MM-DD). Próximo portão: G3.

## Fases
| # | Fase | Situação | Desde | Observação |
|---|---|---|---|---|
| 1 | Ideia e hipótese | concluída | | `IDEA.md` |
| 2 | Validação sem código | concluída | | |
| 3 | Spike | concluída | | `docs/LEARNINGS.md` |
| 4 | Spec e arquitetura | em andamento | | |
| 5 | MVP | pendente | | T-00 pode rodar antes do G3 |
| 6 | Endurecimento | pendente | | |
| 7 | Lançamento | pendente | | |
| 8 | Operação e evolução | pendente | | |

## Portões
Situação: `pendente` · `passou` · `não se aplica` (sempre com motivo).
| Portão | Pergunta | Situação | Evidência / motivo | Data |
|---|---|---|---|---|
| G1 | Alguém tem esse problema de verdade? | pendente | | |
| G2 | A parte difícil é viável e o fluxo faz sentido? | pendente | | |
| G3 | Sabemos o que construir e como provar? (SPEC assinado, tarefas com "Pronto quando", preview no ar) | pendente | | |
| G4 | Pode receber o dado de um estranho? (go-live marcado, restauração testada, sem item de segurança aberto) | pendente | | |
| G5 | Funciona sem você no meio? (usuários reais completam o fluxo principal sem ajuda) | pendente | | |

## Desvios registrados
Mudou a ordem das fases ou pulou um portão? Registre aqui: o quê, por quê, consequência.
- 

## Ambientes
| Ambiente | URL | Banco | Deploy | Quem aplica migração |
|---|---|---|---|---|
| local | http://localhost:3000 | Docker | — | qualquer sessão |
| preview | <url da Vercel por PR> | efêmero/compartilhado de preview | automático por PR | — |
| produção | <url> | hospedado | merge na `main` | humano, por roteiro MG |

## Diário
Uma linha por PR entregue ou decisão relevante, a mais recente no topo.
- AAAA-MM-DD · T-00 · esqueleto, CI verde, preview no ar · PR #1
