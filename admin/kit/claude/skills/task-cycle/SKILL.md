---
name: task-cycle
description: Executa uma tarefa T-NN do backlog do começo ao fim — situar, planejar, testes primeiro, implementar, verificar, revisar, entregar, publicar e devolver o aprendizado. Use sempre que for pegar uma tarefa do docs/BACKLOG.md.
---

# task-cycle · o ciclo de uma tarefa

Uma tarefa = uma sessão = uma branch = um PR. Não abra outras sessões; quem coordena é a Central.

## 1. Situar
- Ler `docs/STATUS.md`, a linha da tarefa em `docs/BACKLOG.md`, as seções do `SPEC.md` que ela cita e os requisitos ligados em `docs/REQUIREMENTS.md`.
- Conferir que todas as dependências estão `[x]` e que o portão da fase está liberado. Se não: parar e avisar a Central.
- Criar a branch `feat/T-NN-slug` a partir da `main` atualizada.

## 2. Planejar (plan mode)
- Listar: arquivos que mudam, testes que provam o "Pronto quando", e o que **não** será feito.
- Tarefa **M3**: apresentar o plano e esperar o OK do dono antes de qualquer edição.
- Tarefa **MG**: escrever o roteiro em `docs/roteiro-*.md` e parar. Não rodar nada contra o projeto remoto.

## 3. Testes primeiro
- Criar `.claude/tdd-red` (avisa os hooks que o vermelho é intencional).
- Escrever os testes que traduzem o "Pronto quando" e os requisitos. Rodar e ver falhar pelo motivo certo.
- Apagar `.claude/tdd-red` antes de implementar.

## 4. Implementar
- A menor mudança que deixa os testes verdes, seguindo um padrão já existente no projeto.
- Se o SPEC estiver errado: editar o SPEC no mesmo PR e avisar no PR. Nunca divergir em silêncio.
- Bug ou achado fora do escopo: anotar como tarefa nova no backlog, não corrigir "de passagem".

## 5. Verificar
- Evidência, não impressão: `pnpm verify`, `pnpm test:integration`, e2e; screenshots em celular (390px) e desktop quando houver tela.
- Guardar as saídas para colar no PR.

## 6. Revisar
- Invocar a skill `adversarial-review` (subagente em contexto limpo).
- Corrigir o que for de correção; registrar o que foi conscientemente ignorado.
- Tarefa **M3**: além disso, a Central abre a **sessão revisora** separada; esperar os achados antes de pedir merge.

## 7. Entregar
- Commit com o porquê. `git add` só dos arquivos da tarefa.
- No mesmo PR: `[x]` + link do PR em `docs/BACKLOG.md`, linha em `CHANGELOG.md`, linha no diário de `docs/STATUS.md`, `node scripts/status-snapshot.mjs`.
- PR com: evidência (item 5), lista do que ficou fora, e a seção **"Em linguagem simples"** (o que mudou para quem não lê código).
- Entregue = PR aberto **e** CI verde. CI vermelho é trabalho seu, agora.

## 8. Publicar e observar
- Depois do merge: conferir o deploy. Migração em produção é tarefa MG: o humano aplica pelo roteiro e cola a evidência.
- Testar no celular, em rede móvel. Olhar erros e métrica nas primeiras horas.

## 9. Devolver o aprendizado
- O que deu errado vira regra em `CLAUDE.md › Armadilhas`, um hook, um teste ou um ADR.

## Regra de parada
Duas tentativas falhas no mesmo ponto: parar, escrever o que aprendeu (no PR ou em `STATUS.md`), e recomeçar com contexto limpo. Não empilhar correções.

## Como responder ao dono
Três blocos curtos: **Feito** · **Sua ação** (ou "nenhuma") · **Próximo**. Sem tabela, ID, hash ou nome de job no chat.
