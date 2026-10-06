# Roteiro MG · <ex.: aplicar migração em produção>

> Tarefa em modo **MG (manual guiado)**: o Claude escreve o roteiro; o humano executa cada passo e cola a evidência no PR.
> Nenhuma sessão roda comando contra o projeto remoto (`db push`, `link`, seed remoto, DNS, credenciais).

- **Tarefa:** T-NN · **Ambiente:** produção · **Quem executa:** <operador(a)> · **Janela:** <quando>
- **Pré-requisitos:** acesso a <painel>, backup recente confirmado (data/hora), plano de volta lido.

## Passos
| # | O que fazer | Onde | Resultado esperado | Evidência a colar no PR |
|---|---|---|---|---|
| 1 | Confirmar backup e anotar o horário | painel do banco | backup < 24h | print |
| 2 | Aplicar a migração `NNN_nome.sql` | console SQL / CLI | "ok", sem erro | saída do comando |
| 3 | Conferir o health check | `https://<url>/api/health` | `{"ok":true}` | resposta |
| 4 | Testar o fluxo principal no celular, em rede móvel | app | completa sem erro | print |

## Plano de volta
Como desfazer cada passo, em ordem inversa, e em quanto tempo.

## Registro
- Executado em AAAA-MM-DD por <nome>. Evidências no PR #N. Linha no diário de `docs/STATUS.md`.
