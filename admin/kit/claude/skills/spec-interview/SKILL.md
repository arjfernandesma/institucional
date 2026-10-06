---
name: spec-interview
description: Entrevista o dono do produto antes de codar uma feature nova e produz o spec (escopo, fora de escopo, interfaces, regras, casos de borda, suposições e verificação). Não implementa na mesma sessão. Use na fase 4 (spec e arquitetura) e antes de qualquer tarefa M3 nova.
---

# spec-interview · entrevista antes do código

**Nunca implemente nesta sessão.** O produto desta skill é texto: `SPEC.md` (ou uma seção nova dele), tarefas no `docs/BACKLOG.md`, e requisitos em `docs/REQUIREMENTS.md`. A implementação acontece em outra sessão, limpa, pela skill `task-cycle`.

## Antes de perguntar
Ler `IDEA.md`, `PRD.md` (§5 escopo), `docs/LEARNINGS.md` se houver, o `SPEC.md` atual e os ADRs. Não perguntar o que já está escrito.

## A entrevista
Use `AskUserQuestion`. Perguntas em blocos, das difíceis para as fáceis. Não faça perguntas óbvias; cave onde o dono provavelmente não pensou:
1. **Resultado:** o que a pessoa consegue fazer depois que não conseguia antes? Como medimos?
2. **Dados:** quais entidades nascem ou mudam; quem é dono de cada registro; o que acontece ao excluir; o que precisa de histórico.
3. **Autorização:** quem vê, quem edita, quem aprova; o que um usuário comum nunca pode ver de outro tenant.
4. **Fluxo e telas:** passo a passo; estados vazios, erro, carregando; o que acontece no celular.
5. **Regras:** limites, prazos, cálculos, arredondamentos, fusos, moedas, concorrência.
6. **Integrações e dinheiro:** APIs externas, custos por chamada, o que fazer quando falham.
7. **Fora de escopo:** o que explicitamente não entra nesta versão e por quê.
8. **Riscos e suposições:** o que estamos assumindo sem evidência; quem confirma e até quando.
9. **Verificação:** como o dono vai saber que funciona sem ler código (cenário ponta a ponta).
Continue até duas rodadas seguidas sem informação nova.

## O que escrever
- `SPEC.md`: as seções 2 a 10 do modelo (dados, telas, regras R-NN, interfaces, casos de borda, segurança, fora de escopo, verificação, suposições).
- `docs/REQUIREMENTS.md`: RF/RN/RNF novos com ID, fonte e teste previsto.
- `docs/BACKLOG.md`: tarefas no formato da casa, cada uma com modo (M2/M3/MG), `Depende de` e **Pronto quando** verificável. Tarefa que toca dado, autenticação, sincronização ou dinheiro é M3. Infra/produção é MG.
- ADR para cada decisão estrutural não óbvia.

## Fechamento
Resumir ao dono em três blocos (**Feito · Sua ação · Próximo**) e pedir a assinatura do SPEC (portão G3 exige: SPEC assinado, tarefas com critério de pronto, preview no ar).
