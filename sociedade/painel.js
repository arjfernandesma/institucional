/* ═══════════════════════════════════════════════════════════════════
   PAINEL DA SOCIEDADE — definições do dia a dia da parceria
   ───────────────────────────────────────────────────────────────────
   Fonte das regras: sociedade/manual.html (Manual de Operação v1.1).
   O que fica aqui é o que o manual deixa em aberto para os sócios
   definirem: horários dos rituais, padrão atual de cada função, os
   marcos e pontos do produto, o fundo, as decisões registradas, os
   links das ferramentas, os indicadores e o aceite de cada um.

   ARMAZENAMENTO
   Site estático, sem servidor: as definições ficam no navegador de
   quem edita (localStorage, chave mf_sociedade_v1). Para o outro sócio
   ver o mesmo estado, use "Sincronizar": gera um link com todas as
   definições (ou um arquivo .json) que o outro abre e aplica.
   ═══════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const KEY = 'mf_sociedade_v1';
  const MANUAL_VERSION = '1.1';
  const DOW = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const DOW_ICS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const TZS = [
    ['Europe/Dublin', 'Dublin (Irlanda)'], ['Europe/London', 'Londres'], ['Europe/Lisbon', 'Lisboa'],
    ['Europe/Madrid', 'Madri'], ['Europe/Berlin', 'Berlim'], ['Europe/Paris', 'Paris'], ['Europe/Rome', 'Roma'],
    ['America/Sao_Paulo', 'Brasília / São Paulo'], ['America/Fortaleza', 'Fortaleza'], ['America/Manaus', 'Manaus'],
  ];
  const P = { marcus: 'Marcus', michael: 'Michael' };
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const eur = (n) => '€' + (Math.round(n * 100) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const num = (v) => { const n = parseFloat(String(v ?? '').replace(',', '.')); return Number.isFinite(n) ? n : 0; };

  /* ── Estado padrão (semeado pelo manual) ───────────────────────── */
  const DEFAULTS = () => ({
    v: 1,
    partners: {
      marcus: { name: 'Marcus', tz: 'Europe/Dublin', email: '', phone: '' },
      michael: { name: 'Michael', tz: 'Europe/Dublin', email: '', phone: '' },
    },
    ack: { marcus: null, michael: null },
    rituals: {
      checkin: { dow: 1, time: '12:00', tz: 'Europe/Dublin', channel: 'Grupo do WhatsApp' },
      weekly: { dow: 2, time: '18:30', tz: 'Europe/Dublin', dur: 45, lead: 'alternado', firstLead: 'marcus', link: '' },
      monthly: { time: '18:00', tz: 'Europe/Dublin', dur: 60, link: '' },
      cycle: { dow: 4, time: '18:00', tz: 'Europe/Dublin', anchor: nextDowISO(4), demoDur: 20, planDur: 30, link: '' },
    },
    roles: [
      ['Prospecção', 'Gerar lista, auditar prospects, disparar sequências, agendar reuniões', 'Marcus, com automação'],
      ['Originação', 'Trazer cliente da rede pessoal, apresentar a parceria', 'Michael'],
      ['Diagnóstico e venda', 'Conduzir reunião, montar proposta, fechar', 'Marcus, com Michael quando ele originou'],
      ['Gestão de conta', 'Escopo, reuniões, cobrança, encerramento', 'Quem originou; revisar a cada projeto'],
      ['Entrega', 'Desenvolvimento, design, publicação, ajustes', 'Marcus em projetos pequenos; os dois nos grandes'],
      ['Arquitetura', 'Modelagem, decisões estruturais, revisão de código', 'Michael nos projetos grandes e nos produtos'],
      ['Operação', 'Hospedagem, backups, manutenção, suporte', 'Quem entregou, salvo acordo diverso'],
    ].map(([fn, what, who]) => ({ fn, what, who, note: '' })),
    product: {
      name: 'Sistema de gestão de condomínios', phase: 'construcao', originator: 'michael', operator: 'marcus',
      milestones: [
        ['Autenticação e gestão de usuários', 10], ['Cadastro de condomínios e unidades', 15], ['Cobrança e emissão de boletos', 25],
        ['Comunicados e mural', 10], ['Reserva de áreas comuns', 15], ['Relatórios e prestação de contas', 15], ['Portal do morador', 10],
      ].map(([t, pts]) => ({ t, pts, owner: '', status: 'planejado', approved: false })),
    },
    calc: { clients: 10, fee: 80, infra: 80, salesMarcus: 4, salesMichael: 6, usePoints: false, ptsMarcus: 55, ptsMichael: 45 },
    fund: { entries: [] },
    decisions: [],
    meeting: { date: '', lead: 'marcus', numbers: '', funnel: '', projects: '', products: '', receivables: '', decisions: '', next: '', history: [] },
    tools: [
      ['Funil de vendas', 'Planilha ou quadro compartilhado, atualizado após cada contato', 'Dono do projeto'],
      ['Backlog de produto', 'Quadro compartilhado, com marcos e pesos visíveis', 'Ambos'],
      ['Conversas do dia a dia', 'Grupo de WhatsApp. Decisões vão para o resumo semanal', 'Ambos'],
      ['Arquivos de projeto', 'Drive compartilhado, uma pasta por cliente', 'Entrega'],
      ['Código', 'GitHub, repositório por cliente e por produto', 'Entrega'],
      ['Publicação', 'Vercel', 'Entrega'],
      ['Senhas e acessos', 'Gerenciador compartilhado. Nunca no WhatsApp', 'Ambos'],
      ['Gravações de reunião', 'Pasta no Drive, uma por cliente', 'Quem conduziu'],
      ['Lista de supressão', 'Planilha única, consultada antes de todo envio', 'Prospecção'],
    ].map(([what, where, who]) => ({ what, where, who, url: '' })),
    kpis: [
      ['Serviços', 'Prospects abordados por semana', '150 a 200'], ['Serviços', 'Taxa de resposta', 'acima de 5%'],
      ['Serviços', 'Reuniões de diagnóstico por semana', '2 a 3'], ['Serviços', 'Taxa de fechamento das propostas', 'acima de 30%'],
      ['Serviços', 'Ciclo do primeiro contato ao pagamento', 'abaixo de 30 dias'], ['Serviços', 'Clientes em manutenção mensal', '100% dos entregues'],
      ['Produtos', 'Receita recorrente mensal', 'crescente mês a mês'], ['Produtos', 'Clientes ativos', '3 na validação, 10 na escala'],
      ['Produtos', 'Cancelamento mensal', 'abaixo de 5%'], ['Produtos', 'Custo de infraestrutura sobre a receita', 'abaixo de 15%'],
      ['Produtos', 'Marcos entregues por ciclo', 'ao menos 1 por pessoa'],
    ].map(([g, name, target]) => ({ g, name, target, current: '', updated: '' })),
    documents: { estrutura: { url: '', note: '' }, extra: [] },
    updatedAt: null, updatedBy: '',
  });

  function nextDowISO(dow) {
    const d = new Date(); const diff = (dow - d.getDay() + 7) % 7 || 7; d.setDate(d.getDate() + diff);
    return d.toISOString().slice(0, 10);
  }
  function merge(base, over) {
    if (Array.isArray(base)) return Array.isArray(over) ? over : base;
    if (base && typeof base === 'object') {
      const out = { ...base };
      if (over && typeof over === 'object') Object.keys(over).forEach(k => { out[k] = k in base ? merge(base[k], over[k]) : over[k]; });
      return out;
    }
    return over === undefined ? base : over;
  }

  let session = null;
  let state = null;
  let saveTimer = null;

  function load() { state = merge(DEFAULTS(), MFStore.getJSON(KEY) || {}); }
  function save(silent) {
    state.updatedAt = new Date().toISOString(); state.updatedBy = session?.name || '';
    MFStore.setJSON(KEY, state); MFStore.persist();
    if (!silent) toast('Salvo neste navegador');
  }
  const saveSoon = () => { clearTimeout(saveTimer); saveTimer = setTimeout(() => save(true), 400); };
  const getPath = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
  function setPath(o, p, v) { const ks = p.split('.'); const last = ks.pop(); const t = ks.reduce((a, k) => (a[k] ??= {}), o); t[last] = v; }

  let toastTimer = null;
  function toast(msg) {
    const t = $('#ps-toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 1800);
  }

  /* ── Fusos e datas ─────────────────────────────────────────────── */
  function tzParts(date, tz) {
    const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', weekday: 'short' });
    const g = {}; f.formatToParts(date).forEach(p => { g[p.type] = p.value; });
    return { y: +g.year, m: +g.month, d: +g.day, h: +g.hour % 24, mi: +g.minute, s: +g.second, dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g.weekday) };
  }
  function tzOffset(date, tz) { const p = tzParts(date, tz); return Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi, p.s) - Math.floor(date.getTime() / 1000) * 1000; }
  /** Instante correspondente a uma hora de parede num fuso. */
  function zoned(y, m, d, h, mi, tz) {
    const naive = Date.UTC(y, m - 1, d, h, mi);
    let t = naive - tzOffset(new Date(naive), tz); t = naive - tzOffset(new Date(t), tz);
    return new Date(t);
  }
  const hm = (t) => { const [h, m] = String(t || '00:00').split(':').map(Number); return [h || 0, m || 0]; };
  const addDays = (y, m, d, k) => { const x = new Date(Date.UTC(y, m - 1, d + k)); return [x.getUTCFullYear(), x.getUTCMonth() + 1, x.getUTCDate(), x.getUTCDay()]; };
  const fmtIn = (date, tz, withDay = true) => new Intl.DateTimeFormat('pt-BR', { timeZone: tz, ...(withDay ? { weekday: 'short', day: '2-digit', month: 'short' } : {}), hour: '2-digit', minute: '2-digit' }).format(date);
  const tzLabel = (tz) => (TZS.find(t => t[0] === tz) || [tz, tz])[1];

  function nextWeekly(dow, time, tz, n = 4, intervalWeeks = 1, anchorISO = null) {
    const now = new Date(); const [H, M] = hm(time); const out = [];
    let [y, m, d, wd] = (() => { const p = tzParts(now, tz); return [p.y, p.m, p.d, p.dow]; })();
    if (anchorISO) {
      const [ay, am, ad] = anchorISO.split('-').map(Number);
      if (ay) {
        const todayUTC = Date.UTC(y, m - 1, d); const behind = Math.floor((todayUTC - Date.UTC(ay, am - 1, ad)) / 86400000);
        const skip = behind > 28 ? Math.floor(behind / (7 * intervalWeeks)) * 7 * intervalWeeks : 0;
        [y, m, d, wd] = addDays(ay, am, ad, skip);
      }
    }
    for (let k = 0; k < 400 && out.length < n; k++) {
      const [cy, cm, cd, cwd] = addDays(y, m, d, k);
      if (cwd !== dow) continue;
      if (intervalWeeks > 1 && anchorISO) { const weeks = Math.round(k / 7); if (weeks % intervalWeeks) continue; }
      const inst = zoned(cy, cm, cd, H, M, tz);
      if (inst > now) out.push(inst);
    }
    return out;
  }
  function nextLastFriday(time, tz, n = 4) {
    const now = new Date(); const [H, M] = hm(time); const out = []; const p = tzParts(now, tz);
    for (let k = 0; k < 14 && out.length < n; k++) {
      const y = p.y + Math.floor((p.m - 1 + k) / 12), m = ((p.m - 1 + k) % 12) + 1;
      const last = new Date(Date.UTC(y, m, 0)); let d = last.getUTCDate(); while (new Date(Date.UTC(y, m - 1, d)).getUTCDay() !== 5) d--;
      const inst = zoned(y, m, d, H, M, tz); if (inst > now) out.push(inst);
    }
    return out;
  }

  /* ── iCalendar ─────────────────────────────────────────────────── */
  const pad = (n) => String(n).padStart(2, '0');
  const icsStamp = (p) => `${p.y}${pad(p.m)}${pad(p.d)}T${pad(p.h)}${pad(p.mi)}00`;
  function vtimezone(tz) {
    const eu = (name, from, to, stdN, dstN) => [
      'BEGIN:VTIMEZONE', `TZID:${name}`,
      'BEGIN:STANDARD', 'DTSTART:19701025T030000', 'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU', `TZOFFSETFROM:${to}`, `TZOFFSETTO:${from}`, `TZNAME:${stdN}`, 'END:STANDARD',
      'BEGIN:DAYLIGHT', 'DTSTART:19700329T020000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU', `TZOFFSETFROM:${from}`, `TZOFFSETTO:${to}`, `TZNAME:${dstN}`, 'END:DAYLIGHT',
      'END:VTIMEZONE'].join('\r\n');
    const fixed = (name, off, n) => ['BEGIN:VTIMEZONE', `TZID:${name}`, 'BEGIN:STANDARD', 'DTSTART:19700101T000000', `TZOFFSETFROM:${off}`, `TZOFFSETTO:${off}`, `TZNAME:${n}`, 'END:STANDARD', 'END:VTIMEZONE'].join('\r\n');
    if (tz === 'Europe/Dublin') return eu(tz, '+0000', '+0100', 'GMT', 'IST');
    if (tz === 'Europe/London') return eu(tz, '+0000', '+0100', 'GMT', 'BST');
    if (tz === 'Europe/Lisbon') return eu(tz, '+0000', '+0100', 'WET', 'WEST');
    if (['Europe/Madrid', 'Europe/Berlin', 'Europe/Paris', 'Europe/Rome'].includes(tz)) return eu(tz, '+0100', '+0200', 'CET', 'CEST');
    if (['America/Sao_Paulo', 'America/Fortaleza'].includes(tz)) return fixed(tz, '-0300', '-03');
    if (tz === 'America/Manaus') return fixed(tz, '-0400', '-04');
    return null;
  }
  function icsEvent({ uid, title, desc, start, tz, dur, rrule, url }) {
    const sp = tzParts(start, tz); const ep = tzParts(new Date(start.getTime() + dur * 60000), tz);
    const lines = ['BEGIN:VEVENT', `UID:${uid}@sociedade.marcusfernandes.ie`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
      `DTSTART;TZID=${tz}:${icsStamp(sp)}`, `DTEND;TZID=${tz}:${icsStamp(ep)}`, `SUMMARY:${icsText(title)}`, `DESCRIPTION:${icsText(desc)}`];
    if (rrule) lines.push(`RRULE:${rrule}`);
    if (url) { lines.push(`URL:${url}`); lines.push(`LOCATION:${icsText(url)}`); }
    lines.push('BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY', 'DESCRIPTION:Lembrete', 'END:VALARM', 'END:VEVENT');
    return lines.join('\r\n');
  }
  const icsText = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, m => '\\' + m);
  function ritualEvents() {
    const r = state.rituals; const ev = [];
    const ci = nextWeekly(r.checkin.dow, r.checkin.time, r.checkin.tz, 1)[0];
    if (ci) ev.push({ uid: 'checkin', title: 'Check-in escrito (prazo)', desc: 'Três linhas no grupo: o que entreguei, o que vou entregar, o que está me travando. Manual da parceria, seção 3.', start: new Date(ci.getTime() - 15 * 60000), tz: r.checkin.tz, dur: 15, rrule: `FREQ=WEEKLY;BYDAY=${DOW_ICS[r.checkin.dow]}` });
    const wk = nextWeekly(r.weekly.dow, r.weekly.time, r.weekly.tz, 1)[0];
    if (wk) ev.push({ uid: 'semanal', title: 'Reunião semanal da sociedade (45 min)', desc: 'Pauta fixa: números da semana, funil, projetos em execução, produtos próprios, contas a receber. Quem conduz escreve o resumo no grupo.', start: wk, tz: r.weekly.tz, dur: r.weekly.dur || 45, rrule: `FREQ=WEEKLY;BYDAY=${DOW_ICS[r.weekly.dow]}`, url: r.weekly.link });
    const mo = nextLastFriday(r.monthly.time, r.monthly.tz, 1)[0];
    if (mo) ev.push({ uid: 'mensal', title: 'Revisão mensal da sociedade (60 min)', desc: 'Resultado do mês contra o previsto e divisão do recebido; revisão de uma gravação de venda; produtos próprios; fundo de operação; atualização do manual.', start: mo, tz: r.monthly.tz, dur: r.monthly.dur || 60, rrule: 'FREQ=MONTHLY;BYDAY=-1FR', url: r.monthly.link });
    const cy = nextWeekly(r.cycle.dow, r.cycle.time, r.cycle.tz, 1, 2, r.cycle.anchor)[0];
    if (cy) {
      ev.push({ uid: 'demo', title: 'Demonstração interna do produto (20 min)', desc: 'Cada um mostra o que ficou pronto. O outro aprova ou devolve. Manual, seção 8.4.', start: cy, tz: r.cycle.tz, dur: r.cycle.demoDur || 20, rrule: `FREQ=WEEKLY;INTERVAL=2;BYDAY=${DOW_ICS[r.cycle.dow]}`, url: r.cycle.link });
      ev.push({ uid: 'ciclo', title: 'Planejamento de ciclo do produto (30 min)', desc: 'Escolher os marcos do ciclo e quem pega cada um. Escopo fechado; o que não entrou espera o próximo.', start: new Date(cy.getTime() + (r.cycle.demoDur || 20) * 60000), tz: r.cycle.tz, dur: r.cycle.planDur || 30, rrule: `FREQ=WEEKLY;INTERVAL=2;BYDAY=${DOW_ICS[r.cycle.dow]}`, url: r.cycle.link });
    }
    return ev;
  }
  function downloadICS() {
    const evs = ritualEvents(); const tzs = [...new Set(evs.map(e => e.tz))];
    const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Marcus & Michael//Sociedade//PT', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Sociedade Marcus & Michael',
      ...tzs.map(vtimezone).filter(Boolean), ...evs.map(icsEvent), 'END:VCALENDAR'].join('\r\n');
    const blob = new Blob([body], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'rituais-sociedade.ics'; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast('Calendário baixado: importe no Google Agenda, Outlook ou Apple');
  }
  function gcalLink(e) {
    const sp = tzParts(e.start, e.tz); const ep = tzParts(new Date(e.start.getTime() + e.dur * 60000), e.tz);
    const q = new URLSearchParams({ action: 'TEMPLATE', text: e.title, dates: `${icsStamp(sp)}/${icsStamp(ep)}`, ctz: e.tz, details: e.desc + (e.url ? '\n' + e.url : '') });
    if (e.rrule) q.set('recur', 'RRULE:' + e.rrule);
    return 'https://calendar.google.com/calendar/render?' + q.toString();
  }

  /* ── Cálculos ──────────────────────────────────────────────────── */
  function pointsSummary() {
    const ms = state.product.milestones;
    const tot = ms.reduce((a, m) => a + num(m.pts), 0);
    const by = (who, f) => ms.filter(m => m.owner === who && f(m)).reduce((a, m) => a + num(m.pts), 0);
    const deliveredOk = (m) => m.status === 'entregue' && m.approved;
    return {
      total: tot,
      marcus: { planned: by('marcus', () => true), delivered: by('marcus', m => m.status === 'entregue'), ok: by('marcus', deliveredOk) },
      michael: { planned: by('michael', () => true), delivered: by('michael', m => m.status === 'entregue'), ok: by('michael', deliveredOk) },
      unassigned: ms.filter(m => !m.owner).reduce((a, m) => a + num(m.pts), 0),
      pendingApproval: ms.filter(m => m.status === 'entregue' && !m.approved).length,
    };
  }
  function split() {
    const c = state.calc; const p = state.product;
    const gross = num(c.clients) * num(c.fee); const infra = num(c.infra); const net = Math.max(0, gross - infra);
    const op = net * .20, orig = net * .15, sale = net * .15, build = net * .50;
    const sales = num(c.salesMarcus) + num(c.salesMichael);
    let pm = num(c.ptsMarcus), pk = num(c.ptsMichael);
    if (c.usePoints) { const ps = pointsSummary(); pm = ps.marcus.ok; pk = ps.michael.ok; }
    const pts = pm + pk;
    const r = { marcus: { op: 0, orig: 0, sale: 0, build: 0 }, michael: { op: 0, orig: 0, sale: 0, build: 0 } };
    if (p.operator === 'ambos') { r.marcus.op = op / 2; r.michael.op = op / 2; } else r[p.operator].op = op;
    if (p.originator === 'ambos') { r.marcus.orig = orig / 2; r.michael.orig = orig / 2; } else r[p.originator].orig = orig;
    r.marcus.sale = sales ? sale * num(c.salesMarcus) / sales : 0; r.michael.sale = sales ? sale * num(c.salesMichael) / sales : 0;
    r.marcus.build = pts ? build * pm / pts : 0; r.michael.build = pts ? build * pk / pts : 0;
    const tot = (x) => x.op + x.orig + x.sale + x.build;
    return { gross, infra, net, op, orig, sale, build, pm, pk, pts, r, totM: tot(r.marcus), totK: tot(r.michael), infraPct: gross ? infra / gross * 100 : 0 };
  }
  function fundSummary() {
    const es = state.fund.entries;
    const inflow = es.filter(e => e.kind === 'entrada').reduce((a, e) => a + num(e.amount), 0);
    const outflow = es.filter(e => e.kind === 'saida').reduce((a, e) => a + num(e.amount), 0);
    const contrib = { marcus: 0, michael: 0 };
    es.filter(e => e.kind === 'entrada' && contrib[e.who] !== undefined).forEach(e => { contrib[e.who] += num(e.amount); });
    const balance = inflow - outflow; const excess = Math.max(0, balance - 1000); const ctot = contrib.marcus + contrib.michael;
    return { inflow, outflow, balance, contrib, excess, excessM: ctot ? excess * contrib.marcus / ctot : excess / 2, excessK: ctot ? excess * contrib.michael / ctot : excess / 2, bigPending: es.filter(e => e.kind === 'saida' && num(e.amount) > 150 && !e.approved).length };
  }
  function weeklyLead(date) {
    const w = state.rituals.weekly;
    if (w.lead !== 'alternado') return w.lead;
    const base = Date.UTC(2026, 0, 5); const wk = Math.floor((date.getTime() - base) / (7 * 86400000));
    const first = w.firstLead || 'marcus'; const other = first === 'marcus' ? 'michael' : 'marcus';
    return (wk % 2 === 0) ? first : other;
  }

  /* ── Render ────────────────────────────────────────────────────── */
  const selTZ = (bind, val) => `<select data-bind="${bind}">${TZS.map(([v, l]) => `<option value="${v}" ${v === val ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  const selDOW = (bind, val) => `<select data-bind="${bind}" data-type="int">${DOW.map((l, i) => `<option value="${i}" ${i === +val ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  const selWho = (bind, val, extra = []) => `<select data-bind="${bind}">${[['', '—'], ['marcus', 'Marcus'], ['michael', 'Michael'], ...extra].map(([v, l]) => `<option value="${v}" ${v === (val || '') ? 'selected' : ''}>${l}</option>`).join('')}</select>`;

  function render() {
    $('#painel').innerHTML = [renderHead(), renderAceite(), renderRituais(), renderReuniao(), renderPapeis(), renderPontos(), renderDivisao(), renderFundo(), renderDecisoes(), renderIndicadores(), renderFerramentas(), renderDocumentos(), renderRegras(), renderSync(), renderFoot()].join('');
    refresh();
  }
  const section = (id, eyebrow, title, desc, ref, body) => `
    <section class="ps-sec" id="${id}">
      <div class="ps-sec-head"><div><div class="eyebrow">${eyebrow}</div><h2>${title}</h2><p>${desc}</p></div>${ref ? `<span class="ref">Manual · <a href="manual.html#${ref[0]}">${ref[1]}</a></span>` : ''}</div>
      ${body}
    </section>`;

  function renderHead() {
    return `
      <header class="ps-head">
        <div>
          <div class="eyebrow">Sociedade · Marcus &amp; Michael</div>
          <h1>Painel da <em>sociedade</em>.</h1>
          <p class="lead">O Manual de Operação define as regras. Aqui ficam as definições que ele deixa para os dois sócios combinarem: horários, quem faz o quê, pontos do produto, fundo, decisões. <strong>Se não está escrito, não foi combinado.</strong></p>
          <div class="hero-actions" style="margin-top:1rem">
            <a class="btn btn-primary" href="manual.html">📜 Ler o manual (v${MANUAL_VERSION})</a>
            <button class="btn btn-outline" data-action="ics">📅 Baixar calendário dos rituais</button>
            <a class="btn btn-ghost" href="#sincronizar">🔁 Sincronizar com o outro sócio</a>
          </div>
        </div>
        <div class="ps-summary" data-out="summary"></div>
      </header>`;
  }

  function renderAceite() {
    const card = (k) => {
      const p = state.partners[k];
      return `<div class="ps-band">
        <div class="ps-partner"><div class="av">${esc(p.name.charAt(0))}</div><div style="min-width:0">
          <div class="nm">${esc(p.name)}</div>
          <div class="tz" data-out="now-${k}"></div>
          <div class="ps-form" style="margin-top:.7rem">
            <div class="f"><label>Nome</label><input data-bind="partners.${k}.name" value="${esc(p.name)}"></div>
            <div class="f"><label>Fuso horário</label>${selTZ(`partners.${k}.tz`, p.tz)}</div>
            <div class="f"><label>E-mail</label><input data-bind="partners.${k}.email" value="${esc(p.email)}" placeholder="opcional"></div>
            <div class="f"><label>Telefone</label><input data-bind="partners.${k}.phone" value="${esc(p.phone)}" placeholder="opcional"></div>
          </div>
        </div></div>
        <div data-out="ack-${k}"></div>
      </div>`;
    };
    return section('aceite', 'Quem somos', 'Sócios e aceite do manual', `Cada sócio registra que leu e concorda com a versão ${MANUAL_VERSION} do Manual de Operação. O aceite fica salvo com data e entra no que é sincronizado entre os dois.`, ['principios', 'Princípios'], `<div class="ps-grid2">${card('marcus')}${card('michael')}</div>`);
  }

  function renderRituais() {
    const r = state.rituals;
    const ritual = (id, title, dur, desc, form) => `<div class="ps-ritual" id="rit-${id}"><header><h3>${title}</h3><span class="dur">${dur}</span></header><p class="desc">${desc}</p><div class="ps-form">${form}</div><div data-out="dates-${id}"></div></div>`;
    return section('rituais', 'Rotina de trabalho', 'Rituais e horários', 'Três rituais, só, mais o ritmo do produto. Defina o dia, a hora e o fuso de referência; o painel mostra as próximas datas no fuso de cada sócio e gera o calendário para importar.', ['rotina', 'Rotina de trabalho'], `
      <div class="ps-grid2">
        ${ritual('checkin', 'Check-in de segunda', 'assíncrono · 10 min', 'Cada um escreve no grupo, até o prazo, três linhas: o que entreguei, o que vou entregar, o que está me travando.', `
          <div class="f"><label>Dia</label>${selDOW('rituals.checkin.dow', r.checkin.dow)}</div>
          <div class="f"><label>Prazo (hora)</label><input type="time" data-bind="rituals.checkin.time" value="${esc(r.checkin.time)}"></div>
          <div class="f"><label>Fuso de referência</label>${selTZ('rituals.checkin.tz', r.checkin.tz)}</div>
          <div class="f"><label>Onde</label><input data-bind="rituals.checkin.channel" value="${esc(r.checkin.channel)}"></div>`)}
        ${ritual('weekly', 'Reunião semanal', `${r.weekly.dur || 45} min · obrigatória`, 'Mesma hora toda semana. Pauta fixa: números, funil, projetos, produtos, contas a receber. Quem conduz escreve o resumo no grupo.', `
          <div class="f"><label>Dia</label>${selDOW('rituals.weekly.dow', r.weekly.dow)}</div>
          <div class="f"><label>Hora</label><input type="time" data-bind="rituals.weekly.time" value="${esc(r.weekly.time)}"></div>
          <div class="f"><label>Fuso de referência</label>${selTZ('rituals.weekly.tz', r.weekly.tz)}</div>
          <div class="f"><label>Duração (min)</label><input type="number" min="15" step="5" data-bind="rituals.weekly.dur" data-type="int" value="${esc(r.weekly.dur)}"></div>
          <div class="f"><label>Quem conduz</label><select data-bind="rituals.weekly.lead">${[['alternado', 'Alternado (semana sim, semana não)'], ['marcus', 'Sempre Marcus'], ['michael', 'Sempre Michael']].map(([v, l]) => `<option value="${v}" ${v === r.weekly.lead ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
          <div class="f"><label>Começa com</label>${selWho('rituals.weekly.firstLead', r.weekly.firstLead)}</div>
          <div class="f wide"><label>Link da chamada</label><input data-bind="rituals.weekly.link" value="${esc(r.weekly.link)}" placeholder="https://meet.google.com/…"></div>`)}
        ${ritual('monthly', 'Revisão mensal', `${r.monthly.dur || 60} min · última sexta`, 'Resultado contra o previsto e divisão do recebido; uma gravação de venda revisada; produtos; fundo; atualização do manual.', `
          <div class="f"><label>Dia</label><input value="Última sexta-feira do mês" disabled></div>
          <div class="f"><label>Hora</label><input type="time" data-bind="rituals.monthly.time" value="${esc(r.monthly.time)}"></div>
          <div class="f"><label>Fuso de referência</label>${selTZ('rituals.monthly.tz', r.monthly.tz)}</div>
          <div class="f"><label>Duração (min)</label><input type="number" min="30" step="5" data-bind="rituals.monthly.dur" data-type="int" value="${esc(r.monthly.dur)}"></div>
          <div class="f wide"><label>Link da chamada</label><input data-bind="rituals.monthly.link" value="${esc(r.monthly.link)}" placeholder="https://…"></div>`)}
        ${ritual('cycle', 'Ciclo do produto', 'a cada 2 semanas · 20 + 30 min', 'Demonstração interna (cada um mostra o que ficou pronto; o outro aprova ou devolve) seguida do planejamento do próximo ciclo (marcos e quem pega cada um).', `
          <div class="f"><label>Dia</label>${selDOW('rituals.cycle.dow', r.cycle.dow)}</div>
          <div class="f"><label>Hora</label><input type="time" data-bind="rituals.cycle.time" value="${esc(r.cycle.time)}"></div>
          <div class="f"><label>Fuso de referência</label>${selTZ('rituals.cycle.tz', r.cycle.tz)}</div>
          <div class="f"><label>Primeiro ciclo (data-base)</label><input type="date" data-bind="rituals.cycle.anchor" value="${esc(r.cycle.anchor)}"></div>
          <div class="f"><label>Demo (min)</label><input type="number" min="10" step="5" data-bind="rituals.cycle.demoDur" data-type="int" value="${esc(r.cycle.demoDur)}"></div>
          <div class="f"><label>Planejamento (min)</label><input type="number" min="15" step="5" data-bind="rituals.cycle.planDur" data-type="int" value="${esc(r.cycle.planDur)}"></div>
          <div class="f wide"><label>Link da chamada</label><input data-bind="rituals.cycle.link" value="${esc(r.cycle.link)}" placeholder="https://…"></div>`)}
      </div>
      <div class="ps-actions">
        <button class="btn btn-primary btn-sm" data-action="ics">📅 Baixar calendário (.ics)</button>
        <span data-out="gcal"></span>
        <span class="note">O .ics importa no Google Agenda, Outlook e Apple Calendário, com repetição e lembrete de 15 min. Cada sócio importa no próprio calendário.</span>
      </div>`);
  }

  function renderReuniao() {
    const m = state.meeting;
    const ta = (k, label, ph) => `<div class="f wide"><label>${label}</label><textarea data-bind="meeting.${k}" placeholder="${esc(ph)}">${esc(m[k])}</textarea></div>`;
    return section('reuniao', 'Toda semana', 'Reunião semanal: pauta e resumo', 'A pauta é fixa e nesta ordem. Preencha durante a reunião e copie o resumo para o grupo ao final. Reunião sem registro escrito não aconteceu.', ['rotina', 'Rotina de trabalho'], `
      <div class="ps-grid2">
        <div class="ps-band">
          <div class="ps-form">
            <div class="f"><label>Data</label><input type="date" data-bind="meeting.date" value="${esc(m.date)}"></div>
            <div class="f"><label>Quem conduz</label>${selWho('meeting.lead', m.lead)}</div>
            ${ta('numbers', '1 · Números da semana', 'Prospects abordados, respostas, reuniões, propostas, fechamentos, dinheiro recebido')}
            ${ta('funnel', '2 · Funil', 'Cada negócio aberto: etapa e próximo passo com data')}
            ${ta('projects', '3 · Projetos em execução', 'No prazo, fora do prazo, o que precisa de decisão')}
            ${ta('products', '4 · Produtos próprios', 'Ciclo atual, o que foi entregue, o que trava')}
            ${ta('receivables', '5 · Contas a receber', 'O que venceu, o que vence, quem está cobrando')}
            ${ta('decisions', 'Decisões tomadas', 'Uma por linha. Depois registre em "Decisões"')}
            ${ta('next', 'Próximos passos com data', 'Quem · o quê · até quando')}
          </div>
          <div class="ps-actions">
            <button class="btn btn-primary btn-sm" data-action="copy-summary">💬 Copiar resumo para o grupo</button>
            <button class="btn btn-outline btn-sm" data-action="archive-summary">🗂 Arquivar e começar a próxima</button>
            <button class="btn btn-ghost btn-sm" data-action="prefill-meeting">Preencher data e condutor da próxima</button>
          </div>
        </div>
        <div class="ps-band soft">
          <h3>Prévia do resumo</h3>
          <p class="hint">É o texto que vai para o grupo. O histórico fica abaixo.</p>
          <div class="ps-summary-out" data-out="summary-text"></div>
          <div class="ps-history" data-out="history"></div>
        </div>
      </div>`);
  }

  function renderPapeis() {
    return section('papeis', 'Funções, não cargos', 'Papéis: padrão atual', 'Não temos cargos fixos. Temos funções que se redistribuem projeto a projeto. Aqui fica o padrão atual de cada uma, revisto quando mudar. Todo projeto tem um dono único, nomeado no dia em que entra no funil.', ['papeis', 'Papéis'], `
      <div class="ps-table"><table>
        <thead><tr><th>Função</th><th>O que envolve</th><th class="w">Padrão atual</th><th class="w">Observação</th></tr></thead>
        <tbody>${state.roles.map((r, i) => `<tr><td>${esc(r.fn)}</td><td style="color:var(--text-2)">${esc(r.what)}</td><td><input data-bind="roles.${i}.who" value="${esc(r.who)}"></td><td><input data-bind="roles.${i}.note" value="${esc(r.note)}" placeholder="ex.: válido até dez/2026"></td></tr>`).join('')}</tbody>
      </table></div>`);
  }

  function renderPontos() {
    const p = state.product;
    return section('pontos', 'Produto próprio', 'Pontos de construção', 'Antes da primeira linha, listamos os marcos e o peso de cada um. Quem entrega o marco leva os pontos, e é isso que define a fatia de construção da receita recorrente. Marco entregue é marco funcionando em produção, aprovado pelo outro.', ['pontos', '8.2 Pontos de construção'], `
      <div class="ps-band" style="margin-bottom:1rem">
        <div class="ps-form">
          <div class="f wide" style="grid-column:span 2"><label>Produto</label><input data-bind="product.name" value="${esc(p.name)}"></div>
          <div class="f"><label>Fase</label><select data-bind="product.phase">${[['construcao', 'Construção (até 1 condomínio real em produção)'], ['validacao', 'Validação (3 pagantes, 3 meses sem cancelar)'], ['escala', 'Escala (10 pagantes, onboarding sem nós)']].map(([v, l]) => `<option value="${v}" ${v === p.phase ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
          <div class="f"><label>Originação (quem teve a ideia)</label>${selWho('product.originator', p.originator, [['ambos', 'Os dois']])}</div>
          <div class="f"><label>Operação (quem mantém no ar)</label>${selWho('product.operator', p.operator, [['ambos', 'Os dois']])}</div>
        </div>
      </div>
      <div class="ps-table"><table>
        <thead><tr><th class="w">Marco</th><th class="n">Pontos</th><th>Responsável</th><th>Status</th><th>Aprovado pelo outro</th><th class="x"></th></tr></thead>
        <tbody>${p.milestones.map((m, i) => `<tr>
          <td><input data-bind="product.milestones.${i}.t" value="${esc(m.t)}"></td>
          <td><input type="number" min="0" step="1" data-bind="product.milestones.${i}.pts" data-type="num" value="${esc(m.pts)}"></td>
          <td>${selWho(`product.milestones.${i}.owner`, m.owner)}</td>
          <td><select data-bind="product.milestones.${i}.status">${[['planejado', 'Planejado'], ['andamento', 'Em andamento'], ['entregue', 'Entregue em produção']].map(([v, l]) => `<option value="${v}" ${v === m.status ? 'selected' : ''}>${l}</option>`).join('')}</select></td>
          <td style="text-align:center"><input type="checkbox" data-bind="product.milestones.${i}.approved" data-type="bool" ${m.approved ? 'checked' : ''}></td>
          <td class="x"><button class="btn-x" data-action="rm-milestone" data-i="${i}" title="Remover">✕</button></td></tr>`).join('')}</tbody>
      </table></div>
      <div class="ps-actions"><button class="btn btn-outline btn-sm" data-action="add-milestone">+ Marco novo</button><span class="note">Marcos novos entram com peso próprio e o total passa de 100: a divisão é sempre proporcional ao total vigente. Pesos só mudam por acordo dos dois.</span></div>
      <div data-out="points"></div>`);
  }

  function renderDivisao() {
    const c = state.calc;
    return section('divisao', 'Produto próprio', 'Divisão da receita recorrente', 'Por cliente, todo mês: da mensalidade deduz-se a infraestrutura proporcional; a receita líquida divide-se em operação 20%, originação 15%, venda 15% e construção 50% (por pontos). Simule com os números reais do mês; a apuração é liquidada até o dia 10 do mês seguinte.', ['divisao', '8.3 Divisão da receita'], `
      <div class="ps-grid2">
        <div class="ps-band">
          <h3>Números do mês</h3>
          <p class="hint">Pré-preenchido com o exemplo do manual (10 condomínios a €80, infraestrutura €80). Quem opera e quem originou vêm da seção Pontos.</p>
          <div class="ps-form">
            <div class="f"><label>Clientes pagantes</label><input type="number" min="0" data-bind="calc.clients" data-type="num" value="${esc(c.clients)}"></div>
            <div class="f"><label>Mensalidade média (€)</label><input type="number" min="0" step="1" data-bind="calc.fee" data-type="num" value="${esc(c.fee)}"></div>
            <div class="f"><label>Infraestrutura do mês (€)</label><input type="number" min="0" step="1" data-bind="calc.infra" data-type="num" value="${esc(c.infra)}"></div>
            <div class="f"><label>Clientes trazidos por Marcus</label><input type="number" min="0" data-bind="calc.salesMarcus" data-type="num" value="${esc(c.salesMarcus)}"></div>
            <div class="f"><label>Clientes trazidos por Michael</label><input type="number" min="0" data-bind="calc.salesMichael" data-type="num" value="${esc(c.salesMichael)}"></div>
            <div class="f"><label>Pontos de construção</label><select data-bind="calc.usePoints" data-type="bool"><option value="false" ${!c.usePoints ? 'selected' : ''}>Informar manualmente</option><option value="true" ${c.usePoints ? 'selected' : ''}>Usar os marcos aprovados da tabela</option></select></div>
            <div class="f"><label>Pontos Marcus</label><input type="number" min="0" data-bind="calc.ptsMarcus" data-type="num" value="${esc(c.ptsMarcus)}" ${c.usePoints ? 'disabled' : ''}></div>
            <div class="f"><label>Pontos Michael</label><input type="number" min="0" data-bind="calc.ptsMichael" data-type="num" value="${esc(c.ptsMichael)}" ${c.usePoints ? 'disabled' : ''}></div>
          </div>
        </div>
        <div class="ps-band soft ps-calc-out" data-out="calc"></div>
      </div>`);
  }

  function renderFundo() {
    const es = state.fund.entries;
    return section('fundo', 'Despesas', 'Fundo de operação', '5% da receita líquida de cada projeto fica retido antes da divisão e vai para o fundo comum, que paga ferramentas, domínio de envio, créditos e a infraestrutura de produto até €100/mês. Gasto acima de €150 precisa de aprovação escrita do outro. Acima de €1.000 de saldo, o excedente volta na proporção do que cada um contribuiu.', ['despesas', 'Despesas'], `
      <div data-out="fund" style="margin-bottom:1rem"></div>
      <div class="ps-table"><table>
        <thead><tr><th class="d">Data</th><th class="w">Descrição</th><th>Tipo</th><th class="n">Valor (€)</th><th>De quem / para quê</th><th>Aprovado</th><th class="x"></th></tr></thead>
        <tbody>${es.length ? es.map((e, i) => `<tr>
          <td><input type="date" data-bind="fund.entries.${i}.date" value="${esc(e.date)}"></td>
          <td><input data-bind="fund.entries.${i}.desc" value="${esc(e.desc)}" placeholder="ex.: 5% do projeto Salão X · ex.: Apollo créditos"></td>
          <td><select data-bind="fund.entries.${i}.kind"><option value="entrada" ${e.kind === 'entrada' ? 'selected' : ''}>Entrada</option><option value="saida" ${e.kind === 'saida' ? 'selected' : ''}>Saída</option></select></td>
          <td><input type="number" min="0" step="0.01" data-bind="fund.entries.${i}.amount" data-type="num" value="${esc(e.amount)}"></td>
          <td>${selWho(`fund.entries.${i}.who`, e.who, [['fundo', 'Fundo (ferramenta/infra)']])}</td>
          <td style="text-align:center">${e.kind === 'saida' && num(e.amount) > 150 ? `<input type="checkbox" data-bind="fund.entries.${i}.approved" data-type="bool" ${e.approved ? 'checked' : ''} title="Aprovação escrita do outro sócio">` : '<span style="color:var(--text-3)">—</span>'}</td>
          <td class="x"><button class="btn-x" data-action="rm-fund" data-i="${i}">✕</button></td></tr>`).join('') : '<tr><td colspan="7" style="color:var(--text-3);text-align:center;padding:1rem">Nenhum lançamento ainda. Registre a primeira retenção de 5% ou a primeira ferramenta paga.</td></tr>'}</tbody>
      </table></div>
      <div class="ps-actions"><button class="btn btn-outline btn-sm" data-action="add-fund">+ Lançamento</button><span class="note">Nas entradas, "de quem" é o sócio dono do projeto que gerou a retenção: é isso que define a proporção do excedente e da divisão em caso de término.</span></div>`);
  }

  function renderDecisoes() {
    const ds = state.decisions;
    return section('decisoes', 'Registro escrito', 'Decisões da sociedade', 'Tudo o que foi combinado fora do manual fica aqui, com data. Uma decisão "proposta" vira "acordada" quando o outro concorda. Mudança de regra permanente vai para o manual na revisão mensal.', ['rotina', 'Por que tão pouca reunião'], `
      <div class="ps-band">
        <div class="ps-dhead"><span>Data</span><span>Decisão</span><span>Proposta por</span><span>Status</span><span></span></div>
        <div data-out="decisions-list">${ds.length ? ds.map((d, i) => decisionRow(d, i)).join('') : '<p style="color:var(--text-3);font-size:.9rem;padding:.5rem 0">Nenhuma decisão registrada. Comece pelas que já valem hoje: horário da reunião, quem é o dono do primeiro projeto, pesos dos marcos.</p>'}</div>
        <div class="ps-actions"><button class="btn btn-outline btn-sm" data-action="add-decision">+ Registrar decisão</button><button class="btn btn-ghost btn-sm" data-action="copy-decisions">💬 Copiar decisões acordadas</button></div>
      </div>`);
  }
  const decisionRow = (d, i) => `<div class="ps-decision">
    <input type="date" data-bind="decisions.${i}.date" value="${esc(d.date)}">
    <textarea class="full" data-bind="decisions.${i}.text" placeholder="O que foi decidido, em uma frase que não deixe dúvida">${esc(d.text)}</textarea>
    ${selWho(`decisions.${i}.by`, d.by, [['ambos', 'Os dois']])}
    <select data-bind="decisions.${i}.status"><option value="proposta" ${d.status === 'proposta' ? 'selected' : ''}>Proposta</option><option value="acordada" ${d.status === 'acordada' ? 'selected' : ''}>Acordada</option><option value="revogada" ${d.status === 'revogada' ? 'selected' : ''}>Revogada</option></select>
    <button class="btn-x" data-action="rm-decision" data-i="${i}">✕</button></div>`;

  function renderIndicadores() {
    const groups = ['Serviços', 'Produtos'];
    return section('indicadores', 'Controle', 'Indicadores', 'As metas iniciais vêm do manual. Atualize o valor atual na reunião semanal; a data de atualização é registrada sozinha.', ['numeros', 'Números que acompanhamos'], `
      <div class="ps-grid2">${groups.map(g => `<div class="ps-table"><table>
        <thead><tr><th>${g}</th><th>Meta</th><th class="n">Atual</th><th class="d">Atualizado</th></tr></thead>
        <tbody>${state.kpis.map((k, i) => k.g === g ? `<tr><td>${esc(k.name)}</td><td style="color:var(--text-2)">${esc(k.target)}</td><td><input data-bind="kpis.${i}.current" data-kpi="${i}" value="${esc(k.current)}" placeholder="—"></td><td style="font-family:var(--ff-mono);font-size:.78rem;color:var(--text-3)" data-out="kpi-date-${i}">${esc(k.updated || '')}</td></tr>` : '').join('')}</tbody>
      </table></div>`).join('')}</div>`);
  }

  function renderFerramentas() {
    return section('ferramentas', 'Onde as coisas ficam', 'Ferramentas e acessos', 'O manual diz o que fica onde; aqui ficam os links reais. Senhas nunca aqui nem no WhatsApp: no gerenciador compartilhado.', ['ferramentas', 'Ferramentas'], `
      <div class="ps-table"><table>
        <thead><tr><th>Para quê</th><th class="w">Onde (regra)</th><th class="w">Link</th><th>Quem mantém</th><th class="x"></th></tr></thead>
        <tbody>${state.tools.map((t, i) => `<tr><td><input data-bind="tools.${i}.what" value="${esc(t.what)}"></td><td><input data-bind="tools.${i}.where" value="${esc(t.where)}"></td><td><input type="url" data-bind="tools.${i}.url" value="${esc(t.url)}" placeholder="https://…"> ${t.url ? `<a href="${esc(t.url)}" target="_blank" rel="noopener" style="font-size:.78rem">abrir ↗</a>` : ''}</td><td><input data-bind="tools.${i}.who" value="${esc(t.who)}"></td><td class="x"><button class="btn-x" data-action="rm-tool" data-i="${i}">✕</button></td></tr>`).join('')}</tbody>
      </table></div>
      <div class="ps-actions"><button class="btn btn-outline btn-sm" data-action="add-tool">+ Ferramenta</button></div>`);
  }

  function renderDocumentos() {
    const d = state.documents;
    return section('documentos', 'Os três documentos', 'Documentos da parceria', 'O manual complementa a proposta de estrutura (quanto cada um recebe) e aponta para o playbook de vendas. Os três juntos são o combinado.', ['principios', 'Os três documentos'], `
      <div class="ps-grid3">
        <div class="ps-band"><div class="eyebrow">Documento 1</div><h3>Proposta de estrutura</h3><p class="hint">Quanto cada um recebe, por faixa de projeto e por produto. Ainda não está publicada neste site: guarde o link do arquivo acordado.</p>
          <div class="ps-form"><div class="f wide"><label>Link (Drive, PDF)</label><input type="url" data-bind="documents.estrutura.url" value="${esc(d.estrutura.url)}" placeholder="https://drive.google.com/…"></div><div class="f wide"><label>Versão / observação</label><input data-bind="documents.estrutura.note" value="${esc(d.estrutura.note)}" placeholder="ex.: v1.0 · assinada em set/2026"></div></div>
          ${d.estrutura.url ? `<div class="ps-actions"><a class="btn btn-outline btn-sm" href="${esc(d.estrutura.url)}" target="_blank" rel="noopener">Abrir ↗</a></div>` : ''}</div>
        <div class="ps-band" style="border-color:var(--gold)"><div class="eyebrow">Documento 2</div><h3>Manual de operação</h3><p class="hint">Versão ${MANUAL_VERSION}, setembro de 2026. Publicado neste site; revisado na última sexta de cada mês.</p><div class="ps-actions"><a class="btn btn-primary btn-sm" href="manual.html">Ler o manual</a><span class="note">Para PDF: abra o manual e use "Salvar PDF" na barra.</span></div></div>
        <div class="ps-band"><div class="eyebrow">Documento 3</div><h3>Playbook de vendas</h3><p class="hint">O processo comercial em detalhe: scripts, perguntas, objeções e métricas. Em página web, para consulta durante as reuniões.</p><div class="ps-actions"><a class="btn btn-outline btn-sm" href="../playbook/comercial.html">Playbook Comercial</a><a class="btn btn-ghost btn-sm" href="../playbook/">Playbook Dublin</a></div></div>
      </div>`);
  }

  function renderRegras() {
    const R = [
      ['5%', 'da receita líquida de cada projeto vai para o fundo', 'despesas'], ['€150', 'gasto do fundo acima disso: aprovação escrita do outro', 'despesas'],
      ['€1.000', 'saldo do fundo acima disso: excedente distribuído', 'despesas'], ['€100/mês', 'infraestrutura de produto paga pelo fundo até aqui', 'produtos'],
      ['€50/mês', 'custo novo acima disso: acordo dos dois', 'produtos'], ['14 dias', 'aceite automático após entrega para validação', 'projetos'],
      ['2 rodadas', 'de ajuste incluídas; a terceira é orçada', 'projetos'], ['48 h', 'para apresentar a proposta, ao vivo', 'comercial'],
      ['15 dias', 'para faturar o outro sócio após o recebimento', 'pagamento'], ['dia 10', 'liquidação mensal da receita de produto', 'pagamento'],
      ['5 dias úteis', 'para comunicar todo recebimento ao outro', 'pagamento'], ['+3 · +7 · +14 · +21 · +30', 'régua de cobrança: mensagem, ligação, e-mail, suspensão, despublicação', 'pagamento'],
      ['24 h úteis', 'resposta de suporte do produto', 'produtos'], ['15 / 90 dias', 'inadimplência: suspende em 15, preserva dados por 90', 'produtos'],
      ['7 dias', 'para entregar a exportação dos dados no cancelamento', 'produtos'], ['60 dias', 'de aviso aos clientes para encerrar o produto', 'produtos'],
      ['12 × média 6m', 'preço opcional de compra da participação de quem sai', 'saida'], ['12 meses', 'sem produto concorrente para quem sai', 'saida'],
      ['30 dias', 'protótipo sem fechamento é arquivado', 'projetos'], ['> 60', 'pontuação mínima para abordar um prospect', 'comercial'],
    ];
    return section('regras', 'Para não procurar', 'Regras numéricas do manual', 'Os números que mais aparecem no dia a dia, com o capítulo de origem. Isto é referência: muda só mudando o manual.', null, `
      <div class="ps-rules">${R.map(([v, l, r]) => `<a class="ps-rule" href="manual.html#${r}" style="text-decoration:none;color:inherit"><div class="v">${esc(v)}</div><div class="l">${esc(l)}</div><div class="r">manual · ${r}</div></a>`).join('')}</div>`);
  }

  function renderSync() {
    return section('sincronizar', 'Site sem servidor', 'Sincronizar com o outro sócio', 'As definições deste painel ficam salvas no navegador de quem edita. Para o outro sócio ver o mesmo estado, gere o link (ou o arquivo) e mande pelo grupo; ele abre e aplica. Quando o login individual (Clerk) entrar, isto passa a ser automático.', null, `
      <div class="ps-grid2">
        <div class="ps-band">
          <h3>Enviar as minhas definições</h3>
          <p class="hint">O link carrega tudo o que está nesta página (rituais, papéis, pontos, fundo, decisões, ferramentas, indicadores, aceites). Quem abrir precisa da senha de sócio.</p>
          <div class="ps-actions">
            <button class="btn btn-primary btn-sm" data-action="sync-link">🔗 Copiar link de sincronização</button>
            <button class="btn btn-outline btn-sm" data-action="sync-wa">💬 Enviar pelo WhatsApp</button>
            <button class="btn btn-ghost btn-sm" data-action="sync-export">⬇️ Baixar arquivo .json</button>
          </div>
          <div class="ps-link-out" data-out="sync-link" hidden></div>
        </div>
        <div class="ps-band soft">
          <h3>Receber as definições do outro</h3>
          <p class="hint">Abra o link que ele mandou (este painel pergunta antes de aplicar) ou importe o arquivo .json.</p>
          <div class="ps-actions"><label class="btn btn-outline btn-sm" style="cursor:pointer">📂 Importar arquivo .json <input type="file" accept="application/json,.json" data-action="sync-import" hidden></label>
            <button class="btn btn-ghost btn-sm" data-action="reset" title="Volta aos valores do manual">Restaurar padrões do manual</button></div>
          <p class="hint" style="margin-top:.8rem" data-out="updated"></p>
        </div>
      </div>`);
  }
  const renderFoot = () => `<footer class="ps-foot"><span>Painel da sociedade · Marcus &amp; Michael · regras no Manual de Operação v${MANUAL_VERSION}</span><span data-out="updated-foot"></span></footer>`;

  /* ── Saídas derivadas ──────────────────────────────────────────── */
  function refresh() {
    const r = state.rituals; const now = new Date();
    const partnerTZ = ['marcus', 'michael'].map(k => state.partners[k].tz);
    const both = (d) => { const uniq = [...new Set(partnerTZ)]; return uniq.map(tz => `<b>${fmtIn(d, tz, false)}</b> ${tzLabel(tz)}`).join(' · '); };
    const datesList = (list, tz, lead) => list.length ? `<ul class="ps-dates">${list.map((d, i) => `<li class="${i === 0 ? 'first' : ''}"><span>${fmtIn(d, tz)}${lead ? ` · conduz ${P[lead(d)]}` : ''}</span><span>${both(d)}</span></li>`).join('')}</ul>` : '<p class="hint">Defina dia e hora.</p>';
    const out = (k, html) => { const el = $(`[data-out="${k}"]`); if (el) el.innerHTML = html; };

    out('dates-checkin', `<div class="ps-both">Prazo nos fusos dos sócios: ${both(nextWeekly(r.checkin.dow, r.checkin.time, r.checkin.tz, 1)[0] || now)}</div>`);
    const wk = nextWeekly(r.weekly.dow, r.weekly.time, r.weekly.tz, 4);
    out('dates-weekly', `<div class="lbl">Próximas</div>${datesList(wk, r.weekly.tz, weeklyLead)}`);
    out('dates-monthly', `<div class="lbl">Próximas</div>${datesList(nextLastFriday(r.monthly.time, r.monthly.tz, 3), r.monthly.tz)}`);
    out('dates-cycle', `<div class="lbl">Próximas (demo + planejamento)</div>${datesList(nextWeekly(r.cycle.dow, r.cycle.time, r.cycle.tz, 3, 2, r.cycle.anchor), r.cycle.tz)}`);
    out('gcal', ritualEvents().map(e => `<a class="btn btn-ghost btn-sm" href="${esc(gcalLink(e))}" target="_blank" rel="noopener" title="Adicionar ao Google Agenda">G · ${esc(e.title.replace(/\s*\(.*\)/, ''))}</a>`).join(' '));

    ['marcus', 'michael'].forEach(k => {
      const p = state.partners[k];
      out(`now-${k}`, `${esc(tzLabel(p.tz))} · agora ${fmtIn(now, p.tz, false)}`);
      const a = state.ack[k];
      out(`ack-${k}`, a ? `<div class="ps-ack ok"><span>✓ <strong>${esc(p.name)}</strong> leu e aceitou o manual v${esc(a.version)} em ${new Date(a.at).toLocaleDateString('pt-BR')}${a.by && a.by !== p.name ? ` (registrado por ${esc(a.by)})` : ''}</span><button class="btn btn-ghost btn-sm" data-action="unack" data-k="${k}">Desfazer</button></div>`
        : `<div class="ps-ack"><span>Aceite do manual v${MANUAL_VERSION}: <strong>pendente</strong></span><button class="btn btn-primary btn-sm" data-action="ack" data-k="${k}">Li e aceito a versão ${MANUAL_VERSION}</button></div>`);
    });

    // pontos
    const ps = pointsSummary();
    const pct = (v) => ps.total ? Math.round(v / ps.total * 100) : 0;
    out('points', `<div class="ps-band soft" style="margin-top:1rem"><div class="ps-split">
      <div class="ps-stat"><div class="k">Marcus</div><div class="v">${ps.marcus.ok} pts aprovados</div><div class="s">${ps.marcus.delivered} entregues · ${ps.marcus.planned} atribuídos · ${pct(ps.marcus.ok)}% do total vigente</div></div>
      <div class="ps-stat"><div class="k">Michael</div><div class="v">${ps.michael.ok} pts aprovados</div><div class="s">${ps.michael.delivered} entregues · ${ps.michael.planned} atribuídos · ${pct(ps.michael.ok)}% do total vigente</div></div></div>
      <div class="ps-bar" style="margin:.7rem 0 .4rem"><i class="a" style="width:${pct(ps.marcus.ok)}%"></i><i class="b" style="width:${pct(ps.michael.ok)}%"></i></div>
      <div class="ps-legend"><span><i style="background:var(--ink)"></i>Marcus</span><span><i style="background:var(--gold)"></i>Michael</span><span style="margin-left:auto">Total vigente: <strong>${ps.total} pts</strong>${ps.unassigned ? ` · ${ps.unassigned} sem responsável` : ''}</span></div>
      ${ps.pendingApproval ? `<p class="hint" style="margin:.6rem 0 0"><span class="ps-flag warn">atenção</span> ${ps.pendingApproval} marco(s) entregue(s) ainda sem aprovação do outro: não contam para a fatia de construção até lá.</p>` : ''}
      ${ps.total !== 100 && ps.total ? `<p class="hint" style="margin:.4rem 0 0"><span class="ps-flag info">nota</span> O total vigente é ${ps.total}, não 100: a divisão é proporcional ao total vigente, como manda o manual.</p>` : ''}</div>`);

    // calculadora
    const s = split();
    const row = (l, v, m, k) => `<tr><td>${l}</td><td class="num">${eur(v)}</td><td class="num">${m ? eur(m) : '—'}</td><td class="num">${k ? eur(k) : '—'}</td></tr>`;
    out('calc', `
      <div class="ps-split"><div class="ps-stat"><div class="k">Marcus recebe</div><div class="v">${eur(s.totM)}</div><div class="s">${s.net ? Math.round(s.totM / s.net * 100) : 0}% da receita líquida</div></div><div class="ps-stat"><div class="k">Michael recebe</div><div class="v">${eur(s.totK)}</div><div class="s">${s.net ? Math.round(s.totK / s.net * 100) : 0}% da receita líquida</div></div></div>
      <div class="ps-table"><table><thead><tr><th>Parte</th><th class="num">Valor</th><th class="num">Marcus</th><th class="num">Michael</th></tr></thead><tbody>
        <tr><td>Receita bruta</td><td class="num">${eur(s.gross)}</td><td></td><td></td></tr>
        <tr><td>Infraestrutura ${s.infraPct > 15 ? '<span class="ps-flag warn">acima de 15%</span>' : ''}</td><td class="num">− ${eur(s.infra)}</td><td></td><td></td></tr>
        <tr><td><strong>Receita líquida</strong></td><td class="num"><strong>${eur(s.net)}</strong></td><td></td><td></td></tr>
        ${row(`Operação (20%) · ${state.product.operator === 'ambos' ? 'os dois' : P[state.product.operator]}`, s.op, s.r.marcus.op, s.r.michael.op)}
        ${row(`Originação (15%) · ${state.product.originator === 'ambos' ? 'os dois' : P[state.product.originator]}`, s.orig, s.r.marcus.orig, s.r.michael.orig)}
        ${row(`Venda (15%) · ${num(state.calc.salesMarcus)} / ${num(state.calc.salesMichael)} clientes`, s.sale, s.r.marcus.sale, s.r.michael.sale)}
        ${row(`Construção (50%) · ${s.pm} / ${s.pk} pts${state.calc.usePoints ? ' (marcos aprovados)' : ''}${!s.pts ? ' <span class="ps-flag warn">sem pontos: fatia não distribuída</span>' : ''}`, s.build, s.r.marcus.build, s.r.michael.build)}
      </tbody><tfoot><tr><td>Total mensal</td><td class="num">${eur(s.net)}</td><td class="num">${eur(s.totM)}</td><td class="num">${eur(s.totK)}</td></tr></tfoot></table></div>
      <p class="hint" style="margin:0">Cliente que não paga não gera fatia para ninguém: só o recebido é dividido. Infraestrutura acima de €100/mês vira linha própria deduzida antes da divisão.</p>
      <div class="ps-actions" style="margin-top:0"><button class="btn btn-outline btn-sm" data-action="copy-split">💬 Copiar apuração para o grupo</button></div>`);

    // fundo
    const f = fundSummary();
    out('fund', `<div class="ps-summary" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">
      <div class="ps-stat"><div class="k">Saldo do fundo</div><div class="v">${eur(f.balance)}</div><div class="s">${eur(f.inflow)} entradas · ${eur(f.outflow)} saídas</div></div>
      <div class="ps-stat"><div class="k">Contribuição</div><div class="v">${f.contrib.marcus + f.contrib.michael ? Math.round(f.contrib.marcus / (f.contrib.marcus + f.contrib.michael) * 100) : 50}% / ${f.contrib.marcus + f.contrib.michael ? Math.round(f.contrib.michael / (f.contrib.marcus + f.contrib.michael) * 100) : 50}%</div><div class="s">Marcus ${eur(f.contrib.marcus)} · Michael ${eur(f.contrib.michael)}</div></div>
      <div class="ps-stat"><div class="k">Excedente acima de €1.000</div><div class="v">${f.excess ? eur(f.excess) : '—'}</div><div class="s">${f.excess ? `distribuir: Marcus ${eur(f.excessM)} · Michael ${eur(f.excessK)}` : 'nada a distribuir'}</div></div>
      <div class="ps-stat"><div class="k">Aprovações pendentes</div><div class="v">${f.bigPending ? `<span class="ps-flag warn">${f.bigPending}</span>` : '<span class="ps-flag ok">ok</span>'}</div><div class="s">saídas acima de €150 sem aprovação escrita</div></div></div>`);

    // reunião
    out('summary-text', esc(meetingText()));
    out('history', state.meeting.history.length ? `<div class="lbl" style="margin-top:.8rem">Resumos anteriores</div>` + state.meeting.history.map(h => `<details><summary>${esc(h.date)} · conduziu ${esc(P[h.lead] || h.lead || '—')}</summary><pre>${esc(h.text)}</pre></details>`).join('') : '');

    // header summary
    const nextW = wk[0];
    const ackCount = ['marcus', 'michael'].filter(k => state.ack[k]).length;
    out('summary', `
      <div class="ps-stat"><div class="k">Próxima reunião semanal</div><div class="v">${nextW ? fmtIn(nextW, r.weekly.tz) : '—'}</div><div class="s">${nextW ? `conduz ${P[weeklyLead(nextW)]} · ${tzLabel(r.weekly.tz)}` : 'defina em Rituais'}</div></div>
      <div class="ps-stat"><div class="k">Revisão mensal</div><div class="v">${(() => { const d = nextLastFriday(r.monthly.time, r.monthly.tz, 1)[0]; return d ? fmtIn(d, r.monthly.tz) : '—'; })()}</div><div class="s">última sexta · 60 min</div></div>
      <div class="ps-stat"><div class="k">Aceite do manual v${MANUAL_VERSION}</div><div class="v">${ackCount}/2</div><div class="s">${ackCount === 2 ? 'os dois aceitaram' : 'pendente'}</div></div>
      <div class="ps-stat"><div class="k">Fundo de operação</div><div class="v">${eur(f.balance)}</div><div class="s">${state.product.name ? esc(state.product.name) + ' · ' + ({ construcao: 'construção', validacao: 'validação', escala: 'escala' }[state.product.phase] || '') : ''}</div></div>`);

    const upd = state.updatedAt ? `Última alteração neste navegador: ${new Date(state.updatedAt).toLocaleString('pt-BR')}${state.updatedBy ? ' por ' + esc(state.updatedBy) : ''}.` : 'Nenhuma alteração salva ainda: os valores são os padrões do manual.';
    out('updated', upd); out('updated-foot', upd);
  }

  function meetingText() {
    const m = state.meeting; const d = m.date ? new Date(m.date + 'T12:00:00').toLocaleDateString('pt-BR') : '(data)';
    const sec = (t, v) => `*${t}*\n${(v || '').trim() || '—'}`;
    return [`*Resumo da reunião semanal · ${d}*`, `Conduziu: ${P[m.lead] || '—'}`, '', sec('1. Números da semana', m.numbers), sec('2. Funil', m.funnel), sec('3. Projetos em execução', m.projects), sec('4. Produtos próprios', m.products), sec('5. Contas a receber', m.receivables), sec('Decisões', m.decisions), sec('Próximos passos', m.next)].join('\n');
  }

  /* ── Sincronização ─────────────────────────────────────────────── */
  const b64e = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const b64d = (s) => decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4))));
  const syncURL = () => location.origin + location.pathname + '?sync=' + b64e(JSON.stringify(state));
  function applyIncoming(obj, origin) {
    state = merge(DEFAULTS(), obj); save(true); render(); toast('Definições aplicadas' + (origin ? ' (' + origin + ')' : ''));
  }
  function checkIncoming() {
    const q = new URLSearchParams(location.search); const raw = q.get('sync'); if (!raw) return;
    history.replaceState(null, '', location.pathname + location.hash);
    let obj = null; try { obj = JSON.parse(b64d(raw)); } catch { toast('Link de sincronização inválido'); return; }
    const when = obj.updatedAt ? new Date(obj.updatedAt).toLocaleString('pt-BR') : 'sem data';
    const b = document.createElement('div'); b.className = 'ps-sync-banner';
    b.innerHTML = `<strong>Definições recebidas</strong><span>Enviadas por <strong>${esc(obj.updatedBy || 'sócio')}</strong> em ${esc(when)}: ${(obj.decisions || []).length} decisões, ${(obj.product?.milestones || []).length} marcos, ${(obj.fund?.entries || []).length} lançamentos no fundo. Aplicar substitui o que está salvo neste navegador.</span>
      <div class="ps-actions" style="margin:0"><button class="btn btn-primary btn-sm" id="sync-apply">Aplicar estas definições</button><button class="btn btn-ghost btn-sm" id="sync-ignore">Ignorar</button></div>`;
    $('#painel').prepend(b);
    $('#sync-apply').addEventListener('click', () => { b.remove(); applyIncoming(obj, 'de ' + (obj.updatedBy || 'sócio')); });
    $('#sync-ignore').addEventListener('click', () => b.remove());
  }

  /* ── Eventos ───────────────────────────────────────────────────── */
  let rendering = false;
  function onInput(e) {
    const el = e.target; const bind = el.dataset.bind; if (!bind || rendering) return;
    // selects e checkboxes disparam input+change: tratamos só o change (evita render duplo)
    if (e.type === 'input' && (el.tagName === 'SELECT' || el.type === 'checkbox')) return;
    let v = el.value;
    if (el.type === 'checkbox') v = el.checked;
    else if (el.dataset.type === 'int') v = parseInt(v, 10) || 0;
    else if (el.dataset.type === 'num') v = num(v);
    else if (el.dataset.type === 'bool') v = (v === 'true' || v === true);
    setPath(state, bind, v);
    if (el.dataset.kpi !== undefined) { state.kpis[+el.dataset.kpi].updated = todayISO(); const d = $(`[data-out="kpi-date-${el.dataset.kpi}"]`); if (d) d.textContent = state.kpis[+el.dataset.kpi].updated; }
    saveSoon();
    if (e.type === 'change' || el.tagName === 'SELECT' || el.type === 'checkbox' || el.type === 'number' || el.type === 'time' || el.type === 'date') {
      if (bind === 'calc.usePoints') { renderOnly('divisao'); return; }
      if (/^fund\.entries\.\d+\.(kind|amount)$/.test(bind)) { renderOnly('fundo'); return; }
      refresh();
    } else if (/^(meeting|calc|partners|product\.(name|phase))/.test(bind)) refresh();
  }
  function renderOnly(id) {
    if (rendering) return;
    const fn = { divisao: renderDivisao, fundo: renderFundo, pontos: renderPontos, decisoes: renderDecisoes, ferramentas: renderFerramentas, reuniao: renderReuniao }[id];
    const old = $('#' + id); if (!old || !fn) return;
    rendering = true;
    try { if (document.activeElement && old.contains(document.activeElement)) document.activeElement.blur(); const tmp = document.createElement('div'); tmp.innerHTML = fn(); old.replaceWith(tmp.firstElementChild); }
    finally { rendering = false; }
    refresh();
  }
  async function copy(text, msg) {
    const ok = window.Share ? await Share.copyText(text) : await navigator.clipboard.writeText(text).then(() => true, () => false);
    toast(ok ? (msg || 'Copiado') : 'Não foi possível copiar');
  }
  function onClick(e) {
    const btn = e.target.closest('[data-action]'); if (!btn) return;
    const a = btn.dataset.action; const i = +btn.dataset.i;
    const acts = {
      ics: downloadICS,
      ack: () => { state.ack[btn.dataset.k] = { version: MANUAL_VERSION, at: new Date().toISOString(), by: session.name }; save(); refresh(); },
      unack: () => { state.ack[btn.dataset.k] = null; save(); refresh(); },
      'add-milestone': () => { state.product.milestones.push({ t: '', pts: 0, owner: '', status: 'planejado', approved: false }); save(true); renderOnly('pontos'); },
      'rm-milestone': () => { if (confirm('Remover este marco?')) { state.product.milestones.splice(i, 1); save(); renderOnly('pontos'); } },
      'add-fund': () => { state.fund.entries.push({ date: todayISO(), desc: '', kind: 'entrada', amount: 0, who: '', approved: false }); save(true); renderOnly('fundo'); },
      'rm-fund': () => { if (confirm('Remover este lançamento?')) { state.fund.entries.splice(i, 1); save(); renderOnly('fundo'); } },
      'add-decision': () => { state.decisions.unshift({ date: todayISO(), text: '', by: session.name.toLowerCase().includes('michael') ? 'michael' : 'marcus', status: 'proposta' }); save(true); renderOnly('decisoes'); $('#decisoes textarea')?.focus(); },
      'rm-decision': () => { if (confirm('Remover esta decisão do registro?')) { state.decisions.splice(i, 1); save(); renderOnly('decisoes'); } },
      'copy-decisions': () => copy('*Decisões acordadas da sociedade*\n' + state.decisions.filter(d => d.status === 'acordada').map(d => `• ${d.date ? new Date(d.date + 'T12:00:00').toLocaleDateString('pt-BR') : ''} · ${d.text} (${P[d.by] || 'os dois'})`).join('\n'), 'Decisões copiadas'),
      'add-tool': () => { state.tools.push({ what: '', where: '', who: '', url: '' }); save(true); renderOnly('ferramentas'); },
      'rm-tool': () => { if (confirm('Remover esta ferramenta?')) { state.tools.splice(i, 1); save(); renderOnly('ferramentas'); } },
      'copy-summary': () => copy(meetingText(), 'Resumo copiado: cole no grupo'),
      'archive-summary': () => {
        const m = state.meeting; if (!m.numbers && !m.funnel && !m.projects && !m.decisions) { toast('Nada para arquivar ainda'); return; }
        m.history.unshift({ date: m.date || todayISO(), lead: m.lead, text: meetingText() }); m.history = m.history.slice(0, 12);
        Object.assign(m, { date: '', numbers: '', funnel: '', projects: '', products: '', receivables: '', decisions: '', next: '' });
        save(); renderOnly('reuniao');
      },
      'prefill-meeting': () => { const d = nextWeekly(state.rituals.weekly.dow, state.rituals.weekly.time, state.rituals.weekly.tz, 1)[0]; if (!d) return; const p = tzParts(d, state.rituals.weekly.tz); state.meeting.date = `${p.y}-${pad(p.m)}-${pad(p.d)}`; state.meeting.lead = weeklyLead(d); save(true); renderOnly('reuniao'); },
      'copy-split': () => { const s = split(); copy(`*Apuração do produto · ${state.product.name}*\nClientes: ${num(state.calc.clients)} × ${eur(num(state.calc.fee))} = ${eur(s.gross)}\nInfraestrutura: − ${eur(s.infra)}\nReceita líquida: ${eur(s.net)}\n\nOperação 20%: ${eur(s.op)}\nOriginação 15%: ${eur(s.orig)}\nVenda 15%: ${eur(s.sale)} (Marcus ${num(state.calc.salesMarcus)} · Michael ${num(state.calc.salesMichael)} clientes)\nConstrução 50%: ${eur(s.build)} (${s.pm} / ${s.pk} pts)\n\n*Marcus: ${eur(s.totM)}*\n*Michael: ${eur(s.totK)}*\nLiquidação até o dia 10.`, 'Apuração copiada'); },
      'sync-link': async () => { const u = syncURL(); const box = $('[data-out="sync-link"]'); box.hidden = false; box.textContent = u; await copy(u, 'Link copiado: mande pelo grupo'); },
      'sync-wa': () => { const u = syncURL(); window.open('https://wa.me/?text=' + encodeURIComponent(`Definições da sociedade (${new Date().toLocaleDateString('pt-BR')}). Abra com a senha de sócio e aplique:\n${u}`), '_blank', 'noopener'); },
      'sync-export': () => { const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `sociedade-${todayISO()}.json`; document.body.appendChild(a); a.click(); a.remove(); toast('Arquivo baixado'); },
      reset: () => { if (confirm('Restaurar os padrões do manual? Tudo o que foi definido neste navegador será apagado.')) { state = DEFAULTS(); save(); render(); } },
    };
    if (acts[a]) { e.preventDefault(); acts[a](); }
  }
  function onFile(e) {
    const el = e.target; if (el.dataset.action !== 'sync-import' || !el.files?.[0]) return;
    const fr = new FileReader(); fr.onload = () => { try { applyIncoming(JSON.parse(fr.result), 'arquivo'); } catch { toast('Arquivo inválido'); } }; fr.readAsText(el.files[0]);
    el.value = '';
  }
  function watchSubnav() {
    const links = $$('.ps-subnav a'); const secs = links.map(l => $(l.getAttribute('href'))).filter(Boolean);
    const upd = () => { const y = window.scrollY + 130; let cur = secs[0]?.id; secs.forEach(s => { if (s.offsetTop <= y) cur = s.id; }); links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur)); };
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }

  async function init() {
    session = Auth.current() || await Auth.restore();
    if (!session) return; // guard.js já redirecionou
    load(); render(); checkIncoming(); watchSubnav();
    document.addEventListener('input', onInput); document.addEventListener('change', (e) => { onInput(e); onFile(e); }); document.addEventListener('click', onClick);
    if (window.Share) Share.enhance('.ps-rules', { hint: 'Compartilhar' });
    if (location.hash) { const el = $(location.hash); if (el) setTimeout(() => el.scrollIntoView(), 60); }
    setInterval(refresh, 60000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
