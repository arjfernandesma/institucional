# CLAUDE.md · <NOME DO PROJETO>

Curto e direto: este arquivo é carregado em toda sessão. Regra de corte para cada linha:
"remover isso faria o Claude errar?" Se não, corte.

## Onde está o quê
- `docs/STATUS.md` — fase atual, portões, ambientes, diário. **Leia primeiro.**
- `docs/BACKLOG.md` — tarefas (T-NN), modo, dependências, "Pronto quando".
- `PRD.md` — o quê e por quê. §5 é o escopo do v1 e o que fica FORA.
- `SPEC.md` — como: dados, telas, regras, casos de borda, verificação.
- `docs/USE_CASES.md`, `docs/REQUIREMENTS.md` — UC-NN e RF/RN/RNF, cada um ligado a tarefa e teste.
- `docs/adr/` — decisões. Nunca contrariar uma sem ADR novo.
- `docs/methodology.md` — regras de domínio canônicas (se o produto tiver).

## Comandos
- `pnpm verify` — lint + typecheck + testes unitários + build (o CI roda o mesmo).
- `pnpm test:integration` — precisa do banco local: `pnpm db:up` (Docker) e `pnpm db:reset`.
- `pnpm db:types` — regenera os tipos a partir do schema. Nunca editar o arquivo gerado.
- `node scripts/status-snapshot.mjs` — regenera `docs/status.json` (painel).

## Como trabalhar
- **Uma tarefa por sessão.** Branch `feat/T-NN-slug`. Nada de duas tarefas na mesma sessão.
- **Plan mode antes de mudar mais de um arquivo.** Em tarefa M3, esperar o OK do dono no plano.
- **Test-first no domínio.** Teste vermelho é intencional: crie `.claude/tdd-red` enquanto escreve os testes e apague antes de implementar.
- **Divergência do SPEC só editando o SPEC no mesmo PR**, com aviso no PR.
- **Nada fora do escopo da tarefa.** Bug ou achado vira tarefa nova no backlog.
- `git add` só dos arquivos da tarefa. Nunca `git add -A`.
- Duas tentativas falhas no mesmo ponto: parar, resumir o que aprendeu, recomeçar com contexto limpo.

## Como falar com o dono
No máximo três blocos curtos, sem jargão, sem tabela, sem ID, hash ou nome de job:
- **Feito:** o que mudou, em 1 a 3 linhas.
- **Sua ação:** o que só ele pode fazer, ou "nenhuma".
- **Próximo:** uma recomendação.
O detalhe técnico vai no PR, na seção "Em linguagem simples" + evidência.

## Sessões
- A **Central** coordena: abre uma tarefa por vez, abre a sessão revisora das M3, leva recados, faz merge só com pedido do dono e CI verde.
- Sessão de tarefa não abre outras sessões. Sessão revisora só lê, testa e relata.
- Arquivar sessões de tarefa depois do merge. Nunca arquivar a sessão do painel.

## Regras de entrega (o que precisa estar no PR)
1. `[x]` e link do PR na linha da tarefa em `docs/BACKLOG.md`.
2. Uma linha em `CHANGELOG.md`.
3. Uma linha no diário de `docs/STATUS.md`.
4. Evidência: saída do `verify`, integração/e2e e screenshots (celular e desktop) quando houver tela.
5. Seção **"Em linguagem simples"** para quem não lê código.
6. Entregue = PR aberto **e** CI verde. Nunca mergear com CI vermelho.

## Modos (escrito na linha da tarefa)
- **M1** vibe coding: só em branch `spike/*`; sai dali só o `docs/LEARNINGS.md`.
- **M2** planejado: plan mode → testes → implementação.
- **M3** especificado (dados, autenticação, sincronização, dinheiro): spec detalhado + OK do dono + revisão adversarial + sessão revisora separada.
- **MG** manual guiado (infra, credenciais, DNS, produção): o Claude escreve o roteiro em `docs/roteiro-*.md`; o humano executa e cola a evidência no PR. Nenhuma sessão roda comando contra produção.

## Decisões não óbvias
- <ex.: a autorização mora no banco (RLS); o app usa a sessão do usuário; service role só em scripts e testes locais>
- <ex.: o UUID é gerado no cliente>
- Migração commitada nunca é editada; correção vai em migração nova.
- Segredos só em `.env*`, que o Claude não pode ler.

## Armadilhas (cresce a cada erro; esvazie ao copiar para um projeto novo)
- <data · o que deu errado · o jeito certo>
