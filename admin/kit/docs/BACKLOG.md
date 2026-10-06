# BACKLOG · <produto>

> Formato de linha (o script do painel e o job "backlog" do CI dependem dele):
>
> ```
> - [ ] **T-NN · título** · M2 · Depende de: T-01, T-18
>   Descrição curta, seções do SPEC citadas, requisitos (RF/RN) cobertos.
>   **Pronto quando:** critério verificável (comando, teste ou cenário).
> ```
>
> Regras: tarefa sem "Pronto quando" verificável não entra. A **próxima tarefa** é a primeira `[ ]` com todas as
> dependências `[x]` e os portões liberados. Tarefa entregue tem, **no mesmo PR**: `[x]` e o link do PR aqui,
> uma linha no `CHANGELOG.md` e uma linha no diário do `STATUS.md`. Bug ou achado de revisão vira tarefa nova.
> Modos: M1 vibe (só spike) · M2 planejado · M3 especificado · MG manual guiado. Pessoa responsável: `(@nome)` na linha.

## Fase 5 · MVP

- [x] **T-00 · Esqueleto, CI e preview** · M2 · Depende de: — · PR #1
  App mínimo com a stack do SPEC §1, lint/typecheck/testes/build no CI, preview por PR na Vercel, `CLAUDE.md` e hooks ativos.
  **Pronto quando:** `pnpm verify` verde no CI e URL de preview comentada no PR.

- [ ] **T-01 · Autenticação e sessão** · M3 (dados) · Depende de: T-00
  SPEC §2 (usuários), §7 (segurança). RF-01, RN-01. Login, logout, sessão persistida, RLS ligado nas tabelas base.
  **Pronto quando:** teste de integração prova que um usuário não lê registro de outro; e2e de login passa.

- [ ] **T-02 · <fluxo principal, parte 1>** · M2 · Depende de: T-01
  SPEC §3.1, §4 (R-01..R-03). RF-02, RF-03.
  **Pronto quando:** `pnpm test` cobre R-01..R-03 e o e2e percorre o fluxo com dado de teste.

- [ ] **T-03 · Migração de produção e variáveis** · MG · Depende de: T-01
  Roteiro em `docs/roteiro-producao.md`. O humano executa e cola a evidência (URL, health check, prints) no PR.
  **Pronto quando:** evidência no PR e linha no diário do STATUS.

## Fase 6 · Endurecimento

- [ ] **T-10 · Revisão adversarial de segurança** · M3 (dados) · Depende de: T-02
  Autorização por tenant em toda rota, segredos, injeção, uploads, limites de taxa. Itens abertos viram tarefas.
  **Pronto quando:** relatório da sessão revisora sem item aberto e `docs/go-live.md` com a seção de segurança marcada.

## Fase 7 · Lançamento

- [ ] **T-20 · Tag v1.0.0 e release notes** · M2 · Depende de: T-10
  **Pronto quando:** tag publicada, `CHANGELOG.md` consolidado, métrica de ativação medindo.
