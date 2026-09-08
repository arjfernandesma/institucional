/* ═══════════════════════════════════════════════════════════════════
   Academia de Vendas — motor do curso
   Navegação, progresso, blocos interativos, prova e certificado.
   Conteúdo vive em content.js (window.COURSE / CHEATSHEET / GLOSSARY).
   ═══════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const REQUIRED_TYPES = new Set(['quiz', 'scenario', 'order']);

  const state = {
    session: null,
    progress: null,
    market: 'both',
  };

  /* ── Progresso (localStorage por usuário) ─────────────────────── */
  const progressKey = () => 'mf_academy_progress_' + (state.session.userId || state.session.name.toLowerCase().trim());
  // Progresso completo no localStorage; reserva compacta (lições concluídas
  // + prova) num cookie de 1 ano, para recuperar se o localStorage sumir.
  function loadProgress() {
    let p = MFStore.getJSON(progressKey());
    if (!p) {
      const c = MFStore.cookieGetJSON(progressKey());
      if (c && Array.isArray(c.d)) {
        p = { done: Object.fromEntries(c.d.map(id => [id, c.s || Date.now()])), answers: {}, exam: c.e || null, startedAt: c.s || Date.now() };
        MFStore.setJSON(progressKey(), p);
      }
    }
    state.progress = p || { done: {}, answers: {}, exam: null, startedAt: Date.now() };
    MFStore.persist();
  }
  function saveProgress() {
    MFStore.setJSON(progressKey(), state.progress);
    MFStore.cookieSetJSON(progressKey(), { d: Object.keys(state.progress.done), e: state.progress.exam, s: state.progress.startedAt });
  }

  /* ── Helpers de curso ──────────────────────────────────────────── */
  const modules = () => COURSE.modules;
  const allLessons = () => modules().flatMap(m => m.lessons.map(l => ({ m, l })));
  const lessonDone = (lid) => !!state.progress.done[lid];
  const moduleDone = (m) => m.lessons.every(l => lessonDone(l.id));
  const moduleUnlocked = (idx) => idx === 0 || moduleDone(modules()[idx - 1]);
  const lessonUnlocked = (m, j) => j === 0 || lessonDone(m.lessons[j - 1].id);
  const totalDone = () => allLessons().filter(({ l }) => lessonDone(l.id)).length;
  const overallPct = () => Math.round((totalDone() / allLessons().length) * 100);
  const allModulesDone = () => modules().every(moduleDone);
  const personalize = (txt) => String(txt).replace(/\{Seu nome\}/g, state.session.name).replace(/\{Your name\}/g, state.session.name);

  /* ── UI utilitários ────────────────────────────────────────────── */
  let toastTimer;
  function toast(msg, gold = false) {
    const t = $('#toast');
    t.textContent = msg; t.className = 'toast' + (gold ? ' gold' : ''); t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
  }
  function confetti(n = 90) {
    const colors = ['#B8830F', '#D4A53A', '#1F7A4D', '#1F5A8A', '#B83A2C', '#1A1715'];
    for (let i = 0; i < n; i++) {
      const el = document.createElement('i');
      el.className = 'confetti';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.background = colors[i % colors.length];
      el.style.animationDuration = (2.2 + Math.random() * 1.8) + 's';
      el.style.animationDelay = (Math.random() * .6) + 's';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }
  }
  function updateTopbar() {
    const pct = overallPct();
    $('#topbar-bar').style.width = pct + '%';
    $('#topbar-pct').textContent = pct + '%';
    $('#user-name').textContent = state.session.name;
    $('#user-avatar').textContent = state.session.name.trim().charAt(0).toUpperCase() || '?';
  }
  function setActiveNav(view) {
    $$('.nav-link[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  }
  function scrollTop() { window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' }); }

  /* ── Roteamento por hash ───────────────────────────────────────── */
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  function route() {
    if (!state.session) return;
    const h = location.hash.replace(/^#/, '') || 'home';
    const parts = h.split('/');
    $('#mobile-nav').hidden = true;
    if (parts[0] === 'm' && parts[1]) {
      const m = modules().find(x => x.id === parts[1]);
      if (!m) return go('#home');
      const mi = modules().indexOf(m);
      if (!moduleUnlocked(mi)) { toast('Conclua o módulo anterior para desbloquear este.'); return go('#home'); }
      let j = Math.max(0, m.lessons.findIndex(l => l.id === parts[2]));
      if (!lessonUnlocked(m, j)) { j = m.lessons.findIndex((l, k) => lessonUnlocked(m, k) && !lessonDone(l.id)); if (j < 0) j = 0; }
      renderLesson(m, j);
    } else if (parts[0] === 'exam') {
      if (!allModulesDone()) { toast('A prova final abre quando todos os módulos estiverem concluídos.'); return go('#home'); }
      renderExam();
    } else if (parts[0] === 'certificate') {
      if (!state.progress.exam?.passed) return go('#home');
      renderCertificate();
    } else if (parts[0] === 'glossary') {
      renderGlossary();
    } else if (parts[0] === 'cheatsheet') {
      renderCheatsheet();
    } else if (parts[0] === 'folheto') {
      renderLeaflet();
    } else {
      renderHome();
    }
    scrollTop();
  }

  /* ═══════════════════════════════════════════════════════════════
     HOME
     ═══════════════════════════════════════════════════════════════ */
  function renderHome() {
    setActiveNav('home');
    const pct = overallPct();
    const done = totalDone(), total = allLessons().length;
    const minutes = modules().reduce((a, m) => a + m.minutes, 0);
    const next = allLessons().find(({ l }) => !lessonDone(l.id));
    const examPassed = !!state.progress.exam?.passed;
    const r = 64, c = 2 * Math.PI * r;

    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
    const headline = pct === 0
      ? `Vamos começar, <em>${esc(state.session.name)}</em>.`
      : pct === 100 ? `Trilha concluída, <em>${esc(state.session.name)}</em>!` : `${greet}, <em>${esc(state.session.name)}</em>.`;
    const sub = pct === 0
      ? 'Dez módulos curtos, no seu ritmo. Cada lição termina com uma pergunta ou simulação para fixar. Ao final, uma prova rápida e o seu certificado.'
      : pct === 100 ? (examPassed ? 'Você concluiu o curso e passou na prova. Use a Cola rápida e o Playbook no dia a dia.' : 'Falta só a prova final. Ela tem 12 perguntas sobre tudo o que você viu.')
      : `Você está em <strong>${esc(next.m.title)}</strong>. Continue de onde parou.`;

    $('#view').innerHTML = `
      <div class="container">
        <section class="hero">
          <div>
            <div class="eyebrow">Academia de Vendas · Marcus Fernandes</div>
            <h1 class="h1">${headline}</h1>
            <p class="lead">${sub}</p>
            <div class="hero-actions">
              ${next ? `<button class="btn btn-primary btn-lg" id="btn-continue">${pct === 0 ? 'Começar o curso' : 'Continuar'} →</button>` : ''}
              ${!next && !examPassed ? `<button class="btn btn-primary btn-lg" data-go="#exam">Fazer a prova final →</button>` : ''}
              ${examPassed ? `<button class="btn btn-primary btn-lg" data-go="#certificate">Ver meu certificado</button>` : ''}
              <button class="btn btn-outline btn-lg" data-go="#cheatsheet">⚡ Cola rápida</button>
            </div>
          </div>
          <div class="ring" aria-label="Progresso ${pct}%">
            <svg viewBox="0 0 150 150"><circle class="track" cx="75" cy="75" r="${r}"/><circle class="fill" cx="75" cy="75" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"/></svg>
            <div class="ring-label"><b>${pct}%</b><small>concluído</small></div>
          </div>
        </section>

        <div class="stats-row">
          <div class="stat-tile"><b>${done}/${total}</b><span>lições concluídas</span></div>
          <div class="stat-tile"><b>${modules().filter(moduleDone).length}/${modules().length}</b><span>módulos concluídos</span></div>
          <div class="stat-tile"><b>~${minutes} min</b><span>duração total estimada</span></div>
          <div class="stat-tile"><b>${state.progress.exam ? state.progress.exam.score + '%' : '—'}</b><span>nota na prova final</span></div>
        </div>

        <h2 class="section-title">Sua trilha <small>${modules().length} módulos</small></h2>
        <div class="modules">
          ${modules().map((m, i) => {
            const unlocked = moduleUnlocked(i);
            const dcount = m.lessons.filter(l => lessonDone(l.id)).length;
            const mp = Math.round((dcount / m.lessons.length) * 100);
            const isDone = dcount === m.lessons.length;
            return `
            <button class="module-card ${unlocked ? '' : 'locked'} ${isDone ? 'done' : ''}" data-module="${m.id}" ${unlocked ? '' : 'disabled'}>
              <div class="mc-top"><span class="mc-num">Módulo ${String(i + 1).padStart(2, '0')}</span><span class="mc-icon">${isDone ? '✓' : unlocked ? m.icon : '🔒'}</span></div>
              <h3>${m.title}</h3>
              <p>${m.subtitle}</p>
              <div class="mc-bar"><span style="width:${mp}%"></span></div>
              <div class="mc-foot"><span>${m.lessons.length} lições · ~${m.minutes} min</span>
                ${isDone ? '<span class="badge badge-green">Concluído</span>' : unlocked ? (dcount ? `<span class="badge badge-gold">${dcount}/${m.lessons.length}</span>` : '<span class="badge badge-grey">Novo</span>') : '<span class="badge badge-grey">Bloqueado</span>'}
              </div>
            </button>`;
          }).join('')}
        </div>

        <div class="exam-card">
          <div>
            <h3>${examPassed ? 'Prova final concluída ✓' : 'Prova final'}</h3>
            <p>${examPassed
              ? `Nota: ${state.progress.exam.score}%. Seu certificado está pronto para imprimir ou salvar em PDF.`
              : `${COURSE.exam.questions.length} perguntas, nota mínima ${COURSE.exam.passScore}%. ${allModulesDone() ? 'Tudo pronto — boa prova!' : 'Desbloqueia quando todos os módulos estiverem concluídos.'}`}</p>
          </div>
          ${examPassed
            ? `<button class="btn btn-gold btn-lg" data-go="#certificate">Ver certificado</button>`
            : `<button class="btn btn-gold btn-lg" data-go="#exam" ${allModulesDone() ? '' : 'disabled'}>${allModulesDone() ? 'Começar a prova →' : '🔒 Bloqueada'}</button>`}
        </div>
      </div>`;

    $('#btn-continue')?.addEventListener('click', () => go(`#m/${next.m.id}/${next.l.id}`));
    $$('[data-module]').forEach(b => b.addEventListener('click', () => {
      const m = modules().find(x => x.id === b.dataset.module);
      const j = m.lessons.findIndex(l => !lessonDone(l.id));
      go(`#m/${m.id}/${m.lessons[j < 0 ? 0 : j].id}`);
    }));
  }

  /* ═══════════════════════════════════════════════════════════════
     LIÇÃO
     ═══════════════════════════════════════════════════════════════ */
  function renderLesson(m, j) {
    setActiveNav(null);
    const l = m.lessons[j];
    const mi = modules().indexOf(m);
    const required = l.blocks.map((b, i) => REQUIRED_TYPES.has(b.type) ? i : -1).filter(i => i >= 0);
    const answers = state.progress.answers[l.id] || (state.progress.answers[l.id] = {});

    $('#view').innerHTML = `
      <div class="container">
        <div class="lesson-layout">
          <aside class="lesson-side">
            <button class="side-back" data-go="#home">← Voltar à trilha</button>
            <div class="side-title">${m.icon} ${m.title}</div>
            <div class="side-list">
              ${m.lessons.map((x, k) => {
                const unlocked = lessonUnlocked(m, k), done = lessonDone(x.id);
                return `<button class="side-item ${k === j ? 'active' : ''} ${done ? 'done' : ''} ${unlocked ? '' : 'locked'}" data-lesson="${x.id}" ${unlocked ? '' : 'disabled'}><span class="side-dot">${done ? '✓' : k + 1}</span><span>${x.title}</span></button>`;
              }).join('')}
            </div>
          </aside>
          <article class="lesson-main">
            <header class="lesson-head">
              <div class="crumbs">Módulo ${String(mi + 1).padStart(2, '0')} · Lição ${j + 1} de ${m.lessons.length}</div>
              <h2>${l.title}</h2>
              <div class="view-tools" style="margin:.9rem 0 0"><button class="share-btn" id="lesson-pdf" title="Imprimir ou salvar esta lição em PDF">🖨️ PDF desta lição</button></div>
              <div class="dots">${m.lessons.map((x, k) => `<i class="${lessonDone(x.id) ? 'done' : ''} ${k === j ? 'cur' : ''}"></i>`).join('')}</div>
            </header>
            <div class="blocks" id="blocks"></div>
            <footer class="lesson-nav">
              <button class="btn btn-outline" id="prev-lesson" ${j === 0 && mi === 0 ? 'disabled' : ''}>← Anterior</button>
              <span class="req" id="req-note"></span>
              <button class="btn btn-primary" id="next-lesson">Concluir lição →</button>
            </footer>
          </article>
        </div>
      </div>`;

    const container = $('#blocks');
    l.blocks.forEach((b, i) => {
      const el = document.createElement('section');
      el.className = 'block block-' + b.type;
      el.style.animationDelay = Math.min(i * 40, 400) + 'ms';
      el.innerHTML = renderBlock(b, i, answers[i]);
      attachShareBar(el, b);
      container.appendChild(el);
      wireBlock(el, b, i, l.id, answers, refreshReq);
    });

    $$('[data-lesson]').forEach(b => b.addEventListener('click', () => go(`#m/${m.id}/${b.dataset.lesson}`)));
    $('#lesson-pdf').addEventListener('click', () => window.print());

    function pending() { return required.filter(i => !answers[i]?.done).length; }
    function refreshReq() {
      const p = pending();
      const note = $('#req-note'), btn = $('#next-lesson');
      if (lessonDone(l.id)) {
        note.textContent = 'Lição concluída ✓'; note.className = 'req ok'; btn.disabled = false;
        btn.textContent = j + 1 < m.lessons.length ? 'Próxima lição →' : (mi + 1 < modules().length ? 'Próximo módulo →' : 'Voltar à trilha →');
      } else if (required.length === 0 || p === 0) {
        note.textContent = required.length ? 'Tudo respondido. Pode concluir.' : 'Leia com calma e conclua quando terminar.'; note.className = 'req ok'; btn.disabled = false;
      } else {
        note.textContent = `Responda ${p === 1 ? 'a atividade' : `as ${p} atividades`} desta lição para continuar.`; note.className = 'req'; btn.disabled = true;
      }
    }
    refreshReq();

    $('#prev-lesson').addEventListener('click', () => {
      if (j > 0) return go(`#m/${m.id}/${m.lessons[j - 1].id}`);
      const pm = modules()[mi - 1]; go(`#m/${pm.id}/${pm.lessons[pm.lessons.length - 1].id}`);
    });
    $('#next-lesson').addEventListener('click', () => {
      const wasDone = lessonDone(l.id);
      if (!wasDone) {
        state.progress.done[l.id] = Date.now(); saveProgress(); updateTopbar();
        if (moduleDone(m)) { confetti(70); toast(`Módulo "${m.title}" concluído! 🎉`, true); }
        else toast('Lição concluída ✓');
      }
      if (j + 1 < m.lessons.length) go(`#m/${m.id}/${m.lessons[j + 1].id}`);
      else if (mi + 1 < modules().length) { const nm = modules()[mi + 1]; go(`#m/${nm.id}/${nm.lessons[0].id}`); }
      else go('#home');
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     BLOCOS
     ═══════════════════════════════════════════════════════════════ */
  const KEYS = 'ABCDEFGH';
  const TONE_ICON = { tip: '💡', warn: '⚠️', rule: '⛔', info: 'ℹ️', ok: '✅' };

  function renderBlock(b, i, ans) {
    switch (b.type) {
      case 'text':
        return `<div class="block-text">${personalize(b.html)}</div>`;
      case 'callout':
        return `<div class="callout callout-${b.tone || 'info'}"><div class="co-title">${TONE_ICON[b.tone] || ''} ${b.title || ''}</div><div class="co-body">${personalize(b.html)}</div></div>`;
      case 'cards':
        return `<div class="cards ${b.cols === 2 ? 'cols-2' : ''}">${b.items.map(c => `<div class="card">${c.icon ? `<div class="c-icon">${c.icon}</div>` : ''}<h4>${c.title}</h4><div class="c-body">${personalize(c.html || '')}</div>${c.tag ? `<div class="c-tag"><span class="badge badge-${c.tagTone || 'gold'}">${c.tag}</span></div>` : ''}</div>`).join('')}</div>`;
      case 'table':
        return `<div class="tbl-wrap"><table><thead><tr>${b.head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      case 'compare':
        return `<div class="compare-block"><div class="compare-head"><span class="compare-title">${b.title || 'Brasil × Europa'}</span><span class="seg" data-seg><button data-m="both" class="on">Ambos</button><button data-m="br">🇧🇷 Brasil</button><button data-m="ie">🇮🇪 Europa</button></span></div>
          <div class="tbl-wrap"><table class="compare"><thead><tr><th>${b.label || ''}</th><th class="br">🇧🇷 Brasil</th><th class="ie">🇮🇪 Europa / Irlanda</th></tr></thead><tbody>${b.rows.map(r => `<tr><td>${r.label}</td><td class="br">${r.br}</td><td class="ie">${r.ie}</td></tr>`).join('')}</tbody></table></div></div>`;
      case 'steps':
        return `<div class="steps">${b.items.map((s, k) => `<div class="step"><div class="step-n">${k + 1}</div><div><h4>${s.title}</h4><div class="s-body">${personalize(s.html || '')}</div>${s.meta ? `<div class="s-meta">${s.meta}</div>` : ''}</div></div>`).join('')}</div>`;
      case 'stat':
        return `<div class="stats">${b.items.map(s => `<div class="s"><b>${s.value}</b><span>${s.label}</span></div>`).join('')}</div>`;
      case 'script':
        return `<div class="script-block">${b.title ? `<div class="script-title">📋 ${b.title}</div>` : ''}<div class="script-grid">
          ${b.pt ? `<div class="script-box"><span class="lang">PT-BR</span><button class="copy-btn" type="button">Copiar</button><span class="txt">${esc(personalize(b.pt))}</span></div>` : ''}
          ${b.en ? `<div class="script-box"><span class="lang">EN</span><button class="copy-btn" type="button">Copiar</button><span class="txt">${esc(personalize(b.en))}</span></div>` : ''}
        </div>${b.note ? `<div class="callout callout-tip" style="margin-top:.2rem"><div class="co-body">${b.note}</div></div>` : ''}</div>`;
      case 'flashcards':
        return `${b.title ? `<div class="script-title" style="margin-bottom:.6rem">🃏 ${b.title} <span class="badge badge-grey">toque para virar</span></div>` : ''}<div class="flash-grid">${b.items.map(f => `<button class="flash" type="button"><div class="flash-inner"><div class="flash-face flash-front">${f.tag ? `<small>${f.tag}</small>` : ''}<b>${f.front}</b></div><div class="flash-face flash-back">${f.backTag ? `<small>${f.backTag}</small>` : ''}${f.back}</div></div></button>`).join('')}</div>`;
      case 'checklist':
        return `${b.title ? `<div class="script-title" style="margin-bottom:.6rem">☑️ ${b.title}</div>` : ''}<div class="checklist">${b.items.map((it, k) => `<button class="check ${ans?.checked?.[k] ? 'on' : ''}" type="button" data-k="${k}"><span class="cb">✓</span><span>${personalize(it)}</span></button>`).join('')}</div>`;
      case 'quiz':
        return `<div class="quiz"><div class="q-tag">✦ Pergunta rápida ${ans?.done ? '<span class="badge badge-green">respondida</span>' : ''}</div><div class="q-text">${b.q}</div>
          <div class="opts">${b.options.map((o, k) => `<button class="opt ${ans?.done ? (k === b.answer ? 'correct' : (k === ans.pick ? 'wrong' : 'dim')) : ''}" type="button" data-k="${k}" ${ans?.done ? 'disabled' : ''}><span class="o-key">${KEYS[k]}</span><span>${o}</span></button>`).join('')}</div>
          <div class="fb-slot">${ans?.done ? feedbackHtml(ans.pick === b.answer, b.why, b.options[b.answer]) : ''}</div></div>`;
      case 'scenario':
        return `<div class="scenario"><div class="sc-head">🎭 Simulação · ${b.title || 'O cliente diz…'} ${ans?.done ? '<span class="badge badge-green">respondida</span>' : ''}</div><div class="sc-body">
          <div class="bubble"><span class="who">${b.who || '🧑‍💼'}</span><div class="msg">${b.client}${b.clientEn ? `<div class="en">"${b.clientEn}"</div>` : ''}<small>${b.context || 'Cliente'}</small></div></div>
          <div class="sc-prompt">O que você responde?</div>
          <div class="opts">${b.options.map((o, k) => `<button class="opt ${ans?.done ? (o.good ? 'correct' : (k === ans.pick ? 'wrong' : 'dim')) : ''}" type="button" data-k="${k}" ${ans?.done ? 'disabled' : ''}><span class="o-key">${KEYS[k]}</span><span>${personalize(o.text)}</span></button>`).join('')}</div>
          <div class="fb-slot">${ans?.done ? scenarioFeedback(b, ans.pick) : ''}</div></div></div>`;
      case 'order': {
        const shuffled = ans?.shuffle || shuffle(b.items.map((_, k) => k));
        return `<div class="order"><div class="q-tag" style="font-family:var(--ff-mono);font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-deep);margin-bottom:.4rem">✦ Coloque na ordem ${ans?.done ? '<span class="badge badge-green">concluído</span>' : ''}</div><div class="q-text">${b.title}</div><div class="hint">Toque nos itens na ordem correta, do primeiro ao último.</div>
          <div class="order-pool" data-shuffle="${shuffled.join(',')}">${shuffled.map(k => `<button class="order-item ${ans?.done ? 'picked' : ''}" type="button" data-k="${k}" ${ans?.done ? 'disabled' : ''}><span class="o-key">${ans?.done ? k + 1 : '·'}</span><span>${b.items[k]}</span></button>`).join('')}</div>
          <div class="order-foot"><span class="of-msg">${ans?.done ? 'Ordem correta ✓' : 'Próximo: 1º passo'}</span><button class="btn btn-ghost btn-sm of-reset" type="button" ${ans?.done ? 'hidden' : ''}>Recomeçar</button></div>
          <div class="fb-slot">${ans?.done && b.why ? feedbackHtml(true, b.why) : ''}</div></div>`;
      }
      case 'scorer':
        return `<div class="scorer"><div><div class="q-text">Calculadora de score de qualificação</div><p style="font-size:.9rem;color:var(--text-2);margin-bottom:.8rem">Marque o que é verdade sobre o prospect. Cada item vale 1 ponto.</p>
          <div class="checklist">${COURSE.scorer.items.map((it, k) => `<button class="check" type="button" data-k="${k}"><span class="cb">✓</span><span>${it}</span></button>`).join('')}</div></div>
          <div class="score-result s-no"><div class="sr-label">Score</div><b>0</b><div class="sr-verdict">Não envie</div></div></div>`;
      default:
        return `<div class="callout callout-info"><div class="co-body">Bloco desconhecido: ${esc(b.type)}</div></div>`;
    }
  }

  function feedbackHtml(ok, why, correctText) {
    return `<div class="feedback ${ok ? 'ok' : 'bad'}"><span>${ok ? '🎯' : '💭'}</span><div><b>${ok ? 'Isso mesmo!' : 'Quase.'}</b>${!ok && correctText ? `A resposta certa é: <em>${correctText}</em>. ` : ''}${why || ''}</div></div>`;
  }
  function scenarioFeedback(b, pick) {
    const o = b.options[pick];
    const best = b.options.find(x => x.good);
    return `<div class="feedback ${o.good ? 'ok' : 'bad'}"><span>${o.good ? '🎯' : '💭'}</span><div><b>${o.good ? 'Boa resposta.' : 'Não é a melhor saída.'}</b>${o.feedback || ''}</div></div>
      ${!o.good ? `<div class="feedback hint sc-best"><span>✅</span><div><b>Resposta recomendada</b>"${esc(personalize(best.text))}"${best.feedback ? ` — ${best.feedback}` : ''}</div></div>` : ''}`;
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    if (a.length > 2 && a.every((v, i) => v === i)) return shuffle(arr);
    return a;
  }

  function wireBlock(el, b, i, lid, answers, onChange) {
    const setAns = (patch) => { answers[i] = Object.assign(answers[i] || {}, patch); saveProgress(); onChange(); };

    if (b.type === 'script') {
      $$('.copy-btn', el).forEach(btn => btn.addEventListener('click', () => copyText($('.txt', btn.parentElement).textContent, btn)));
    }
    if (b.type === 'compare') {
      $$('[data-seg] button', el).forEach(btn => btn.addEventListener('click', () => {
        $$('[data-seg] button', el).forEach(x => x.classList.toggle('on', x === btn));
        const t = $('table', el); t.classList.remove('show-br', 'show-ie');
        if (btn.dataset.m !== 'both') t.classList.add('show-' + btn.dataset.m);
      }));
    }
    if (b.type === 'flashcards') {
      $$('.flash', el).forEach(f => f.addEventListener('click', () => f.classList.toggle('flipped')));
    }
    if (b.type === 'checklist') {
      $$('.check', el).forEach(c => c.addEventListener('click', () => {
        c.classList.toggle('on');
        const checked = (answers[i]?.checked || []).slice(); checked[+c.dataset.k] = c.classList.contains('on');
        setAns({ checked });
      }));
    }
    if (b.type === 'quiz' && !answers[i]?.done) {
      $$('.opt', el).forEach(o => o.addEventListener('click', () => {
        const k = +o.dataset.k, ok = k === b.answer;
        $$('.opt', el).forEach(x => { x.disabled = true; const xk = +x.dataset.k; x.classList.add(xk === b.answer ? 'correct' : xk === k ? 'wrong' : 'dim'); });
        $('.fb-slot', el).innerHTML = feedbackHtml(ok, b.why, b.options[b.answer]);
        $('.q-tag', el).insertAdjacentHTML('beforeend', ' <span class="badge badge-green">respondida</span>');
        setAns({ done: true, pick: k, ok });
      }));
    }
    if (b.type === 'scenario' && !answers[i]?.done) {
      $$('.opt', el).forEach(o => o.addEventListener('click', () => {
        const k = +o.dataset.k, ok = !!b.options[k].good;
        $$('.opt', el).forEach(x => { x.disabled = true; const xk = +x.dataset.k; x.classList.add(b.options[xk].good ? 'correct' : xk === k ? 'wrong' : 'dim'); });
        $('.fb-slot', el).innerHTML = scenarioFeedback(b, k);
        $('.sc-head', el).insertAdjacentHTML('beforeend', ' <span class="badge badge-green">respondida</span>');
        setAns({ done: true, pick: k, ok });
      }));
    }
    if (b.type === 'order' && !answers[i]?.done) {
      let expected = 0;
      const pool = $('.order-pool', el), msg = $('.of-msg', el);
      const shuf = pool.dataset.shuffle.split(',').map(Number);
      setAns({ shuffle: shuf });
      const reset = () => { expected = 0; $$('.order-item', el).forEach(x => { x.classList.remove('picked', 'oops'); x.disabled = false; $('.o-key', x).textContent = '·'; }); msg.textContent = 'Próximo: 1º passo'; };
      $('.of-reset', el).addEventListener('click', reset);
      $$('.order-item', el).forEach(item => item.addEventListener('click', () => {
        const k = +item.dataset.k;
        if (k === expected) {
          item.classList.add('picked'); item.disabled = true; $('.o-key', item).textContent = k + 1; expected++;
          if (expected === b.items.length) {
            msg.textContent = 'Ordem correta ✓'; $('.of-reset', el).hidden = true;
            // reorganiza visualmente na ordem certa
            $$('.order-item', el).sort((a, c) => +a.dataset.k - +c.dataset.k).forEach(x => pool.appendChild(x));
            if (b.why) $('.fb-slot', el).innerHTML = feedbackHtml(true, b.why);
            setAns({ done: true });
          } else msg.textContent = `Próximo: ${expected + 1}º passo`;
        } else {
          item.classList.add('oops'); setTimeout(() => item.classList.remove('oops'), 450);
          msg.textContent = 'Esse não é o próximo. Pense na ordem em que acontece de verdade.';
        }
      }));
    }
    if (b.type === 'scorer') {
      const res = $('.score-result', el);
      const update = () => {
        const n = $$('.check.on', el).length;
        $('b', res).textContent = n;
        res.className = 'score-result ' + (n >= 4 ? 's-a' : n === 3 ? 's-b' : 's-no');
        $('.sr-verdict', res).textContent = n >= 4 ? 'Envie · Sequência A (auditoria primeiro)' : n === 3 ? 'Envie · Sequência B (voucher primeiro)' : 'Não envie ainda';
      };
      $$('.check', el).forEach(c => c.addEventListener('click', () => { c.classList.toggle('on'); update(); }));
    }
  }

  function copyText(text, btn) {
    const done = () => { const o = btn.textContent; btn.textContent = 'Copiado ✓'; btn.classList.add('done'); setTimeout(() => { btn.textContent = o; btn.classList.remove('done'); }, 1600); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch { /* silencioso */ }
    document.body.removeChild(ta);
  }

  /* ═══════════════════════════════════════════════════════════════
     PROVA FINAL
     ═══════════════════════════════════════════════════════════════ */
  function renderExam() {
    setActiveNav(null);
    const qs = COURSE.exam.questions;
    let idx = 0; const picks = [];
    const view = $('#view');

    const paint = () => {
      const q = qs[idx];
      view.innerHTML = `
        <div class="container narrow">
          <button class="side-back" data-go="#home">← Sair da prova</button>
          <div class="exam-progress">Prova final · Pergunta ${idx + 1} de ${qs.length}</div>
          <div class="lesson-head"><div class="dots">${qs.map((_, k) => `<i class="${k < idx ? 'done' : ''} ${k === idx ? 'cur' : ''}"></i>`).join('')}</div></div>
          <div class="quiz" style="margin-top:1rem"><div class="q-tag">✦ ${q.topic || ''}</div><div class="q-text">${q.q}</div>
            <div class="opts">${q.options.map((o, k) => `<button class="opt" type="button" data-k="${k}"><span class="o-key">${KEYS[k]}</span><span>${o}</span></button>`).join('')}</div>
            <div class="fb-slot"></div>
            <div style="margin-top:1rem;display:flex;justify-content:flex-end"><button class="btn btn-primary" id="exam-next" hidden>${idx + 1 < qs.length ? 'Próxima →' : 'Ver resultado →'}</button></div>
          </div>
        </div>`;
      $$('.opt', view).forEach(o => o.addEventListener('click', () => {
        const k = +o.dataset.k; picks[idx] = k;
        $$('.opt', view).forEach(x => { x.disabled = true; const xk = +x.dataset.k; x.classList.add(xk === q.answer ? 'correct' : xk === k ? 'wrong' : 'dim'); });
        $('.fb-slot', view).innerHTML = feedbackHtml(k === q.answer, q.why, q.options[q.answer]);
        $('#exam-next').hidden = false;
      }));
      $('#exam-next').addEventListener('click', () => { idx++; if (idx < qs.length) { paint(); scrollTop(); } else finish(); });
    };

    const finish = () => {
      const correct = picks.filter((p, k) => p === qs[k].answer).length;
      const score = Math.round((correct / qs.length) * 100);
      const passed = score >= COURSE.exam.passScore;
      const prevBest = state.progress.exam?.score || 0;
      state.progress.exam = { score: Math.max(score, prevBest), last: score, passed: passed || !!state.progress.exam?.passed, at: Date.now(), attempts: (state.progress.exam?.attempts || 0) + 1 };
      saveProgress();
      if (passed) confetti(140);
      view.innerHTML = `
        <div class="container narrow">
          <div class="result-hero">
            <div class="eyebrow">Resultado da prova</div>
            <div class="big ${passed ? '' : 'bad'}">${score}%</div>
            <h2 class="h1" style="font-size:1.8rem;margin-top:.6rem">${passed ? `Aprovada(o), ${esc(state.session.name)}! 🎉` : 'Ainda não foi desta vez.'}</h2>
            <p class="lead" style="margin:0 auto">${passed
              ? `Você acertou ${correct} de ${qs.length}. Seu certificado está pronto.`
              : `Você acertou ${correct} de ${qs.length}; a nota mínima é ${COURSE.exam.passScore}%. Revise os módulos indicados e tente de novo — sem limite de tentativas.`}</p>
            <div class="hero-actions" style="justify-content:center">
              ${passed ? `<button class="btn btn-primary btn-lg" data-go="#certificate">Ver meu certificado →</button>` : `<button class="btn btn-primary btn-lg" id="retry">Tentar novamente</button>`}
              <button class="btn btn-outline btn-lg" data-go="#home">Voltar à trilha</button>
            </div>
          </div>
          ${!passed ? `<div class="callout callout-info" style="margin-top:1.5rem"><div class="co-title">O que revisar</div><div class="co-body"><ul style="padding-left:1.2rem">${qs.map((q, k) => picks[k] !== q.answer ? `<li><strong>${q.topic}</strong> — ${q.q}</li>` : '').join('')}</ul></div></div>` : ''}
        </div>`;
      $('#retry')?.addEventListener('click', () => { idx = 0; picks.length = 0; paint(); scrollTop(); });
    };
    paint();
  }

  /* ═══════════════════════════════════════════════════════════════
     CERTIFICADO
     ═══════════════════════════════════════════════════════════════ */
  function renderCertificate() {
    setActiveNav(null);
    const ex = state.progress.exam;
    const date = new Date(ex.at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    $('#view').innerHTML = `
      <div class="container narrow">
        <button class="side-back" data-go="#home">← Voltar à trilha</button>
        <div class="cert">
          <div class="c-eyebrow">Academia de Vendas · Certificado de conclusão</div>
          <h2>Onboarding Comercial</h2>
          <p>Certificamos que</p>
          <div class="c-name">${esc(state.session.name)}</div>
          <p>concluiu o treinamento de boas-vindas da consultoria Marcus Fernandes — processos de venda, produtos, mercados Brasil e Europa, abordagem, objeções e fechamento — e foi aprovada(o) na avaliação final.</p>
          <div class="c-meta"><span><b>${date}</b>Data</span><span><b>${ex.score}%</b>Nota final</span><span><b>${COURSE.modules.length} módulos · ${allLessons().length} lições</b>Carga</span></div>
          <div class="c-sign"><div class="sig">Marcus Fernandes</div><small>Consultor · marcusfernandes.ie · Dublin 15</small></div>
        </div>
        <div class="hero-actions" style="justify-content:center">
          <button class="btn btn-primary btn-lg" onclick="window.print()">🖨 Imprimir ou salvar em PDF</button>
          <button class="btn btn-outline btn-lg" data-go="#cheatsheet">Ir para a Cola rápida</button>
        </div>
        <div class="callout callout-tip" style="margin-top:2rem"><div class="co-title">Próximos passos</div><div class="co-body">${COURSE.afterCourse}</div></div>
      </div>`;
  }

  /* ═══════════════════════════════════════════════════════════════
     GLOSSÁRIO E COLA RÁPIDA
     ═══════════════════════════════════════════════════════════════ */
  function renderGlossary() {
    setActiveNav('glossary');
    const items = GLOSSARY.slice().sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));
    $('#view').innerHTML = `
      <div class="container narrow">
        <div class="eyebrow">Referência</div>
        <h1 class="h1" style="font-size:2.2rem">Glossário para <em>iniciantes</em></h1>
        <p class="lead" style="margin-bottom:1.5rem">Todo termo técnico que aparece no curso ou numa conversa com cliente, explicado em uma frase. Nunca use o termo técnico com o cliente — use a explicação.</p>
        <input class="glossary-search" id="gl-q" type="search" placeholder="Buscar termo… (ex.: SEO, voucher, PIX)">
        <div class="gl-list" id="gl-list"></div>
      </div>`;
    const list = $('#gl-list');
    const paint = (q = '') => {
      const f = items.filter(x => (x.term + ' ' + (x.en || '') + ' ' + x.def).toLowerCase().includes(q.toLowerCase()));
      list.innerHTML = f.length ? f.map(x => `<div class="gl-item"><b>${x.term}${x.en ? `<span class="gl-en">${x.en}</span>` : ''}</b><p>${x.def}</p></div>`).join('') : `<div class="empty">Nenhum termo encontrado.</div>`;
    };
    paint();
    $('#gl-q').addEventListener('input', e => paint(e.target.value));
  }

  function renderCheatsheet() {
    setActiveNav('cheatsheet');
    $('#view').innerHTML = `
      <div class="container">
        <div class="eyebrow">Referência</div>
        <h1 class="h1" style="font-size:2.2rem">Cola <em>rápida</em></h1>
        <p class="lead" style="margin-bottom:1.25rem">Os números e as regras que você precisa ter à mão em toda conversa. Cada bloco tem botões para copiar como texto (pronto para WhatsApp ou e-mail) ou como imagem. Para o detalhe completo, abra o <a href="../playbook/" target="_blank" rel="noopener">Playbook</a>.</p>
        <div class="view-tools"><button class="share-btn" id="cheat-copy-all">💬 Copiar tudo como texto</button><button class="btn btn-primary btn-sm" id="cheat-pdf">🖨️ Baixar PDF para imprimir</button><a class="share-btn" href="#folheto" style="text-decoration:none">📄 Folheto para o cliente</a></div>
        <div class="cheat-grid" id="cheat"></div>
      </div>`;
    const c = $('#cheat');
    CHEATSHEET.forEach((b, i) => {
      const el = document.createElement('section'); el.className = 'block';
      el.innerHTML = (b.heading ? `<h2 class="section-title" style="margin-top:.5rem">${b.heading}</h2>` : '') + `<div class="share-target" data-share-name="${esc(b.heading || 'cola-rapida')}">${renderBlock(b, i, null)}</div>`;
      attachShareBar(el.querySelector('.share-target'), b);
      c.appendChild(el);
      wireBlock(el, b, i, '_cheat', {}, () => {});
    });
    $('#cheat-copy-all').addEventListener('click', (e) => Share.copyText(CHEATSHEET.map(b => (b.heading ? `*${b.heading.toUpperCase()}*\n` : '') + blockToText(b)).join('\n\n'), e.currentTarget, 'Tudo copiado ✓'));
    $('#cheat-pdf').addEventListener('click', () => window.print());
  }

  /* ═══════════════════════════════════════════════════════════════
     COMPARTILHAR: texto pronto para WhatsApp/e-mail e imagem
     ═══════════════════════════════════════════════════════════════ */
  const SHARE_TYPES = new Set(['table', 'compare', 'cards', 'steps', 'stat', 'callout', 'flashcards', 'checklist']);
  const strip = (html) => Share.nodeText(Object.assign(document.createElement('div'), { innerHTML: personalize(html || '') }));
  function blockToText(b, el) {
    switch (b.type) {
      case 'table':
        return (b.title ? `*${b.title}*\n` : '') + b.rows.map(r => `• *${strip(r[0])}*${r.length > 1 ? ' — ' + r.slice(1).map((c, i) => (b.head[i + 1] && r.length > 2 ? `${strip(b.head[i + 1])}: ` : '') + strip(c)).join(' · ') : ''}`).join('\n');
      case 'compare': {
        const sel = el?.querySelector('[data-seg] button.on')?.dataset.m || 'both';
        const part = (key) => b.rows.map(r => `• *${strip(r.label)}*: ${strip(r[key])}`).join('\n');
        const out = [`*${b.title || 'Brasil × Europa'}*`];
        if (sel !== 'ie') out.push(`🇧🇷 *Brasil*\n${part('br')}`);
        if (sel !== 'br') out.push(`🇮🇪 *Europa / Irlanda*\n${part('ie')}`);
        return out.join('\n\n');
      }
      case 'cards': return b.items.map(c => `${c.icon ? c.icon + ' ' : '• '}*${strip(c.title)}*\n${strip(c.html)}`).join('\n\n');
      case 'steps': return b.items.map((s, k) => `${k + 1}. *${strip(s.title)}* — ${strip(s.html)}${s.meta ? ` (${strip(s.meta)})` : ''}`).join('\n');
      case 'stat': return b.items.map(s => `• *${s.value}* — ${s.label}`).join('\n');
      case 'callout': return `${b.title ? `*${strip(b.title)}*\n` : ''}${strip(b.html)}`;
      case 'flashcards': return (b.title ? `*${b.title}*\n` : '') + b.items.map(f => `• ${strip(f.front)} → ${strip(f.back)}`).join('\n');
      case 'checklist': return (b.title ? `*${b.title}*\n` : '') + b.items.map(i => `☐ ${strip(i)}`).join('\n');
      case 'script': return [b.pt, b.en].filter(Boolean).map(personalize).join('\n\n— — —\n\n');
      case 'text': return strip(b.html);
      default: return el ? Share.textFromElement(el) : '';
    }
  }
  function attachShareBar(el, b) {
    if (!SHARE_TYPES.has(b.type) || !window.Share) return;
    const bar = Share.makeBar({ text: true, image: true, getText: () => blockToText(b, el), target: () => el });
    el.prepend(bar);
  }

  /* ═══════════════════════════════════════════════════════════════
     FOLHETO PARA O CLIENTE
     ═══════════════════════════════════════════════════════════════ */
  function renderLeaflet() {
    setActiveNav('folheto');
    const pref = MFStore.getJSON('mf_leaflet_pref') || {};
    let market = pref.market || 'ie', lang = pref.lang || 'en';
    const paint = () => {
      if (!LEAFLET[market][lang]) lang = 'pt';
      const L = LEAFLET[market][lang];
      MFStore.setJSON('mf_leaflet_pref', { market, lang });
      $('#view').innerHTML = `
        <div class="container narrow">
          <div class="no-print">
            <div class="eyebrow">Material para o cliente</div>
            <h1 class="h1" style="font-size:2.2rem">Folheto de <em>uma página</em></h1>
            <p class="lead" style="margin-bottom:1.25rem">Para imprimir e levar na visita, enviar como imagem no WhatsApp ou colar como texto num e-mail. Escolha o mercado e o idioma; o folheto sai com o seu nome como contato.</p>
            <div class="view-tools">
              <span class="seg" id="lf-market"><button data-m="ie" class="${market === 'ie' ? 'on' : ''}">🇮🇪 Irlanda / Europa</button><button data-m="br" class="${market === 'br' ? 'on' : ''}">🇧🇷 Brasil</button></span>
              <span class="seg" id="lf-lang"><button data-l="pt" class="${lang === 'pt' ? 'on' : ''}">PT</button>${LEAFLET[market].en ? `<button data-l="en" class="${lang === 'en' ? 'on' : ''}">EN</button>` : ''}</span>
              <span style="flex:1"></span>
              <button class="share-btn" id="lf-text">💬 Copiar texto</button>
              <button class="share-btn" id="lf-img">🖼️ Copiar imagem</button>
              <button class="btn btn-primary btn-sm" id="lf-pdf">🖨️ Baixar PDF</button>
            </div>
          </div>
          <article class="leaflet" id="leaflet" data-share-name="folheto-${market}-${lang}">
            <header class="lf-head"><div class="brand-mark">M</div><div><div class="lf-brand">Marcus Fernandes</div><div class="lf-tag">${L.tagline}</div></div><div class="lf-site">marcusfernandes.ie</div></header>
            <h2 class="lf-title">${L.title}</h2>
            <p class="lf-sub">${L.subtitle}</p>
            <section class="lf-grid">
              <div class="lf-box"><h3>${L.problemsTitle}</h3><ul>${L.problems.map(p => `<li><b>${p[0]}</b> ${p[1]}</li>`).join('')}</ul></div>
              <div class="lf-box"><h3>${L.includesTitle}</h3><ul>${L.includes.map(i => `<li>${i}</li>`).join('')}</ul></div>
              <div class="lf-box"><h3>${L.processTitle}</h3><ol>${L.process.map(s => `<li><b>${s[0]}</b> ${s[1]}</li>`).join('')}</ol></div>
              <div class="lf-box lf-money"><h3>${L.moneyTitle}</h3><ul>${L.money.map(m => `<li>${m}</li>`).join('')}</ul></div>
            </section>
            <section class="lf-proof">${L.proof.map(p => `<div><b>${p[0]}</b><span>${p[1]}</span></div>`).join('')}</section>
            <footer class="lf-foot">
              <div><b>${L.ctaTitle}</b><span>${L.cta}</span></div>
              <div class="lf-contact"><b>${esc(state.session.name)}</b><span>${L.contactRole}</span><span>marcusffernandes@hotmail.com · +353 83 201 1655</span><span>marcusfernandes.ie · Dublin 15</span></div>
            </footer>
          </article>
        </div>`;
      $$('#lf-market button').forEach(x => x.addEventListener('click', () => { market = x.dataset.m; if (!LEAFLET[market][lang]) lang = 'pt'; paint(); }));
      $$('#lf-lang button').forEach(x => x.addEventListener('click', () => { lang = x.dataset.l; paint(); }));
      const text = () => {
        const li = (arr) => arr.map(x => Array.isArray(x) ? `• *${x[0]}* ${x[1]}` : `• ${x}`).join('\n');
        return [`*${L.title}*`, L.subtitle, `*${L.problemsTitle}*\n${li(L.problems)}`, `*${L.includesTitle}*\n${li(L.includes)}`, `*${L.processTitle}*\n${L.process.map((s, k) => `${k + 1}. *${s[0]}* ${s[1]}`).join('\n')}`, `*${L.moneyTitle}*\n${li(L.money)}`, L.proof.map(p => `• *${p[0]}* ${p[1]}`).join('\n'), `*${L.ctaTitle}*\n${L.cta}`, `${state.session.name} · ${L.contactRole}\nmarcusffernandes@hotmail.com · +353 83 201 1655\nmarcusfernandes.ie`].join('\n\n');
      };
      $('#lf-text').addEventListener('click', (e) => Share.copyText(text(), e.currentTarget));
      $('#lf-img').addEventListener('click', (e) => Share.copyImage($('#leaflet'), e.currentTarget));
      $('#lf-pdf').addEventListener('click', () => window.print());
    };
    paint();
  }

  /* ═══════════════════════════════════════════════════════════════
     ACESSO
     ═══════════════════════════════════════════════════════════════ */
  async function enter(session) {
    state.session = session;
    loadProgress();
    $('#gate').hidden = true; $('#app').hidden = false;
    updateTopbar();
    route();
  }
  function showGate() {
    $('#app').hidden = true; $('#gate').hidden = false;
    if (Auth.mode === 'clerk') {
      $('#gate-form').hidden = true; $('#clerk-mount').hidden = false;
      Auth.mountClerk($('#clerk-mount'), enter).catch(e => { $('#gate-error').textContent = e.message; $('#gate-error').hidden = false; });
    } else {
      setTimeout(() => $('#gate-name')?.focus(), 100);
    }
  }

  async function init() {
    // Delegação global para [data-go]
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-go]'); if (t) { e.preventDefault(); go(t.dataset.go); }
      const nv = e.target.closest('.nav-link[data-view]'); if (nv) go('#' + nv.dataset.view);
    });
    $('#go-home').addEventListener('click', () => go('#home'));
    $('#menu-btn').addEventListener('click', () => { const mn = $('#mobile-nav'); mn.hidden = !mn.hidden; });
    const doLogout = async () => { await Auth.logout(); state.session = null; location.href = '../index.html'; };
    $('#logout').addEventListener('click', doLogout);
    $('#logout-m').addEventListener('click', doLogout);
    window.addEventListener('hashchange', route);

    $('#pass-toggle').addEventListener('click', () => { const i = $('#gate-pass'); i.type = i.type === 'password' ? 'text' : 'password'; });
    $('#gate-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('#gate-name').value.trim(), password = $('#gate-pass').value;
      const btn = $('#gate-submit'); btn.disabled = true; btn.textContent = 'Verificando…';
      $('#gate-error').hidden = true;
      try {
        const s = await Auth.login({ name, password });
        if (!s) {
          $('#gate-error').textContent = 'Senha incorreta. Confira com o administrador e tente de novo.'; $('#gate-error').hidden = false;
          const card = $('.gate-card'); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
          $('#gate-pass').value = ''; $('#gate-pass').focus();
        } else { enter(s); }
      } catch (err) {
        $('#gate-error').textContent = err.message; $('#gate-error').hidden = false;
      } finally { btn.disabled = false; btn.textContent = 'Entrar no curso →'; }
    });

    try {
      const s = await Auth.restore();
      if (s) enter(s); else showGate();
    } catch (err) { showGate(); }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
