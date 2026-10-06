#!/usr/bin/env node
// Job "backlog" do CI: um PR de tarefa (branch feat/T-NN-*) precisa ter, no mesmo PR,
// [x] + link do PR na linha da tarefa em docs/BACKLOG.md, uma linha no CHANGELOG.md e uma linha no diário do docs/STATUS.md.
import { readFileSync } from 'node:fs';

const ref = process.env.HEAD_REF || process.env.GITHUB_HEAD_REF || '';
const title = process.env.PR_TITLE || '';
const pr = process.env.PR_NUMBER || '';
const m = (ref.match(/T-(\d+)/) || title.match(/T-(\d+)/));
if (!m) { console.log(`check-backlog: branch "${ref}" não é de tarefa (feat/T-NN-*). Nada a conferir.`); process.exit(0); }
const id = `T-${m[1]}`;
const read = (p) => { try { return readFileSync(p, 'utf8'); } catch { return ''; } };
const backlog = read('docs/BACKLOG.md'), changelog = read('CHANGELOG.md'), status = read('docs/STATUS.md');
const errors = [];

const line = backlog.split('\n').find(l => new RegExp(`^- \\[( |x|X)\\] \\*\\*${id} ·`).test(l));
if (!line) errors.push(`${id} não está em docs/BACKLOG.md no formato "- [ ] **${id} · título** · Mx".`);
else {
  if (!/^- \[(x|X)\]/.test(line)) errors.push(`${id} ainda está [ ] em docs/BACKLOG.md.`);
  if (!/(#\d+|https?:\/\/\S+)/.test(line)) errors.push(`${id} sem o link do PR na linha do backlog (ex.: "· PR #${pr || 'N'}").`);
  else if (pr && !line.includes(`#${pr}`) && !line.includes(`/pull/${pr}`)) errors.push(`a linha de ${id} aponta para outro PR, não para #${pr}.`);
  if (!/\*\*Pronto quando:\*\*/.test(backlog.slice(backlog.indexOf(line), backlog.indexOf(line) + 800))) errors.push(`${id} sem "Pronto quando" verificável.`);
}
if (!new RegExp(`^- .*\\b${id}\\b`, 'm').test(changelog)) errors.push(`CHANGELOG.md sem linha para ${id}.`);
const diary = status.split(/## Diário/)[1] || '';
if (!new RegExp(`^- .*\\b${id}\\b`, 'm').test(diary)) errors.push(`docs/STATUS.md › Diário sem linha para ${id}.`);

if (errors.length) { console.error(`check-backlog: entrega de ${id} incompleta:\n- ` + errors.join('\n- ')); process.exit(1); }
console.log(`check-backlog: ${id} documentada (backlog [x] + PR, changelog, diário).`);
