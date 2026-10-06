#!/usr/bin/env bash
# Stop · não deixa a sessão "terminar" com a verificação vermelha.
# No máximo 3 bloqueios por sessão (depois libera, para não prender o turno) e respeita a fase vermelha do TDD.
set -u
# Lê o JSON do hook em stdin e extrai um campo (ex.: tool_input.file_path)
hook_field() { node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);const v=process.argv[1].split(".").reduce((a,k)=>a==null?a:a[k],j);process.stdout.write(v==null?"":String(v));}catch{}})' "$1"; }

INPUT="$(cat)"
ACTIVE="$(printf '%s' "$INPUT" | hook_field stop_hook_active)"
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
VERIFY_CMD="${VERIFY_CMD:-pnpm verify}"
COUNT_FILE=.claude/.verify-stop-count

[ -f .claude/tdd-red ] && { echo "verify-on-stop: fase vermelha do TDD (.claude/tdd-red), liberado."; exit 0; }
# Sem mudança no código, nada a verificar.
git status --porcelain 2>/dev/null | grep -Eq '\.(ts|tsx|js|jsx|mjs|py|sql)$' || exit 0

COUNT=$(cat "$COUNT_FILE" 2>/dev/null || echo 0)
[ "$COUNT" -ge 3 ] && { echo "verify-on-stop: 3 bloqueios já; liberando. Registre o estado no PR."; exit 0; }

if sh -c "$VERIFY_CMD" >/tmp/verify-on-stop.log 2>&1; then
  rm -f "$COUNT_FILE"; exit 0
fi
echo $((COUNT + 1)) > "$COUNT_FILE"
{
  echo "verify-on-stop: '$VERIFY_CMD' está vermelho. Corrija antes de encerrar (bloqueio $((COUNT + 1))/3)."
  tail -n 40 /tmp/verify-on-stop.log
} >&2
exit 2
