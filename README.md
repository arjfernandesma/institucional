# Portal da equipe — Marcus Fernandes

Site interno da consultoria (sites, Google Business Profile, agendamento e automação para negócios locais no Brasil e na Europa). Estático: HTML, CSS e JavaScript puro, sem build. Publique a pasta inteira em qualquer hospedagem estática.

## Mapa do site

| Caminho | O que é | Quem acessa |
|---|---|---|
| `index.html` | **Portal**: login e menu por perfil (Início · Onboarding · Cursos · Playbook · Materiais · Admin) | todos |
| `onboarding/` | **Academia de Vendas**: curso interativo de onboarding, cola rápida e glossário | vendedor e admin |
| `playbook/` | **Sales & Outreach Playbook** (Dublin): manual de prospecção e venda com scripts PT/EN | vendedor e admin |
| `vendedor/objecoes.html` | Infográfico das 7 objeções (Vendas & PNL) | vendedor e admin |
| `admin/manual-operacional.html` | **Manual Operacional (Brasil)**: modelo de negócio, fiscal, contratos, pagamento, SLA, cancelamento | só admin |
| `assets/auth.js` | Autenticação compartilhada (senha por perfil hoje; Clerk depois) | — |
| `assets/guard.js` | Protege cada página por perfil e injeta a barra de navegação do portal | — |
| `assets/portal.js` / `portal.css` | Conteúdo e visual do portal | — |

## Perfis e acesso

Uma sessão vale para o site inteiro. A senha digitada define o perfil:

| Perfil | Vê | Senha |
|---|---|---|
| **Vendedor(a)** | Portal, Academia, Playbook, materiais | hash em `roles.vendedor` |
| **Admin** | Tudo do vendedor + área do admin e Manual Operacional | hash em `roles.admin` |

As senhas não ficam em texto puro: só o hash SHA-256, em `assets/auth.js`. Para trocar:

```bash
printf '%s' 'NovaSenha' | sha256sum
```

Cole o hash no perfil correspondente. As sessões antigas daquele perfil caem sozinhas.

> Limite: em site estático, uma senha compartilhada protege contra acesso casual (páginas com `noindex`, conteúdo só aparece com sessão), mas não substitui login individual. Para saber quem entrou e revogar acesso por pessoa, ative o Clerk: em `assets/auth.js`, troque `provider` para `'clerk'` e preencha `clerkPublishableKey`. O perfil de cada usuário vem de `publicMetadata.role` (`admin` ou `vendedor`).

## Como proteger uma página nova

No `<head>`:

```html
<script src="../assets/auth.js"></script>
<script src="../assets/guard.js" data-role="vendedor"></script>  <!-- ou data-role="admin" -->
```

Sem sessão válida a página redireciona para o portal e volta sozinha depois do login. A barra preta do portal é injetada automaticamente (`data-bar="off"` desliga).

## Editar conteúdo

- Curso, prova, cola rápida e glossário: `onboarding/content.js` (ver `onboarding/README.md`).
- Menus, trilhas rápidas, checklist do admin e pendências: `assets/portal.js`.
- Playbook e Manual: HTML direto nas respectivas pastas.
