# Kit de início · Método de desenvolvimento com Claude Code

Arquivos de partida para um projeto novo, seguindo o Workflow de Engenharia
(8 fases, 5 portões, 4 modos de trabalho, uma tarefa por sessão).

## Como usar

1. Copie tudo para a raiz do repositório novo.
2. Renomeie as pastas sem ponto (o site não serve pastas ocultas):
   - `claude/`  → `.claude/`
   - `github/`  → `.github/`
3. Dê permissão de execução aos hooks: `chmod +x .claude/hooks/*.sh`
4. Ajuste em `CLAUDE.md` e em `.claude/hooks/*.sh` os comandos do seu projeto
   (`pnpm verify`, `pnpm test:integration`, nome do banco, etc.).
5. Esvazie a seção **Armadilhas** do `CLAUDE.md`: ela é do projeto, não do modelo.
6. Preencha `IDEA.md`, decida se o G1 se aplica e registre em `docs/STATUS.md`.
7. Rode `node scripts/status-snapshot.mjs` para gerar `docs/status.json` (o painel).

## O que tem aqui

| Caminho | Função |
|---|---|
| `CLAUDE.md` | regras para o Claude e para as pessoas, carregado em toda sessão |
| `IDEA.md`, `PRD.md`, `SPEC.md`, `CHANGELOG.md` | os documentos de raiz |
| `docs/STATUS.md` | fase atual, portões com evidência, ambientes, diário (leia primeiro) |
| `docs/BACKLOG.md` | tarefas com modo, dependências e "Pronto quando" |
| `docs/USE_CASES.md`, `docs/REQUIREMENTS.md` | UC-NN e RF/RN/RNF com rastreio |
| `docs/adr/000-modelo.md` | uma decisão por arquivo |
| `docs/LEARNINGS.md`, `docs/go-live.md`, `docs/roteiro-modelo.md` | spike (G2), checklist (G4), roteiros MG |
| `claude/settings.json` | hooks e permissões (nega leitura de `.env*`) |
| `claude/hooks/*.sh` | session-start, protect-files, guard-bash, lint-on-edit, verify-on-stop |
| `claude/skills/*/SKILL.md` | task-cycle, spec-interview, adversarial-review |
| `github/workflows/ci.yml` | jobs backlog, verify e integration |
| `github/CODEOWNERS` | migrações, `.claude/`, `SPEC.md` e ADRs pedem o dono |
| `scripts/status-snapshot.mjs` | gera o JSON do painel a partir dos `.md` |
| `scripts/check-backlog.mjs` | o job "backlog" do CI |

Os nomes de comando e caminho são sugestões. Troque pelo que fizer sentido,
mantendo a função de cada arquivo.
