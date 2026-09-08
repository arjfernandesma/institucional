# Academia de Vendas — onboarding interativo

Curso de boas-vindas para novos vendedores da consultoria (sites, Google Business Profile, agendamento e automação para negócios locais), cobrindo os dois mercados: **Brasil** e **Europa/Irlanda**.

Abra `onboarding/index.html` (ou `/onboarding/` no domínio publicado). É 100% estático: HTML, CSS e JavaScript puro, sem build, sem dependências além das fontes do Google.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Casca da aplicação (tela de acesso + app) |
| `styles.css` | Visual (mesmos tokens de cor e tipografia do playbook) |
| `auth.js` | Autenticação: senha compartilhada hoje, Clerk depois |
| `content.js` | **Todo o conteúdo do curso** — módulos, lições, quizzes, cenários, prova final |
| `app.js` | Motor do curso: navegação, progresso, componentes interativos, certificado |

## Acesso

**Hoje (modo `password`)**: uma senha única para a equipe. A senha não fica em texto puro no código — apenas o hash SHA-256 dela, em `auth.js` (`AUTH_CONFIG.passwordHash`).

Para trocar a senha:

```bash
printf '%s' 'NovaSenha' | sha256sum
```

Cole o hash em `AUTH_CONFIG.passwordHash`.

> Limite: em um site estático, uma senha compartilhada protege contra acesso casual (a página tem `noindex` e o conteúdo não aparece sem ela), mas não substitui login individual. Para saber quem entrou e revogar acesso por pessoa, use o Clerk.

**Depois (modo `clerk`)**: em `auth.js`, troque `provider` para `'clerk'` e preencha `clerkPublishableKey` com a chave do painel do Clerk. A tela de senha some e o widget de login do Clerk aparece no lugar. Nada mais precisa mudar.

## Progresso do aluno

O progresso (lições concluídas, respostas, nota da prova) fica no `localStorage` do navegador, por nome de usuário. Trocar de navegador ou limpar dados zera o progresso. Com o Clerk ativo, o mesmo mecanismo passa a usar o ID do usuário.

## Editando o conteúdo

Tudo está em `content.js`. Cada módulo tem lições; cada lição é uma lista de **blocos**:

| Bloco | Uso |
|---|---|
| `text` | Parágrafos (HTML simples) |
| `callout` | Destaque (`tone`: `tip`, `warn`, `rule`, `info`) |
| `cards` | Grade de cartões-conceito |
| `compare` | Tabela Brasil × Europa |
| `table` | Tabela simples |
| `steps` | Linha do tempo numerada |
| `stat` | Números grandes |
| `script` | Texto pronto para copiar, PT e EN (`{Seu nome}` vira o nome do aluno) |
| `flashcards` | Cartões que viram (glossário, frases em inglês) |
| `checklist` | Lista de verificação clicável |
| `quiz` | Pergunta de múltipla escolha com explicação — **obrigatório para concluir a lição** |
| `scenario` | Simulação: o cliente diz algo, o aluno escolhe a resposta — **obrigatório** |
| `order` | Colocar passos na ordem certa — **obrigatório** |
| `scorer` | Calculadora de score de qualificação (ICP) |

A prova final fica em `COURSE.exam`; a nota mínima em `passScore`. O certificado usa o nome informado no acesso.

## Preços

Os valores em euro vêm do Sales & Outreach Playbook v1.0 (Dublin). Os valores em real vêm do Manual Operacional de abril/2026. Se algum preço mudar, atualize em `content.js` (busque por `€` ou `R$`) e na seção **Cola rápida** (`CHEATSHEET`).
