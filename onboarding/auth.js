/* ═══════════════════════════════════════════════════════════════════
   AUTH — camada de autenticação da Academia de Vendas
   ───────────────────────────────────────────────────────────────────
   Hoje:   provider "password"  → senha única compartilhada com a equipe.
   Depois: provider "clerk"     → login individual por e-mail/Google.

   Para trocar para o Clerk:
     1. Crie uma aplicação em https://dashboard.clerk.com
     2. Copie a "Publishable key" (começa com pk_live_ ou pk_test_)
     3. Troque AUTH_CONFIG.provider para "clerk" e cole a chave abaixo
     4. Pronto — a tela de senha some e o widget de login do Clerk aparece.

   Para trocar a senha (modo "password"):
     - Gere o SHA-256 da nova senha (ex.: no terminal:
         printf '%s' 'NovaSenha' | sha256sum
       ou em https://emn178.github.io/online-tools/sha256.html)
     - Cole o hash em AUTH_CONFIG.passwordHash.
     A senha nunca fica em texto puro neste arquivo.

   ⚠ Limite do modo "password": é uma proteção contra acesso casual
   (a página não é indexada e o material não aparece sem a senha), mas
   qualquer site estático pode ter o código lido no navegador. Para
   controle real por pessoa, use o Clerk.
   ═══════════════════════════════════════════════════════════════════ */

const AUTH_CONFIG = {
  provider: 'password',            // 'password' | 'clerk'

  // SHA-256 da senha atual
  passwordHash: '81d8671df45f493f160dfb5e375b6d73e49092f0a643ee9694308b631128d53a',

  // Clerk (usado apenas quando provider === 'clerk')
  clerkPublishableKey: '',         // ex.: 'pk_live_xxxxxxxxxxxxxxxx'
  clerkVersion: '5',
};

const Auth = (() => {
  const SESSION_KEY = 'mf_academy_session';

  async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function readSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
  }
  function writeSession(s) {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch { /* modo privado */ }
  }
  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
  }

  /* ── Provider: senha compartilhada ─────────────────────────────── */
  const passwordProvider = {
    async restore() {
      const s = readSession();
      if (s && s.provider === 'password' && s.token === AUTH_CONFIG.passwordHash && s.name) return s;
      return null;
    },
    async login({ name, password }) {
      if (!crypto?.subtle) {
        throw new Error('Este navegador não suporta verificação segura de senha. Use um navegador atualizado.');
      }
      const hash = await sha256(password);
      if (hash !== AUTH_CONFIG.passwordHash) return null;
      const session = { provider: 'password', name: name.trim(), token: hash, since: Date.now() };
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
      if (!key) throw new Error('Clerk: informe clerkPublishableKey em auth.js');
      // A frontend API vem codificada na própria publishable key
      const frontendApi = atob(key.split('_')[2] || '').replace(/\$$/, '');
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.async = true;
        s.crossOrigin = 'anonymous';
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
      return { provider: 'clerk', name, userId: user.id, since: Date.now() };
    },
    async restore() {
      const clerk = await this._load();
      return clerk.user ? this._sessionFromUser(clerk.user) : null;
    },
    /* No modo Clerk o widget de login é montado; a "senha" não é usada. */
    async mount(el, onSignedIn) {
      const clerk = await this._load();
      clerk.mountSignIn(el, { appearance: { variables: { colorPrimary: '#B8830F' } } });
      clerk.addListener(({ user }) => { if (user) onSignedIn(this._sessionFromUser(user)); });
    },
    async login() { return null; },
    async logout() { const clerk = await this._load(); await clerk.signOut(); clearSession(); },
  };

  const provider = AUTH_CONFIG.provider === 'clerk' ? clerkProvider : passwordProvider;

  return {
    mode: AUTH_CONFIG.provider,
    restore: () => provider.restore(),
    login: (creds) => provider.login(creds),
    logout: () => provider.logout(),
    mountClerk: (el, cb) => (provider.mount ? provider.mount(el, cb) : Promise.resolve()),
  };
})();
