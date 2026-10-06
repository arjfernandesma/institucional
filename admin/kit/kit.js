/* Kit de início do Workflow de Engenharia: lista os arquivos e gera o .zip no navegador (sem servidor).
   As pastas ocultas (.claude, .github) ficam no site sem o ponto e recebem o nome certo dentro do .zip. */
(() => {
  'use strict';
  const BASE = 'kit/';
  const MANIFEST = [
    { g: 'Raiz', src: 'README.md', zip: 'KIT-README.md', d: 'Como usar o kit: copiar, renomear as pastas ocultas, ajustar comandos' },
    { g: 'Raiz', src: 'CLAUDE.md', zip: 'CLAUDE.md', d: 'Regras para o Claude e para as pessoas, carregado em toda sessão (esvazie as Armadilhas)' },
    { g: 'Raiz', src: 'IDEA.md', zip: 'IDEA.md', d: 'Problema, hipótese, para quem, métrica e o resultado do adversário' },
    { g: 'Raiz', src: 'PRD.md', zip: 'PRD.md', d: 'O quê e por quê; §5 é o escopo do v1 (contrato) e o que fica FORA' },
    { g: 'Raiz', src: 'SPEC.md', zip: 'SPEC.md', d: 'Como: dados, telas, regras, interfaces, casos de borda, segurança, verificação' },
    { g: 'Raiz', src: 'CHANGELOG.md', zip: 'CHANGELOG.md', d: 'Uma linha por tarefa entregue' },
    { g: 'docs/', src: 'docs/STATUS.md', zip: 'docs/STATUS.md', d: 'Fase atual, portões com evidência, desvios, ambientes, diário. Leia primeiro' },
    { g: 'docs/', src: 'docs/BACKLOG.md', zip: 'docs/BACKLOG.md', d: 'Tarefas T-NN com modo, dependências e "Pronto quando" (formato é contrato do CI e do painel)' },
    { g: 'docs/', src: 'docs/USE_CASES.md', zip: 'docs/USE_CASES.md', d: 'Casos de uso UC-NN ligados a requisitos, tarefas e testes' },
    { g: 'docs/', src: 'docs/REQUIREMENTS.md', zip: 'docs/REQUIREMENTS.md', d: 'RF/RN/RNF com rastreio; §4 casos de borda; §5 rastreio UC → tarefas' },
    { g: 'docs/', src: 'docs/adr/000-modelo.md', zip: 'docs/adr/000-modelo.md', d: 'Modelo de ADR: uma decisão por arquivo; nunca contrariar sem ADR novo' },
    { g: 'docs/', src: 'docs/LEARNINGS.md', zip: 'docs/LEARNINGS.md', d: 'Resultado do spike e a decisão do portão G2' },
    { g: 'docs/', src: 'docs/go-live.md', zip: 'docs/go-live.md', d: 'Checklist do portão G4, com data e evidência' },
    { g: 'docs/', src: 'docs/roteiro-modelo.md', zip: 'docs/roteiro-modelo.md', d: 'Modelo de roteiro MG: o humano executa e cola a evidência no PR' },
    { g: '.claude/', src: 'claude/settings.json', zip: '.claude/settings.json', d: 'Hooks ligados aos eventos e permissão negada para ler .env*' },
    { g: '.claude/', src: 'claude/hooks/session-start.sh', zip: '.claude/hooks/session-start.sh', d: 'Início da sessão: instala do lockfile, sobe o banco local', exec: true },
    { g: '.claude/', src: 'claude/hooks/protect-files.sh', zip: '.claude/hooks/protect-files.sh', d: 'Antes de editar: bloqueia .env, migrações commitadas, arquivos gerados, lockfile', exec: true },
    { g: '.claude/', src: 'claude/hooks/guard-bash.sh', zip: '.claude/hooks/guard-bash.sh', d: 'Antes de um comando: bloqueia produção, force push, git add -A; no commit, segredos e verify', exec: true },
    { g: '.claude/', src: 'claude/hooks/lint-on-edit.sh', zip: '.claude/hooks/lint-on-edit.sh', d: 'Depois de editar: lint no arquivo, erros voltam ao Claude', exec: true },
    { g: '.claude/', src: 'claude/hooks/verify-on-stop.sh', zip: '.claude/hooks/verify-on-stop.sh', d: 'Fim do turno: não deixa terminar com verify vermelho (máx. 3 bloqueios, respeita tdd-red)', exec: true },
    { g: '.claude/', src: 'claude/skills/task-cycle/SKILL.md', zip: '.claude/skills/task-cycle/SKILL.md', d: 'O ciclo da tarefa em 9 etapas, com regra de parada e formato de resposta ao dono' },
    { g: '.claude/', src: 'claude/skills/spec-interview/SKILL.md', zip: '.claude/skills/spec-interview/SKILL.md', d: 'Entrevista o dono e produz SPEC, requisitos e backlog. Não implementa' },
    { g: '.claude/', src: 'claude/skills/adversarial-review/SKILL.md', zip: '.claude/skills/adversarial-review/SKILL.md', d: 'Subagente em contexto limpo compara o diff com o SPEC e relata só correção' },
    { g: '.github/', src: 'github/workflows/ci.yml', zip: '.github/workflows/ci.yml', d: 'Três jobs: backlog, verify, integration (banco efêmero + e2e)' },
    { g: '.github/', src: 'github/CODEOWNERS', zip: '.github/CODEOWNERS', d: 'Migrações, .claude/, SPEC.md e ADRs pedem o dono ou o responsável técnico' },
    { g: 'scripts/', src: 'scripts/status-snapshot.mjs', zip: 'scripts/status-snapshot.mjs', d: 'Gera docs/status.json (painel) a partir dos .md' },
    { g: 'scripts/', src: 'scripts/check-backlog.mjs', zip: 'scripts/check-backlog.mjs', d: 'Job "backlog" do CI: [x] + PR, CHANGELOG e diário no mesmo PR' },
  ];

  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = (u8) => { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  function zip(files) {
    const enc = new TextEncoder(); const parts = []; const central = []; let offset = 0;
    const now = new Date();
    const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)) & 0xFFFF;
    const dosDate = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xFFFF;
    const u16 = (v) => [v & 255, (v >>> 8) & 255]; const u32 = (v) => [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255];
    for (const f of files) {
      const name = enc.encode(f.name); const crc = crc32(f.data); const size = f.data.length; const flags = 0x0800;
      const local = new Uint8Array([...u32(0x04034b50), ...u16(20), ...u16(flags), ...u16(0), ...u16(dosTime), ...u16(dosDate), ...u32(crc), ...u32(size), ...u32(size), ...u16(name.length), ...u16(0), ...name]);
      parts.push(local, f.data);
      const attr = ((f.exec ? 0o100755 : 0o100644) << 16) >>> 0;
      central.push(new Uint8Array([...u32(0x02014b50), ...u16(0x031E), ...u16(20), ...u16(flags), ...u16(0), ...u16(dosTime), ...u16(dosDate), ...u32(crc), ...u32(size), ...u32(size), ...u16(name.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(attr), ...u32(offset), ...name]));
      offset += local.length + size;
    }
    const cdSize = central.reduce((a, c) => a + c.length, 0);
    const end = new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length), ...u32(cdSize), ...u32(offset), ...u16(0)]);
    return new Blob([...parts, ...central, end], { type: 'application/zip' });
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function render() {
    const box = document.getElementById('kit-list'); if (!box) return;
    const groups = [...new Set(MANIFEST.map(m => m.g))];
    box.innerHTML = groups.map(g => `<div class="tbl-wrap kit-group"><table>
      <thead><tr><th style="width:38%">${esc(g)}</th><th>Para quê</th><th style="width:90px"></th></tr></thead>
      <tbody>${MANIFEST.filter(m => m.g === g).map(m => `<tr><td class="mono" style="font-size:13px">${esc(m.zip)}</td><td style="color:var(--ink-2);font-size:14px">${esc(m.d)}</td><td><a class="kit-dl" href="${BASE}${m.src}" download="${esc(m.zip.split('/').pop())}">baixar ↓</a></td></tr>`).join('')}</tbody>
    </table></div>`).join('');
    const btn = document.getElementById('kit-zip'); const st = document.getElementById('kit-status');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      btn.disabled = true; st.textContent = 'Montando o .zip…';
      try {
        const files = [];
        for (const m of MANIFEST) {
          const r = await fetch(BASE + m.src, { cache: 'no-store' }); if (!r.ok) throw new Error(m.src + ' → ' + r.status);
          files.push({ name: m.zip, data: new Uint8Array(await r.arrayBuffer()), exec: !!m.exec });
        }
        const blob = zip(files); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'kit-workflow-claude-code.zip';
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000);
        st.textContent = `Pronto: ${files.length} arquivos, pastas .claude e .github já com o nome certo. Dê chmod +x nos hooks.`;
      } catch (e) { st.textContent = 'Não deu para montar o .zip: ' + e.message; }
      finally { btn.disabled = false; }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();
