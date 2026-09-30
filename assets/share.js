/* ═══════════════════════════════════════════════════════════════════
   SHARE — copiar texto (pronto para WhatsApp/e-mail), copiar imagem
   e imprimir/salvar em PDF qualquer bloco da página.
   ───────────────────────────────────────────────────────────────────
   Share.copyText(texto, botão)            → área de transferência
   Share.copyImage(elemento, botão)        → PNG na área de transferência
                                             (ou download, se o navegador
                                             não permitir colar imagem)
   Share.printElement(elemento, {title})   → imprime só aquele elemento
   Share.textFromElement(elemento)         → texto formatado a partir do DOM
   Share.enhance(seletor, {text,image,print,label}) → adiciona a barrinha
                                             de botões acima de cada elemento
   Imagem usa html2canvas servido localmente (assets/vendor/).
   ═══════════════════════════════════════════════════════════════════ */
const Share = (() => {
  const ROOT = new URL('..', document.currentScript.src).href;
  let h2c;

  function loadH2C() {
    if (window.html2canvas) return Promise.resolve(window.html2canvas);
    if (!h2c) h2c = new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = ROOT + 'assets/vendor/html2canvas.min.js';
      s.onload = () => res(window.html2canvas);
      s.onerror = () => { h2c = null; rej(new Error('Não foi possível carregar o gerador de imagem.')); };
      document.head.appendChild(s);
    });
    return h2c;
  }

  /* ── feedback no botão ─────────────────────────────────────────── */
  function flash(btn, msg, ok = true) {
    if (!btn) return;
    const original = btn.dataset.label || btn.innerHTML;
    btn.dataset.label = original;
    btn.innerHTML = msg; btn.classList.add(ok ? 'done' : 'fail'); btn.disabled = true;
    setTimeout(() => { btn.innerHTML = original; btn.classList.remove('done', 'fail'); btn.disabled = false; }, 1800);
  }

  /* ── texto ─────────────────────────────────────────────────────── */
  function fallbackCopy(text) {
    const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch { /* ignore */ }
    document.body.removeChild(ta); return ok;
  }
  async function copyText(text, btn, msg = 'Copiado ✓') {
    text = String(text).replace(/\n{3,}/g, '\n\n').trim();
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else if (!fallbackCopy(text)) throw new Error('copy');
      flash(btn, msg); return true;
    } catch {
      if (fallbackCopy(text)) { flash(btn, msg); return true; }
      flash(btn, 'Não deu para copiar', false); return false;
    }
  }

  const clean = (s) => String(s).replace(/ /g, ' ').replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').trim();
  /** Texto legível a partir de um nó do DOM (listas viram "•", quebras preservadas). */
  function nodeText(node) {
    const clone = node.cloneNode(true);
    clone.querySelectorAll('.share-bar, .copy-btn, button, script, style, .lang').forEach(n => n.remove());
    clone.querySelectorAll('br').forEach(n => n.replaceWith('\n'));
    clone.querySelectorAll('li').forEach(n => { n.prepend('• '); n.append('\n'); });
    clone.querySelectorAll('p, div, h1, h2, h3, h4, h5, tr, dt, dd, section, article, li').forEach(n => n.append('\n'));
    clone.querySelectorAll('strong, b').forEach(n => { const t = n.textContent.trim(); if (t) n.replaceWith('*' + t + '*'); });
    return clean(clone.textContent);
  }
  function tableText(table) {
    const rows = Array.from(table.querySelectorAll('tr')).map(tr => Array.from(tr.children).map(td => clean(td.textContent)));
    if (!rows.length) return '';
    const hasHead = !!table.querySelector('thead th') || table.querySelector('tr')?.children[0]?.tagName === 'TH';
    const head = hasHead ? rows[0] : null; const body = hasHead ? rows.slice(1) : rows;
    const cap = table.closest('.compare-block')?.querySelector('.compare-title')?.textContent || table.caption?.textContent || '';
    const lines = body.filter(r => r.length).map(r => {
      const [first, ...rest] = r;
      const cells = rest.filter(c => c).map((c, i) => head && head[i + 1] && rest.length > 1 ? `${head[i + 1]}: ${c}` : c);
      return `• *${first}*${cells.length ? ' — ' + cells.join(' · ') : ''}`;
    });
    return (cap ? `*${clean(cap)}*\n` : '') + lines.join('\n');
  }
  /** Melhor texto possível para um elemento: tabela, diagrama ou bloco comum. */
  function textFromElement(el) {
    const table = el.matches('table') ? el : el.querySelector('table');
    if (table && !el.querySelector('.card, .step')) return tableText(table);
    if (el.matches('.diagram') || el.querySelector('svg[aria-label]')) {
      const svg = el.querySelector('svg[aria-label]');
      const cap = el.querySelector('.diagram-cap, figcaption');
      return [cap ? '*' + clean(cap.textContent) + '*' : '', svg ? svg.getAttribute('aria-label') : ''].filter(Boolean).join('\n');
    }
    return nodeText(el);
  }

  /* ── imagem ────────────────────────────────────────────────────── */
  async function renderCanvas(el) {
    const html2canvas = await loadH2C();
    return html2canvas(el, {
      backgroundColor: '#FFFFFF', scale: Math.min(2, (window.devicePixelRatio || 1) * 1.5), useCORS: true, logging: false,
      ignoreElements: (n) => n.classList && (n.classList.contains('share-bar') || n.classList.contains('copy-btn') || n.classList.contains('no-share')),
    });
  }
  const toBlob = (canvas) => new Promise(res => canvas.toBlob(res, 'image/png'));
  function download(blob, filename) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  const slug = (s) => String(s || 'imagem').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'imagem';
  async function copyImage(el, btn, { filename } = {}) {
    if (btn) { btn.dataset.label = btn.dataset.label || btn.innerHTML; btn.innerHTML = 'Gerando…'; btn.disabled = true; }
    try {
      const canvas = await renderCanvas(el);
      const blob = await toBlob(canvas);
      if (navigator.clipboard && window.ClipboardItem && window.isSecureContext) {
        try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]); flash(btn, 'Imagem copiada ✓'); return true; }
        catch { /* alguns navegadores bloqueiam: cai para download */ }
      }
      download(blob, (filename || slug(el.dataset.shareName || el.querySelector('h2,h3,h4,.compare-title,.diagram-cap')?.textContent)) + '.png');
      flash(btn, 'Imagem baixada ✓'); return true;
    } catch (e) {
      flash(btn, 'Não deu para gerar a imagem', false); return false;
    } finally { if (btn) btn.disabled = false; }
  }
  async function downloadImage(el, btn, filename) {
    if (btn) { btn.dataset.label = btn.dataset.label || btn.innerHTML; btn.innerHTML = 'Gerando…'; btn.disabled = true; }
    try { const canvas = await renderCanvas(el); download(await toBlob(canvas), (filename || slug(el.dataset.shareName || el.querySelector('h2,h3,h4,.compare-title,.diagram-cap')?.textContent)) + '.png'); flash(btn, 'PNG baixado ✓'); }
    catch { flash(btn, 'Não deu para gerar a imagem', false); }
    finally { if (btn) btn.disabled = false; }
  }

  /* ── impressão / PDF ───────────────────────────────────────────── */
  let printCss;
  function printElement(el, { title, subtitle } = {}) {
    if (!printCss) {
      printCss = document.createElement('style');
      printCss.textContent = `#print-root{display:none}
        @media print{ body.print-mode > :not(#print-root){display:none !important} body.print-mode{padding:0 !important;background:#fff !important}
          #print-root{display:block !important;max-width:100%;padding:0}
          #print-root .print-head{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;border-bottom:1px solid #D4CEC0;padding-bottom:.5rem;margin-bottom:1rem;font:500 11px/1.4 'DM Sans',system-ui,sans-serif;color:#5A544A}
          #print-root .print-head b{font-family:'Fraunces',Georgia,serif;font-size:15px;color:#1A1715}
          #print-root .share-bar,#print-root .copy-btn,#print-root button{display:none !important}
          #print-root .print-target{animation:none !important;opacity:1 !important;transform:none !important} }`;
      document.head.appendChild(printCss);
    }
    const root = document.createElement('div'); root.id = 'print-root';
    if (title) root.innerHTML = `<div class="print-head"><b>${title}</b><span>${subtitle || ''}</span></div>`;
    const clone = el.cloneNode(true); clone.classList.add('print-target'); root.appendChild(clone);
    document.body.appendChild(root); document.body.classList.add('print-mode');
    const cleanup = () => { document.body.classList.remove('print-mode'); root.remove(); };
    window.addEventListener('afterprint', cleanup, { once: true });
    setTimeout(() => { window.print(); setTimeout(cleanup, 1500); }, 50);
  }

  /* ── barrinha de botões ────────────────────────────────────────── */
  let barCss;
  function ensureBarCss() {
    if (barCss) return; barCss = document.createElement('style');
    barCss.textContent = `.share-bar{display:flex;flex-wrap:wrap;gap:.35rem;justify-content:flex-end;align-items:center;margin:0 0 .45rem}
      .share-bar .share-hint{margin-right:auto;font:500 11px/1 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#8A8275}
      .share-btn{display:inline-flex;align-items:center;gap:.35rem;padding:.38rem .7rem;border-radius:8px;border:1px solid #D4CEC0;background:#fff;color:#5A544A;font:600 12px/1 'DM Sans',system-ui,sans-serif;cursor:pointer;transition:all .15s}
      .share-btn:hover:not(:disabled){border-color:#B8830F;color:#8F650A;background:#FBF4E0}
      .share-btn.done{background:#1F7A4D;border-color:#1F7A4D;color:#fff}
      .share-btn.fail{background:#FCEEE9;border-color:#B83A2C;color:#B83A2C}
      .share-btn:disabled{cursor:default}
      .share-bar-inside{position:absolute;top:6px;right:6px;margin:0;gap:.25rem;z-index:3;opacity:.55;transition:opacity .15s}
      .share-bar-inside .share-btn{padding:.25rem .45rem;font-size:12px;line-height:1;border-radius:6px}
      [data-share-enhanced]:hover > .share-bar-inside,.share-bar-inside:focus-within{opacity:1}
      @media print{.share-bar{display:none !important}}`;
    document.head.appendChild(barCss);
  }
  function makeBar({ text = true, image = true, download: dl = true, print = false, hint = 'Compartilhar', getText, target, title } = {}) {
    ensureBarCss();
    const bar = document.createElement('div'); bar.className = 'share-bar no-share';
    if (hint) bar.innerHTML = `<span class="share-hint">${hint}</span>`;
    if (text) { const b = btn('💬', 'Copiar texto', 'Copiar como texto, pronto para WhatsApp ou e-mail'); b.addEventListener('click', () => copyText(getText ? getText() : textFromElement(target()), b)); bar.appendChild(b); }
    if (image) { const b = btn('🖼️', 'Copiar imagem', 'Copiar como imagem para colar na conversa'); b.addEventListener('click', () => copyImage(target(), b)); bar.appendChild(b); }
    if (dl) { const b = btn('⬇️', 'Baixar PNG', 'Salvar como imagem PNG no seu aparelho'); b.addEventListener('click', () => downloadImage(target(), b)); bar.appendChild(b); }
    if (print) { const b = btn('🖨️', 'PDF', 'Imprimir ou salvar em PDF'); b.addEventListener('click', () => printElement(target(), { title: title || document.title, subtitle: new Date().toLocaleDateString('pt-BR') })); bar.appendChild(b); }
    return bar;
  }
  function btn(icon, label, tip) { const b = document.createElement('button'); b.type = 'button'; b.className = 'share-btn'; b.title = tip; b.innerHTML = `${icon} ${label}`; return b; }
  /** Adiciona a barrinha acima de cada elemento que casa com o seletor. */
  /** Adiciona a barrinha acima de cada elemento que casa com o seletor.
      Regras: um elemento aninhado num bloco que já tem barra não ganha outra;
      um bloco que já contém barras não ganha a sua; e quando o pai é uma
      grade ou flex (a barra viraria uma célula), a barra vai dentro do
      bloco, compacta, no canto superior direito. */
  function enhance(selector, opts = {}) {
    Array.from(document.querySelectorAll(selector)).forEach(el => {
      if (el.dataset.shareEnhanced) return;
      if (el.parentElement && el.parentElement.closest('[data-share-enhanced]')) return;   // ancestral já tem barra
      if (el.querySelector('[data-share-enhanced]')) return;                                 // descendentes já têm barra
      el.dataset.shareEnhanced = '1';
      const bar = makeBar({ ...opts, target: () => el });
      const parentDisplay = el.parentElement ? getComputedStyle(el.parentElement).display : 'block';
      const inline = /grid|flex/.test(parentDisplay) || /^(li|td|th)$/i.test(el.tagName);
      if (inline) {
        bar.classList.add('share-bar-inside');
        bar.querySelector('.share-hint')?.remove();
        bar.querySelectorAll('.share-btn').forEach(b => { b.dataset.full = b.innerHTML; b.innerHTML = b.innerHTML.trim().split(' ')[0]; b.title = (b.dataset.full || '').replace(/^\S+\s*/, '') + ' — ' + b.title; });
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        el.prepend(bar);
      } else {
        el.parentNode.insertBefore(bar, el);
      }
    });
  }

  return { copyText, copyImage, downloadImage, printElement, textFromElement, nodeText, tableText, enhance, makeBar, flash };
})();

window.Share = Share;
