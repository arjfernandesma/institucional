# SPEC · <produto> · v1

> Como construir o que o PRD pede. Tratado como código: versionado, revisado no PR, atualizado quando a decisão muda.
> Divergência entre SPEC e código se resolve editando o SPEC no mesmo PR, nunca em silêncio.

## 1. Visão técnica
Stack, hospedagem, ambientes (local, preview, produção), o que roda onde.

## 2. Modelo de dados
Entidades, campos, chaves, relações, índices. Quem é dono de cada registro (tenant). Regras de RLS/autorização por tabela.

## 3. Telas e fluxos
Uma subseção por tela: o que mostra, ações, estados (vazio, carregando, erro), o que acontece em cada ação.

## 4. Regras de domínio
Numeradas (R-01, R-02...), cada uma ligada a uma RN de `docs/REQUIREMENTS.md`.

## 5. Interfaces
APIs internas/externas, contratos de entrada e saída, erros esperados.

## 6. Casos de borda
Lista explícita: concorrência, offline, dados faltando, limites, fusos, moedas, permissões cruzadas.

## 7. Segurança e dados
Autenticação, autorização, segredos, logs sem dado pessoal, backup e restauração, exportação e exclusão.

## 8. Fora de escopo técnico
O que não será construído nesta versão, para não voltar como "já que estamos aqui".

## 9. Verificação
Como provar que funciona, ponta a ponta: comandos, cenários de teste, o que o e2e percorre, o que é verificado à mão (celular, rede móvel).

## 10. Suposições em aberto
| # | Suposição | Dono | Prazo para confirmar |
|---|---|---|---|
