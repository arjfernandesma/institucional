#!/usr/bin/env bash
# PostToolUse (Edit|Write|MultiEdit) · roda o lint no arquivo editado e devolve os erros ao Claude.
set -u
# Lê o JSON do hook em stdin e extrai um campo (ex.: tool_input.file_path)
hook_field() { node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);const v=process.argv[1].split(".").reduce((a,k)=>a==null?a:a[k],j);process.stdout.write(v==null?"":String(v));}catch{}})' "$1"; }

INPUT="$(cat)"
FILE="$(printf '%s' "$INPUT" | hook_field tool_input.file_path)"
[ -z "$FILE" ] && exit 0
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs)
    if [ -f node_modules/.bin/eslint ]; then
      OUT="$(node_modules/.bin/eslint --no-warn-ignored "$FILE" 2>&1)" || { echo "lint-on-edit: $OUT" >&2; exit 2; }
    fi ;;
  *.py)
    command -v ruff >/dev/null 2>&1 && { OUT="$(ruff check "$FILE" 2>&1)" || { echo "lint-on-edit: $OUT" >&2; exit 2; }; } ;;
esac
exit 0
