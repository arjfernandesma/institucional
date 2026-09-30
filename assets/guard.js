/* ═══════════════════════════════════════════════════════════════════
   GUARD — protege uma página por perfil e injeta a barra do portal
   ───────────────────────────────────────────────────────────────────
   Uso (no <head>, depois de assets/auth.js):
     <script src="../assets/auth.js"></script>
     <script src="../assets/guard.js" data-role="colaborador"></script>

   data-role  perfil mínimo: "colaborador" (padrão) ou "admin"
   data-bar   "off" para não injetar a barra de navegação

   Sem sessão válida → redireciona para o portal com ?next=<página>.
   ═══════════════════════════════════════════════════════════════════ */
(() => {
  const script = document.currentScript;
  const need = (script.dataset.role || 'colaborador');
  const withBar = script.dataset.bar !== 'off';
  const root = new URL(script.src).href.replace(/assets\/guard\.js.*$/, '');
  const here = location.pathname + location.hash;

  // esconde a página até a checagem terminar (evita "flash" de conteúdo)
  const style = document.createElement('style');
  style.id = 'guard-hide';
  style.textContent = 'html{visibility:hidden}';
  document.head.appendChild(style);

  const toPortal = () => {
    const q = new URLSearchParams({ next: here });
    if (need === 'admin') q.set('need', 'admin');
    location.replace(root + 'index.html?' + q.toString());
  };

  Auth.restore().then(session => {
    if (!session || !Auth.can(need, session)) return toPortal();
    const reveal = () => { style.remove(); if (withBar) injectBar(session); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', reveal); else reveal();
  }).catch(toPortal);

  function injectBar(session) {
    const path = location.pathname;
    const isActive = (seg) => path.includes('/' + seg + '/');
    const links = [
      ['Portal', root + 'index.html', false],
      ['Onboarding', root + 'onboarding/', isActive('onboarding')],
      ['Playbook', root + 'playbook/', isActive('playbook')],
      ['Materiais', root + 'index.html#materiais', isActive('colaborador')],
    ];
    if (Auth.can('admin', session)) links.push(['Admin', root + 'index.html#admin', isActive('admin')]);

    const css = document.createElement('style');
    css.textContent = `
      #mf-bar{position:fixed;top:0;left:0;right:0;height:44px;z-index:5000;display:flex;align-items:center;gap:.25rem;padding:0 .9rem;
        background:#1A1715;color:#F5F2EC;font:500 13px/1 'DM Sans',system-ui,sans-serif;box-shadow:0 1px 0 rgba(255,255,255,.06)}
      #mf-bar .mf-brand{display:flex;align-items:center;gap:.5rem;margin-right:.75rem;color:#fff;text-decoration:none;font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:14px;white-space:nowrap}
      #mf-bar .mf-brand b{width:24px;height:24px;border-radius:5px;background:#F5F2EC;color:#1A1715;display:inline-grid;place-items:center;font-size:13px}
      #mf-bar a.mf-l{color:rgba(245,242,236,.75);text-decoration:none;padding:.45rem .6rem;border-radius:6px;white-space:nowrap}
      #mf-bar a.mf-l:hover{color:#fff;background:rgba(255,255,255,.08)}
      #mf-bar a.mf-l.on{color:#D4A53A;background:rgba(212,165,58,.12)}
      #mf-bar .mf-sp{flex:1}
      #mf-bar .mf-user{color:rgba(245,242,236,.7);white-space:nowrap;margin-right:.25rem}
      #mf-bar .mf-user i{font-style:normal;background:rgba(212,165,58,.18);color:#D4A53A;padding:.15rem .45rem;border-radius:100px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;margin-left:.35rem}
      #mf-bar button{margin-left:.3rem;background:transparent;border:1px solid rgba(255,255,255,.18);color:#F5F2EC;border-radius:6px;padding:.35rem .6rem;font:inherit;cursor:pointer}
      #mf-bar button:hover{background:rgba(255,255,255,.1)}
      #mf-bar .mf-nav{display:flex;gap:.1rem;overflow-x:auto;scrollbar-width:none}
      #mf-bar .mf-nav::-webkit-scrollbar{display:none}
      body{padding-top:44px !important}
      .sidebar{top:44px !important;height:calc(100vh - 44px) !important}
      .menu-toggle{top:calc(44px + .6rem) !important}
      .progress-bar,.progress{top:44px !important}
      .toc{top:calc(50% + 22px) !important}
      @media (max-width:600px){#mf-bar .mf-user span{display:none}#mf-bar .mf-brand span{display:none}}
      @media print{#mf-bar{display:none}body{padding-top:0 !important}}
    `;
    document.head.appendChild(css);

    const bar = document.createElement('nav');
    bar.id = 'mf-bar';
    bar.setAttribute('aria-label', 'Navegação do portal');
    bar.innerHTML = `<a class="mf-brand" href="${root}index.html"><b>M</b><span>Portal da equipe</span></a>
      <div class="mf-nav">${links.map(([t, h, on]) => `<a class="mf-l ${on ? 'on' : ''}" href="${h}">${t}</a>`).join('')}</div>
      <span class="mf-sp"></span>
      <span class="mf-user"><span>${escapeHtml(session.name)}</span><i>${Auth.roleLabel(session.role)}</i></span>
      <button type="button" id="mf-print" title="Imprimir ou salvar esta página em PDF">🖨 Salvar PDF</button><button type="button" id="mf-logout">Sair</button>`;
    document.body.prepend(bar);
    bar.querySelector('#mf-print').addEventListener('click', () => window.print());
    bar.querySelector('#mf-logout').addEventListener('click', async () => { await Auth.logout(); location.href = root + 'index.html'; });
  }

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
})();
