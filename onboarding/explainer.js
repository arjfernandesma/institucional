/* ═══════════════════════════════════════════════════════════════════
   EXPLAINER — "vídeos" explicativos gerados em JavaScript
   ───────────────────────────────────────────────────────────────────
   Cada vídeo é uma sequência de cenas (content.js, bloco type:'video').
   Cada cena tem uma legenda, uma narração (voz sintetizada do próprio
   navegador, em pt-BR, sem serviço externo) e um visual animado:
     title · bullets · chat · timeline · funnel · compare · steps ·
     stat · phone · clock · score
   Controles: play/pausa, cena anterior/próxima, barra de progresso com
   marcadores, narração on/off, velocidade e tela cheia.
   ═══════════════════════════════════════════════════════════════════ */
const Explainer = (() => {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PREF_KEY = 'mf_explainer_pref';
  const pref = () => { try { return JSON.parse(localStorage.getItem(PREF_KEY) || '{}'); } catch { return {}; } };
  const savePref = (p) => { try { localStorage.setItem(PREF_KEY, JSON.stringify({ ...pref(), ...p })); } catch { /* ignore */ } };

  /* ── narração ──────────────────────────────────────────────────── */
  const speech = {
    ok: () => 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    voice: null,
    pickVoice() {
      if (!this.ok()) return null;
      const voices = speechSynthesis.getVoices();
      const pt = voices.filter(v => /^pt(-|_)?(BR)?/i.test(v.lang) || v.lang.toLowerCase().startsWith('pt'));
      const br = pt.find(v => /br/i.test(v.lang)) || pt[0];
      this.voice = br || null; return this.voice;
    },
    speak(text, rate, onend) {
      if (!this.ok()) { onend?.(); return null; }
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR'; u.rate = Math.min(1.6, 0.95 * rate); u.pitch = 1;
      const v = this.voice || this.pickVoice(); if (v) u.voice = v;
      u.onend = () => onend?.(); u.onerror = () => onend?.();
      speechSynthesis.speak(u); return u;
    },
    stop() { if (this.ok()) speechSynthesis.cancel(); },
  };
  if (speech.ok()) { speech.pickVoice(); speechSynthesis.onvoiceschanged = () => speech.pickVoice(); }

  /* ── visuais ───────────────────────────────────────────────────── */
  const stag = (i) => `style="--i:${i}"`;
  const V = {
    title: (v) => `<div class="xv-title"><div class="xp-anim xv-eyebrow" ${stag(0)}>${esc(v.eyebrow || '')}</div><h3 class="xp-anim" ${stag(1)}>${v.text}</h3>${v.sub ? `<p class="xp-anim" ${stag(2)}>${v.sub}</p>` : ''}</div>`,
    bullets: (v) => `<div class="xv-bullets">${v.title ? `<h4 class="xp-anim" ${stag(0)}>${v.title}</h4>` : ''}<ul>${v.items.map((it, i) => `<li class="xp-anim" ${stag(i + 1)}><span class="xv-dot"></span><span>${it}</span></li>`).join('')}</ul></div>`,
    chat: (v) => `<div class="xv-chat">${v.messages.map((m, i) => `<div class="xv-msg ${m.from === 'you' ? 'you' : 'them'} xp-anim" ${stag(i)}><span class="xv-who">${m.from === 'you' ? (m.name || 'Você') : (m.name || 'Cliente')}</span>${esc(m.text)}</div>`).join('')}</div>`,
    timeline: (v) => `<div class="xv-timeline"><div class="xv-line xp-anim" ${stag(0)}></div><div class="xv-points">${v.points.map((p, i) => `<div class="xv-point xp-anim ${p.tone || ''}" ${stag(i + 1)}><i></i><b>${p.label}</b><span>${p.sub || ''}</span></div>`).join('')}</div></div>`,
    funnel: (v) => `<div class="xv-funnel">${v.rows.map((r, i) => `<div class="xv-frow xp-anim" ${stag(i)}><span class="xv-flabel">${r.label}</span><div class="xv-fbar"><span style="--w:${r.pct}%;animation-delay:calc(var(--i)*.35s + .2s)"></span></div><b class="xv-fval" data-count="${r.value}">${r.value}</b></div>`).join('')}</div>`,
    compare: (v) => `<div class="xv-compare"><div class="xv-col xp-anim" ${stag(0)}><h4>${v.left.title}</h4><ul>${v.left.items.map((it, i) => `<li class="xp-anim" ${stag(i + 1)}>${it}</li>`).join('')}</ul></div><div class="xv-col xp-anim" ${stag(0)}><h4>${v.right.title}</h4><ul>${v.right.items.map((it, i) => `<li class="xp-anim" ${stag(i + 1)}>${it}</li>`).join('')}</ul></div></div>`,
    steps: (v) => `<div class="xv-steps">${v.items.map((s, i) => `<div class="xv-step xp-anim" ${stag(i)}><b>${i + 1}</b><div><strong>${s.title}</strong>${s.text ? `<span>${s.text}</span>` : ''}</div></div>`).join('')}</div>`,
    stat: (v) => `<div class="xv-stat">${v.items.map((s, i) => `<div class="xp-anim" ${stag(i)}><b data-count="${esc(s.value)}">${esc(s.value)}</b><span>${s.label}</span></div>`).join('')}</div>`,
    phone: (v) => `<div class="xv-phone xp-anim" ${stag(0)}><div class="xv-screen"><div class="xv-search xp-anim" ${stag(1)}>🔍 ${esc(v.query)}</div>${v.results.map((r, i) => `<div class="xv-result xp-anim ${r.you ? 'you' : ''} ${r.dim ? 'dim' : ''}" ${stag(i + 2)}><b>${esc(r.name)}</b><span>${esc(r.sub || '')}</span>${r.you ? '<i>você</i>' : ''}</div>`).join('')}${v.footer ? `<div class="xv-pfoot xp-anim" ${stag(v.results.length + 2)}>${v.footer}</div>` : ''}</div></div>`,
    clock: (v) => {
      const total = v.total || 15, r = 80, c = 2 * Math.PI * r;
      const colors = ['#D4A53A', '#7FB59A', '#8FB4D9', '#E0A093', '#C9B5E8'];
      const arcs = v.segments.map((s, i) => { const len = (s.to - s.from) / total * c; const off = -(s.from / total) * c; return `<circle class="xv-arc xp-anim" style="--i:${i};--len:${len};--gap:${c - len}" r="${r}" cx="100" cy="100" stroke="${colors[i % colors.length]}" stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${off}"/>`; }).join('');
      return `<div class="xv-clock"><svg viewBox="0 0 200 200"><circle r="${r}" cx="100" cy="100" class="xv-track"/>${arcs}<text x="100" y="96" class="xv-ctext">${total}</text><text x="100" y="118" class="xv-csub">minutos</text></svg><ul>${v.segments.map((s, i) => `<li class="xp-anim" ${stag(i)}><i style="background:${colors[i % colors.length]}"></i><b>${s.from}–${s.to}</b> ${s.label}</li>`).join('')}</ul></div>`;
    },
    score: (v) => `<div class="xv-score"><ul>${v.items.map((it, i) => `<li class="xp-anim ${it.on ? 'on' : ''}" ${stag(i)}><span class="xv-cb">${it.on ? '✓' : ''}</span>${it.text}</li>`).join('')}</ul><div class="xv-sres xp-anim" ${stag(v.items.length)}><b>${v.items.filter(i => i.on).length}</b><span>${v.result}</span></div></div>`,
  };
  function renderVisual(vis) { return (V[vis.kind] || V.title)(vis); }

  /* ── contadores numéricos ──────────────────────────────────────── */
  function runCounters(root) {
    root.querySelectorAll('[data-count]').forEach(el => {
      const raw = el.dataset.count; const m = raw.match(/^([^\d]*)(\d[\d.,]*)(.*)$/); if (!m) return;
      const target = parseFloat(m[2].replace(/\./g, '').replace(',', '.')); if (isNaN(target)) return;
      const dec = (m[2].split(',')[1] || '').length; const start = performance.now(); const dur = 1200;
      const fmt = (n) => n.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      const tick = (t) => { const k = Math.min(1, (t - start) / dur); const e = 1 - Math.pow(1 - k, 3); el.textContent = m[1] + fmt(target * e) + m[3]; if (k < 1) requestAnimationFrame(tick); else el.textContent = raw; };
      requestAnimationFrame(tick);
    });
  }

  /* ── player ────────────────────────────────────────────────────── */
  function mount(container, spec, { onComplete } = {}) {
    const scenes = spec.scenes; const p = pref();
    const st = { i: 0, playing: false, narr: p.narr !== false && speech.ok(), rate: p.rate || 1, timer: null, start: 0, elapsed: 0, done: false, utter: null, spoken: false, raf: null };
    const total = scenes.reduce((a, s) => a + (s.dur || 6), 0);

    container.className = 'xp';
    container.innerHTML = `
      <div class="xp-stage" tabindex="0">
        <div class="xp-scene" id="xp-scene"></div>
        <div class="xp-caption"><span id="xp-cap"></span></div>
        <button class="xp-big" type="button" aria-label="Reproduzir"><span>▶</span><small>${esc(spec.title)} · ${Math.round(total / 60) || 1} min</small></button>
        <div class="xp-brand">M · Academia de Vendas</div>
      </div>
      <div class="xp-controls">
        <button type="button" class="xp-btn" data-a="play" title="Reproduzir / pausar">▶</button>
        <button type="button" class="xp-btn" data-a="prev" title="Cena anterior">⏮</button>
        <button type="button" class="xp-btn" data-a="next" title="Próxima cena">⏭</button>
        <div class="xp-progress" title="Ir para a cena"><div class="xp-fill"></div><div class="xp-markers">${scenes.map((s, k) => `<i style="left:${(scenes.slice(0, k).reduce((a, x) => a + (x.dur || 6), 0) / total) * 100}%" data-k="${k}"></i>`).join('')}</div></div>
        <span class="xp-time"><b id="xp-idx">1</b>/${scenes.length}</span>
        <button type="button" class="xp-btn ${st.narr ? 'on' : ''}" data-a="narr" title="Narração por voz (${speech.ok() ? 'voz do navegador' : 'indisponível neste navegador'})" ${speech.ok() ? '' : 'disabled'}>🔊</button>
        <button type="button" class="xp-btn" data-a="rate" title="Velocidade">${st.rate}×</button>
        <button type="button" class="xp-btn" data-a="cc" title="Legendas">CC</button>
        <button type="button" class="xp-btn" data-a="full" title="Tela cheia">⛶</button>
      </div>
      <div class="xp-meta"><b>🎬 ${esc(spec.title)}</b>${spec.desc ? `<span>${spec.desc}</span>` : ''}<span class="xp-done" hidden>✓ assistido</span></div>`;

    const $ = (s) => container.querySelector(s);
    const stage = $('.xp-stage'), sceneEl = $('#xp-scene'), cap = $('#xp-cap'), big = $('.xp-big'), fill = $('.xp-fill'), idx = $('#xp-idx'), playBtn = $('[data-a="play"]');

    function showScene(k, autoplay = true) {
      clearTimeout(st.timer); speech.stop(); if (st.raf) cancelAnimationFrame(st.raf);
      st.i = Math.max(0, Math.min(scenes.length - 1, k)); st.elapsed = 0; st.spoken = false; st.done = false;
      const s = scenes[st.i];
      sceneEl.innerHTML = renderVisual(s.visual); sceneEl.className = 'xp-scene kind-' + s.visual.kind;
      sceneEl.style.setProperty('--rate', 1 / st.rate);
      cap.textContent = s.caption || ''; idx.textContent = st.i + 1;
      $$markers();
      runCounters(sceneEl);
      if (autoplay && st.playing) startTimer();
    }
    function $$markers() { container.querySelectorAll('.xp-markers i').forEach(m => m.classList.toggle('past', +m.dataset.k <= st.i)); }
    function sceneDur() { return (scenes[st.i].dur || 6) * 1000 / st.rate; }
    function startTimer() {
      st.start = performance.now() - st.elapsed;
      const s = scenes[st.i];
      let narrDone = !st.narr || !s.narration;
      if (st.narr && s.narration && !st.spoken) { st.spoken = true; speech.speak(s.narration, st.rate, () => { narrDone = true; }); }
      else narrDone = true;
      const loop = (t) => {
        if (!st.playing) return;
        st.elapsed = t - st.start;
        const base = scenes.slice(0, st.i).reduce((a, x) => a + (x.dur || 6), 0) * 1000;
        const pct = Math.min(1, (base + Math.min(st.elapsed * st.rate, (s.dur || 6) * 1000)) / (total * 1000));
        fill.style.width = (pct * 100) + '%';
        if (st.elapsed >= sceneDur() && (narrDone || st.elapsed > sceneDur() + 12000)) return advance();
        st.raf = requestAnimationFrame(loop);
      };
      st.raf = requestAnimationFrame(loop);
    }
    function advance() {
      if (st.i + 1 < scenes.length) showScene(st.i + 1);
      else finish();
    }
    function finish() {
      st.playing = false; playBtn.textContent = '↺'; big.hidden = false; big.querySelector('span').textContent = '↺'; big.querySelector('small').textContent = 'Assistir de novo';
      fill.style.width = '100%'; $('.xp-done').hidden = false; container.classList.add('finished');
      onComplete?.();
    }
    function play() {
      if (container.classList.contains('finished')) { container.classList.remove('finished'); big.querySelector('span').textContent = '▶'; big.querySelector('small').textContent = `${spec.title} · ${Math.round(total / 60) || 1} min`; fill.style.width = '0%'; showScene(0, false); }
      st.playing = true; playBtn.textContent = '⏸'; big.hidden = true; container.classList.add('playing');
      if (st.elapsed === 0 && !sceneEl.innerHTML) showScene(st.i, false);
      startTimer();
    }
    function pause() { st.playing = false; playBtn.textContent = '▶'; big.hidden = false; container.classList.remove('playing'); if (st.raf) cancelAnimationFrame(st.raf); if (speech.ok()) speechSynthesis.pause(); }
    function resume() { st.playing = true; playBtn.textContent = '⏸'; big.hidden = true; container.classList.add('playing'); if (speech.ok() && speechSynthesis.paused) speechSynthesis.resume(); st.start = performance.now() - st.elapsed; st.raf = requestAnimationFrame(function loop(t) { if (!st.playing) return; st.elapsed = t - st.start; if (st.elapsed >= sceneDur() && !speechSynthesis.speaking) return advance(); st.raf = requestAnimationFrame(loop); }); }

    container.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]'); const mk = e.target.closest('.xp-markers i');
      if (mk) { showScene(+mk.dataset.k, false); if (st.playing) startTimer(); return; }
      if (e.target.closest('.xp-big')) { play(); return; }
      if (!b) return;
      const a = b.dataset.a;
      if (a === 'play') { if (st.playing) pause(); else if (st.elapsed > 0 && !container.classList.contains('finished')) resume(); else play(); }
      if (a === 'prev') { showScene(st.i - 1, false); if (st.playing) startTimer(); }
      if (a === 'next') { if (st.i + 1 >= scenes.length) finish(); else { showScene(st.i + 1, false); if (st.playing) startTimer(); } }
      if (a === 'narr') { st.narr = !st.narr; b.classList.toggle('on', st.narr); savePref({ narr: st.narr }); if (!st.narr) speech.stop(); }
      if (a === 'rate') { st.rate = st.rate >= 1.5 ? 0.75 : +(st.rate + 0.25).toFixed(2); b.textContent = st.rate + '×'; savePref({ rate: st.rate }); sceneEl.style.setProperty('--rate', 1 / st.rate); }
      if (a === 'cc') { container.classList.toggle('no-cc'); b.classList.toggle('off'); }
      if (a === 'full') { if (document.fullscreenElement) document.exitFullscreen?.(); else (container.requestFullscreen?.() || stage.requestFullscreen?.()); }
    });
    stage.addEventListener('keydown', (e) => { if (e.key === ' ') { e.preventDefault(); playBtn.click(); } if (e.key === 'ArrowRight') container.querySelector('[data-a="next"]').click(); if (e.key === 'ArrowLeft') container.querySelector('[data-a="prev"]').click(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden && st.playing) pause(); });

    showScene(0, false);
    return { play, pause, destroy: () => { st.playing = false; speech.stop(); clearTimeout(st.timer); if (st.raf) cancelAnimationFrame(st.raf); } };
  }

  return { mount, speechAvailable: () => speech.ok() };
})();
window.Explainer = Explainer;
