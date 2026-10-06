#!/usr/bin/env node
// Gera docs/status.json a partir de BACKLOG.md, STATUS.md, REQUIREMENTS.md, LEARNINGS.md e go-live.md.
// O formato da linha de tarefa, os títulos "##" e as colunas das tabelas são contrato: mudou, ajuste aqui.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (p) => (existsSync(resolve(root, p)) ? readFileSync(resolve(root, p), 'utf8') : '');

// ── Backlog ──────────────────────────────────────────────────────────
const backlog = read('docs/BACKLOG.md');
const TASK_RE = /^- \[( |x|X)\] \*\*T-(\d+) · (.+?)\*\*\s*·\s*(M1|M2|M3|MG)[^\n]*?(?:·\s*Depende de:\s*([^·\n]+?))?\s*(?:·\s*(?:PR\s*)?(#\d+|https?:\/\/\S+))?\s*$/;
const tasks = [];
let phase = '';
for (const line of backlog.split('\n')) {
  const h = line.match(/^## (.+)/); if (h) { phase = h[1].trim(); continue; }
  const m = line.match(TASK_RE);
  if (!m) continue;
  const deps = (m[5] || '').split(',').map(s => s.trim()).filter(s => /^T-\d+$/.test(s));
  const owner = (line.match(/\(@([\w-]+)\)/) || [])[1] || null;
  tasks.push({ id: `T-${m[2]}`, title: m[3].trim(), mode: m[4], done: m[1].toLowerCase() === 'x', deps, pr: m[6] || null, owner, phase });
}
// "Pronto quando" da tarefa: a linha que começa com **Pronto quando:** até a próxima tarefa
const doneWhen = {};
let cur = null;
for (const line of backlog.split('\n')) {
  const t = line.match(/^- \[( |x|X)\] \*\*T-(\d+)/); if (t) { cur = `T-${t[2]}`; continue; }
  const d = line.match(/\*\*Pronto quando:\*\*\s*(.+)/); if (d && cur) doneWhen[cur] = d[1].trim();
}
tasks.forEach(t => { t.doneWhen = doneWhen[t.id] || null; });
const byId = Object.fromEntries(tasks.map(t => [t.id, t]));
const next = tasks.find(t => !t.done && t.deps.every(d => byId[d]?.done));

// ── Status: fases, portões, diário ───────────────────────────────────
const status = read('docs/STATUS.md');
const section = (title) => { const m = status.match(new RegExp(`## ${title}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`)); return m ? m[1] : ''; };
const tableRows = (txt) => txt.split('\n').filter(l => /^\|/.test(l)).slice(2).map(l => l.split('|').slice(1, -1).map(c => c.trim()));
const phases = tableRows(section('Fases')).map(([n, name, state, since, note]) => ({ n: +n, name, state, since, note }));
const gates = tableRows(section('Portões')).map(([id, question, state, evidence, date]) => ({ id, question, state, evidence, date }));
const current = (section('Fase atual').match(/\*\*(.+?)\*\*/) || [])[1] || null;
const diary = section('Diário').split('\n').filter(l => /^- /.test(l)).map(l => l.slice(2).trim()).slice(0, 20);
const deviations = section('Desvios registrados').split('\n').filter(l => /^- \S/.test(l)).map(l => l.slice(2).trim());

// ── Requisitos, learnings, go-live ───────────────────────────────────
const req = read('docs/REQUIREMENTS.md');
const reqRows = req.split('\n').filter(l => /^\| (RF|RN|RNF|CB)-\d+/.test(l)).map(l => l.split('|').slice(1, -1).map(c => c.trim()));
const requirements = { total: reqRows.length, withTask: reqRows.filter(r => r.some(c => /T-\d+/.test(c))).length, withTest: reqRows.filter(r => /`[^`]+`/.test(r[r.length - 1] || '')).length };
const learnings = read('docs/LEARNINGS.md');
const golive = read('docs/go-live.md');
const gl = { done: (golive.match(/^- \[x\]/gim) || []).length, total: (golive.match(/^- \[( |x)\]/gim) || []).length };

const out = {
  generatedAt: new Date().toISOString(),
  currentPhase: current, phases, gates, deviations,
  tasks, next: next ? next.id : null,
  counts: { total: tasks.length, done: tasks.filter(t => t.done).length, byMode: Object.fromEntries(['M1', 'M2', 'M3', 'MG'].map(m => [m, tasks.filter(t => t.mode === m).length])) },
  requirements,
  learnings: { exists: !!learnings, decided: /- \[x\]/.test(learnings) },
  golive: gl,
  diary,
};
writeFileSync(resolve(root, 'docs/status.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`status.json: ${out.counts.done}/${out.counts.total} tarefas · próxima: ${out.next || '—'} · fase: ${current || '?'} · portões passados: ${gates.filter(g => /passou/i.test(g.state)).length}/${gates.length} · go-live ${gl.done}/${gl.total}`);
