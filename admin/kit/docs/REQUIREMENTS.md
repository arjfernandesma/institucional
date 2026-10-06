# Requisitos · <produto>

> Cada requisito tem ID estável, prioridade, fonte (UC/PRD), tarefa e teste. Linha sem tarefa e teste é dívida visível, não requisito escondido.

## 1. Requisitos funcionais (RF)
| ID | Descrição | Prioridade | Fonte | Tarefa | Teste |
|---|---|---|---|---|---|
| RF-01 | O usuário entra com e-mail e senha e a sessão persiste entre visitas | must | UC-01 | T-01 | `tests/e2e/login.spec.ts` |
| RF-02 | | | | | |

## 2. Regras de negócio (RN)
| ID | Regra | Fonte | SPEC | Tarefa | Teste |
|---|---|---|---|---|---|
| RN-01 | Um usuário só vê registros do próprio tenant | PRD §6 | §2, §7 | T-01 | `tests/integration/rls.test.ts` |
| RN-02 | | | | | |

## 3. Requisitos não funcionais (RNF)
| ID | Requisito | Medida | Tarefa | Teste |
|---|---|---|---|---|
| RNF-01 | Fluxo principal funciona no celular em rede móvel | e2e em viewport 390px | T-02 | `tests/e2e/mobile.spec.ts` |
| RNF-02 | Nenhum dado pessoal em log | revisão + teste de log | T-10 | |

## 4. Casos de borda
| # | Situação | Comportamento esperado | Requisito | Teste |
|---|---|---|---|---|
| CB-01 | Dois usuários editam o mesmo registro ao mesmo tempo | | RN- | |
| CB-02 | Sem conexão no meio de um envio | | RNF- | |

## 5. Rastreio
| UC | Requisitos | Tarefas | Situação |
|---|---|---|---|
| UC-01 | RF-01, RN-01 | T-01 | pendente |
