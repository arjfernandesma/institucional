/* ═══════════════════════════════════════════════════════════════════
   PORTAL DA EQUIPE — hub de navegação por perfil
   Colaborador(a): onboarding, cursos, playbook, materiais.
   Admin: tudo isso + área do admin (manual operacional, painel).
   ═══════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let session = null;

  /* ── Conteúdo do portal ─────────────────────────────────────────── */
  const NAV = [
    { id: 'inicio', label: 'Início' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'cursos', label: 'Cursos' },
    { id: 'playbook', label: 'Playbook' },
    { id: 'materiais', label: 'Materiais' },
    { id: 'admin', label: 'Admin', role: 'admin' },
  ];

  const COMERCIAL_CHAPTERS = [
    { g: 'Fundamentos', items: [['01', 'funil', 'A matemática do funil'], ['02', 'territorio', 'Onde atuamos'], ['03', 'icp', 'Para quem vendemos']] },
    { g: 'Topo do funil', items: [['04', 'lista', 'Lista e pontuação (0–100)'], ['05', 'auditoria', 'A auditoria'], ['06', 'email', 'E-mail frio']] },
    { g: 'Conversa', items: [['07', 'diagnostico', 'Reunião de diagnóstico (30 min)'], ['08', 'proposta', 'Proposta ao vivo'], ['09', 'objecoes', 'Objeções'], ['10', 'fechamento', 'Fechamento e passagem']] },
    { g: 'Controle', items: [['11', 'metricas', 'Métricas e diagnóstico']] },
  ];

  const PLAYBOOK_CHAPTERS = [
    { g: 'Fundação', items: [['01', 'dominio', 'Domínio & Identidade'], ['02', 'posicionamento', 'Posicionamento & Preços']] },
    { g: 'Prospecção', items: [['03', 'icp', 'Quem Prospectar'], ['04', 'lista', 'Construção da Lista'], ['05', 'auditoria', 'A Auditoria Gratuita']] },
    { g: 'Abordagem', items: [['06', 'email', 'Cold Email · PT+EN'], ['07', 'whatsapp', 'WhatsApp & Telefone'], ['08', 'linkedin', 'LinkedIn']] },
    { g: 'Conversão', items: [['09', 'discovery', 'Reunião de Diagnóstico (30 min)'], ['10', 'proposta', 'A Proposta'], ['11', 'objecoes', 'Manual de Objeções'], ['12', 'onboarding', 'Fechamento & Onboarding'], ['13', 'closeout', 'Ritual de Encerramento']] },
    { g: 'Infraestrutura & Controle', items: [['14', 'compliance', 'Compliance'], ['15', 'infra', 'Infraestrutura de Email'], ['16', 'metricas', 'Métricas'], ['17', 'plano30', 'Primeiros 30 Dias']] },
  ];

  const WORKFLOW_CHAPTERS = [
    { g: 'Princípio', items: [['01', 'verificacao', 'Confiança = verificação'], ['02', 'matriz', 'A matriz de decisão'], ['03', 'modos', 'Os três modos'], ['04', 'ciclo', 'O ciclo, passo a passo']] },
    { g: 'As três frentes', items: [['05', 'sites', 'Sites locais'], ['06', 'projetos', 'Projetos maiores'], ['07', 'saas', 'SaaS próprios']] },
    { g: 'Infraestrutura', items: [['08', 'harness', 'O harness'], ['09', 'contexto', 'Gestão de contexto'], ['10', 'web', 'Claude Code na web']] },
    { g: 'Operação', items: [['11', 'antipadroes', 'Anti-padrões'], ['12', 'rotina', 'Rotina semanal']] },
  ];

  const MANUAL_CHAPTERS = [
    { g: 'Estratégia', items: [['01', 'visao', 'Visão Geral'], ['02', 'modelo', 'Modelo de Negócio'], ['03', 'roadmap', 'Roadmap de Expansão']] },
    { g: 'Produto', items: [['04', 'catalogo', 'Catálogo de Serviços'], ['05', 'pacotes', 'Pacotes & Preços'], ['06', 'addons', 'Add-ons Recorrentes']] },
    { g: 'Operação', items: [['07', 'comercial', 'Processo Comercial'], ['08', 'contratos', 'Contratos'], ['09', 'pagamento', 'Formas de Pagamento'], ['10', 'entrega', 'Entrega & Cronograma'], ['11', 'sla', 'Manutenção & SLA'], ['12', 'suporte', 'Suporte ao Cliente'], ['13', 'cancelamento', 'Cancelamento & Reembolso']] },
    { g: 'Referência', items: [['14', 'faq', 'FAQ Operacional'], ['15', 'objecoes', 'Manual de Objeções'], ['16', 'scripts', 'Scripts de Atendimento']] },
  ];

  // Trilhas rápidas: recortes da Academia para revisar um tema
  const TRACKS = [
    { icon: '🛡️', title: 'Objeções em 20 minutos', desc: 'O método PACER e o simulador com as oito objeções reais.', module: 'objecoes' },
    { icon: '🇬🇧', title: 'Inglês para vender', desc: 'As frases que você usa todo dia, PT → EN, em flashcards.', module: 'dois-mercados', lesson: 'ingles' },
    { icon: '🇮🇪', title: 'Mercado Irlanda e o voucher', desc: 'Trading Online Voucher, preços em euro e cultura de venda.', module: 'dois-mercados', lesson: 'europa' },
    { icon: '🇧🇷', title: 'Mercado Brasil', desc: 'Pacotes em real, PIX, contrato, prazos e o esboço pronto.', module: 'dois-mercados', lesson: 'brasil' },
    { icon: '✉️', title: 'Cold email do zero', desc: 'Três e-mails e para: cadência, sequências A/B/C e scripts.', module: 'abordagem', lesson: 'cold-email' },
    { icon: '🗣️', title: 'A discovery call', desc: 'Quinze minutos, cinco perguntas e como dizer o preço.', module: 'conversa' },
    { icon: '🎯', title: 'Qualificar um prospect', desc: 'ICP, lista e a calculadora de score.', module: 'cliente-certo' },
    { icon: '🏁', title: 'Regras e compliance', desc: 'O que nunca se faz, GDPR/LGPD e os números do funil.', module: 'regras-do-jogo' },
  ];

  const ADMIN_CHECKLIST = [
    'Passar a senha da área do colaborador (nunca a do admin)',
    'Pedir a leitura do Playbook Comercial antes do Playbook Dublin',
    'Criar assinatura de e-mail com telefone e site da consultoria',
    'Gerar link de agendamento de 15 min (Cal.com) para as mensagens',
    'Dar acesso à planilha de prospects com as colunas obrigatórias',
    'Definir o primeiro vertical e a primeira área (um de cada)',
    'Agendar uma discovery call para a pessoa acompanhar',
    'Revisar os três achados dos 10 primeiros prospects antes do envio',
    'Confirmar que o domínio de envio está aquecido (nunca marcusfernandes.ie)',
    'Revisar métricas juntos no fim da semana 4',
  ];

  const PENDENCIAS = [
    ['Manutenção × site público', 'Resolvido a favor do Playbook Comercial: manutenção de €60–150/mês desde a publicação, dita junto com o preço. O site marcusfernandes.ie ainda diz "primeiro ano incluído no pacote". Alinhar o site (ou decidir manter a diferença como oferta pública).'],
    ['Reunião de diagnóstico', 'Resolvido: 30 minutos, gravada, sem preço; substitui a discovery call de 15 minutos em todo o material. O link de agendamento (Cal.com) precisa passar a 30 min.'],
    ['Score 0–100', 'Resolvido: cinco fatores de 20 pontos, aborda-se acima de 60; substitui o score 0–5. A planilha de prospects precisa das colunas Web, Sinal, Reputação, Contato e Atividade.'],
    ['Pagamento', 'Resolvido: tabela única (50/50 padrão, à vista −5%, três parcelas +5%). Confirmar se o desconto à vista deve aparecer no folheto público (hoje aparece).'],
    ['Preços públicos', 'O site mostra as duas frentes sem valores; o Playbook Comercial confirma ticket €1.200–5.000 e manutenção €60–150/mês. Decidir se os valores vão ao site.'],
    ['Voucher', 'O Trading Online Voucher é pilar dos dois playbooks, mas não aparece no site. Se continua válido, vale publicar.'],
    ['Tabela em real', 'O Playbook Comercial cobre só Europa. Os valores em real seguem do Manual de abril/2026: confirmar antes da primeira proposta em real.'],
  ];

  /* ── Progresso da Academia (localStorage) ───────────────────────── */
  const PROG_PREFIX = 'mf_academy_progress_';
  const totalLessons = () => (window.COURSE ? COURSE.modules.reduce((a, m) => a + m.lessons.length, 0) : 0);
  function readProgress(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } }
  function myProgress() { return readProgress(PROG_PREFIX + (session.userId || session.name.toLowerCase().trim())); }
  function pctOf(p) { const t = totalLessons(); return t && p ? Math.round((Object.keys(p.done || {}).length / t) * 100) : 0; }
  function moduleState(p, moduleId, lessonId) {
    if (!window.COURSE || !p) return 'todo';
    const mods = COURSE.modules; const mi = mods.findIndex(m => m.id === moduleId); const m = mods[mi];
    const lessons = lessonId ? m.lessons.filter(l => l.id === lessonId) : m.lessons;
    if (lessons.every(l => p.done?.[l.id])) return 'done';
    if (m.lessons.some(l => p.done?.[l.id])) return 'progress';
    const prevDone = mi === 0 || mods[mi - 1].lessons.every(l => p.done?.[l.id]);
    return prevDone ? 'todo' : 'locked';
  }
  function allProgress() {
    const out = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith(PROG_PREFIX)) { const p = readProgress(k); if (p) out.push({ name: k.slice(PROG_PREFIX.length), p }); }
      }
    } catch { /* ignore */ }
    return out.sort((a, b) => (b.p.startedAt || 0) - (a.p.startedAt || 0));
  }

  /* ── Render ─────────────────────────────────────────────────────── */
  const isAdmin = () => Auth.can('admin', session);

  function renderNav() {
    const items = NAV.filter(n => !n.role || Auth.can(n.role, session));
    $('#portal-nav').innerHTML = items.map(n => `<a class="nav-link" href="#${n.id}" data-sec="${n.id}">${n.label}</a>`).join('');
    $('#mobile-nav').innerHTML = items.map(n => `<a class="nav-link" href="#${n.id}">${n.label}</a>`).join('') +
      `<a class="nav-link" href="onboarding/">🎓 Abrir a Academia</a><a class="nav-link" href="playbook/">📘 Abrir o Playbook</a><button class="nav-link" id="print-view-m">🖨 Salvar esta página em PDF</button><button class="nav-link" id="logout-m">🚪 Sair</button>`;
    $('#logout-m').addEventListener('click', doLogout);
    $('#print-view-m').addEventListener('click', () => { $('#mobile-nav').hidden = true; setTimeout(() => window.print(), 50); });
    $$('#mobile-nav a').forEach(a => a.addEventListener('click', () => { $('#mobile-nav').hidden = true; }));
  }

  function renderPortal() {
    const p = myProgress();
    const pct = pctOf(p);
    const examPassed = !!p?.exam?.passed;
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
    const admin = isAdmin();

    const heroCard = examPassed
      ? `<div class="eyebrow">Onboarding concluído ✓</div><h3>Você está pronta(o) para vender.</h3><p>Use o Playbook e a Cola rápida no dia a dia, e volte à Academia para revisar um tema quando precisar.</p><a class="btn btn-gold" href="playbook/">Abrir o Playbook →</a>`
      : pct === 0
        ? `<div class="eyebrow">Comece por aqui</div><h3>Seu onboarding ainda não começou.</h3><p>Dez módulos curtos, no seu ritmo. É o caminho mais rápido para entender o que vendemos e como.</p><a class="btn btn-gold" href="onboarding/">Começar o onboarding →</a>`
        : `<div class="eyebrow">Continue de onde parou</div><h3>Onboarding ${pct}% concluído.</h3><div class="bar"><span style="width:${pct}%"></span></div><p>${Object.keys(p.done || {}).length} de ${totalLessons()} lições. ${pct === 100 ? 'Falta só a prova final.' : 'Cada lição leva de 5 a 8 minutos. Seu progresso fica salvo neste navegador.'}</p><a class="btn btn-gold" href="onboarding/">Continuar →</a>`;

    const steps = [
      { href: 'onboarding/', title: 'Faça o onboarding', desc: 'Curso interativo com quizzes e simulações. Termina com prova e certificado.', meta: '10 módulos · ~3h', done: examPassed },
      { href: 'playbook/comercial.html', title: 'Leia os Playbooks', desc: 'Primeiro o Playbook Comercial (o processo, 11 capítulos). Depois o Playbook Dublin, para os scripts em PT e EN.', meta: '2 documentos · referência', done: false },
      { href: 'onboarding/#cheatsheet', title: 'Deixe a Cola rápida à mão', desc: 'Preços, cadência, regras e números do funil numa página só. Abra antes de toda conversa.', meta: '1 página · uso diário', done: false },
    ];

    const trackTiles = TRACKS.map(t => {
      const st = moduleState(p, t.module, t.lesson);
      const href = `onboarding/#m/${t.module}${t.lesson ? '/' + t.lesson : ''}`;
      const label = { done: 'Concluído', progress: 'Em andamento', todo: 'Disponível', locked: 'Desbloqueia no onboarding' }[st];
      return `<a class="tile" href="${href}"><div class="t-icon">${t.icon}</div><h4>${t.title}</h4><p>${t.desc}</p><div class="t-foot"><span><i class="status-dot ${st}"></i>${label}</span><span>Academia →</span></div></a>`;
    }).join('');

    const chapters = (list, base) => list.map(g => `<div class="chapter-group"><div class="g">${g.g}</div><div class="chapter-list">${g.items.map(([n, id, t]) => `<a href="${base}#${id}"><span class="n">${n}</span>${t}</a>`).join('')}</div></div>`).join('');

    $('#view').innerHTML = `
      <div class="container">
        <section class="p-hero" id="inicio">
          <div>
            <div class="eyebrow">Portal da equipe · Marcus Fernandes</div>
            <h1 class="h1">${greet}, <em>${esc(session.name)}</em>.</h1>
            <p class="lead">${admin
              ? 'Você está na visão de admin: tudo o que a equipe de vendas vê, mais o manual operacional, o painel e as pendências.'
              : 'Tudo o que você precisa para vender nossos sites e automações no Brasil e na Europa está aqui: aprenda na Academia, consulte o Playbook, use os materiais.'}</p>
            <div class="hero-actions">
              <a class="btn btn-primary btn-lg" href="onboarding/">🎓 Academia de Vendas</a>
              <a class="btn btn-outline btn-lg" href="playbook/">📘 Playbook</a>
              ${admin ? '<a class="btn btn-outline btn-lg" href="#admin">⚙️ Área do admin</a>' : ''}
            </div>
          </div>
          <div class="p-hero-card">${heroCard}</div>
        </section>

        <section class="p-section" id="onboarding">
          <div class="p-section-head"><div><div class="eyebrow">Para quem está chegando</div><h2>Comece por aqui</h2><p>Três passos, nesta ordem. Quem segue a ordem vende antes.</p></div></div>
          <div class="start-steps">
            ${steps.map(s => `<a class="start-step ${s.done ? 'done' : ''}" href="${s.href}"><h4>${s.title}</h4><p>${s.desc}</p><div class="st-meta">${s.meta}</div></a>`).join('')}
          </div>
        </section>

        <section class="p-section" id="cursos">
          <div class="p-section-head"><div><div class="eyebrow">Aprender</div><h2>Cursos e trilhas</h2><p>A Academia é o curso completo de onboarding. As trilhas rápidas são recortes dela para revisar um tema específico em poucos minutos.</p></div></div>
          <div class="tile-grid">
            <a class="tile featured" href="onboarding/">
              <div class="t-icon">🎓</div>
              <div class="t-body"><h3>Academia de Vendas · Onboarding</h3><p>10 módulos, 33 lições, 27 quizzes e 11 simulações de objeção. Brasil e Europa, com scripts em PT e EN. Prova final e certificado.</p>
                <div class="t-bar"><span style="width:${pct}%"></span></div>
                <div class="t-foot"><span>${pct}% concluído${p?.exam ? ` · prova: ${p.exam.score}%` : ''}</span><span>~3 horas no total</span></div></div>
              <span class="btn btn-primary">${pct === 0 ? 'Começar' : examPassed ? 'Revisar' : 'Continuar'} →</span>
            </a>
            <a class="tile" href="onboarding/#videos"><div class="t-icon">🎬</div><h4>Vídeos explicativos</h4><p>Onze vídeos curtos com narração e legendas: o que vendemos, voucher, score, auditoria, cold email, discovery call, PACER, funil.</p><div class="t-foot"><span>1–2 min cada</span><span>Academia →</span></div></a>
            ${trackTiles}
          </div>
        </section>

        <section class="p-section" id="playbook">
          <div class="p-section-head"><div><div class="eyebrow">Consultar</div><h2>Playbooks</h2><p>Dois documentos que se complementam. O <strong>Playbook Comercial</strong> é o processo: funil, score, reunião de diagnóstico, proposta ao vivo, objeções e métricas. Em divergência, vale ele. O <strong>Playbook Dublin</strong> traz os scripts em português e inglês, as sequências B e C, WhatsApp, LinkedIn e a infraestrutura de e-mail.</p></div></div>
          <div class="tile-grid" style="margin-bottom:1rem">
            <a class="tile" href="playbook/comercial.html"><div class="t-icon">★</div><h4>Playbook Comercial</h4><p>Do primeiro contato ao contrato assinado. Serve para que qualquer pessoa da equipe conduza a mesma venda, do mesmo jeito. v1.0 · setembro de 2026.</p><div class="t-foot"><span>11 capítulos · processo</span><span>Manda em caso de divergência</span></div></a>
            <a class="tile" href="playbook/"><div class="t-icon">📘</div><h4>Playbook Dublin · scripts PT/EN</h4><p>Todas as mensagens ao cliente prontas para copiar e colar, nos dois idiomas, mais WhatsApp, LinkedIn, compliance e infraestrutura de e-mail.</p><div class="t-foot"><span>17 capítulos · referência</span></div></a>
          </div>
          <details class="chapters" open><summary>Playbook Comercial: ir direto a um capítulo</summary>${chapters(COMERCIAL_CHAPTERS, 'playbook/comercial.html')}</details>
          <details class="chapters"><summary>Playbook Dublin: ir direto a um capítulo</summary>${chapters(PLAYBOOK_CHAPTERS, 'playbook/')}</details>
        </section>

        <section class="p-section" id="materiais">
          <div class="p-section-head"><div><div class="eyebrow">Usar</div><h2>Materiais de apoio</h2><p>Para ter aberto durante a prospecção e as conversas.</p></div></div>
          <div class="tile-grid">
            <a class="tile" href="onboarding/#cheatsheet"><div class="t-icon">⚡</div><h4>Cola rápida</h4><p>Preços Brasil × Europa, cadência de e-mail, regras inegociáveis, números do funil e contatos. Uma página.</p><div class="t-foot"><span>Uso diário</span></div></a>
            <a class="tile" href="onboarding/#folheto"><div class="t-icon">📄</div><h4>Folheto para o cliente</h4><p>Uma página para imprimir ou enviar: o que fazemos, o que está incluído, como funciona e como falar com a gente. Brasil ou Irlanda, PT ou EN.</p><div class="t-foot"><span>PDF · imagem · texto</span></div></a>
            <a class="tile" href="onboarding/#glossary"><div class="t-icon">📖</div><h4>Glossário para iniciantes</h4><p>Todo termo técnico explicado em uma frase, com o que dizer ao cliente no lugar do jargão.</p><div class="t-foot"><span>45 termos</span></div></a>
            <a class="tile" href="colaborador/objecoes.html"><div class="t-icon">🧠</div><h4>Infográfico: 7 objeções</h4><p>Guia visual das objeções mais comuns, o que está por trás de cada uma e a técnica para responder.</p><div class="t-foot"><span>Vendas & PNL</span></div></a>
            <a class="tile" href="playbook/#email"><div class="t-icon">✉️</div><h4>Scripts de e-mail PT/EN</h4><p>Sequências A, B e C prontas para copiar, com tratamento de respostas.</p><div class="t-foot"><span>Playbook · cap. 06</span></div></a>
            <a class="tile" href="playbook/#objecoes"><div class="t-icon">🛡️</div><h4>Manual de objeções PT/EN</h4><p>As seis objeções do mercado irlandês com a resposta pronta nos dois idiomas.</p><div class="t-foot"><span>Playbook · cap. 11</span></div></a>
            <a class="tile ext" href="https://marcusfernandes.ie" target="_blank" rel="noopener"><div class="t-icon">🌐</div><h4>Site público</h4><p>marcusfernandes.ie: o que o cliente vê. Auditoria gratuita, portfólio, FAQ. Conheça antes de vender.</p><div class="t-foot"><span>Abre em nova aba</span></div></a>
          </div>
        </section>

        ${admin ? renderAdmin() : ''}

        <footer class="p-footer">
          <span>Portal da equipe · Marcus Fernandes · marcusfernandes.ie · Dublin 15</span>
          <span>marcusffernandes@hotmail.com · +353 83 201 1655</span>
        </footer>
      </div>`;

    if (admin) wireAdmin();
  }

  function renderAdmin() {
    const team = allProgress();
    const chaptersOf = (list, base) => list.map(g => `<div class="chapter-group"><div class="g">${g.g}</div><div class="chapter-list">${g.items.map(([n, id, t]) => `<a href="${base}#${id}"><span class="n">${n}</span>${t}</a>`).join('')}</div></div>`).join('');
    const chapters = chaptersOf(MANUAL_CHAPTERS, 'admin/manual-operacional.html');
    const wfChapters = chaptersOf(WORKFLOW_CHAPTERS, 'admin/workflow-engenharia.html');
    let checks = {}; try { checks = JSON.parse(localStorage.getItem('mf_admin_checklist') || '{}'); } catch { /* ignore */ }

    return `
      <section class="p-section" id="admin">
        <div class="p-section-head"><div><div class="eyebrow">Somente admin</div><h2>Área do admin</h2><p>O que a equipe de vendas não vê: o ciclo de desenvolvimento, modelo de negócio, contratos, pagamentos, SLA, cancelamento, e o painel para receber e acompanhar colaboradores.</p></div><span class="role-pill admin">Admin</span></div>

        <div class="tile-grid" style="margin-bottom:1.25rem">
          <a class="tile admin-tile featured" href="admin/workflow-engenharia.html">
            <div class="t-icon">⚙️</div>
            <div class="t-body"><h3>Workflow de Engenharia</h3><p>O método de trabalho que norteia o ciclo de desenvolvimento com Claude Code nas três frentes (sites locais, projetos maiores, SaaS próprios): onde delegar, onde verificar, o harness, gestão de contexto, anti-padrões e a rotina semanal. Par técnico do Playbook Comercial.</p>
              <div class="t-foot"><span>12 capítulos · v1.0 · set/2026</span><span>Revisado na última sexta de cada mês</span></div></div>
            <span class="btn btn-primary">Abrir →</span>
          </a>
          <a class="tile admin-tile" href="admin/manual-operacional.html"><div class="t-icon">📕</div><h4>Manual Operacional (Brasil)</h4><p>Modelo de negócio, estrutura fiscal, catálogo, pacotes, contratos, pagamento, entrega, SLA, suporte, cancelamento e FAQ.</p><div class="t-foot"><span>16 capítulos · abr/2026</span></div></a>
          <a class="tile admin-tile" href="playbook/#infra"><div class="t-icon">📮</div><h4>Infraestrutura de e-mail</h4><p>Domínio de envio, SPF/DKIM/DMARC, rampa de aquecimento e teto de 40 por dia. Responsabilidade do admin.</p><div class="t-foot"><span>Playbook · cap. 15</span></div></a>
          <a class="tile admin-tile" href="playbook/#compliance"><div class="t-icon">⚖️</div><h4>Compliance e LIA</h4><p>Regime B2B irlandês, GDPR para autônomos, a Legitimate Interests Assessment e a lista de supressão.</p><div class="t-foot"><span>Playbook · cap. 14</span></div></a>
          <a class="tile admin-tile" href="playbook/#metricas"><div class="t-icon">📊</div><h4>Métricas do funil</h4><p>Números saudáveis e de alerta por estágio, e como ler cada sintoma.</p><div class="t-foot"><span>Playbook · cap. 16</span></div></a>
        </div>

        <details class="chapters" open><summary>Workflow de Engenharia: ir direto a um capítulo</summary>${wfChapters}</details>
        <details class="chapters"><summary>Capítulos do Manual Operacional</summary>${chapters}</details>

        <div class="two-col" style="margin-top:1.25rem">
          <div class="admin-band">
            <h3 style="font-family:var(--ff-display);font-weight:600;font-size:1.2rem;margin-bottom:.25rem">Receber um novo colaborador</h3>
            <p style="font-size:.9rem;color:var(--text-2);margin-bottom:.9rem">Checklist do admin. Fica salvo neste navegador.</p>
            <div class="checklist" id="admin-check">${ADMIN_CHECKLIST.map((it, k) => `<button class="check ${checks[k] ? 'on' : ''}" type="button" data-k="${k}"><span class="cb">✓</span><span>${it}</span></button>`).join('')}</div>
          </div>
          <div class="admin-band">
            <h3 style="font-family:var(--ff-display);font-weight:600;font-size:1.2rem;margin-bottom:.25rem">Progresso da equipe</h3>
            <p style="font-size:.9rem;color:var(--text-2);margin-bottom:.9rem">Lê o progresso salvo <strong>neste navegador</strong>. Para ver o progresso de cada pessoa em qualquer aparelho, ative o Clerk (ver "Como administrar").</p>
            ${team.length ? `<div class="tbl-wrap"><table class="team-table"><thead><tr><th>Nome</th><th>Lições</th><th>Prova</th><th>Início</th></tr></thead><tbody>${team.map(t => `<tr><td>${esc(t.name)}</td><td>${Object.keys(t.p.done || {}).length}/${totalLessons()} (${pctOf(t.p)}%)</td><td>${t.p.exam ? `${t.p.exam.score}% ${t.p.exam.passed ? '✓' : ''}` : '—'}</td><td>${t.p.startedAt ? new Date(t.p.startedAt).toLocaleDateString('pt-BR') : '—'}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty" style="padding:1.5rem 0">Nenhum progresso salvo neste navegador ainda.</div>'}
          </div>
        </div>

        <div class="two-col" style="margin-top:1rem">
          <div class="admin-band">
            <h3 style="font-family:var(--ff-display);font-weight:600;font-size:1.2rem;margin-bottom:.25rem">Pendências: site × playbook</h3>
            <p style="font-size:.9rem;color:var(--text-2);margin-bottom:.9rem">Divergências encontradas entre marcusfernandes.ie e os manuais. Decida e alinhe os dois.</p>
            <div class="tbl-wrap"><table><tbody>${PENDENCIAS.map(([t, d]) => `<tr><td style="white-space:nowrap">${t}</td><td>${d}</td></tr>`).join('')}</tbody></table></div>
          </div>
          <div class="admin-band">
            <h3 style="font-family:var(--ff-display);font-weight:600;font-size:1.2rem;margin-bottom:.25rem">Como administrar</h3>
            <dl class="kv" style="margin-top:.8rem">
              <dt>Senhas</dt><dd>Em <code>assets/auth.js</code>, um hash SHA-256 por perfil (<code>roles.colaborador</code> e <code>roles.admin</code>). Gere com <code>printf '%s' 'Senha' | sha256sum</code>. Trocar a senha derruba as sessões daquele perfil.</dd>
              <dt>Login individual</dt><dd>Trocar <code>provider</code> para <code>'clerk'</code> e colar a publishable key. O perfil vem de <code>publicMetadata.role</code>.</dd>
              <dt>Conteúdo do curso</dt><dd>Tudo em <code>onboarding/content.js</code>: módulos, lições, quizzes, simulações, prova, cola rápida e glossário.</dd>
              <dt>Playbooks</dt><dd><code>playbook/comercial.html</code> (processo; manda em divergência) e <code>playbook/index.html</code> (Dublin, scripts PT/EN). Área do colaborador.</dd>
              <dt>Ciclo de desenvolvimento</dt><dd><code>admin/workflow-engenharia.html</code>. Só admin. Ao mudar o método, revisar o Playbook Comercial (par comercial).</dd>
              <dt>Manual BR</dt><dd><code>admin/manual-operacional.html</code>. Só admin.</dd>
              <dt>Este portal</dt><dd><code>index.html</code> + <code>assets/portal.js</code> (menus, trilhas, checklist, pendências).</dd>
              <dt>Proteção</dt><dd>Cada página inclui <code>assets/guard.js</code> com <code>data-role</code>. Sem sessão, volta para o portal.</dd>
            </dl>
          </div>
        </div>
      </section>`;
  }

  function wireAdmin() {
    const box = $('#admin-check'); if (!box) return;
    $$('.check', box).forEach(c => c.addEventListener('click', () => {
      c.classList.toggle('on');
      const st = {}; $$('.check', box).forEach(x => { st[x.dataset.k] = x.classList.contains('on'); });
      try { localStorage.setItem('mf_admin_checklist', JSON.stringify(st)); } catch { /* ignore */ }
    }));
  }

  /* ── Navegação ativa por seção ──────────────────────────────────── */
  function watchSections() {
    const links = $$('#portal-nav .nav-link');
    const secs = links.map(l => $('#' + l.dataset.sec)).filter(Boolean);
    const update = () => {
      const y = window.scrollY + 120; let cur = secs[0]?.id;
      secs.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
      links.forEach(l => l.classList.toggle('active', l.dataset.sec === cur));
    };
    window.addEventListener('scroll', update, { passive: true }); update();
  }

  /* ── Sessão ─────────────────────────────────────────────────────── */
  function enter(s) {
    session = s;
    const params = new URLSearchParams(location.search);
    const next = params.get('next');
    let denied = null;
    if (next && next.startsWith('/') && !next.startsWith('//')) {
      const needAdmin = params.get('need') === 'admin';
      if (!needAdmin || isAdmin()) { location.replace(next); return; }
      denied = next;
    }
    if (params.toString()) history.replaceState(null, '', location.pathname + location.hash);
    $('#gate').hidden = true; $('#app').hidden = false;
    $('#user-name').textContent = s.name;
    $('#user-avatar').textContent = s.name.trim().charAt(0).toUpperCase() || '?';
    const rp = $('#user-role'); rp.textContent = Auth.roleLabel(s.role); rp.className = 'role-pill ' + s.role;
    renderNav(); renderPortal(); watchSections();
    if (denied) {
      const b = document.createElement('div');
      b.className = 'container'; b.style.paddingBottom = '0';
      b.innerHTML = `<div class="callout callout-warn" id="denied" style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap"><div style="flex:1"><div class="co-title">Página só para admin</div><div class="co-body">A página <code>${esc(denied)}</code> faz parte da área do admin. Você está como ${Auth.roleLabel(s.role)}. Se você é o admin, troque de conta com a senha de admin.</div></div><button class="btn btn-outline" id="switch-account">Trocar de conta</button></div>`;
      $('#view').prepend(b);
      $('#switch-account').addEventListener('click', async () => { await Auth.logout(); location.href = location.pathname + '?next=' + encodeURIComponent(denied) + '&need=admin'; });
    }
    if (location.hash) { const el = $(location.hash); if (el) el.scrollIntoView(); }
  }
  async function doLogout() { await Auth.logout(); session = null; location.hash = ''; showGate(); }
  function showGate() {
    $('#app').hidden = true; $('#gate').hidden = false;
    const params = new URLSearchParams(location.search);
    const note = $('#gate-note');
    if (params.get('need') === 'admin') { note.textContent = 'A página que você tentou abrir é da área do admin. Entre com a senha de admin.'; note.hidden = false; }
    else if (params.get('next')) { note.textContent = 'Entre para continuar até a página que você abriu.'; note.hidden = false; }
    if (Auth.mode === 'clerk') {
      $('#gate-form').hidden = true; $('#clerk-mount').hidden = false;
      Auth.mountClerk($('#clerk-mount'), enter).catch(e => { $('#gate-error').textContent = e.message; $('#gate-error').hidden = false; });
    } else setTimeout(() => $('#gate-name')?.focus(), 100);
  }

  async function init() {
    $('#menu-btn').addEventListener('click', () => { const mn = $('#mobile-nav'); mn.hidden = !mn.hidden; });
    $('#logout').addEventListener('click', doLogout);
    $('#print-view').addEventListener('click', () => window.print());
    $('#pass-toggle').addEventListener('click', () => { const i = $('#gate-pass'); i.type = i.type === 'password' ? 'text' : 'password'; });
    $('#gate-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('#gate-name').value.trim(), password = $('#gate-pass').value;
      const btn = $('#gate-submit'); btn.disabled = true; btn.textContent = 'Verificando…'; $('#gate-error').hidden = true;
      try {
        const s = await Auth.login({ name, password });
        if (!s) {
          $('#gate-error').textContent = 'Senha incorreta. Confira com o administrador qual é a senha da sua área.'; $('#gate-error').hidden = false;
          const card = $('.gate-card'); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
          $('#gate-pass').value = ''; $('#gate-pass').focus();
        } else enter(s);
      } catch (err) { $('#gate-error').textContent = err.message; $('#gate-error').hidden = false; }
      finally { btn.disabled = false; btn.textContent = 'Entrar →'; }
    });
    window.addEventListener('hashchange', () => { if (session && !$('#app').hidden) { const el = $(location.hash || '#inicio'); if (el) el.scrollIntoView({ behavior: 'smooth' }); } });
    try { const s = await Auth.restore(); if (s) enter(s); else showGate(); } catch { showGate(); }
  }
  document.addEventListener('DOMContentLoaded', init);
})();
