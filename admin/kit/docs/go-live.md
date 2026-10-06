# Checklist de go-live (portão G4) · <produto>

> Marque com data e evidência (arquivo, variável, teste, print). Nada é marcado por suposição.
> Data da conferência: AAAA-MM-DD · Conferido por: 

## Segurança e dados
- [ ] Toda rota verifica autorização por cliente, com teste que tenta cruzar dados
- [ ] Segredos só em variáveis de ambiente; nenhum no histórico do git
- [ ] Limite de taxa em login, formulários e APIs públicas
- [ ] Política de privacidade e termos publicados; consentimento onde há coleta
- [ ] Exportar e excluir dados do usuário funcionam
- [ ] Backup automático ativo e **uma restauração feita e cronometrada** (tempo: ___ min)

## Operação
- [ ] Rastreio de erros com alerta chegando no telefone de alguém
- [ ] Logs legíveis por requisição; nenhum dado pessoal em log
- [ ] Página de status ou canal onde o cliente vê que você sabe do problema
- [ ] Runbook de incidente: onde olhar, como voltar a versão anterior, quem avisa
- [ ] Limite de gasto na nuvem e quotas de APIs externas com alerta
- [ ] Migração do banco com plano de volta testado no preview

## Produto
- [ ] Fluxo principal percorrido por alguém que não é você, sem ajuda
- [ ] Estados vazios, erros e carregamento tratados nas telas principais
- [ ] Funciona no celular e por teclado; contraste mínimo conferido
- [ ] E-mails transacionais chegam e fazem sentido lidos no celular
- [ ] Métrica de ativação definida e medindo antes do primeiro usuário
- [ ] Canal de suporte definido e respondido nas primeiras semanas

## Repositório
- [ ] `CLAUDE.md` diz como rodar, testar, publicar e o que nunca fazer
- [ ] `SPEC.md` e ADRs refletem o que foi construído, não o que foi planejado
- [ ] Suíte verde no CI; lint e typecheck obrigatórios no PR
- [ ] Tag `v1.0.0` e `CHANGELOG.md` prontos
- [ ] Feature flags fechando o que ainda não deve aparecer
- [ ] Nenhum código de spike em `main`

## Decisão
- [ ] **GO** · [ ] **NO-GO** (itens abertos viram tarefas; nunca lançar com item de segurança ou dados aberto)
