---
name: adversarial-review
description: Revisão adversarial de um diff por um subagente em contexto limpo, comparando com o SPEC e a tarefa. Relata só problemas de correção (requisito faltando, caso de borda sem teste, mudança fora do escopo, segurança, teste fraco). Use na etapa 6 do task-cycle e em toda tarefa M3.
---

# adversarial-review · o revisor que não viu o raciocínio

Rode a revisão em um **subagente com contexto limpo** (Agent tool), nunca na própria sessão que escreveu o código. O viés de quem escreveu é o que esta skill elimina.

## Prompt do subagente
> Você é um revisor adversarial. Leia `SPEC.md` (seções citadas na tarefa T-NN), a linha da tarefa em `docs/BACKLOG.md`, os requisitos ligados em `docs/REQUIREMENTS.md` e o diff da branch atual contra `main` (`git diff main...HEAD`).
> Relate **apenas** problemas de correção, nesta ordem de gravidade:
> 1. Requisito ou regra do SPEC não implementado, ou implementado diferente.
> 2. Caso de borda do SPEC §6 sem teste, ou teste que passaria mesmo com o bug (teste fraco).
> 3. Segurança: dado de outro tenant acessível, segredo no código, entrada sem validação, rota sem autorização.
> 4. Mudança fora do escopo da tarefa.
> 5. "Pronto quando" não provado pela evidência apresentada.
> Para cada achado: arquivo e linha, o que está errado, como reproduzir, e a correção mínima. Não comente estilo, nomes ou preferências. Se não houver achados, diga "nenhum achado de correção" e liste o que você verificou.

## Depois do relatório
- Corrigir o que é de correção, na mesma branch; rodar a verificação de novo.
- O que for conscientemente ignorado fica registrado no PR com o motivo.
- Achado que vira trabalho novo (não desta tarefa) entra como tarefa no backlog, com dependência desta.
- **Tarefa M3:** este subagente não substitui a sessão revisora separada. As duas revisões acontecem antes do merge. A correção de uma revisão também passa por revisão.
