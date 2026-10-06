#!/usr/bin/env bash
# PreToolUse (Edit|Write|MultiEdit) · bloqueia edição de arquivos sensíveis.
# Saída 2 = bloqueia e devolve o motivo ao Claude.
set -u
# Lê o JSON do hook em stdin e extrai um campo (ex.: tool_input.file_path)
hook_field() { node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);const v=process.argv[1].split(".").reduce((a,k)=>a==null?a:a[k],j);process.stdout.write(v==null?"":String(v));}catch{}})' "$1"; }

INPUT="$(cat)"
FILE="$(printf '%s' "$INPUT" | hook_field tool_input.file_path)"
[ -z "$FILE" ] && exit 0
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
REL="${FILE#"$PWD"/}"

block() { echo "protect-files: edição bloqueada em '$REL' — $1" >&2; exit 2; }

case "$REL" in
  .env|.env.*|*/.env|*/.env.*) block "segredos ficam fora do alcance do Claude. Peça ao humano." ;;
  *.generated.*|src/types/database.ts|supabase/types.ts) block "arquivo gerado. Rode o gerador (ver CLAUDE.md › Comandos)." ;;
  pnpm-lock.yaml|package-lock.json) block "lockfile muda só via instalação de pacote, não por edição." ;;
esac

# Migração já commitada nunca é editada: a correção vai numa migração nova.
case "$REL" in
  supabase/migrations/*|prisma/migrations/*|db/migrations/*|migrations/*)
    if git ls-files --error-unmatch "$REL" >/dev/null 2>&1; then
      block "migração já commitada. Crie uma migração nova."
    fi ;;
esac
exit 0
