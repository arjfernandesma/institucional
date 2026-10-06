#!/usr/bin/env bash
# PreToolUse (Bash) · bloqueia comandos perigosos e, no git commit, exige segredos ausentes, typecheck e testes verdes.
# Ajuste VERIFY_CMD ao projeto. Saída 2 = bloqueia e devolve o motivo ao Claude.
set -u
# Lê o JSON do hook em stdin e extrai um campo (ex.: tool_input.file_path)
hook_field() { node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);const v=process.argv[1].split(".").reduce((a,k)=>a==null?a:a[k],j);process.stdout.write(v==null?"":String(v));}catch{}})' "$1"; }

INPUT="$(cat)"
CMD="$(printf '%s' "$INPUT" | hook_field tool_input.command)"
[ -z "$CMD" ] && exit 0
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
VERIFY_CMD="${VERIFY_CMD:-pnpm verify}"

block() { echo "guard-bash: comando bloqueado — $1" >&2; exit 2; }

# 1) Nunca contra produção / projeto remoto (isso é tarefa MG, executada pelo humano por roteiro).
echo "$CMD" | grep -Eq '(supabase|prisma|drizzle-kit|vercel)[^|;&]*\b(db push|link|migrate deploy|env pull|--linked|--project-ref|--prod)\b' && block "operação contra o projeto remoto. Escreva o roteiro MG em docs/roteiro-*.md e deixe o humano executar."
echo "$CMD" | grep -Eq '\b(psql|pg_dump|pg_restore)\b[^|;&]*(prod|supabase\.co|amazonaws|neon\.tech|railway)' && block "banco de produção. Testes destrutivos só no banco efêmero (Docker/CI)."
echo "$CMD" | grep -Eq '\brm\s+-rf\s+(/|~|\.|\$HOME)(\s|$)' && block "remoção recursiva da raiz."
echo "$CMD" | grep -Eq '\bgit\s+push\b.*(--force|-f)\b' && block "force push. Use --force-with-lease só em branch sua e com pedido explícito."
echo "$CMD" | grep -Eq '\bgit\s+add\s+(-A|--all|\.)(\s|$)' && block "git add só dos arquivos da tarefa (CLAUDE.md › Como trabalhar)."
echo "$CMD" | grep -Eq '\bcat\b[^|;&]*\.env(\.|\s|$)|\bsource\s+\.env' && block "leitura de .env."

# 2) No commit: sem segredos no stage, typecheck e testes verdes (respeita a fase vermelha do TDD).
if echo "$CMD" | grep -Eq '\bgit\s+commit\b'; then
  STAGED="$(git diff --cached --name-only 2>/dev/null)"
  if [ -n "$STAGED" ]; then
    if git diff --cached -U0 2>/dev/null | grep -E '^\+' | grep -Eiq '(sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|service_role[^\n]{0,40}eyJ|password\s*[:=]\s*["\x27][^"\x27]{8,})'; then
      block "parece haver um segredo no diff. Remova antes de commitar."
    fi
    echo "$STAGED" | grep -Eq '(^|/)\.env(\.|$)' && block "arquivo .env no stage."
  fi
  if [ ! -f .claude/tdd-red ]; then
    if ! sh -c "$VERIFY_CMD" >/tmp/guard-bash-verify.log 2>&1; then
      tail -n 40 /tmp/guard-bash-verify.log >&2
      block "'$VERIFY_CMD' falhou. Corrija antes de commitar (ou crie .claude/tdd-red se os testes vermelhos são intencionais)."
    fi
  fi
fi
exit 0
