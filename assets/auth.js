/* ═══════════════════════════════════════════════════════════════════
   AUTH — autenticação compartilhada do Portal da equipe
   ───────────────────────────────────────────────────────────────────
   Usada pelo portal (index.html), pela Academia (onboarding/) e pelo
   guarda de páginas (assets/guard.js). Uma única sessão vale para o
   site inteiro (mesmo domínio → mesmo localStorage).

   PERFIS
     vendedor  → área do vendedor: onboarding, cursos, playbook, materiais
     admin     → tudo do vendedor + área do admin (manual operacional,
                 painel, pendências). Admin sempre pode o que vendedor pode.

   A senha digitada define o perfil: cada perfil tem a sua senha.

   TROCAR UMA SENHA (modo "password")
     printf '%s' 'NovaSenha' | sha256sum
     → cole o hash em roles.<perfil>.passwordHash. As sessões antigas
       daquele perfil caem sozinhas (o token guardado deixa de bater).

   MIGRAR PARA O CLERK (login individual por e-mail/Google)
     1. Crie a aplicação em https://dashboard.clerk.com
     2. Cole a Publishable key em clerkPublishableKey
     3. Troque provider para 'clerk'
     4. No Clerk, defina publicMetadata.role = 'admin' ou 'vendedor'
        em cada usuário (sem valor → 'vendedor').

   ⚠ Limite do modo "password": protege contra acesso casual (páginas
   com noindex, conteúdo não aparece sem senha), mas um site estático
   pode ter o código lido no navegador. Para controle real por pessoa,
   use o Clerk.
   ═══════════════════════════════════════════════════════════════════ */

const AUTH_CONFIG = {
  provider: 'password',            // 'password' | 'clerk'

  roles: {
    vendedor: { label: 'Vendedor(a)', passwordHash: '81d8671df45f493f160dfb5e375b6d73e49092f0a643ee9694308b631128d53a' },
    admin:    { label: 'Admin',       passwordHash: 'a36aef5a11c4073fbe60314fc9df530a9d5f986533594d1f5190742ff9e0e408' },
  },

  // Clerk (usado apenas quando provider === 'clerk')
  clerkPublishableKey: '',         // ex.: 'pk_live_xxxxxxxxxxxxxxxx'
  clerkVersion: '5',
  clerkRoleKey: 'role',            // publicMetadata[clerkRoleKey]
};

const Auth = (() => {
  const SESSION_KEY = 'mf_session';
  const RANK = { vendedor: 1, admin: 2 };
  let current = null;

  async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  const readSession = () => { try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } };
  const writeSession = (s) => { try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch { /* modo privado */ } };
  const clearSession = () => { try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ } };

  /* ── Provider: senha por perfil ────────────────────────────────── */
  const passwordProvider = {
    async restore() {
      const s = readSession();
      if (!s || s.provider !== 'password' || !s.name) return null;
      const role = AUTH_CONFIG.roles[s.role];
      if (!role || role.passwordHash !== s.token) return null;   // senha trocada → sessão cai
      return s;
    },
    async login({ name, password }) {
      if (!crypto?.subtle) throw new Error('Este navegador não suporta verificação segura de senha. Use um navegador atualizado.');
      const hash = await sha256(password);
      const roleId = Object.keys(AUTH_CONFIG.roles).find(r => AUTH_CONFIG.roles[r].passwordHash === hash);
      if (!roleId) return null;
      const session = { provider: 'password', name: name.trim(), role: roleId, token: hash, since: Date.now() };
      writeSession(session);
      return session;
    },
    async logout() { clearSession(); },
  };

  /* ── Provider: Clerk (login individual) ────────────────────────── */
  const clerkProvider = {
    _clerk: null,
    async _load() {
      if (this._clerk) return this._clerk;
      const key = AUTH_CONFIG.clerkPublishableKey;
      if (!key) throw new Error('Clerk: informe clerkPublishableKey em assets/auth.js');
      const frontendApi = atob(key.split('_')[2] || '').replace(/\$$/, '');
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.async = true; s.crossOrigin = 'anonymous';
        s.setAttribute('data-clerk-publishable-key', key);
        s.src = `https://${frontendApi}/npm/@clerk/clerk-js@${AUTH_CONFIG.clerkVersion}/dist/clerk.browser.js`;
        s.onload = resolve; s.onerror = () => reject(new Error('Falha ao carregar o Clerk'));
        document.head.appendChild(s);
      });
      await window.Clerk.load();
      this._clerk = window.Clerk;
      return this._clerk;
    },
    _sessionFromUser(user) {
      const name = user.firstName || user.username || (user.primaryEmailAddress?.emailAddress || '').split('@')[0] || 'Vendedor(a)';
      const role = (user.publicMetadata || {})[AUTH_CONFIG.clerkRoleKey];
      return { provider: 'clerk', name, role: RANK[role] ? role : 'vendedor', userId: user.id, since: Date.now() };
    },
    async restore() { const c = await this._load(); return c.user ? this._sessionFromUser(c.user) : null; },
    async mount(el, onSignedIn) {
      const c = await this._load();
      c.mountSignIn(el, { appearance: { variables: { colorPrimary: '#B8830F' } } });
      c.addListener(({ user }) => { if (user) onSignedIn(this._sessionFromUser(user)); });
    },
    async login() { return null; },
    async logout() { const c = await this._load(); await c.signOut(); clearSession(); },
  };

  const provider = AUTH_CONFIG.provider === 'clerk' ? clerkProvider : passwordProvider;

  return {
    mode: AUTH_CONFIG.provider,
    async restore() { current = await provider.restore(); return current; },
    async login(creds) { current = await provider.login(creds); return current; },
    async logout() { await provider.logout(); current = null; },
    current: () => current,
    /** O perfil da sessão cobre o perfil exigido? (admin ⊇ vendedor) */
    can: (role, session = current) => !!session && (RANK[session.role] || 0) >= (RANK[role] || 0),
    roleLabel: (role) => (AUTH_CONFIG.roles[role] || {}).label || role,
    mountClerk: (el, cb) => (provider.mount ? provider.mount(el, cb) : Promise.resolve()),
  };
})();
