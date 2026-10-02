# Portal da equipe — Marcus Fernandes

Site interno da consultoria (sites, Google Business Profile, agendamento e automação para negócios locais no Brasil e na Europa). Estático: HTML, CSS e JavaScript puro, sem build. Publique a pasta inteira em qualquer hospedagem estática.

## Mapa do site

| Caminho | O que é | Quem acessa |
|---|---|---|
| `index.html` | **Portal**: login e menu por perfil (Início · Onboarding · Cursos · Playbook · Materiais · Admin) | todos |
| `onboarding/` | **Academia de Vendas**: curso interativo de onboarding, vídeos explicativos, cola rápida, folheto e glossário | colaborador e admin |
| `playbook/comercial.html` | **Playbook Comercial** (Marcus & Michael, v1.0): o processo comercial, do primeiro contato ao contrato. Em divergência, manda | colaborador e admin |
| `playbook/` | **Sales & Outreach Playbook** (Dublin): scripts PT/EN, sequências B e C, WhatsApp, LinkedIn, compliance e infraestrutura de e-mail | colaborador e admin |
| `colaborador/objecoes.html` | Infográfico das 7 objeções (Vendas & PNL) | colaborador e admin |
| `admin/workflow-engenharia.html` | **Workflow de Engenharia** (v1.0): método de trabalho com Claude Code para as três frentes e o ciclo completo de um SaaS (ideia → produção → operação) | só admin |
| `admin/manual-operacional.html` | **Manual Operacional (Brasil)**: modelo de negócio, fiscal, contratos, pagamento, SLA, cancelamento | só admin |
| `assets/auth.js` | Autenticação compartilhada (senha por perfil hoje; Clerk depois) | — |
| `assets/guard.js` | Protege cada página por perfil e injeta a barra de navegação do portal (com botão PDF) | — |
| `assets/share.js` | Copiar texto (pronto para WhatsApp/e-mail), copiar imagem e imprimir/PDF de qualquer bloco | — |
| `assets/portal.js` / `portal.css` | Conteúdo e visual do portal | — |

## Perfis e acesso

Uma sessão vale para o site inteiro. A senha digitada define o perfil:

| Perfil | Vê | Senha |
|---|---|---|
| **Colaborador(a)** | Portal, Academia, Playbook, materiais, folheto para o cliente | hash em `roles.colaborador` |
| **Admin** | Tudo do colaborador + área do admin, Workflow de Engenharia e Manual Operacional | hash em `roles.admin` |

As senhas não ficam em texto puro: só o hash SHA-256, em `assets/auth.js`. Para trocar:

```bash
printf '%s' 'NovaSenha' | sha256sum
```

Cole o hash no perfil correspondente. As sessões antigas daquele perfil caem sozinhas.

> Limite: em site estático, uma senha compartilhada protege contra acesso casual (páginas com `noindex`, conteúdo só aparece com sessão), mas não substitui login individual. Para saber quem entrou e revogar acesso por pessoa, ative o Clerk: em `assets/auth.js`, troque `provider` para `'clerk'` e preencha `clerkPublishableKey`. O perfil de cada usuário vem de `publicMetadata.role` (`admin` ou `colaborador`).

## Como proteger uma página nova

No `<head>`:

```html
<script src="../assets/auth.js"></script>
<script src="../assets/guard.js" data-role="colaborador"></script>  <!-- ou data-role="admin" -->
```

Sem sessão válida a página redireciona para o portal e volta sozinha depois do login. A barra preta do portal é injetada automaticamente (`data-bar="off"` desliga).

## Editar conteúdo

- Curso, prova, cola rápida e glossário: `onboarding/content.js` (ver `onboarding/README.md`).
- Menus, trilhas rápidas, checklist do admin e pendências: `assets/portal.js`.
- Playbooks e Manual: HTML direto nas respectivas pastas. O Playbook Comercial é a fonte de verdade do processo; ao mudar um número lá (funil, score, pagamento, duração da reunião), replique em `onboarding/content.js` (busque pelo número) e na seção correspondente do Playbook Dublin.
