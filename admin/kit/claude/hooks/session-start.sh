#!/usr/bin/env bash
# SessionStart · deixa o ambiente pronto: dependências do lockfile e serviços locais.
# O container da sessão pode vir com dependências velhas: sempre reinstalar do lockfile.
set -u
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

if [ -f pnpm-lock.yaml ]; then
  command -v pnpm >/dev/null 2>&1 || npm i -g pnpm >/dev/null 2>&1
  pnpm install --frozen-lockfile --prefer-offline >/dev/null 2>&1 && echo "deps: ok (pnpm)" || echo "deps: pnpm install falhou — rode à mão"
elif [ -f package-lock.json ]; then
  npm ci >/dev/null 2>&1 && echo "deps: ok (npm)" || echo "deps: npm ci falhou — rode à mão"
fi

# Sobe só os serviços que os testes usam (evita o limite do Docker Hub).
if [ -f docker-compose.yml ] && command -v docker >/dev/null 2>&1; then
  docker compose up -d db >/dev/null 2>&1 && echo "docker: db no ar" || echo "docker: indisponível (testes de integração não vão rodar aqui)"
fi

rm -f .claude/.verify-stop-count
echo "Leia docs/STATUS.md e docs/BACKLOG.md antes de começar. Uma tarefa por sessão."
exit 0
