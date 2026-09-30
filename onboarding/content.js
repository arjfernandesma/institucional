/* ═══════════════════════════════════════════════════════════════════
   CONTEÚDO DO CURSO — Academia de Vendas · Marcus Fernandes
   ───────────────────────────────────────────────────────────────────
   Fontes: site marcusfernandes.ie (set/2026), Sales & Outreach
   Playbook v1.0 (Dublin) e Manual Operacional (abr/2026, Brasil).

   Edite aqui. Tipos de bloco: text, callout, cards, table, compare,
   steps, stat, script, flashcards, checklist, quiz, scenario, order,
   scorer. `{Seu nome}` vira o nome de quem está fazendo o curso.
   ═══════════════════════════════════════════════════════════════════ */

const GLOSSARY = [
  { term: 'Site institucional', en: 'website', def: 'A "casa" oficial do negócio na internet: quem é, o que faz, onde fica, como contratar. É o que aparece quando alguém procura pelo nome no Google.' },
  { term: 'Google Business Profile', en: 'GBP · Google Meu Negócio', def: 'A ficha do negócio que aparece no Google Maps e na lateral da busca, com fotos, horário, avaliações e telefone. Para negócio local, vale tanto quanto o site.' },
  { term: 'SEO local', en: 'local SEO', def: 'Fazer o negócio aparecer quando alguém da região busca o que ele faz ("cabeleireiro Blanchardstown", "hamburgueria Natal"). Para o cliente, diga só: "aparecer no Google para quem busca perto de você".' },
  { term: 'Domínio', en: 'domain', def: 'O endereço do site (marcusfernandes.ie, nomedonegocio.com.br). É registrado sempre em nome do cliente, nunca no nosso.' },
  { term: 'Hospedagem', en: 'hosting', def: 'O "aluguel" do servidor onde o site fica guardado e ligado 24h. Está incluída na manutenção.' },
  { term: 'SSL / HTTPS', en: 'SSL', def: 'O cadeado no navegador. Mostra que o site é seguro. Sem ele, o Google avisa "site não seguro" e o cliente foge.' },
  { term: 'Responsivo', en: 'mobile-friendly', def: 'Site que funciona bem no celular. A maioria dos clientes de negócio local busca pelo celular, então site que "quebra no celular" é o mesmo que não ter site.' },
  { term: 'CMS', en: 'painel administrativo', def: 'Painel onde o próprio cliente edita textos, fotos, preços e horários sem chamar ninguém. No Brasil, é a Modalidade B (Autônomo).' },
  { term: 'Landing page', en: 'landing page', def: 'Página única focada em uma ação só (agendar, pedir orçamento), geralmente para campanha.' },
  { term: 'E-commerce', en: 'loja online', def: 'Loja com carrinho e pagamento online. Entra na frente Custom, com escopo e número fechados antes.' },
  { term: 'Sistema de agendamento', en: 'booking system', def: 'Botão/formulário no site em que o cliente marca horário sozinho, sem ligar. É "o agendamento que para de comer a sua tarde".' },
  { term: 'Automação', en: 'automation', def: 'Fazer o computador repetir tarefas chatas: confirmar agendamento, responder no WhatsApp, avisar no e-mail. Fase avançada; só depois do site.' },
  { term: 'Auditoria gratuita', en: 'free audit', def: 'Documento de duas páginas, em linguagem simples, que diz onde o negócio está online e as três coisas que corrigiríamos primeiro. Entregue em 48h. É a porta de entrada na Europa.' },
  { term: 'Esboço pronto (preview)', en: 'preview / MVP', def: 'Versão do site construída antes de falar com o cliente, com as fotos, avaliações e nomes da equipe dele. É a porta de entrada no Brasil: o cliente vê antes de pagar.' },
  { term: 'Prospect', en: 'prospect', def: 'Negócio que pode virar cliente, mas ainda não conversamos. Vira "lead" quando responde com interesse.' },
  { term: 'Lead', en: 'lead', def: 'Prospect que respondeu e demonstrou interesse. Quem não respondeu a três e-mails não é lead.' },
  { term: 'Score 0–100', en: 'qualificação', def: 'Nota que cada prospect recebe antes do contato: cinco fatores de 20 pontos (Web, Sinal, Reputação, Contato, Atividade). Só se aborda acima de 60.' },
  { term: 'ICP (perfil de cliente ideal)', en: 'ideal customer profile', def: 'A descrição do cliente que mais compra e mais fica satisfeito. Prospectar fora do ICP consome o mesmo tempo e não converte.' },
  { term: 'Prospecção / outreach', en: 'outreach', def: 'Entrar em contato com quem ainda não nos conhece: e-mail, DM, WhatsApp, LinkedIn, ligação.' },
  { term: 'Cold email', en: 'cold email', def: 'E-mail para alguém que nunca falou com a gente. Só funciona quando traz três achados específicos sobre o negócio da pessoa.' },
  { term: 'DM', en: 'direct message', def: 'Mensagem direta no Instagram ou Facebook. No Brasil, é o canal principal de abordagem.' },
  { term: 'Sequência (A, B, C)', en: 'sequence', def: 'Conjunto de mensagens em ordem. A = auditoria primeiro; B = voucher primeiro; C = indicação. Sempre param no terceiro e-mail.' },
  { term: 'Follow-up', en: 'follow-up', def: 'Mensagem de acompanhamento depois da primeira, quando não houve resposta. Tem número máximo; depois disso, para.' },
  { term: 'Reunião de diagnóstico', en: 'discovery call', def: 'Trinta minutos, agendados por link e gravados, para entender o problema e decidir se há projeto. Quem fala mais é o cliente. O preço não é dito nela: fica para a reunião de proposta.' },
  { term: 'Ficha de passagem', en: 'handover', def: 'Documento preenchido no dia do "sim": o que foi vendido, para quem, com que promessas, prazos e dependências. É o que a entrega vai ler.' },
  { term: 'Régua de cobrança', en: 'dunning', def: 'Calendário de avisos e ações quando o pagamento atrasa. Tem dono e tem data; não depende de lembrar.' },
  { term: 'Walk-through', en: 'demonstração', def: 'Mostrar o esboço do site no celular do cliente, falando pouco e deixando o site falar. Usado principalmente no Brasil.' },
  { term: 'Objeção', en: 'objection', def: 'Quando o cliente diz "tá caro", "vou pensar", "não tenho tempo". Não é recusa: é sinal de que falta informação para decidir.' },
  { term: 'Desarmar · Isolar · Discutir · Compromisso', en: 'objeções', def: 'A estrutura para toda objeção: desarmar tira a tensão, isolar descobre se é a objeção real, discutir trata o que ficou, compromisso fecha com próximo passo e data.' },
  { term: 'Proposta', en: 'proposal', def: 'PDF de 2–3 páginas enviado até 48h depois da conversa, com o que o cliente contou, o que vamos construir, preço, prazo e próximo passo.' },
  { term: 'Trading Online Voucher', en: 'TOV · LEO', def: 'Programa do governo irlandês (Local Enterprise Office) que paga até 50% do custo de colocar um negócio online, até €2.500. Leva 3–6 semanas.' },
  { term: 'Local Enterprise Office', en: 'LEO', def: 'Órgão irlandês de apoio a pequenos negócios, responsável pelo Trading Online Voucher.' },
  { term: 'PIX', en: 'Brasil', def: 'Pagamento instantâneo brasileiro, sem taxa. Nossa forma preferida de receber no Brasil.' },
  { term: 'SEPA', en: 'Europa', def: 'Transferência bancária em euro entre países da Europa. Uma das formas de receber de clientes europeus, junto com Stripe e Wise.' },
  { term: 'Assinatura digital', en: 'e-signature', def: 'Contrato assinado online. Brasil: Clicksign, D4Sign, Autentique. Exterior: DocuSign, HelloSign.' },
  { term: 'NF-e', en: 'nota fiscal', def: 'Nota fiscal eletrônica de serviço. Emitida em todo pagamento no Brasil.' },
  { term: 'LGPD', en: 'Brasil', def: 'Lei brasileira de proteção de dados. O site precisa de política de privacidade e consentimento nos formulários.' },
  { term: 'GDPR', en: 'Europa', def: 'Regulamento europeu de proteção de dados. Na prospecção, exige identificação clara, opção de sair (opt-out) e lista de supressão.' },
  { term: 'Opt-out', en: 'opt-out', def: 'A pessoa pode pedir para não receber mais mensagens. Toda mensagem precisa oferecer isso, e o pedido é cumprido na hora e para sempre.' },
  { term: 'Lista de supressão', en: 'suppression list', def: 'Lista de quem disse "não" ou não respondeu a três e-mails. É checada antes de todo envio. Nunca se aborda de novo quem está nela.' },
  { term: 'Entregabilidade', en: 'deliverability', def: 'Se o e-mail chega na caixa de entrada ou cai no spam. Depende de domínio de envio configurado, volume baixo e nada de anexo no primeiro e-mail.' },
  { term: 'SPF / DKIM / DMARC', en: 'e-mail', def: 'Configurações técnicas que provam que o e-mail é legítimo. Quem cuida é o Marcus; você só precisa saber que sem elas o e-mail vai para o spam.' },
  { term: 'Domínio de envio', en: 'sending domain', def: 'Endereço separado usado só para prospecção. Nunca se envia cold email de marcusfernandes.ie.' },
  { term: 'Taxa de resposta', en: 'reply rate', def: 'Quantos respondem entre os que receberam. Meta: 5% ou mais. Abaixo de 2% = personalização fraca. Um e-mail genérico converte a 0,5%.' },
  { term: 'Manutenção / MRR', en: 'recurring revenue', def: 'Receita mensal (€60–150) que mantém o site no ar, atualizado e seguro. Apresentada como parte do projeto desde o primeiro dia, nunca como extra. Trinta clientes em manutenção pagam a operação.' },
  { term: 'Land & Expand', en: 'modelo', def: 'Entrar pelo site (barato e tangível) e crescer para automação e sistemas conforme a confiança aumenta.' },
  { term: 'Ritual de encerramento', en: 'close-out', def: 'Os 30 minutos ao fim de cada projeto: vídeo, foto, antes/depois, um número, permissão e pedido de indicação.' },
  { term: 'Estudo de caso', en: 'case study', def: 'História curta de um cliente com um número real ("pedidos de orçamento 3×"). Sem número, não vai ao ar.' },
];

/* ─────────────────────────────────────────────────────────────────── */

const COURSE = {
  afterCourse: 'Combine com o administrador a sua primeira semana: acompanhe uma discovery call, monte sua primeira lista de 50 prospects (um vertical, uma área) e escreva três achados específicos para dez deles antes de enviar qualquer mensagem. Revise a Cola rápida antes de toda conversa.',

  scorer: {
    threshold: 60,
    factors: [
      { label: 'Web', hint: 'o site dele', options: [['Não tem site', 20], ['Sem HTTPS ou fora do ar', 12], ['Não funciona no celular', 8], ['Site saudável', 0]] },
      { label: 'Sinal', hint: 'perfil do Google', options: [['Sem fotos e sem horário', 20], ['Falta um dos dois', 10], ['Completo', 0]] },
      { label: 'Reputação', hint: 'avaliações', options: [['Nota ≥ 4,0 com 10+ avaliações', 20], ['Nota ≥ 4,0 com menos de 10 avaliações', 12], ['Nota abaixo de 4,0', 6], ['Sem avaliações', 0]] },
      { label: 'Contato', hint: 'canal para abordar', options: [['Telefone e e-mail válidos', 20], ['Só telefone', 10], ['Nenhum', 0]] },
      { label: 'Atividade', hint: 'responde às avaliações?', options: [['Avaliações recentes sem resposta', 20], ['Responde a algumas', 10], ['Responde a todas', 0]] },
    ],
  },

  modules: [
    /* ═══════════════════════════ MÓDULO 1 ═══════════════════════════ */
    {
      id: 'boas-vindas', icon: '👋', minutes: 12,
      title: 'Bem-vinda(o) à consultoria',
      subtitle: 'Quem somos, o que fazemos e qual é o seu papel na equipe.',
      lessons: [
        {
          id: 'quem-somos', title: 'Quem somos e o que fazemos',
          blocks: [
            { type: 'text', html: `<p>Olá, {Seu nome}. Antes de qualquer script ou preço, você precisa entender uma coisa: <strong>nós não vendemos sites</strong>. Vendemos os clientes que hoje vão para o concorrente com um produto pior e uma presença online melhor.</p><p>Tudo o que você vai aprender aqui aponta para essa lacuna.</p>` },
            {"type": "video", "title": "O que vendemos, em 60 segundos", "desc": "A ideia central da consultoria, do jeito que você vai explicar ao cliente.", "scenes": [{"dur": 6, "caption": "A frase que resume a consultoria.", "narration": "Seu negócio é bom. Online, ele é invisível. Essa frase resume tudo o que a consultoria faz.", "visual": {"kind": "title", "eyebrow": "Academia de Vendas", "text": "Seu negócio é bom. <em>Online, ele é invisível.</em>"}}, {"dur": 9, "caption": "Alguém busca o serviço dele. O concorrente aparece; ele não.", "narration": "Quando alguém busca o serviço no Google, o concorrente aparece primeiro. O nosso cliente está na página dois, onde ninguém olha. É essa lacuna que a gente resolve.", "visual": {"kind": "phone", "query": "cabeleireiro Blanchardstown", "results": [{"name": "Salon X · 4,8 ★", "sub": "Blanchardstown · aberto agora"}, {"name": "Hair Studio · 4,6 ★", "sub": "Castleknock"}, {"name": "Barber Co · 4,5 ★", "sub": "Ongar", "dim": true}, {"name": "Salão do nosso cliente", "sub": "página 2 · sem site", "you": true}], "footer": "Quem está na página 2 não é encontrado"}}, {"dur": 8, "caption": "São esses três problemas que resolvemos.", "narration": "Três coisas custam dinheiro ao dono do negócio toda semana: estar invisível no Google, não ter site ou ter um que quebra no celular, e ainda agendar tudo por telefone.", "visual": {"kind": "bullets", "title": "Três problemas que custam dinheiro toda semana", "items": ["Invisível no Google", "Sem site, ou com um quebrado", "Agendamento ainda por telefone"]}}, {"dur": 10, "caption": "A metade online do negócio, mantida no ar todo mês.", "narration": "Nós construímos a metade online do negócio: o site, a ficha do Google, o agendamento que para de comer a tarde dele, e a manutenção mensal para o site não envelhecer.", "visual": {"kind": "steps", "items": [{"title": "O site", "text": "de 1 ou 5 páginas, no domínio do cliente"}, {"title": "A ficha do Google", "text": "verificada e configurada"}, {"title": "O agendamento", "text": "que para de comer a tarde dele"}, {"title": "A manutenção", "text": "€60–150/mês, para o site não envelhecer"}]}}, {"dur": 8, "caption": "Lembre disso em toda conversa.", "narration": "Nós não vendemos sites. Vendemos os clientes que hoje vão para o concorrente com uma presença online melhor. Lembre disso em toda conversa.", "visual": {"kind": "title", "text": "Nós não vendemos <em>sites</em>.", "sub": "Vendemos os clientes que hoje vão para o concorrente com presença online melhor."}}]},
            { type: 'callout', tone: 'rule', title: 'A frase que resume a consultoria', html: `<em>"Your business is good. Online, it's invisible."</em> — Seu negócio é bom. Online, ele é invisível. É a primeira frase do site marcusfernandes.ie e o resumo de todo o nosso trabalho.` },
            { type: 'stat', items: [
              { value: 'Dublin 15', label: 'Base na Irlanda, clientes no mundo todo' },
              { value: '2022', label: 'Início da consultoria' },
              { value: '12+', label: 'Projetos entregues' },
              { value: 'WhatsApp', label: 'Suporte direto, no mesmo dia' },
            ] },
            { type: 'text', html: `<h4>Quem é o Marcus</h4><p>Nove anos em tecnologia, quatro deles na Irlanda. Carreira construída no Brasil em suporte de TI, análise de sistemas, BI e infraestrutura, antes de se mudar para Dublin em 2022. Ouvia sempre a mesma história de donos de pequenos negócios: trabalho impecável no presencial, perdendo cliente para um concorrente pior, só porque o outro tinha um site melhor. A consultoria nasceu para resolver isso, uma loja por vez.</p>` },
            { type: 'text', html: `<h4>Os três problemas que resolvemos</h4><p>São os três que "silenciosamente custam dinheiro toda semana" ao dono de negócio local. Decore: é assim que você vai abrir quase toda conversa.</p>` },
            { type: 'cards', items: [
              { icon: '🔍', title: 'Invisível no Google', html: 'Alguém na região busca o que ele faz. O concorrente aparece; ele não. Esse é o jogo inteiro, e se resolve em semanas, não meses.' },
              { icon: '📵', title: 'Sem site, ou com um quebrado', html: 'Nenhum site, ou um que era barato em 2018 e é ilegível no celular em 2026. As pessoas saem antes de ver o que ele oferece.' },
              { icon: '📞', title: 'Agendamento ainda por telefone', html: 'Metade da tarde some em WhatsApp e retornos de ligação. Um formulário de agendamento faz o mesmo trabalho enquanto ele atende quem está na frente dele.' },
            ] },
            { type: 'script', title: 'Frase de apresentação (para usar com cliente)', pt: 'Nós construímos a metade online dos pequenos negócios — o site, a listagem do Google e o sistema de agendamento que hoje come a sua tarde.', en: "We build the online half of small businesses — the website, the Google listing, and the booking system that stops eating your afternoon.", note: 'Você fala em nome da consultoria: "nós" / "we". Quando o cliente perguntar quem faz, a resposta é simples: "a equipe técnica constrói, eu cuido de você durante o processo".' },
            { type: 'quiz', q: 'Qual frase resume melhor o que vendemos?', options: [
              'Sites bonitos e modernos com a tecnologia mais recente.',
              'Os clientes que hoje o dono do negócio perde para um concorrente com presença online melhor.',
              'Design responsivo, SEO e hospedagem com 99,9% de uptime.',
            ], answer: 1, why: 'Design, tecnologia e hospedagem são meios. O que o dono compra é o cliente que hoje escolhe o concorrente. Toda mensagem aponta para essa lacuna.' },
          ],
        },
        {
          id: 'seu-papel', title: 'O seu papel como colaborador(a)',
          blocks: [
            { type: 'text', html: `<p>Você é a primeira pessoa da consultoria que o cliente conhece. Sua função é <strong>encontrar o negócio certo, mostrar a lacuna com honestidade e conduzir até o "sim"</strong>. A construção do site é com a equipe técnica; a relação até o fechamento é com você.</p>` },
            {"type": "video", "title": "Como funciona a Academia", "desc": "Um minuto para entender o curso e onde encontrar cada coisa.", "scenes": [{"dur": 5, "caption": "Bem-vinda(o) à Academia de Vendas.", "narration": "Bem-vinda à Academia de Vendas. Em um minuto, você entende como o curso funciona.", "visual": {"kind": "title", "eyebrow": "Bem-vinda(o)", "text": "Como funciona a <em>Academia</em>"}}, {"dur": 11, "caption": "Dez módulos curtos, uma atividade no fim de cada lição.", "narration": "São dez módulos curtos. Cada lição leva de cinco a oito minutos e termina com uma pergunta ou simulação. Você só avança depois de responder. Errar aqui é ótimo: é onde se aprende sem custar um cliente. No fim, uma prova de doze perguntas e o seu certificado.", "visual": {"kind": "steps", "items": [{"title": "10 módulos curtos", "text": "cada lição leva de 5 a 8 minutos"}, {"title": "Pergunta ou simulação no fim", "text": "você só avança depois de responder"}, {"title": "Errar aqui é ótimo", "text": "é onde se aprende sem custar um cliente"}, {"title": "Prova e certificado", "text": "12 perguntas, nota mínima 75%"}]}}, {"dur": 9, "caption": "Tudo o que você precisa fica à mão no menu.", "narration": "No menu você encontra a cola rápida com números e regras, o folheto para o cliente, o glossário para iniciantes e o playbook completo como referência.", "visual": {"kind": "bullets", "title": "Tudo à mão", "items": ["Cola rápida: números e regras numa página", "Folheto para o cliente: PDF, imagem ou texto", "Glossário para iniciantes", "Playbook completo como referência"]}}]},
            { type: 'cards', cols: 2, items: [
              { icon: '✅', title: 'O que você faz', html: '<ul><li>Pesquisa e monta a lista de prospects</li><li>Qualifica (score) e escolhe a abordagem</li><li>Prepara os achados para a auditoria ou revisa o esboço</li><li>Conduz e-mails, DMs, ligações e a conversa de diagnóstico</li><li>Apresenta pacotes, responde objeções, envia a proposta</li><li>No "sim", passa o bastão com tudo documentado</li></ul>' },
              { icon: '🚫', title: 'O que você não faz', html: '<ul><li>Não promete prazo por mensagem informal — prazo só na proposta</li><li>Não inventa desconto — o preço é fixo e combinado antes</li><li>Não fala de tecnologia, framework ou "Core Web Vitals"</li><li>Não envia anexo no primeiro e-mail</li><li>Não insiste depois do terceiro contato sem resposta</li><li>Não começa nada sem contrato assinado e entrada paga</li></ul>' },
            ] },
            { type: 'callout', tone: 'info', title: 'Como este curso funciona', html: `São 10 módulos curtos. Cada lição tem uma pergunta ou simulação no final; você só avança depois de responder. Errar aqui é ótimo: é onde se aprende sem custar um cliente. Ao final, uma prova de 12 perguntas e o seu certificado. O <a href="../playbook/" target="_blank" rel="noopener">Playbook completo</a> é o manual de referência para o dia a dia; o curso é o caminho para entendê-lo.` },
            { type: 'checklist', title: 'Antes de começar a vender, você vai ter', items: [
              'Acesso ao Playbook e a esta Academia (você já tem)',
              'Assinatura de e-mail com telefone e site da consultoria',
              'Link de agendamento de 30 minutos (Cal.com) para a reunião de diagnóstico',
              'Modelo da auditoria de duas páginas',
              'Planilha de prospects com as colunas obrigatórias (Módulo 4)',
              'Uma discovery call acompanhada com o administrador',
            ] },
            { type: 'quiz', q: 'Um cliente pergunta pelo WhatsApp: "Fica pronto em uma semana?". O que você faz?', options: [
              'Responde "sim, tranquilo" para não perder o momentum.',
              'Explica que o prazo depende do conteúdo dele chegar e que vai constar na proposta formal.',
              'Passa o número do Marcus para ele perguntar direto.',
            ], answer: 1, why: 'Prazo só em proposta formal, e sempre com a dependência explícita: a maior parte do cronograma é conteúdo, não código. Prometer por mensagem gera a primeira frustração do cliente.' },
          ],
        },
        {
          id: 'jeito-de-falar', title: 'O nosso jeito de falar',
          blocks: [
            { type: 'text', html: `<p>O dono de um salão, de uma oficina ou de um restaurante não quer aprender tecnologia. Ele quer saber <strong>quem aparece primeiro no Google quando alguém busca o serviço dele</strong>. Três regras valem para tudo o que você escrever ou disser.</p>` },
            { type: 'cards', items: [
              { icon: '🗣️', title: 'Linguagem simples, sempre', html: 'Nada de "SEO", "schema", "responsivo". Diga: "aparecer no Google", "funcionar no celular", "a ficha do Google". Escreva para quem administra um salão.' },
              { icon: '🎯', title: 'Aponte para a lacuna', html: 'Nunca fale de design ou tecnologia. Fale do cliente que hoje escolhe o concorrente. Nomeie o concorrente quando souber.' },
              { icon: '🎁', title: 'Entregue antes de pedir', html: 'Auditoria pronta, esboço pronto, três achados verdadeiros. Você não pede nada no primeiro contato: você entrega algo útil. Isso se chama reciprocidade.' },
            ] },
            { type: 'callout', tone: 'tip', title: 'Tom', html: 'Específico, caloroso, sem pressão, liderando com o trabalho já feito. Nada de "soluções digitais", "presença online" ou jargão de vendedor. Se soa como propaganda, reescreva.' },
            { type: 'flashcards', title: 'Traduza para a língua do cliente', items: [
              { tag: 'em vez de', front: 'SEO local', backTag: 'diga', back: '"aparecer no Google para quem busca o seu serviço aqui perto"' },
              { tag: 'em vez de', front: 'Google Business Profile', backTag: 'diga', back: '"a sua ficha no Google Maps — fotos, horário, avaliações"' },
              { tag: 'em vez de', front: 'Site responsivo', backTag: 'diga', back: '"um site que funciona bem no celular, que é como as pessoas buscam"' },
              { tag: 'em vez de', front: 'Sistema de agendamento', backTag: 'diga', back: '"o cliente marca sozinho, sem te ligar, enquanto você atende quem está na sua frente"' },
              { tag: 'em vez de', front: 'Hospedagem, SSL e backup', backTag: 'diga', back: '"manter o site no ar, seguro e atualizado, sem você precisar lembrar"' },
              { tag: 'em vez de', front: 'Automação com n8n', backTag: 'diga', back: '"o computador faz as tarefas repetidas: confirmar horário, responder a primeira mensagem"' },
            ] },
            { type: 'quiz', q: 'Qual destas frases segue as nossas regras?', options: [
              '"Seu site não tem schema markup nem está otimizado para Core Web Vitals."',
              '"Oferecemos soluções digitais completas para presença online de excelência."',
              '"Quando alguém busca \'cabeleireiro em Blanchardstown\', a Salon X aparece na frente de vocês. Isso tem conserto."',
            ], answer: 2, why: 'Específica, em linguagem simples, nomeia o concorrente e aponta para a lacuna. As outras são jargão técnico ou propaganda vazia.' },
          ],
        },
      ],
    },

    /* ═══════════════════════════ MÓDULO 2 ═══════════════════════════ */
    {
      id: 'o-que-vendemos', icon: '📦', minutes: 15,
      title: 'O que vendemos',
      subtitle: 'As duas frentes de trabalho, a manutenção, o portfólio e os três pilares de valor.',
      lessons: [
        {
          id: 'duas-frentes', title: 'Duas frentes de trabalho',
          blocks: [
            { type: 'text', html: `<p>No site, a oferta é simples de explicar: <strong>dois tipos de trabalho</strong>. Seja qual for, o cliente recebe o escopo e o número por escrito antes de qualquer coisa começar, e a manutenção mensal faz parte do projeto desde o primeiro dia, não de uma conversa depois.</p>` },
            {"type": "video", "title": "Website ou Custom?", "desc": "As duas frentes de trabalho e como enquadrar o pedido do cliente.", "scenes": [{"dur": 6, "caption": "Duas frentes. Escopo e número por escrito antes de começar.", "narration": "Temos duas frentes de trabalho. Seja qual for, o cliente recebe o escopo e o número por escrito antes de qualquer coisa começar.", "visual": {"kind": "title", "text": "Duas frentes de <em>trabalho</em>", "sub": "Escopo e número por escrito antes de começar."}}, {"dur": 11, "caption": "Website é a base. Custom soma sobre ela.", "narration": "O Website é a base: site de uma ou cinco páginas, ficha do Google, SEO local, formulário e manutenção mensal. O Custom soma sobre isso: loja online, reservas, pagamentos, automação e aplicações sob medida.", "visual": {"kind": "compare", "left": {"title": "Website", "items": ["Site de 1 ou 5 páginas", "Google Business Profile", "SEO local", "Formulário de contato ou agendamento", "Manutenção mensal €60–150"]}, "right": {"title": "Custom", "items": ["Tudo do Website", "E-commerce, reservas e pagamentos", "Automação e sistemas internos", "Dashboards e apps sob medida"]}}}, {"dur": 9, "caption": "Loja online é Custom, sempre com número fechado antes.", "narration": "Se o cliente quer vender online com carrinho e pagamento, é a frente Custom. Tudo do Website, mais a loja, sempre com escopo e valor fechados antes de começar.", "visual": {"kind": "chat", "messages": [{"from": "them", "text": "Quero vender online com carrinho e pagamento."}, {"from": "you", "text": "Então é a frente Custom: tudo do Website mais a loja. O escopo e o valor saem por escrito antes de começar."}]}}, {"dur": 8, "caption": "Prazos e propriedade: as duas perguntas que mais aparecem.", "narration": "Um site de uma ou cinco páginas leva de uma a duas semanas. Sistemas complexos, quatro semanas ou mais. E tudo é do cliente: domínio, hospedagem e código.", "visual": {"kind": "stat", "items": [{"value": "1–2", "label": "semanas para um site de 1 ou 5 páginas"}, {"value": "4+", "label": "semanas para sistemas complexos"}, {"value": "100%", "label": "do cliente: domínio, hospedagem e código"}]}}]},
            { type: 'cards', cols: 2, items: [
              { icon: '🌐', title: 'Website — €1.200 (€600 com o voucher)', tag: 'Comece por aqui', html: '<ul><li>Site de página única ou de 5 páginas</li><li>Google Business Profile verificado e configurado</li><li>SEO local para as buscas que as pessoas fazem perto dele</li><li>Formulário de contato ou de agendamento</li><li>Lista exata de fotos e textos a reunir, revisada junto com o cliente</li><li>Manutenção mensal de €60–150 a partir da publicação: hospedagem, atualizações e edições</li><li>Alterações respondidas no WhatsApp, no mesmo dia</li><li>Domínio, conta de hospedagem e código no nome do cliente desde o dia 1</li></ul>' },
              { icon: '⚙️', title: 'Custom — de €3.500 a €5.000+, escopo fechado antes', tag: 'Sob medida', tagTone: 'blue', html: '<ul><li>Tudo do Website</li><li>E-commerce, reservas e pagamentos</li><li>Automação e sistemas internos</li><li>Dashboards e aplicações sob medida (Next.js)</li></ul><p style="margin-top:.5rem">Sempre com número fechado antes de começar. Nada é cobrado por hora. Ticket da consultoria: €1.200 a €5.000; ciclo de venda alvo abaixo de 30 dias.</p>' },
            ] },
            { type: 'callout', tone: 'tip', title: 'Regra de ouro do produto', html: 'Um site sozinho faz muito pouco. O que traz cliente é a ficha do Google bem configurada, o SEO local por trás e um formulário que transforma visita em contato. Tudo isso está no trabalho. Quando o cliente perguntar "o que está incluído?", a resposta é: <strong>mais do que as páginas</strong>.' },
            { type: 'table', head: ['Pergunta do cliente', 'Resposta curta (do site)'], rows: [
              ['Quanto tempo leva?', 'Site de 1 ou 5 páginas: 1–2 semanas. Sistemas complexos: 4+ semanas. Não começamos até o conteúdo chegar — a maior parte do cronograma é conteúdo, não código.'],
              ['O que vocês precisam de mim?', 'Fotos do negócio, uma lista curta de serviços com preços e acesso ao Google Business Profile. Se não tiver nada disso, orientamos o que reunir na primeira conversa.'],
              ['De quem é o site no final?', 'Do cliente: domínio, conta de hospedagem, código-fonte, tudo. Sem lock-in. Se ele sair amanhã, outro desenvolvedor assume na segunda.'],
              ['E se eu quiser mudar depois?', 'Pequenas edições estão na manutenção. Mudanças maiores (novas páginas, novas funções) são orçadas antes. Nada é cobrado por hora.'],
              ['Vocês atendem a minha região?', 'Clientes no mundo todo. O processo é remoto, então a localização não muda preço nem prazo. Na Irlanda, a primeira reunião pode ser presencial.'],
            ] },
            { type: 'quiz', q: 'Um dono de loja quer vender online com carrinho e pagamento. Em qual frente isso entra?', options: [
              'Website, porque loja também é um site.',
              'Custom, com escopo e número fechados antes de começar.',
              'Nenhuma; a consultoria não faz loja online.',
            ], answer: 1, why: 'E-commerce, reservas e pagamentos são Custom. O Website é a base (site + Google + formulário + manutenção). Custom soma sobre ela e sempre com orçamento fechado antes.' },
          ],
        },
        {
          id: 'manutencao', title: 'Manutenção: nunca é opcional',
          blocks: [
            { type: 'text', html: `<p>Um site que ninguém atualiza envelhece rápido. Por isso todo projeto sai com <strong>manutenção mensal de €60 a €150</strong>, apresentada desde o primeiro dia como parte do trabalho: "mais €60 por mês de manutenção, para o site não envelhecer". Um projeto vale €1.200 uma vez; o mesmo cliente em manutenção vale €720 a €1.800 por ano, todo ano, sem nova venda. Cancela quando quiser: domínio, hospedagem e código já são do cliente.</p>` },
            { type: 'cards', items: [
              { icon: '🖥️', title: 'Hospedagem, SSL, backups', html: 'O site no ar, com cadeado de segurança e cópias guardadas.' },
              { icon: '🛡️', title: 'Atualizações e segurança', html: 'Correções de software e patches sem o cliente precisar pensar nisso.' },
              { icon: '✏️', title: 'Pequenas edições', html: 'Texto, foto, preço, horário. Sem fila de tickets; resposta no WhatsApp no mesmo dia.' },
              { icon: '📈', title: 'Checagem mensal', html: 'Performance e SEO revisados todo mês.' },
            ] },
            { type: 'callout', tone: 'rule', title: 'Por que a recorrência importa para você', html: 'Sem receita recorrente, a consultoria recomeça do zero todo mês. Trinta clientes em manutenção são €2.000–3.000 por mês antes de vender qualquer coisa nova. Por isso a manutenção é apresentada <strong>como parte do projeto desde o primeiro dia</strong>, nunca como um extra no final. Se aparecer só no fim, vira objeção.' },
            { type: 'text', html: `<h4>No Brasil: duas modalidades depois da entrega</h4><p>Os pacotes definem <em>o que</em> é construído. As modalidades definem <em>como</em> o cliente mantém o site. Ele escolhe uma no fechamento.</p>` },
            { type: 'cards', cols: 2, items: [
              { icon: '🤝', title: 'Modalidade A — Gerenciado', html: 'O cliente não toca em nada; toda alteração passa pela gente. Sem painel, sem treinamento, sem curva de aprendizado. Pequenas alterações dentro do limite do pacote; excedente por hora. Ideal para negócios estáveis (horário, equipe e serviços mudam pouco).' },
              { icon: '🧑‍💻', title: 'Modalidade B — Autônomo (CMS)', html: 'O cliente edita textos, fotos, equipe, horários e preços quando quiser, num painel em português. Treinamento de 60 min + vídeo + guia em PDF + 30 dias de suporte prioritário. Ideal para salões com troca de equipe, restaurantes com cardápio variável, negócios sazonais.' },
            ] },
            { type: 'script', title: 'Pergunta que decide entre A e B', pt: '"No último ano, com que frequência mudou: equipe, horários ou serviços/cardápio?"\n\n"Raramente" → Modalidade A.\n"Toda hora" / "quando entra ou sai funcionário" → Modalidade B.', note: 'Não empurre a Modalidade B para quem não precisa: a curva de aprendizado vira motivo de cancelamento.' },
            { type: 'callout', tone: 'tip', title: 'A regra do WhatsApp gratuito', html: '<strong>Dúvida é grátis. Execução é paga.</strong> "Como mudo a foto?" → respondemos sem cobrar. "Pode mudar a foto pra mim?" → entra no limite do pacote ou na hora avulsa. Deixe isso claro no onboarding, senão o WhatsApp vira produção gratuita.' },
            { type: 'quiz', q: 'Quando a manutenção deve aparecer na conversa com o cliente?', options: [
              'Só depois que ele aprovar o site, para não assustar com o valor.',
              'Desde o primeiro dia, como parte do projeto ("mais €60 por mês para o site não envelhecer").',
              'Nunca; é detalhe técnico do Marcus.',
            ], answer: 1, why: 'Manutenção apresentada no fim vira objeção. Apresentada desde o início como parte do trabalho, é o que faz o funil não recomeçar do zero todo mês.' },
          ],
        },
        {
          id: 'portfolio', title: 'Portfólio: as provas que você vai usar',
          blocks: [
            { type: 'text', html: `<p>Nenhum argumento vale mais do que um cliente real com um número real. Estes são os casos publicados no site. Decore um por tipo de cliente.</p>` },
            { type: 'cards', cols: 2, items: [
              { icon: '🚢', title: 'Coady Shipping — Dublin 11', tag: 'Pedidos de orçamento 3×', tagTone: 'green', html: 'Despachante aduaneiro e frete. Novo site institucional. <strong>Pedidos de orçamento triplicaram.</strong> É o caso para qualquer negócio de serviço B2B ou local na Irlanda.' },
              { icon: '💻', title: 'Alfa Tecnologia — Pipa, Brasil', tag: 'Multilíngue', html: 'Serviços de TI. Site multilíngue com catálogo de soluções digitais e abertura de ordem de serviço online. É o caso para negócios brasileiros e para quem atende turista ou estrangeiro.' },
              { icon: '🪪', title: 'ComplyPic', tag: 'SaaS', tagTone: 'blue', html: 'Ferramenta de quatro passos que ajusta qualquer foto às especificações de passaporte, visto ou loja. Mostra a frente Custom: aplicação sob medida.' },
              { icon: '🏋️', title: 'NattyCore', tag: 'SaaS · IA', tagTone: 'blue', html: 'Coach de treino com IA que planeja, acompanha volume por músculo e adapta semanalmente. Caso para "dá para fazer algo mais complexo?": sim, e com número fechado antes.' },
            ] },
            { type: 'callout', tone: 'tip', title: 'Como usar um caso em 15 segundos', html: 'Formato: <strong>quem + qual era o problema + o que fizemos + um número</strong>. "A Coady Shipping, em Dublin 11, tinha um site que não gerava contato. Refizemos o site institucional e os pedidos de orçamento triplicaram." Sem número, não é estudo de caso; é opinião.' },
            { type: 'script', title: 'Caso em uma frase', pt: 'Um exemplo próximo do seu: a Coady Shipping, em Dublin 11, refez o site institucional com a gente e os pedidos de orçamento triplicaram. Posso te mostrar.', en: "One close to yours: Coady Shipping in Dublin 11 rebuilt their site with us and quote requests went up 3×. Happy to show you." },
            { type: 'scenario', title: 'O cliente pede prova', who: '👩‍🔧', context: 'Dona de uma clínica de fisioterapia, por WhatsApp', client: '"Vocês já fizeram algo parecido? Não quero ser cobaia."', clientEn: "Have you done anything like this before? I don't want to be a guinea pig.", options: [
              { text: 'Já fizemos muitos sites, pode confiar. Somos muito bons no que fazemos.', good: false, feedback: 'Genérico e sem prova. "Muitos" e "muito bons" não convencem ninguém que já se queimou.' },
              { text: 'Sim. Um exemplo próximo: a Coady Shipping, em Dublin 11, refez o site com a gente e os pedidos de orçamento triplicaram. Te mando o link e, se quiser, uma auditoria gratuita da sua clínica para você ver o que faríamos antes de decidir qualquer coisa.', good: true, feedback: 'Caso real, número real, e devolve com algo útil e sem compromisso (a auditoria). É "entregar antes de pedir".' },
              { text: 'O Marcus tem nove anos de experiência em TI, BI e infraestrutura, e usa Next.js, que é a tecnologia mais moderna do mercado.', good: false, feedback: 'Currículo e tecnologia não respondem ao medo dela. Ela quer saber se um negócio como o dela teve resultado.' },
            ] },
          ],
        },
        {
          id: 'pilares', title: 'Os três pilares de valor',
          blocks: [
            { type: 'text', html: `<p>Toda conversa de venda se apoia em três ideias. Quando o cliente hesitar, volte para uma delas.</p>` },
            { type: 'cards', items: [
              { icon: '📌', title: '1 · Preço fixo, acordado antes', html: 'Sem cobrança por hora, sem "solicite um orçamento", sem escopo que cresce. O escopo e o número saem por escrito antes de começar. Isso remove o maior medo do dono de pequeno negócio.' },
              { icon: '🏦', title: '2 · Na Irlanda, o Estado paga metade', html: 'O Trading Online Voucher cobre até 50% dos custos elegíveis, até €2.500. A maioria do público se qualifica e quase ninguém conhece. Nós cuidamos da papelada de ponta a ponta.' },
              { icon: '🔑', title: '3 · Tudo é do cliente', html: 'Domínio, conta de hospedagem, código-fonte. Sem lock-in. Qualquer desenvolvedor assume na segunda-feira. Isso desarma o medo herdado de experiências ruins.' },
            ] },
            { type: 'callout', tone: 'info', title: 'E no Brasil?', html: 'O pilar 2 muda: em vez do voucher, a "arma secreta" é o <strong>esboço pronto antes da venda</strong> (o cliente vê o site dele antes de pagar) e o parcelamento/PIX. Os pilares 1 e 3 valem igual nos dois mercados.' },
            { type: 'order', title: 'Monte o modelo Land & Expand na ordem certa', items: [
              'Site (o ativo): entrar pela porta barata e tangível',
              'Google Business Profile e SEO local: trazer visitantes',
              'Formulário e agendamento: transformar visita em contato',
              'Automações e sistemas: transformar contatos em receita previsível',
            ], why: 'Vender automação para quem não tem site é vender turbo para quem não tem carro. Primeiro o ativo, depois o tráfego, depois a conversão, depois a automação.' },
            { type: 'quiz', q: 'O cliente diz: "Tenho medo de ficar preso a vocês, já aconteceu antes." Qual pilar você usa?', options: [
              'Preço fixo, acordado antes.',
              'O Estado paga metade.',
              'Tudo é do cliente: domínio, hospedagem e código no nome dele desde o dia 1.',
            ], answer: 2, why: 'O medo é de lock-in. A resposta é o pilar 3: tudo fica no nome dele e outro desenvolvedor assume quando quiser.' },
          ],
        },
      ],
    },

    /* ═══════════════════════════ MÓDULO 3 ═══════════════════════════ */
    {
      id: 'dois-mercados', icon: '🌍', minutes: 22,
      title: 'Dois mercados: Brasil e Europa',
      subtitle: 'O que muda em preço, pagamento, lei, cultura e idioma. E o inglês essencial para vender.',
      lessons: [
        {
          id: 'panorama', title: 'Panorama: o que muda de um lado para o outro',
          blocks: [
            { type: 'text', html: `<p>O produto é o mesmo; o jeito de vender muda. Use o seletor para ver um mercado de cada vez.</p>` },
            { type: 'compare', title: 'Brasil × Europa (Irlanda) em uma tabela', label: 'Aspecto', rows: [
              { label: 'Idioma', br: 'Português (PT-BR)', ie: 'Inglês é o padrão. Português para lusófonos na Irlanda e em Portugal.' },
              { label: 'Moeda e preço', br: 'Reais (R$). Pacotes com setup + mensalidade.', ie: 'Euros (€). Ticket de €1.200 a €5.000 + manutenção de €60–150/mês.' },
              { label: 'Canal principal', br: 'DM (Instagram/WhatsApp), com o esboço pronto na primeira mensagem.', ie: 'Cold email com 3 achados + auditoria gratuita. WhatsApp só para números comerciais públicos.' },
              { label: 'A "arma secreta"', br: 'Esboço do site pronto antes da venda.', ie: 'Auditoria gratuita de 2 páginas em 48h + Trading Online Voucher.' },
              { label: 'Subsídio', br: 'Não há. Alavanca: parcelamento em até 12× e PIX.', ie: 'Trading Online Voucher (LEO): até 50%, até €2.500.' },
              { label: 'Pagamento', br: 'PIX (preferido), cartão até 12×, boleto, TED. 50% entrada + 50% entrega.', ie: 'Stripe, Wise ou transferência SEPA. 50% entrada + 50% entrega.' },
              { label: 'Contrato', br: 'Assinatura digital (Clicksign, D4Sign, Autentique). 12 meses, renovação automática.', ie: 'DocuSign/HelloSign. Proposta com validade de 14 dias.' },
              { label: 'Lei de dados', br: 'LGPD: política de privacidade e consentimento nos formulários.', ie: 'GDPR: identificação clara, opt-out em toda mensagem, lista de supressão.' },
              { label: 'Nota fiscal', br: 'NF-e de serviço em todo pagamento.', ie: 'Fatura (invoice) em euro.' },
              { label: 'Domínio típico', br: '.com.br, no CNPJ do cliente.', ie: '.ie (lido como local e confiável), no nome do cliente.' },
              { label: 'Melhor horário de contato', br: 'Terça/quarta de manhã. Evitar quinta/sexta à noite e sábado.', ie: 'Manhãs de dia útil. Respeitar o fuso (Brasília = Dublin −3h ou −4h).' },
            ] },
            { type: 'callout', tone: 'warn', title: 'Nunca misture os dois', html: 'Não cite preço em real para cliente irlandês nem fale de voucher para cliente brasileiro. Antes de qualquer mensagem, saiba em qual mercado está e use os scripts daquele mercado.' },
            { type: 'quiz', q: 'Um restaurante em Lucan (Dublin) pergunta como pode pagar. O que você responde?', options: [
              'PIX ou boleto, 50% de entrada e 50% na entrega.',
              'Transferência SEPA, Stripe ou Wise, 50% de entrada e 50% na entrega; e ele provavelmente se qualifica para o voucher que cobre metade.',
              'Cartão em 12 vezes sem juros.',
            ], answer: 1, why: 'Cliente na Irlanda: meios europeus e o voucher como alavanca. PIX, boleto e parcelamento em 12× são do mercado brasileiro.' },
          ],
        },
        {
          id: 'europa', title: 'Europa e Irlanda: o voucher e os preços',
          blocks: [
            { type: 'text', html: `<p>Na Irlanda, a alavanca de venda mais forte é um programa do governo que quase nenhum dono de negócio conhece: o <strong>Trading Online Voucher</strong>, do Local Enterprise Office (LEO).</p>` },
            {"type": "video", "title": "O voucher em 3 passos", "desc": "Trading Online Voucher: como explicar e quando começar.", "scenes": [{"dur": 6, "caption": "Na Irlanda, o Estado paga metade.", "narration": "Na Irlanda, a alavanca de venda mais forte é um programa do governo: o Trading Online Voucher, do Local Enterprise Office. O Estado paga metade.", "visual": {"kind": "title", "eyebrow": "Irlanda", "text": "O Estado paga <em>metade</em>.", "sub": "Trading Online Voucher · Local Enterprise Office"}}, {"dur": 11, "caption": "A explicação em três pontos, do jeito que você diz ao cliente.", "narration": "Você se qualifica: doze meses ou mais operando, menos de dez funcionários, menos de dois milhões de euros de faturamento. Nós cuidamos da papelada: os dois orçamentos, o formulário, os follow-ups. E o Estado paga metade: até cinquenta por cento, até dois mil e quinhentos euros.", "visual": {"kind": "steps", "items": [{"title": "Você se qualifica", "text": "12+ meses operando, menos de 10 funcionários, menos de €2M de faturamento"}, {"title": "Nós cuidamos da papelada", "text": "os dois orçamentos, o formulário, os follow-ups"}, {"title": "O Estado paga metade", "text": "até 50% dos custos elegíveis, até €2.500"}]}}, {"dur": 8, "caption": "O número que muda a conversa.", "narration": "O pacote Website custa mil e duzentos euros. Com o voucher, seiscentos euros do bolso do cliente. A tramitação leva de três a seis semanas.", "visual": {"kind": "stat", "items": [{"value": "€1.200", "label": "preço cheio do Website"}, {"value": "€600", "label": "do bolso do cliente com o voucher"}, {"value": "3–6", "label": "semanas de tramitação"}]}}, {"dur": 9, "caption": "O voucher começa no dia 1, nunca depois.", "narration": "A inscrição do voucher começa no dia do sim, em paralelo com o projeto. Se começar só quando o site estiver pronto, o cliente fica sem o dinheiro justamente quando a fatura final chega.", "visual": {"kind": "timeline", "points": [{"label": "Dia 1", "sub": "\"sim\" + inscrição do voucher", "tone": "ok"}, {"label": "Sem. 1–2", "sub": "construção do site"}, {"label": "Sem. 3–6", "sub": "voucher aprovado"}, {"label": "Entrega", "sub": "fatura final com o dinheiro na mão", "tone": "ok"}]}}]},
            { type: 'cards', items: [
              { icon: '✅', title: 'Ele se qualifica se…', html: 'Opera na Irlanda há 12+ meses, tem menos de 10 funcionários e fatura menos de €2M. O LEO confirma.' },
              { icon: '📝', title: 'Nós cuidamos da papelada', html: 'Os dois orçamentos, o formulário de inscrição, os follow-ups. O cliente aprova, nós protocolamos.' },
              { icon: '💶', title: 'O Estado paga metade', html: 'Até 50% dos custos elegíveis, até €2.500. Tramitação de 3 a 6 semanas.' },
            ] },
            { type: 'callout', tone: 'rule', title: 'O voucher começa no dia 1, nunca depois', html: 'São 3 a 6 semanas. Se a inscrição só começar quando o site estiver pronto, o cliente fica sem o dinheiro justamente quando a fatura final chega. Inscrição em paralelo com o projeto, sempre.' },
            { type: 'script', title: 'Explicação do voucher em três pontos', pt: 'Você se qualifica. Operando na Irlanda há 12+ meses, menos de 10 funcionários, faturamento abaixo de €2M. O Local Enterprise Office confirma.\n\nNós cuidamos da papelada. Os dois orçamentos, o formulário, os follow-ups. Você aprova, a gente protocola.\n\nO Estado paga metade. Até €2.500 em projetos elegíveis.', en: "You qualify. Trading in Ireland 12+ months, under 10 staff, turnover under €2M. The Local Enterprise Office confirms it.\n\nWe handle the paperwork. Two quotes, the application form, the follow-ups. You approve, we file.\n\nThe State pays half. Up to €2,500 on eligible projects." },
            { type: 'text', html: `<h4>Preços e formas de pagamento (Europa)</h4><p>O site público mostra o escopo, não os valores; o número vai por escrito na proposta. Estes são os valores do Playbook Comercial. <strong>A tabela de pagamento vale para todos</strong>: abrir exceção para um obriga a abrir para todos.</p>` },
            { type: 'table', head: ['Pacote', 'Preço cheio', 'Com voucher (50%)', 'O que resolve'], rows: [
              ['Website', '€1.200', '€600', 'Site de 5 páginas, Google Business Profile, formulário, SEO local'],
              ['Growth (Custom)', '€3.500', '€1.750', 'Tudo do Website + e-commerce ou reservas + integrações + copy de conversão'],
              ['Custom', 'a partir de €5.000', '−€2.500', 'Automação, sistemas internos, integrações complexas, aplicações sob medida'],
              ['Manutenção (desde a publicação)', '€60–150/mês', '—', 'Hospedagem, SSL, backups, atualizações, pequenas edições, checagem mensal de SEO'],
            ] },
            { type: 'table', head: ['Forma de pagamento', 'Condição'], rows: [['À vista, antes do início', '5% de desconto'], ['50% no aceite + 50% na publicação', 'Padrão'], ['Três parcelas (aceite, meio, publicação)', '+5%'], ['Manutenção mensal', '€60–150/mês']] },
            { type: 'cards', items: [
              { icon: '🎯', title: 'Núcleo: Dublin e Grande Dublin', html: 'Reunião presencial possível. Indicação circula rápido. Visita para fotos e encerramento.' },
              { icon: '🇮🇪', title: 'Irlanda', html: 'Mesmo fuso e moeda. O Trading Online Voucher vale: nosso argumento mais forte.' },
              { icon: '🇪🇺', title: 'Europa', html: 'Remoto integral. Sem voucher: a venda se apoia em portfólio, prazo e preço. E-mail frio segue a lei do país do destinatário (a Alemanha exige consentimento prévio mesmo em B2B), a fatura pode exigir IVA intracomunitário e o material vai no idioma do cliente.' },
            ] },
            { type: 'callout', tone: 'tip', title: 'Cultura de venda na Irlanda', html: 'Direto, curto e sem exagero. E-mails de poucas linhas, "no pitch", "no strings", "worth a look?". Prometer demais soa suspeito. O .ie no domínio e a base em Dublin 15 são credenciais: use-as ("based in Dublin 15").' },
            { type: 'quiz', q: 'Um salão em Ongar abriu há 8 meses, tem 4 funcionários e fatura €300 mil por ano. Ele se qualifica para o voucher?', options: [
              'Sim: tem menos de 10 funcionários e fatura menos de €2M.',
              'Não: precisa operar há pelo menos 12 meses.',
              'Só se contratar o pacote Custom.',
            ], answer: 1, why: 'Os três critérios precisam ser verdadeiros ao mesmo tempo. Com 8 meses de operação, ele ainda não se qualifica; volte a falar com ele em 4 meses, com esse motivo novo.' },
          ],
        },
        {
          id: 'brasil', title: 'Brasil: pacotes, PIX e o esboço pronto',
          blocks: [
            { type: 'text', html: `<p>No Brasil o cliente típico é o negócio local consolidado com Instagram forte e sem site: hamburgueria, sushi, clínica, academia, salão, pet shop com 5+ anos e reputação no Google. Faturamento entre R$ 30 mil e R$ 300 mil por mês: grande o bastante para investir, pequeno o bastante para precisar da gente.</p>` },
            {"type": "video", "title": "Como vendemos no Brasil", "desc": "O esboço pronto, a sequência de toques e os três pacotes.", "scenes": [{"dur": 6, "caption": "No Brasil, a arma secreta é o esboço pronto.", "narration": "No Brasil, a arma secreta é o esboço do site pronto antes da venda. O cliente vê o site dele antes de pagar qualquer coisa.", "visual": {"kind": "title", "eyebrow": "Brasil", "text": "O esboço pronto <em>antes da venda</em>."}}, {"dur": 13, "caption": "Da pesquisa ao PIX da entrada.", "narration": "Primeiro a pesquisa: fotos, avaliações e nomes da equipe, tudo público. Depois o esboço montado antes de falar com o dono. A mensagem direta com o link, de preferência terça ou quarta de manhã. O walk-through no celular dele, falando pouco. E o contrato com cinquenta por cento de entrada por PIX. No ar em sete a quatorze dias úteis.", "visual": {"kind": "steps", "items": [{"title": "Pesquisa", "text": "fotos, avaliações e nomes da equipe, tudo público"}, {"title": "Esboço pronto", "text": "o site montado antes de falar com o dono"}, {"title": "DM com o link", "text": "terça ou quarta de manhã"}, {"title": "Walk-through", "text": "no celular dele, falando pouco"}, {"title": "Contrato e PIX", "text": "50% de entrada, no ar em 7–14 dias úteis"}]}}, {"dur": 9, "caption": "Mostre os três lado a lado. A maioria escolhe o do meio.", "narration": "São três pacotes: Essencial, Profissional e Premium. Mostre os três lado a lado e pergunte qual faz mais sentido para o momento do negócio. A maioria escolhe o do meio.", "visual": {"kind": "stat", "items": [{"value": "R$ 1.497", "label": "Essencial + R$ 97/mês"}, {"value": "R$ 2.497", "label": "Profissional + R$ 197/mês"}, {"value": "R$ 3.997", "label": "Premium + R$ 297/mês"}]}}]},
            { type: 'table', head: ['Pacote', 'Setup', 'Mensal', 'Para quem'], rows: [
              ['Essencial', 'R$ 1.497', 'R$ 97/mês', 'Site de página única (até 5 seções), domínio .com.br, hospedagem, botão de WhatsApp, Google Maps. Estar presente no Google.'],
              ['Profissional ⭐', 'R$ 2.497', 'R$ 197/mês', 'Até 8 seções, galeria, cardápio/serviços, depoimentos, SEO local, 1h/mês de alterações, e-mail profissional. O escolhido pela maioria.'],
              ['Premium', 'R$ 3.997', 'R$ 297/mês', 'Design sob medida, múltiplas páginas, blog, feed do Instagram, formulários avançados, 2h/mês, relatório mensal.'],
              ['Modalidade B (CMS)', '+ R$ 990', '+ R$ 60/mês', 'Painel para o cliente editar sozinho, com treinamento de 60 min.'],
              ['Hora avulsa', 'R$ 150/h', '—', 'Mudanças fora do escopo. Mínimo de 1h. Pacotes pré-pagos de 5h e 10h com desconto.'],
            ] },
            { type: 'callout', tone: 'tip', title: 'Como apresentar os três pacotes', html: 'A maioria pergunta o preço sem saber o que precisa. Mostre os três lado a lado e pergunte: <strong>"Qual desses faz mais sentido para o momento do seu negócio?"</strong> Deixe ele escolher. A maioria escolhe o do meio.' },
            { type: 'cards', items: [
              { icon: '💸', title: 'Pagamento', html: 'PIX (preferido, sem taxa), cartão em até 12× (juros da operadora a partir da 4ª), boleto ou TED. Setup: 50% de entrada + 50% na entrega. Mensalidade: PIX automático ou cartão recorrente.' },
              { icon: '📄', title: 'Contrato', html: 'Sempre antes de começar, com assinatura digital. Vigência de 12 meses com renovação automática; cancelamento com 30 dias de aviso após os 12 meses; 7 dias de arrependimento (CDC) com reembolso integral.' },
              { icon: '🧾', title: 'Nota fiscal e LGPD', html: 'NF-e de serviço em todo pagamento. Política de privacidade e consentimento nos formulários incluídos em todo site.' },
              { icon: '🏠', title: 'Propriedade', html: 'Domínio .com.br registrado no CNPJ do cliente desde o dia 1. Nunca no nosso. Após o pagamento integral do setup, o código também é dele.' },
            ] },
            { type: 'text', html: `<h4>Prazos por pacote (dias úteis, a partir da entrada + briefing completo)</h4>` },
            { type: 'table', head: ['Pacote', 'Prazo', 'Rodadas de revisão'], rows: [
              ['Essencial', '7 dias úteis', '1 rodada (até 5 ajustes)'],
              ['Profissional', '14 dias úteis', '2 rodadas (até 10 ajustes)'],
              ['Premium', '21–30 dias úteis', '3 rodadas (até 15 ajustes)'],
            ] },
            { type: 'callout', tone: 'info', title: 'Os valores em real', html: 'Vêm do Manual Operacional de abril/2026. Antes de enviar a primeira proposta em real, confirme com o administrador se a tabela continua válida.' },
            { type: 'quiz', q: 'Cliente brasileiro fechou o Profissional e pergunta se pode parcelar. O que você diz?', options: [
              '"Não, só à vista no PIX."',
              '"Sim: até 12× no cartão (juros da operadora a partir da 4ª parcela) ou 50% de entrada e 50% na entrega por PIX/boleto, sem juros."',
              '"Pode pagar tudo só quando o site estiver no ar."',
            ], answer: 1, why: 'Parcelamento existe e é uma alavanca de fechamento. Mas nada começa sem contrato assinado e entrada paga.' },
          ],
        },
        {
          id: 'ingles', title: 'Inglês para vender: o essencial',
          blocks: [
            { type: 'text', html: `<p>Você não precisa de inglês perfeito; precisa de <strong>inglês simples, curto e natural</strong>. Todos os scripts do Playbook têm versão em inglês para copiar. Aqui estão as frases que você vai usar todo dia. Toque para virar.</p>` },
            { type: 'flashcards', title: 'Frases-chave PT → EN', items: [
              { tag: 'abertura', front: 'Olá, {Nome} — sou a {Seu nome}, da equipe do Marcus Fernandes.', backTag: 'EN', back: "Hi {Name} — I'm {Seu nome}, from Marcus Fernandes' team." },
              { tag: 'o que fazemos', front: 'Fazemos sites para pequenos negócios aqui na região de Dublin 15.', backTag: 'EN', back: 'We build websites for small businesses around Dublin 15.' },
              { tag: 'a oferta', front: 'Posso mandar, de graça, sem compromisso.', backTag: 'EN', back: 'Happy to send it over, free, no strings.' },
              { tag: 'o voucher', front: 'O Estado cobre até metade do custo. Nós cuidamos da papelada.', backTag: 'EN', back: 'The State covers up to half the cost. We handle the paperwork.' },
              { tag: 'a reunião', front: 'Se quiser que eu explique, é só marcar aqui — sem pitch.', backTag: 'EN', back: "If you'd like me to walk you through it, just book a slot here — no pitch." },
              { tag: 'o preço', front: 'Preço fixo, acordado antes de começar qualquer coisa.', backTag: 'EN', back: 'Fixed price, agreed before anything starts.' },
              { tag: 'propriedade', front: 'Domínio, hospedagem e código ficam no seu nome desde o dia 1.', backTag: 'EN', back: 'Domain, hosting and code are in your name from day one.' },
              { tag: 'fechamento', front: 'Preciso de 48 horas. Você tem agenda na quinta às 10h, ou prefere sexta às 15h?', backTag: 'EN', back: 'I need 48 hours. Are you free Thursday at 10, or would Friday at 3 suit better?' },
              { tag: 'saída elegante', front: 'Sem problema nenhum — tiro vocês da minha lista. Muito sucesso.', backTag: 'EN', back: "No problem at all — I'll take you off my list. Best of luck." },
              { tag: 'a pergunta', front: 'O que te fez aceitar essa conversa agora?', backTag: 'EN', back: 'What made you say yes to this conversation now?' },
              { tag: 'o caso', front: 'Os pedidos de orçamento triplicaram.', backTag: 'EN', back: 'Quote requests went up 3×.' },
              { tag: 'convite', front: 'Vale uma olhada?', backTag: 'EN', back: 'Worth a look?' },
            ] },
            { type: 'callout', tone: 'tip', title: 'Dicas rápidas', html: '<ul style="padding-left:1.2rem"><li>Frases curtas. Uma ideia por frase.</li><li>"Hi {Name}" e não "Dear Sir". Informal e educado.</li><li>Números em inglês usam vírgula para milhar: €1,200 e €2,500.</li><li>Termine com uma pergunta simples: "Want the audit?", "Worth a look?", "Which suits?".</li><li>Se não souber uma palavra, simplifique a ideia; não traduza literalmente.</li></ul>' },
            { type: 'quiz', q: 'Qual é a versão mais natural, no nosso tom, para um e-mail em inglês?', options: [
              '"Dear Sir/Madam, we would like to present our complete digital solutions for your online presence."',
              '"Hi Aoife — quick one. You\'re not showing up for \'hair salon Blanchardstown\'. I wrote up three fixes, two pages, no pitch. Want it?"',
              '"Hello, I am writing to inform you that your website has critical SEO and Core Web Vitals problems."',
            ], answer: 1, why: 'Curto, específico, com nome, achado concreto e uma pergunta simples no final. As outras são formais demais, genéricas ou técnicas.' },
          ],
        },
      ],
    },

    /* ═══════════════════════════ MÓDULO 4 ═══════════════════════════ */
    {
      id: 'cliente-certo', icon: '🎯', minutes: 15,
      title: 'Encontrar o cliente certo',
      subtitle: 'Perfil ideal, construção da lista e o score que decide se você envia ou não.',
      lessons: [
        {
          id: 'icp', title: 'O perfil de cliente ideal (ICP)',
          blocks: [
            { type: 'text', html: `<p>Definir o perfil não é burocracia: é o que faz a taxa de resposta sair de 0,5% para 5%. Prospect errado consome o mesmo tempo e não converte.</p>` },
            { type: 'compare', title: 'Quem prospectar', label: 'Atributo', rows: [
              { label: 'Localização', br: 'Cidade/bairro definido. Um vertical, uma área por vez.', ie: 'Dublin 15: Blanchardstown, Castleknock, Clonee, Lucan, Ongar, Tyrrelstown.' },
              { label: 'Porte', br: '5+ anos de operação, reputação no Google, R$ 30k–300k/mês.', ie: '1–10 funcionários, 12+ meses de operação, menos de €2M (exigências do voucher).' },
              { label: 'Estado digital', br: 'Instagram forte e nenhum site, ou site fraco.', ie: 'Sem site, ou com site que quebra no celular.' },
              { label: 'Quem decide', br: 'O dono. Atendente nunca decide compra.', ie: 'Operado pelo dono: quem decide atende o telefone.' },
            ] },
            { type: 'text', html: `<h4>Verticais prioritários (comece pelo primeiro)</h4>` },
            { type: 'cards', items: [
              { icon: '💇', title: 'Salões e beleza', tag: 'Comece aqui', tagTone: 'green', html: 'Dor de agendamento aguda, negócio visual, redes de indicação fortes entre eles.' },
              { icon: '🍔', title: 'Restaurantes e takeaways', html: 'Alto volume de busca, necessidade clara de cardápio online e reservas.' },
              { icon: '🔧', title: 'Ofícios (encanador, eletricista, construtor)', html: 'Zero presença web e ticket alto. A ausência de site facilita a conversa.' },
              { icon: '🦷', title: 'Clínicas (dentista, fisioterapia)', html: 'Orçamento maior, movidas a agendamento; o sistema de reservas se paga rápido.' },
              { icon: '🛍️', title: 'Varejo independente', html: 'Caminho natural de upsell para e-commerce (Custom).' },
              { icon: '🏢', title: 'Administradoras de condomínio', html: 'Porta de entrada para o sistema de condomínios.' },
            ] },
            { type: 'callout', tone: 'tip', title: 'Um vertical de cada vez', html: 'Vinte salões batem vinte negócios variados: você aprende a linguagem, seus achados ficam mais afiados a cada dez enviados, e o segundo cliente chega como indicação do primeiro.' },
            { type: 'callout', tone: 'warn', title: 'Não vendemos para', html: '<ul style="padding-left:1.2rem"><li>Franquia ou filial sem autonomia de decisão.</li><li>Quem já tem site recente e funcional: não há lacuna para apontar.</li><li>Quem pede para pagar depois de ver resultado.</li><li>Quem negocia preço antes de entender o escopo.</li><li>Quem some por mais de duas semanas.</li><li>Na Irlanda, operando há menos de 12 meses: inelegível para o voucher.</li><li>Quem já disse não: sai da lista para sempre.</li></ul>Recusar é decisão estratégica, não limitação.' },
            { type: 'callout', tone: 'ok', title: 'O melhor prospect que existe', html: 'Nota 4,7 no Google, 180 avaliações, nenhum site. <strong>Boa reputação e pouca visibilidade.</strong> O produto é bom, a demanda está comprovada e falta só visibilidade: fecha mais rápido, paga em dia e indica outros.' },
            { type: 'quiz', q: 'Qual destes prospects você desqualifica na hora?', options: [
              'Barbearia em Castleknock com 6 funcionários, 3 anos de operação, sem site, Instagram ativo.',
              'Unidade de uma rede de fast-food em Blanchardstown.',
              'Encanador autônomo em Lucan, 2 anos de operação, sem nenhuma presença online.',
            ], answer: 1, why: 'Franquia: quem decide não é o gerente local. Os outros dois estão no perfil ideal.' },
          ],
        },
        {
          id: 'lista', title: 'Construindo a lista',
          blocks: [
            { type: 'text', html: `<p><strong>A pesquisa é o produto.</strong> Uma lista sem as colunas de diagnóstico gera mala direta; com elas, gera consultoria.</p>` },
            { type: 'table', head: ['Fonte', 'O que você obtém'], rows: [
              ['Google Maps (scrape com Apify)', 'Nome, categoria, endereço, telefone, site, nota, número de avaliações, horários'],
              ['Google Business Profile', 'Fotos, respostas a avaliações, precisão de categoria e horários'],
              ['Instagram', 'Negócios ativos socialmente mas sem site: sinal de alta intenção'],
              ['Grupos locais no Facebook', 'Negócios de bairro, threads de recomendação'],
              ['Caminhar pela área', 'A fonte mais subestimada: fachadas sem endereço de site'],
            ] },
            { type: 'checklist', title: 'Campos obrigatórios por prospect (marque conforme preenche)', items: [
              'Nome do negócio e categoria',
              'Nome do dono ("Olá" sem nome corta a taxa de resposta pela metade)',
              'Endereço/área e telefone',
              'E-mail (prefira info@ ou bookings@ a endereços de pessoa física)',
              'Site atual (ou "nenhum")',
              'Nota no Google e número de avaliações',
              'Avaliações sem resposta',
              'Horários corretos? (sim/não)',
              'Palavra-chave local principal (o que o cliente dele digitaria)',
              'Posição atual para esse termo',
              'Concorrente que aparece acima',
            ] },
            { type: 'callout', tone: 'rule', title: 'As quatro últimas colunas são o e-mail', html: 'Palavra-chave, posição, concorrente acima e avaliações sem resposta: são elas que fazem a mensagem funcionar. Se você não consegue preencher essas colunas para um prospect, <strong>ele não está pronto para ser abordado</strong>.' },
            { type: 'callout', tone: 'info', title: 'Como descobrir o nome do dono', html: 'Seção "Sobre" e posts do Instagram/Facebook; ligar num horário calmo e perguntar quem cuida da parte de negócio; registro da empresa (CNPJ na Receita no Brasil; CRO na Irlanda). Falar com a pessoa certa é metade da venda.' },
            { type: 'quiz', q: 'Você tem nome, telefone e e-mail de um salão, mas não sabe para que termo ele deveria aparecer nem quem aparece acima dele. O que fazer?', options: [
              'Enviar assim mesmo; o resto se descobre na conversa.',
              'Pesquisar essas colunas antes. Sem elas não há achado específico, e sem achado específico não há e-mail.',
              'Mandar um e-mail genérico pedindo para ele contar os problemas dele.',
            ], answer: 1, why: 'Sem as colunas de diagnóstico, a mensagem vira mala direta e converte a 0,5%. A pesquisa é o produto.' },
          ],
        },
        {
          id: 'score', title: 'O score de qualificação',
          blocks: [
            { type: 'text', html: `<p>Cada prospect recebe uma nota de <strong>0 a 100</strong> antes de qualquer contato: cinco fatores de 20 pontos. <strong>Abordamos apenas acima de 60.</strong> Abaixo disso, a dor não é suficiente para gerar resposta. Reputação é o fator mais importante: negócio bem avaliado e invisível é o melhor prospect que existe. Contato tem lógica inversa aos outros: pontua alto quando o lead é fácil de abordar, porque sem canal de contato o lead não é acionável.</p>` },
            {"type": "video", "title": "Score de qualificação na prática", "desc": "Dois prospects reais pontuados, e o que fazer com cada um.", "scenes": [{"dur": 6, "caption": "Cinco fatores, 20 pontos cada. Aborde só acima de 60.", "narration": "Antes de qualquer contato, cada prospect recebe uma nota de zero a cem. Cinco fatores, vinte pontos cada: Web, Sinal, Reputação, Contato e Atividade. Só se aborda acima de sessenta.", "visual": {"kind": "title", "text": "Abordar ou <em>não abordar</em>?", "sub": "Cinco fatores, 20 pontos cada. Aborde só acima de 60."}}, {"dur": 13, "caption": "Restaurante em Lucan: site quebra no celular, perfil completo, boa reputação, contato fácil, avaliações sem resposta.", "narration": "Um restaurante em Lucan. O site quebra no celular: oito pontos em Web. O perfil do Google está completo: zero em Sinal. Nota quatro e meio com sessenta avaliações: vinte em Reputação. Telefone e e-mail públicos: vinte em Contato. Quatorze avaliações recentes sem resposta: vinte em Atividade. Sessenta e oito: aborde.", "visual": {"kind": "score", "items": [{"text": "Web · não funciona no celular · 8", "on": true}, {"text": "Sinal · perfil completo · 0", "on": false}, {"text": "Reputação · 4,5 com 60 avaliações · 20", "on": true}, {"text": "Contato · telefone e e-mail · 20", "on": true}, {"text": "Atividade · 14 sem resposta · 20", "on": true}], "result": "68 → aborde (Sequência A)"}}, {"dur": 12, "caption": "Cafeteria nova: sem site, mas sem avaliações e só com telefone. Score 50: ainda não.", "narration": "Uma cafeteria sem site: vinte em Web. Perfil sem horário: dez em Sinal. Mas ainda sem avaliações: zero em Reputação. Só telefone: dez em Contato. Sem avaliações para responder: dez em Atividade. Cinquenta: não aborde ainda. Falta a reputação, que é o fator mais importante.", "visual": {"kind": "score", "items": [{"text": "Web · não tem site · 20", "on": true}, {"text": "Sinal · falta horário · 10", "on": true}, {"text": "Reputação · sem avaliações · 0", "on": false}, {"text": "Contato · só telefone · 10", "on": true}, {"text": "Atividade · 10", "on": true}], "result": "50 → não aborde ainda"}}, {"dur": 9, "caption": "A regra de envio.", "narration": "Acima de sessenta, aborde: Sequência A, auditoria primeiro, é o padrão. Site saudável mas total acima de sessenta: Sequência B, voucher primeiro. Sessenta ou menos, não aborde: revisite em seis meses, com um motivo novo.", "visual": {"kind": "bullets", "title": "Regra de envio", "items": ["Acima de 60 → aborde: Sequência A (auditoria) é o padrão", "Site saudável e mesmo assim > 60 → Sequência B (voucher)", "60 ou menos → não aborde; revisite em seis meses"]}}]},
            { type: 'scorer' },
            { type: 'table', head: ['Fator', 'Peso', 'Como pontua'], rows: [
              ['Web', '20', '20 se não tem site · 12 se sem HTTPS ou fora do ar · 8 se não funciona no celular · 0 se o site está saudável'],
              ['Sinal', '20', '20 se o perfil do Google está sem fotos e sem horário · 10 se falta um dos dois · 0 se completo'],
              ['Reputação', '20', '20 se nota ≥ 4,0 com 10+ avaliações · proporcional abaixo disso'],
              ['Contato', '20', '20 se tem telefone e e-mail válidos · 10 se só telefone · 0 se nenhum'],
              ['Atividade', '20', '20 se há avaliações recentes sem resposta · reduz conforme o negócio já responde'],
            ] },
            { type: 'table', head: ['Score', 'O que fazer'], rows: [
              ['Acima de 60', 'Aborde. Sequência A (auditoria primeiro) é o padrão. Se o fator Web pontuou 0 (site saudável) e mesmo assim passou de 60, use a Sequência B (voucher primeiro).'],
              ['60 ou menos', 'Não aborde. Volte a olhar em seis meses, e só com um motivo genuinamente novo.'],
            ] },
            { type: 'quiz', q: 'Um restaurante em Lucan: site que quebra no celular, perfil do Google completo, nota 4,5 com 60 avaliações, telefone e e-mail públicos, 14 avaliações recentes sem resposta. Qual é o score e o que você faz?', options: [
              '48: não aborde ainda.',
              '68: aborde com a Sequência A (auditoria primeiro).',
              '88: aborde com a Sequência B (voucher primeiro).',
            ], answer: 1, why: 'Web 8 (não funciona no celular) + Sinal 0 (completo) + Reputação 20 (≥ 4,0 com 10+) + Contato 20 + Atividade 20 = 68. Acima de 60, aborde. Como o Web pontuou (site com problema), a Sequência A é a certa.' },
          ],
        },
      ],
    },

    /* ═══════════════════════════ MÓDULO 5 ═══════════════════════════ */
    {
      id: 'arma-secreta', icon: '🎁', minutes: 14,
      title: 'A arma secreta: auditoria e esboço',
      subtitle: 'Entregar antes de pedir. Como funciona a auditoria (Europa) e o esboço pronto (Brasil).',
      lessons: [
        {
          id: 'auditoria', title: 'A auditoria gratuita (Europa)',
          blocks: [
            { type: 'text', html: `<p>Este é o diferencial inteiro. É o que transforma um e-mail frio em consultoria antes de qualquer conversa sobre dinheiro. <strong>Duas páginas, nunca mais que isso</strong>, entregues por e-mail em 48 horas.</p>` },
            {"type": "video", "title": "Anatomia da auditoria de 2 páginas", "desc": "O que vai em cada página e as quatro regras que não se quebram.", "scenes": [{"dur": 6, "caption": "Duas páginas, entregues em 48 horas.", "narration": "A auditoria gratuita tem duas páginas, nunca mais que isso, e é entregue por e-mail em quarenta e oito horas.", "visual": {"kind": "title", "text": "Duas páginas. <em>Nunca mais que isso.</em>", "sub": "Entregue por e-mail em 48 horas."}}, {"dur": 12, "caption": "Página 1 diz onde ele está. Página 2, o que corrigir primeiro.", "narration": "A primeira página mostra onde o negócio está: posição no Google para dois ou três termos reais, quem aparece acima, o estado da ficha do Google e o site no celular. A segunda página traz três recomendações priorizadas, o impacto de cada uma, quanto custa, o que o voucher cobre e um próximo passo claro.", "visual": {"kind": "compare", "left": {"title": "Página 1 · Onde você está", "items": ["Posição no Google para 2–3 termos reais", "Quem aparece acima (nomeie)", "Estado do Google Business Profile", "Site atual no celular"]}, "right": {"title": "Página 2 · O que corrigir primeiro", "items": ["Três recomendações priorizadas", "Impacto de cada uma", "Quanto custa e o que o voucher cobre", "Um próximo passo claro"]}}}, {"dur": 9, "caption": "Quatro regras inegociáveis.", "narration": "Quatro regras: linguagem simples, sem jargão. Útil mesmo que nunca contratem. Nunca anexar ao primeiro e-mail. E entregue em até quarenta e oito horas.", "visual": {"kind": "bullets", "title": "Quatro regras inegociáveis", "items": ["Linguagem simples, sem jargão", "Útil mesmo que nunca contratem", "Nunca anexar ao primeiro e-mail", "Entregue em até 48 horas"]}}, {"dur": 8, "caption": "A mensagem que acompanha a entrega.", "narration": "Quando o cliente disser sim, a auditoria vai com esta mensagem: dá uma lida com calma. Se alguma coisa não ficar clara, explico numa chamada de quinze minutos, sem pitch de venda.", "visual": {"kind": "chat", "messages": [{"from": "them", "text": "Sim, pode mandar a auditoria."}, {"from": "you", "text": "Dá uma lida com calma. Se alguma coisa não ficar clara, explico numa chamada de 15 minutos — sem pitch de venda."}]}}]},
            { type: 'cards', cols: 2, items: [
              { icon: '📍', title: 'Página 1 — Onde você está', html: '<ul><li>Posição no Google para 2–3 termos que os clientes dele realmente digitam</li><li>Quem aparece acima dele (nomeie o concorrente)</li><li>Estado do Google Business Profile: fotos, horários, categorias, respostas</li><li>Site atual: velocidade no celular, primeira impressão, o que está quebrado ou faltando</li></ul>' },
              { icon: '🛠️', title: 'Página 2 — O que corrigiríamos primeiro', html: '<ul><li>Três recomendações priorizadas, em linguagem simples</li><li>Impacto estimado de cada uma</li><li>Quanto custaria corrigir e o que o voucher cobre</li><li>Um próximo passo claro</li></ul>' },
            ] },
            { type: 'steps', items: [
              { title: 'Apenas linguagem simples', html: 'Nada de "Core Web Vitals", nada de "schema markup". Escreva para quem administra um salão.' },
              { title: 'Genuinamente útil, mesmo que nunca contratem', html: 'A auditoria precisa se sustentar sozinha como valor gratuito. É isso que a torna crível.' },
              { title: 'Nunca anexe ao primeiro e-mail', html: 'Anexos destroem entregabilidade e disparam filtros de spam. Peça uma resposta primeiro; depois envie.' },
              { title: 'Entregue em até 48 horas', html: 'Prometido e cumprido. Atrasar a auditoria é a forma mais rápida de perder credibilidade.' },
            ] },
            { type: 'script', title: 'Mensagem que acompanha a entrega da auditoria', pt: 'Dá uma lida com calma. Se quiser que eu explique, é só marcar aqui — sem pitch de venda. {Link de agendamento}', en: "Have a read. If you'd like me to walk you through it, just book a slot here — no pitch. {Booking link}" },
            { type: 'callout', tone: 'info', title: 'E se o negócio não tem nada online?', html: 'Então não há o que auditar, e tudo bem: o próprio site diz isso. O cliente descreve o negócio e o que precisa; a resposta vem no mesmo prazo de 48 horas.' },
            { type: 'quiz', q: 'O prospect respondeu "sim, pode mandar" ao seu primeiro e-mail. Você já tinha anexado a auditoria no primeiro e-mail para ganhar tempo. O que deu errado?', options: [
              'Nada; anexar adianta o processo.',
              'Anexo no primeiro e-mail derruba a entregabilidade e dispara filtros de spam. A regra é pedir a resposta primeiro e enviar depois.',
              'Deveria ter anexado também a proposta.',
            ], answer: 1, why: 'Anexo no primeiro contato é uma das regras inegociáveis. Ele responde "sim"; você envia a auditoria em até 48h com a mensagem de acompanhamento.' },
          ],
        },
        {
          id: 'esboco', title: 'O esboço pronto (Brasil)',
          blocks: [
            { type: 'text', html: `<p>No Brasil, em vez de um documento, entregamos <strong>o próprio site, já montado</strong>, com os dados públicos do negócio: fotos, avaliações reais, nomes da equipe que aparecem nas reviews. O cliente recebe um link funcional, não uma promessa. Leva de 2 a 4 horas por prospect e faz 80% da venda sozinho.</p>` },
            { type: 'checklist', title: 'Quatro checagens antes de enviar o link', items: [
              'Identifiquei o dono (não o atendente) e sei o melhor canal direto',
              'O preview está impecável no celular, que é como ele vai abrir',
              'Os nomes reais da equipe que aparecem nas reviews estão na página (gatilho emocional forte)',
              'O botão de agendar aponta para o sistema real dele (Fresha, Booksy, Trinks, WhatsApp Business…)',
              'Telefone correto e clicável, horários corretos, dias de fechamento respeitados',
              'Verifiquei que o domínio candidato (nomedonegocio.com.br) está disponível',
            ] },
            { type: 'callout', tone: 'warn', title: 'Atenção às imagens', html: 'O esboço usa fotos públicas (Google/Instagram) como semente. Para o preview de venda, aceitável. Para o site no ar, é <strong>obrigatório</strong> trocar por fotos originais ou ter permissão explícita. Deixe isso claro no onboarding.' },
            { type: 'callout', tone: 'tip', title: 'Por que funciona', html: '"Give before you ask": você não pede nada, entrega algo pronto. Combinado com os nomes da equipe e as fotos do próprio negócio, o cliente sente que você fez a lição de casa e que aquilo "é dele". A maioria dos vendedores diz "posso te mostrar"; você já mostrou.' },
            { type: 'quiz', q: 'Você terminou o esboço de uma hamburgueria, mas o botão "Pedir" aponta para um link genérico e o domínio ainda não foi checado. Envia?', options: [
              'Sim, o cliente vai entender que é um rascunho.',
              'Não. Botão apontando para o sistema real dele e domínio verificado são checagens obrigatórias; domínio indisponível mata o momentum da venda.',
              'Sim, mas só por e-mail.',
            ], answer: 1, why: 'Pular as checagens custa a venda e queima um lead que era qualificado. O preview é a prova; ele precisa estar certo.' },
          ],
        },
        {
          id: 'achados', title: 'Achados específicos vs. genéricos',
          blocks: [
            { type: 'text', html: `<p>Nos dois mercados, a diferença entre 0,5% e 5% de resposta está nos <strong>três achados</strong> do primeiro contato. Um achado específico é verdadeiro, verificável e não óbvio para aquele negócio. Um genérico serviria para qualquer um.</p>` },
            { type: 'cards', cols: 2, items: [
              { icon: '❌', title: 'Genérico (não envie)', html: '<ul><li>"Seu site poderia ser mais moderno."</li><li>"Vocês precisam de mais presença online."</li><li>"O SEO está fraco."</li><li>"Um site ajuda a vender mais."</li></ul>' },
              { icon: '✅', title: 'Específico (envie)', html: '<ul><li>"Vocês estão na página 2 para \'barber Castleknock\'; a Cut&Co aparece acima."</li><li>"A listagem do Google tem 11 avaliações sem resposta desde março."</li><li>"O horário no Google diz \'fechado domingo\', mas o Instagram mostra vocês abertos."</li><li>"O botão de agendar do site leva para uma página em branco no celular."</li></ul>' },
            ] },
            { type: 'callout', tone: 'rule', title: 'A regra final', html: 'Se você não consegue escrever três observações específicas, verdadeiras e não óbvias sobre aquele negócio, <strong>não envie a mensagem</strong>. A pesquisa é o produto.' },
            { type: 'quiz', q: 'Qual destes é um achado específico?', options: [
              '"Seu Instagram é bonito, mas falta um site profissional."',
              '"Quem busca \'dentista Lucan\' encontra a Smile Clinic em 1º e vocês só na página 2."',
              '"Um site moderno passa mais confiança para o cliente."',
            ], answer: 1, why: 'Nomeia a busca real, a posição e o concorrente. É verificável e não óbvio para o dono. Os outros dois servem para qualquer negócio.' },
            { type: 'quiz', q: 'Você só conseguiu dois achados específicos para um prospect com score 72. O que fazer?', options: [
              'Enviar com dois; é melhor que nada.',
              'Completar com um genérico ("o site poderia ser mais moderno").',
              'Pesquisar mais (listagem do Google, horários, site no celular) até ter o terceiro. Se não houver, não enviar ainda.',
            ], answer: 2, why: 'Um achado genérico no meio de dois específicos enfraquece os três. Quase sempre há um terceiro na listagem do Google ou no site aberto no celular.' },
          ],
        },
      ],
    },

    /* ═══════════════════════════ MÓDULO 6 ═══════════════════════════ */
    {
      id: 'abordagem', icon: '✉️', minutes: 22,
      title: 'Abordagem: como iniciar a conversa',
      subtitle: 'Cold email, respostas, WhatsApp e DM, telefone e LinkedIn. Com os scripts prontos.',
      lessons: [
        {
          id: 'cold-email', title: 'Cold email: três e-mails e para',
          blocks: [
            { type: 'text', html: `<p>Três sequências, escolhidas pelo score. <strong>Todas terminam no terceiro e-mail, sem exceção.</strong> Dia 0, dia 4, dia 11, e depois supressão. Quem não respondeu a três não é lead.</p>` },
            {"type": "video", "title": "A cadência do cold email", "desc": "Três e-mails, os dias certos e o que nunca fazer.", "scenes": [{"dur": 5, "caption": "Três e-mails e para.", "narration": "Toda sequência de cold email tem três e-mails. Depois, para.", "visual": {"kind": "title", "text": "Três e-mails <em>e para</em>."}}, {"dur": 10, "caption": "Dia 0, dia 4, dia 11. Depois, supressão.", "narration": "Dia zero: o primeiro e-mail, com três achados específicos. Dia quatro: o reforço. Dia onze: o encerramento. Depois disso, o prospect entra na lista de supressão.", "visual": {"kind": "timeline", "points": [{"label": "Dia 0", "sub": "E-mail 1: três achados"}, {"label": "Dia 4", "sub": "E-mail 2: reforço"}, {"label": "Dia 11", "sub": "E-mail 3: encerramento"}, {"label": "Stop", "sub": "supressão", "tone": "stop"}]}}, {"dur": 10, "caption": "Três achados específicos. Sem anexo. Uma pergunta simples.", "narration": "O primeiro e-mail traz três achados específicos sobre aquele negócio, nomeia o concorrente, não leva anexo e termina com uma pergunta simples: quer a auditoria? Responda sim.", "visual": {"kind": "chat", "messages": [{"from": "you", "name": "E-mail 1 · Dia 0", "text": "Vocês estão na página 2 para \"barber Castleknock\" — a Cut&Co aparece acima. Escrevi tudo em duas páginas, sem apresentação de vendas. Quer a auditoria? Responda \"sim\"."}]}}, {"dur": 8, "caption": "Sem quarto e-mail.", "narration": "Quem não respondeu a três não é lead. Insistir gera reclamação e queima o domínio de envio. Revisite só após seis meses, e com um motivo novo.", "visual": {"kind": "bullets", "title": "Sem quarto e-mail", "items": ["Quem não respondeu a três não é lead", "Insistir gera reclamação e queima o domínio", "Revisitar só após seis meses, com motivo novo"]}}]},
            { type: 'steps', items: [
              { title: 'Dia 0 — E-mail 1: os três achados', html: 'Específico, curto, oferece a auditoria gratuita. Termina com "responda sim" e uma linha de opt-out.', meta: 'Sequência A · score 4–5' },
              { title: 'Dia 4 — E-mail 2: reforço', html: 'Sobe a mensagem, repete a oferta e escolhe o achado mais forte: "essa está custando contatos toda semana".', meta: 'Mesmo assunto, com "Re:"' },
              { title: 'Dia 11 — E-mail 3: encerramento', html: '"Paro por aqui, não quero entulhar sua caixa." A oferta fica aberta. Deseja sucesso.', meta: 'Assunto novo: "Fechando o assunto" · "Closing the loop"' },
              { title: 'Depois: supressão', html: 'Sem quarto e-mail. Revisitar só após seis meses e com motivo genuinamente novo.', meta: 'Sem resposta após 3 = não é lead' },
            ] },
            { type: 'table', head: ['Sequência', 'Quando usar', 'Abertura'], rows: [
              ['A · Auditoria primeiro', 'Score 4–5, problemas evidentes. É o padrão e a de maior conversão.', 'Três achados + oferta da auditoria + menção ao voucher.'],
              ['B · Voucher primeiro', 'Score acima de 60 com site saudável (fator Web = 0). A dor é menor; lidera-se pelo dinheiro.', '"O Estado paga metade — o {Negócio} se qualifica?" E-mail único.'],
              ['C · Indicação', 'Imediatamente depois que qualquer cliente mencionar alguém. A de maior conversão de todas.', '"{Nome de quem indicou} sugeriu que eu entrasse em contato."'],
            ] },
            { type: 'script', title: 'E-mail 1 · Sequência A (adaptado para você)', pt: 'Assunto: {Nome do negócio} — 3 coisas que ajustaríamos na sua listagem do Google\n\nOlá {Nome do dono},\n\nSou a {Seu nome}, da equipe do Marcus Fernandes — fazemos sites para pequenos negócios aqui na região de Dublin 15. Dei uma olhada no {Nome do negócio} hoje de manhã. Três coisas chamaram atenção:\n\n• Vocês estão na página 2 para "{palavra-chave local}" — {Concorrente} aparece acima\n• Sua listagem do Google tem {N} avaliações sem resposta\n• {Terceiro achado específico}\n\nNada disso é complicado de resolver. Escrevemos tudo direitinho — duas páginas, linguagem simples, sem apresentação de vendas. Posso mandar, de graça, sem compromisso.\n\nVale saber: o Local Enterprise Office cobre até 50% do custo de colocar um negócio online. A maioria das empresas do seu porte se qualifica, e nós cuidamos da papelada.\n\nQuer a auditoria? Basta responder "sim" e ela chega em 48 horas.\n\n{Seu nome}\nEquipe Marcus Fernandes · marcusfernandes.ie\n\nResponda "não, obrigado" e eu não entro mais em contato.', en: "Subject: {Business name} — 3 things we'd fix on your Google listing\n\nHi {Owner name},\n\nI'm {Seu nome}, from Marcus Fernandes' team — we build websites for small businesses around Dublin 15. I had a look at {Business name} this morning. Three things stood out:\n\n• You're on page 2 for \"{local keyword}\" — {Competitor} shows up above you\n• Your Google listing has {N} reviews with no replies\n• {Third specific finding}\n\nNone of it is complicated to fix. We wrote it up properly — two pages, plain English, no sales deck. Happy to send it over, free, no strings.\n\nWorth knowing: the Local Enterprise Office covers up to 50% of the cost of getting a business online. Most businesses your size qualify, and we handle the paperwork.\n\nWant the audit? Just reply \"yes\" and it's with you in 48 hours.\n\n{Seu nome}\nMarcus Fernandes' team · marcusfernandes.ie\n\nReply \"no thanks\" and I won't contact you again.", note: 'Os e-mails 2 e 3, a Sequência B e a C estão prontos no Playbook, seção 06. Sempre substitua todos os {campos} antes de enviar; um campo esquecido custa a resposta.' },
            { type: 'order', title: 'Coloque a cadência da Sequência A em ordem', items: [
              'Dia 0 — E-mail 1 com três achados e oferta da auditoria',
              'Dia 4 — E-mail 2 subindo a mensagem, com o achado mais forte',
              'Dia 11 — E-mail 3 encerrando o assunto, oferta fica aberta',
              'Suprimir da lista; revisitar só após 6 meses com motivo novo',
            ], why: 'Insistir depois do terceiro gera reclamações que danificam o domínio de envio. A cadência é fixa.' },
            { type: 'quiz', q: 'Quantos e-mails no máximo uma sequência tem, e o que acontece depois?', options: [
              'Três; depois o prospect vai para a lista de supressão.',
              'Cinco; depois liga-se para ele.',
              'Não há limite enquanto não responder "não".',
            ], answer: 0, why: 'Três, sem exceção. Sem resposta após três = não é lead. Quarto e-mail gera reclamação e queima o domínio.' },
          ],
        },
        {
          id: 'respostas', title: 'Tratando as respostas',
          blocks: [
            { type: 'text', html: `<p>Quatro respostas cobrem quase tudo. Cada uma tem uma reação exata.</p>` },
            { type: 'table', head: ['Resposta do prospect', 'O que você faz'], rows: [
              ['"Sim / pode mandar"', 'Auditoria entregue em até 48h, com a mensagem de acompanhamento e o link da reunião de diagnóstico.'],
              ['"Quanto custa?"', 'Nunca um número solto. Ancore a faixa e devolva para a auditoria (script abaixo).'],
              ['"Não tenho interesse"', 'Responda com elegância e suprima permanentemente. Nunca discuta.'],
              ['Sem resposta após 3', 'Suprima. Revisite após seis meses, só com motivo genuinamente novo.'],
            ] },
            { type: 'script', title: '"Quanto custa?"', pt: 'Depende do que vocês precisam — os pacotes começam em €1.200, e o voucher normalmente leva isso para €600. A auditoria vai dizer qual deles realmente encaixa. Quer que eu mande?', en: "Depends on what you need — the packages start at €1,200, and the voucher usually takes that to €600. The audit will tell us which one actually fits. Want me to send it?", note: 'No Brasil: "Trabalhamos com três pacotes para o momento de cada negócio. Antes de te passar o preço certo, posso fazer duas perguntas rápidas? Assim te indico o ideal sem te enrolar."' },
            { type: 'script', title: '"Não tenho interesse"', pt: 'Sem problema nenhum — vou tirar vocês da minha lista. Muito sucesso com o {Nome do negócio}.', en: "No problem at all — I'll take you off my list. Best of luck with {Business name}." },
            { type: 'scenario', title: 'Resposta ao seu e-mail', who: '👨‍🍳', context: 'Dono de takeaway em Blanchardstown, por e-mail', client: '"Quanto custa isso?"', clientEn: 'How much is this?', options: [
              { text: 'São €1.200. Posso te mandar a fatura?', good: false, feedback: 'Número solto, sem contexto e sem o voucher. Ele compara com zero e some.' },
              { text: 'Depende do que vocês precisam — os pacotes começam em €1.200, e o voucher normalmente leva isso para €600. A auditoria vai dizer qual deles encaixa. Quer que eu mande?', good: true, feedback: 'Ancora a faixa, mostra o voucher e devolve para a auditoria, que é o próximo passo certo. Diagnosticar antes de precificar.' },
              { text: 'Prefiro não falar de preço por e-mail. Podemos marcar uma reunião de uma hora?', good: false, feedback: 'Esconder o preço soa como agência. E uma hora é fricção demais: a reunião de diagnóstico tem 30 minutos e é marcada por link.' },
            ] },
          ],
        },
        {
          id: 'whatsapp-dm', title: 'WhatsApp, DM e telefone',
          blocks: [
            { type: 'text', html: `<p>Canais de alta resposta e de alto risco. No Brasil, a DM é o canal principal. Na Irlanda, o WhatsApp complementa o e-mail e só com disciplina.</p>` },
            { type: 'callout', tone: 'warn', title: 'Regras do WhatsApp na Irlanda', html: '<ul style="padding-left:1.2rem"><li>Só para números publicamente divulgados como contato comercial (listagem do Google, bio do Instagram, fachada)</li><li>Nunca automatize: envio manual apenas</li><li>No máximo um punhado por dia</li><li>Pare imediatamente a qualquer sinal negativo</li></ul>Mensagem não solicitada tem base legal fraca no GDPR e viola a política do WhatsApp: número denunciado algumas vezes é banido para sempre.' },
            { type: 'script', title: 'Mensagem de WhatsApp (Irlanda)', pt: 'Olá {Nome do dono}, aqui é a {Seu nome}, da equipe do Marcus Fernandes — fazemos sites aqui em Dublin 15. Dei uma olhada rápida no {Nome do negócio} online hoje. Vocês não estão aparecendo para "{palavra-chave local}" e a listagem do Google está sem {item}. Os dois são ajustes rápidos. Preparamos auditorias gratuitas de 2 páginas para negócios locais — sem custo, sem pitch. Quer que eu mande a de vocês?', en: "Hi {Owner name}, {Seu nome} here from Marcus Fernandes' team — we build websites here in Dublin 15. Had a quick look at {Business name} online today. You're not coming up for \"{local keyword}\" and your Google listing is missing {item}. Both are quick fixes. We put together free 2-page audits for local businesses — no charge, no pitch. Want me to send yours over?" },
            { type: 'text', html: `<h4>Brasil: a sequência de toques</h4>` },
            { type: 'steps', items: [
              { title: 'T1 — DM (WhatsApp / Instagram / Facebook)', html: 'Canal principal. Chega direto ao dono, que já responde reviews por lá, e permite entregar o link do esboço na primeira mensagem. Melhor dia: terça ou quarta de manhã.', meta: 'Resposta esperada em 24–72h · leitura ~70%' },
              { title: 'T2 — Ligação curta de qualificação', html: 'Se a DM não responder em ~4 dias, ou em paralelo. Objetivo: nome do dono e melhor canal direto. Não vender pelo telefone do balcão. Sessenta segundos, sem pitch.', meta: '1 min · sem vender' },
              { title: 'T3 — Fechamento: vídeo de 10 min ou visita', html: 'Para negócio com cultura de walk-in (salão, restaurante, oficina), visita presencial mostrando o site num tablet é marcante. Sem viagem, vídeo-chamada fecha igual.', meta: 'Conversão T3 → venda: 50–70%' },
            ] },
            { type: 'script', title: 'T1 — DM com o esboço (Brasil)', pt: 'Oi! Pergunta rápida — é por aqui que falo com o(a) dono(a) do(a) [NEGÓCIO]?\n\nSou a {Seu nome}, da equipe do Marcus Fernandes, fazemos sites para [CATEGORIA] aqui em [CIDADE]. Reparei que o [NEGÓCIO] ainda não tem um site próprio — só Instagram / [SISTEMA_AGENDAMENTO] — então a gente fez um pra vocês darem uma olhada. Usamos as próprias fotos de vocês e as reviews reais. Sem pegadinha, já está pronto.\n\nAqui o preview: [LINK]\n\nSe gostarem, esta semana mesmo colocamos no ar no domínio de vocês. Se não for pra agora, sem problema nenhum. Posso passar pra mostrar pessoalmente ou marcar uma chamada rápida — o que ficar melhor.\n\nDe qualquer forma, dá uma olhada — a equipe de vocês está lá 🙂' },
            { type: 'script', title: 'Follow-up da DM (~5 dias sem resposta)', pt: 'Oi de novo — só pra garantir que minha mensagem não se perdeu! O preview do site do(a) [NEGÓCIO] continua aqui: [LINK]. Sem pressa e sem pressão — se não for pra agora, totalmente ok. Só não queria que passasse batido; a página da equipe ficou muito boa.', en: "Hi again — just making sure my message didn't get buried! The website preview for [BUSINESS] is still here: [LINK]. No rush and no pressure — if it's not for you, that's completely fine. Just didn't want you to miss it; the team page came out really well." },
            { type: 'script', title: 'Quando o cliente liga para você (qualquer mercado)', pt: '"Obrigada por ligar. Antes de eu falar qualquer coisa sobre preço — me conta um pouco do negócio. O que vocês fazem, e como as pessoas encontram vocês hoje?"\n\n[Escute. Anote. Não faça pitch.]\n\n"Certo. Então a principal lacuna que estou ouvindo é {repetir as palavras dele}. É exatamente isso que a gente resolve. O que eu sugiro: deixa eu preparar uma auditoria gratuita — duas páginas, sem custo, dizendo exatamente onde vocês estão. Aí, se fizer sentido, a gente conversa sobre fazer alguma coisa. Parece justo?"', en: "\"Thanks for ringing. Before I say anything about price — tell me a bit about the business. What do you do, and how do people find you at the moment?\"\n\n[Listen. Take notes. Do not pitch.]\n\n\"Right. So the main gap I'm hearing is {restate their words}. That's exactly what we fix. What I'd suggest: let me put together a free audit — two pages, no charge, tells you exactly where you stand. Then if it makes sense we talk about doing something. Sound fair?\"" },
            { type: 'quiz', q: 'Você achou o celular pessoal de um dono de salão em Dublin num grupo de Facebook. Pode mandar WhatsApp?', options: [
              'Sim, WhatsApp tem taxa de resposta alta.',
              'Não. Só números publicamente divulgados como contato comercial. Número pessoal = risco legal e de banimento.',
              'Sim, desde que seja só uma mensagem.',
            ], answer: 1, why: 'A regra é clara: só contato comercial público (listagem do Google, bio, fachada). Fora disso, use e-mail ou LinkedIn.' },
          ],
        },
        {
          id: 'linkedin', title: 'LinkedIn: construção lenta',
          blocks: [
            { type: 'text', html: `<p>Canal de construção lenta: conexão sem pitch, DM só depois do aceite, e dois posts por semana que fazem o trabalho de aquecimento antes de qualquer abordagem.</p>` },
            { type: 'script', title: 'Pedido de conexão', pt: 'Olá {Nome} — faço parte da equipe do Marcus Fernandes, fazemos sites para pequenos negócios na região de Dublin 15. Encontrei o {Nome do negócio} e achei que valia conectar. Sem pitch.', en: "Hi {Name} — I'm on Marcus Fernandes' team, we build websites for small businesses around Dublin 15. Came across {Business name} and thought I'd connect. No pitch." },
            { type: 'callout', tone: 'rule', title: 'DM só depois do aceite, e nunca no mesmo dia', html: 'Conectar e mandar pitch em seguida é o comportamento que faz o LinkedIn ser ignorado. Espere pelo menos 24 horas.' },
            { type: 'script', title: 'DM de follow-up (após 24h do aceite)', pt: 'Obrigada por conectar, {Nome}. Dei uma olhada no {Nome do negócio} — vocês não estão aparecendo para "{palavra-chave local}", o que provavelmente está custando alguns contatos por semana. Fazemos auditorias gratuitas de duas páginas para negócios locais. Sem custo, sem pitch, só o que ajustaríamos e em que ordem. Quer que eu mande a de vocês?', en: "Thanks for connecting, {Name}. I had a look at {Business name} — you're not showing up for \"{local keyword}\", which is probably costing you a few enquiries a week. We do free two-page audits for local businesses. No charge, no pitch, just what we'd fix and in what order. Want me to send yours?" },
            { type: 'cards', items: [
              { icon: '📊', title: 'Post de estudo de caso', html: 'Negócio + bairro + problema + o que fizemos + número + "o LEO cobriu metade".' },
              { icon: '🧰', title: 'Post de utilidade pura', html: '"Três coisas erradas na maioria das listagens do Google em Dublin" — e como corrigir de graça.' },
              { icon: '💶', title: 'Post do voucher', tag: 'Mais gera lead', tagTone: 'green', html: '"O Estado irlandês paga metade do custo de colocar seu negócio online." Repetir em variações a cada seis semanas.' },
              { icon: '🧑', title: 'Post pessoal', html: 'A história: nove anos em tecnologia, quatro na Irlanda, a mesma história ouvida de donos de negócio.' },
            ] },
            { type: 'quiz', q: 'O dono de uma clínica aceitou sua conexão às 10h. Quando você manda a DM?', options: [
              'Imediatamente, enquanto ele está online.',
              'No dia seguinte ou depois, nunca no mesmo dia.',
              'Nunca; no LinkedIn só se publica.',
            ], answer: 1, why: 'Conectar e mandar pitch em seguida é o que faz o canal ser ignorado. Pelo menos 24 horas.' },
          ],
        },
      ],
    },

    /* ═══════════════════════════ MÓDULO 7 ═══════════════════════════ */
    {
      id: 'conversa', icon: '🗣️', minutes: 18,
      title: 'A conversa de vendas',
      subtitle: 'A reunião de diagnóstico de 30 minutos, o walk-through do esboço e a proposta ao vivo com o preço.',
      lessons: [
        {
          id: 'discovery', title: 'A reunião de diagnóstico: 30 minutos',
          blocks: [
            { type: 'text', html: `<p>Trinta minutos, agendados por link, <strong>gravados</strong>. O objetivo não é apresentar nada: é entender o problema e decidir se há projeto. Quem fala mais é o cliente. O preço não é dito aqui; fica para a reunião de proposta, apresentada ao vivo.</p>` },
            {"type": "video", "title": "A reunião de diagnóstico em 30 minutos", "desc": "A abertura que assume o controle, os seis blocos de perguntas e o fechamento com duas datas.", "scenes": [{"dur": 6, "caption": "Trinta minutos, agendados por link, gravados.", "narration": "A reunião de diagnóstico tem trinta minutos, é agendada por link e gravada. O objetivo não é apresentar nada: é entender o problema e decidir se há projeto.", "visual": {"kind": "title", "text": "30 minutos, <em>gravados</em>.", "sub": "Entender o problema e decidir se há projeto. Quem fala mais é o cliente."}}, {"dur": 11, "caption": "A abertura define a pauta e planta o próximo passo.", "narration": "Nos primeiros sessenta segundos, você assume o controle: primeiro conto o que vi no seu negócio online. Depois quero te ouvir. No fim, te digo se dá para ajudar e como. Se fizer sentido para os dois, marcamos um segundo momento e eu apresento uma proposta. Funciona assim?", "visual": {"kind": "chat", "messages": [{"from": "you", "text": "Antes de começar, deixa eu dizer como vai funcionar: primeiro te conto rápido o que vi no seu negócio online. Depois quero te ouvir. No fim, te digo se dá para ajudar e como."}, {"from": "you", "text": "Se fizer sentido para os dois, marcamos um segundo momento e eu te apresento uma proposta. Funciona assim?"}]}}, {"dur": 13, "caption": "Seis blocos de perguntas, nesta ordem.", "narration": "As perguntas seguem seis blocos: contexto e objetivo, situação, problema, tangibilizar com a conta na frente dele, impacto se nada mudar, e experiências anteriores. Essa ordem constrói urgência sem pressão.", "visual": {"kind": "clock", "total": 30, "segments": [{"from": 0, "to": 2, "label": "Abertura: assumir o controle"}, {"from": 2, "to": 5, "label": "O que eu vi: a auditoria"}, {"from": 5, "to": 18, "label": "Seis blocos de perguntas"}, {"from": 18, "to": 21, "label": "Validar: \"é isso mesmo?\""}, {"from": 21, "to": 25, "label": "Como trabalhamos (3–5 min)"}, {"from": 25, "to": 30, "label": "Quem decide + duas datas"}]}}, {"dur": 12, "caption": "A pergunta que cria urgência: a conta feita por ele.", "narration": "Para a gente não ficar só na percepção: se você recebesse dois clientes a mais por semana, com o seu ticket médio, isso dá mais ou menos quanto por mês? Espere ele fazer a conta. Depois: quando você olha para esse número, o que passa na sua cabeça?", "visual": {"kind": "chat", "messages": [{"from": "you", "text": "Se você recebesse dois clientes a mais por semana, com o seu ticket médio, isso dá mais ou menos quanto por mês?"}, {"from": "them", "text": "Uns €640 por mês…"}, {"from": "you", "text": "Quando você olha para esse número, o que passa na sua cabeça?"}]}}, {"dur": 10, "caption": "A pergunta 6 revela o medo que vira cláusula da proposta.", "narration": "Você já tentou algo nessa direção antes? O que deu certo e o que não deu? Essa é a pergunta mais valiosa da reunião: a resposta entrega o medo a desarmar, e vira cláusula da proposta.", "visual": {"kind": "chat", "messages": [{"from": "you", "text": "Você já tentou algo nessa direção antes? O que deu certo e o que não deu?"}, {"from": "them", "text": "Paguei um site há dois anos, o cara sumiu no meio."}, {"from": "you", "name": "Na proposta", "text": "→ \"prazo com data\", \"duas rodadas de ajuste incluídas\", \"você é dono de tudo\"."}]}}, {"dur": 9, "caption": "Sempre duas opções de data. Nunca uma pergunta aberta.", "narration": "O encerramento tem sempre duas opções de data: tenho informação suficiente para montar algo bem estruturado. Preciso de quarenta e oito horas. Você tem agenda na quinta às dez, ou prefere sexta às quinze? Reunião que termina sem data marcada é reunião perdida.", "visual": {"kind": "chat", "messages": [{"from": "you", "text": "Tenho informação suficiente para montar algo bem estruturado. Preciso de 48 horas."}, {"from": "you", "text": "Você tem agenda na quinta às 10h, ou prefere sexta às 15h?"}]}}]},
            { type: 'checklist', title: 'Antes de entrar', items: ['Site e perfil do Google revistos', 'Auditoria reenviada à mão', 'Confirmação enviada na véspera e na manhã do dia', 'Entrar cinco minutos antes, câmera e microfone testados', 'Gravação ligada, com aviso ao cliente'] },
            { type: 'script', title: 'Abertura: assumir o controle (primeiros 60 segundos)', pt: '"Antes de começar, deixa eu dizer como vai funcionar: primeiro te conto rápido o que vi no seu negócio online. Depois quero te ouvir, para entender o que você está buscando. No fim, te digo se dá para ajudar e como.\n\nSe fizer sentido para os dois, marcamos um segundo momento e eu te apresento uma proposta. Funciona assim?"', en: "\"Before we start, here's how this will go: first I'll quickly tell you what I saw about your business online. Then I want to hear from you, to understand what you're after. At the end, I'll tell you whether we can help and how.\n\nIf it makes sense for both of us, we book a second slot and I walk you through a proposal. Sound good?\"", note: 'Essa frase define a pauta, garante que você conduz e planta o próximo passo antes de qualquer resistência aparecer.' },
            { type: 'steps', items: [
              { title: 'Contexto e objetivo', html: '"O que te fez aceitar essa conversa agora?" · "Quando você pensa no próximo ano do negócio, qual é o principal objetivo?"' },
              { title: 'Situação', html: '"Como as pessoas te encontram hoje?" · "Quantos clientes novos chegam numa semana normal?" · "Quem atende quando alguém quer marcar?"' },
              { title: 'Problema', html: '"O que você acha que está impedindo o negócio de chegar onde você quer?" · "Há quanto tempo isso acontece?"' },
              { title: 'Tangibilizar: a pergunta que cria urgência', html: '"Se você recebesse dois clientes a mais por semana, com o seu ticket médio, isso dá mais ou menos quanto por mês?" [esperar ele fazer a conta] "Quando você olha para esse número, o que passa na sua cabeça?"', meta: 'A conta é dele, não sua' },
              { title: 'Impacto', html: '"E se nada mudar, como você imagina o negócio daqui a seis meses?" · "Como você se sente com isso?"' },
              { title: 'Experiências anteriores', html: '"Você já tentou algo nessa direção antes?" · "O que deu certo e o que não deu?"', meta: 'A mais valiosa da reunião' },
            ] },
            { type: 'callout', tone: 'tip', title: 'A pergunta 6 é a mais valiosa da reunião', html: 'Muitos donos de negócio já foram mal atendidos por alguém que sumiu, entregou algo que não funcionava ou cobrou a mais. A resposta entrega exatamente qual medo você precisa desarmar. Desarmado o medo certo, o preço deixa de ser o assunto principal. <strong>O que ele disser vira cláusula da proposta</strong>: "duas rodadas de ajuste incluídas", "você é dono de tudo", "prazo com data".' },
            { type: 'script', title: 'Validar antes de propor: fechar as portas', pt: '"Deixa eu recapitular para garantir que entendi: hoje o teu negócio funciona assim [...], você quer chegar ali [...], e o que está no caminho é isto [...]. É isso mesmo?\n\nFicou faltando alguma coisa importante?"', en: "\"Let me recap to make sure I've got it: today the business works like this [...], you want to get there [...], and what's in the way is this [...]. Is that right?\n\nAnything important missing?\"", note: 'Só depois dessa confirmação você apresenta como trabalhamos, em três a cinco minutos. O objetivo é validar se é isso que ele quer comprar, não vender ainda.' },
            { type: 'cards', items: [
              { icon: '📅', title: 'Prazo', html: '"Até quando você precisa que isso esteja funcionando?"' },
              { icon: '👥', title: 'Decisor', html: '"Além de você, mais alguém participa dessa decisão?" Havendo segundo decisor, ele precisa estar na reunião de proposta.' },
              { icon: '✅', title: 'Capacidade', html: '"Se fizer sentido, você consegue decidir na próxima conversa?"' },
            ] },
            { type: 'script', title: 'Encerramento: sempre com duas opções de data', pt: '"Tenho informação suficiente para montar algo bem estruturado. Preciso de 48 horas.\n\nVocê tem agenda na quinta às 10h, ou prefere sexta às 15h?"', en: "\"I've got enough to put together something well structured. I need 48 hours.\n\nAre you free Thursday at 10, or would Friday at 3 suit better?\"", note: 'Nunca uma pergunta aberta. Reunião que termina sem data marcada é reunião perdida.' },
            { type: 'order', title: 'Coloque a reunião de diagnóstico em ordem', items: [
              'Abertura: assumir o controle e plantar o próximo passo',
              'O que eu vi: percorrer a auditoria',
              'Os seis blocos de perguntas, do contexto às experiências anteriores',
              'Validar: recapitular e confirmar "é isso mesmo?"',
              'Como trabalhamos: três a cinco minutos, sem vender',
              'Quem decide e encerramento com duas opções de data',
            ], why: 'O preço não entra nesta reunião. Ele é apresentado ao vivo na reunião de proposta, depois de calibrar o escopo.' },
            { type: 'quiz', q: 'No fim da reunião de diagnóstico, o que você diz?', options: [
              '"Te mando a proposta por e-mail e a gente se fala."',
              '"Preciso de 48 horas para montar algo bem estruturado. Quinta às 10h ou sexta às 15h?"',
              '"Pelo que você descreveu, é o pacote Website: €1.200."',
            ], answer: 1, why: 'Sempre duas opções de data para apresentar a proposta ao vivo. Proposta que chega sozinha por e-mail vira comparação de preço, e o número não é dito na reunião de diagnóstico.' },
          ],
        },
        {
          id: 'walkthrough', title: 'O walk-through do esboço (Brasil)',
          blocks: [
            { type: 'text', html: `<p>Quando conseguir o dono no telefone, vídeo ou presencialmente, conduza nesta ordem. Princípio: <strong>falar pouco, deixar o site falar</strong>. O preview faz 80% da venda sozinho. De 15 a 30 minutos.</p>` },
            { type: 'steps', items: [
              { title: 'Abrir reconhecendo o sucesso deles', html: '"Antes de qualquer coisa — 4,9 com 124 avaliações é raro. Vocês claramente fazem algo certo."' },
              { title: 'Nomear a lacuna sem drama', html: '"A única coisa que faltava era online. Hoje, quem busca vocês no Google não encontra um \'vocês\' de verdade — só o Instagram."' },
              { title: 'Abrir o preview no celular do cliente', html: 'É como os clientes dele buscam. Deixe ele rolar. Não narre.' },
              { title: 'Parar de propósito em três pontos', html: 'A página da equipe ("essa é a Ana, esse é o João… os nomes das suas reviews"), a galeria ("são fotos de vocês") e o botão de agendar ("leva direto pro sistema que vocês já usam; nada muda").' },
              { title: 'O argumento dos visitantes de fora, com os dados dele', html: '"Olha as próprias reviews: vieram de fora da cidade. Essas entraram. Um site ajuda a captar as que hoje passam batido."' },
              { title: 'Apresentar os três pacotes e as modalidades A/B', html: '"Qual desses faz mais sentido pro momento de vocês?" Deixe escolher.' },
              { title: 'Fechar o loop', html: '"Isto é de vocês. Já está pronto. Só falta colocar no ar."' },
            ] },
            { type: 'quiz', q: 'Durante o walk-through, o dono começa a rolar o site no celular dele em silêncio. O que você faz?', options: [
              'Explica cada seção enquanto ele rola, para ele não perder nada.',
              'Deixa ele rolar em silêncio e só intervém nos três pontos planejados (equipe, galeria, botão de agendar).',
              'Pede o celular de volta e mostra no seu.',
            ], answer: 1, why: 'Falar pouco, deixar o site falar. As paradas de propósito são três, e o resto é dele.' },
          ],
        },
        {
          id: 'preco-fechamento', title: 'A proposta ao vivo: calibrar, falar o número e fechar',
          blocks: [
            { type: 'text', html: `<p>A proposta é <strong>apresentada ao vivo, nunca só por e-mail</strong>: proposta que chega sozinha na caixa de entrada vira comparação de preço. Antes do número, você calibra o escopo com três perguntas. Depois, diz o número e para de falar.</p>` },
            { type: 'script', title: 'Calibrar antes de falar de preço (ao final do escopo)', pt: '"Como você enxerga isso funcionando no teu caso?\n\nAs datas encaixam para você?\n\nÉ isso que você precisa? Porque se a gente avançar, vou considerar o escopo validado."', en: "\"How do you see this working in your case?\n\nDo the dates work for you?\n\nIs this what you need? Because if we move forward, I'll take the scope as validated.\"", note: 'Quem passa pelas três sem objeção não tem mais para onde correr quando o preço aparecer. As objeções que apareceriam depois aparecem aqui, onde ainda dá para tratar sem envolver dinheiro.' },
            { type: 'script', title: 'Falar o número: diga e pare de falar', pt: '"Pelo que você descreveu, é o pacote Website — €1.200. Com o voucher, €600 do teu bolso. Mais €60 por mês de manutenção, para o site não envelhecer."\n\n[Silêncio. Deixe ele falar primeiro.]', en: "\"Based on what you've described, that's the Website package — €1,200. With the voucher, €600 out of pocket. Plus €60 a month of maintenance, so the site doesn't go stale.\"\n\n[Silence. Let them speak first.]", note: 'Quem fala depois do preço está negociando contra si mesmo.' },
            { type: 'table', head: ['Forma de pagamento', 'Condição'], rows: [['À vista, antes do início', '5% de desconto'], ['50% no aceite + 50% na publicação', 'Padrão'], ['Três parcelas (aceite, meio, publicação)', '+5%'], ['Manutenção mensal', '€60–150/mês']] },
            { type: 'callout', tone: 'rule', title: 'A tabela vale para todos', html: 'Abrir exceção para um obriga a abrir para todos, e a partir daí não existe mais tabela. Objeção de caixa se resolve com formato (três parcelas), nunca com desconto fora da tabela.' },
            { type: 'callout', tone: 'tip', title: 'Ancorar o valor (Brasil e Europa)', html: 'Nunca como custo, sempre como aluguel de um ativo dele:<ul style="padding-left:1.2rem;margin-top:.4rem"><li>"É menos que <em>uma coloração por mês</em> num salão / <em>dois rodízios</em> num restaurante / <em>uma matrícula</em> numa escola."</li><li>"É um par de cafés por semana, e é despesa dedutível."</li><li>"O site é seu, no seu domínio, um ativo seu. A mensalidade é só para manter no ar e fazer pequenas mudanças sem você precisar lembrar."</li></ul>' },
            { type: 'script', title: 'Fechamento: duas opções, nunca sim/não', pt: '"Duas opções. Posso te mandar hoje o aceite com o escopo que a gente acabou de validar, ou — se você estiver confortável — a gente já começa esta semana a inscrição do voucher, que leva de 3 a 6 semanas, então vale sair da inércia. Qual funciona melhor?"', en: "\"Two options. I can send you the acceptance today with the scope we just validated, or if you're happy we can start the voucher application this week — that part takes 3–6 weeks, so it's worth getting moving. Which suits?\"", note: 'No Brasil, a segunda opção é "já mando o contrato para assinatura e o PIX da entrada, e o site entra no ar esta semana".' },
            { type: 'callout', tone: 'warn', title: 'A opção "sem risco" (Brasil, só para cliente travado)', html: '"O site já está pronto. Sem taxa de montagem. R$ X por mês, cancela quando quiser, e o primeiro mês é por nossa conta." Remove toda a fricção e a recorrência é o que importa no longo prazo. <strong>Use com moderação; não é o padrão</strong> e só com aval do administrador.' },
            { type: 'scenario', title: 'Depois de dizer o preço', who: '🧔', context: 'Dono de barbearia, na reunião de proposta, logo após você dizer "€1.200, €600 com o voucher, mais €60 por mês"', client: '(fica 4 segundos em silêncio, olhando para baixo)', options: [
              { text: '"Mas a gente pode ver um desconto, se for o caso…"', good: false, feedback: 'Você quebrou o silêncio e suavizou o preço. O número acabou de perder credibilidade, e o preço é fixo.' },
              { text: '(continua em silêncio e espera ele falar primeiro)', good: true, feedback: 'O silêncio faz parte do script. Quem fala primeiro depois do preço normalmente é quem cede. Deixe ele processar.' },
              { text: '"É caro, eu sei, mas vale a pena, porque o site tem SEO e é responsivo…"', good: false, feedback: 'Pediu desculpas pelo preço e caiu em jargão técnico. Duas regras quebradas de uma vez.' },
            ] },
          ],
        },
      ],
    },

    /* ═══════════════════════════ MÓDULO 8 ═══════════════════════════ */
    {
      id: 'objecoes', icon: '🛡️', minutes: 22,
      title: 'Objeções: o simulador',
      subtitle: 'Desarmar, isolar, discutir, compromisso. E as objeções que aparecem de verdade, em simulações.',
      lessons: [
        {
          id: 'pacer', title: 'O método: desarmar, isolar, discutir, compromisso',
          blocks: [
            { type: 'text', html: `<p>Toda objeção é um sinal: não de recusa, mas de <strong>incompletude</strong>. O cliente está dizendo "ainda não tenho tudo o que preciso para decidir". Sua função é completar a informação, não pressionar.</p>` },
            {"type": "video", "title": "O método em ação: desarmar, isolar, discutir, compromisso", "desc": "A estrutura para responder qualquer objeção, aplicada à mais comum.", "scenes": [{"dur": 6, "caption": "Objeção não é recusa. É incompletude.", "narration": "Toda objeção é um sinal. Não de recusa, mas de incompletude: o cliente ainda não tem tudo o que precisa para decidir.", "visual": {"kind": "title", "text": "Objeção não é recusa. <em>É incompletude.</em>"}}, {"dur": 12, "caption": "Desarmar, isolar, discutir, compromisso.", "narration": "Desarmar tira a tensão: tranquilo, faz sentido. Isolar descobre se é a objeção real: dinheiro de lado, você faria? Discutir trata só o que ficou, com prova concreta. Compromisso fecha com próximo passo e data.", "visual": {"kind": "steps", "items": [{"title": "Desarmar", "text": "\"tranquilo\", \"faz sentido pensar assim\""}, {"title": "Isolar", "text": "\"dinheiro de lado, você faria? E por quê?\""}, {"title": "Discutir", "text": "só o que ficou, com prova concreta"}, {"title": "Compromisso", "text": "próximo passo com data: \"quinta ou sexta?\""}]}}, {"dur": 14, "caption": "Desarma, isola com \"dinheiro de lado\", discute com a conta dele, fecha com data.", "narration": "Está caro demais para o meu tamanho. Eu entendo. Dinheiro de lado: se ele não estivesse na equação, você faria? E por quê? Se ele acredita no resultado, é logística financeira: o voucher cobre metade e a tabela tem três parcelas. Se não acredita, o problema é valor percebido: volte ao escopo e não negocie preço ainda. E feche com data.", "visual": {"kind": "chat", "messages": [{"from": "them", "text": "Está caro demais para o meu tamanho."}, {"from": "you", "text": "Eu entendo. (pausa) Dinheiro de lado: se ele não estivesse na equação, você faria? E por quê?"}, {"from": "them", "text": "Faria. É que €1.200 agora pesa."}, {"from": "you", "text": "Então é formato, não valor: o voucher cobre metade, e a tabela tem três parcelas. Fecho o aceite quinta ou sexta?"}]}}]},
            { type: 'steps', items: [
              { title: 'Desarmar', html: 'Tira a tensão. Dois segundos de pausa e uma validação sem concordar: "Tranquilo", "Faz sentido pensar assim".' },
              { title: 'Isolar', html: 'Descobre se é a objeção real: "Dinheiro de lado, se ele não estivesse na equação, você faria? E por quê?" A objeção dita raramente é a real.' },
              { title: 'Discutir', html: 'Trata só o que ficou, com prova concreta: a auditoria, o caso da Coady Shipping, o voucher, a conta da pergunta 4.' },
              { title: 'Compromisso', html: 'Fecha com próximo passo e data. "Quinta ou sexta?" Nunca uma pergunta aberta.' },
            ] },
            { type: 'cards', cols: 2, items: [
              { icon: '🎭', title: 'Objeções que escondem outra coisa', html: '"Preciso pensar" · "Preciso falar com meu sócio" · "Manda por e-mail" · "Tenho que ver a prioridade". Quase nunca são a objeção real. Sua tarefa é isolar a real.' },
              { icon: '🧱', title: 'Objeções reais', html: 'Preço · caixa · medo por experiência ruim · tempo · "meu sobrinho faz mais barato" · "pago depois do resultado" · "quero fazer sozinho" · "quero falar com um cliente". Cada uma tem resposta pronta.' },
            ] },
            { type: 'callout', tone: 'warn', title: 'Quando não insistir', html: 'Há objeção que não é objeção: é falta de encaixe. Quem não qualifica no perfil, quem some por semanas, quem quer pagar por resultado depois de já ter ouvido não: essas conversas terminam com cordialidade e registro na lista de supressão. <strong>Insistir custa mais caro do que perder.</strong>' },
            { type: 'order', title: 'Coloque o método em ordem', items: [
              'Desarmar: "tranquilo", "faz sentido pensar assim"',
              'Isolar: "dinheiro de lado, você faria? E por quê?"',
              'Discutir: só o que ficou, com prova concreta',
              'Compromisso: próximo passo com data, "quinta ou sexta?"',
            ], why: 'A ordem importa. Discutir antes de isolar é responder à objeção errada.' },
          ],
        },
        {
          id: 'simulador-1', title: 'Simulador · parte 1',
          blocks: [
            { type: 'text', html: `<p>Quatro clientes, quatro objeções. Escolha a melhor resposta. Errar aqui é o objetivo: é onde você aprende sem custar uma venda.</p>` },
            { type: 'scenario', title: 'Objeção de preço', who: '👩‍🦰', context: 'Dona de salão em Ongar, na discovery call', client: '"Está caro demais para o meu tamanho."', clientEn: "It's too expensive for a place my size.", options: [
              { text: '"Consigo fazer por €900 se fechar hoje."', good: false, feedback: 'Preço fixo é um pilar. Desconto na primeira objeção diz que o número era inflado.' },
              { text: '"Eu entendo. Dinheiro de lado: se ele não estivesse na equação, você faria? E por quê? … Então é formato, não valor: o voucher cobre metade, e a tabela tem três parcelas. Se um cliente a mais por mês cobre isso, pelo que você me contou da agenda, traz com folga."', good: true, feedback: 'Desarma, isola com "dinheiro de lado" (se acredita no resultado, é logística financeira; se não, é valor percebido e você volta ao escopo), discute com o voucher e a tabela, e devolve a conta para ela.' },
              { text: '"Caro comparado com o quê? Uma agência cobraria €5.000."', good: false, feedback: 'A clarificação é boa, mas o tom é de confronto e a comparação com agência não é a âncora dela. Compare com o cliente que ela perde, não com outros fornecedores.' },
            ] },
            { type: 'scenario', title: 'Objeção de tempo', who: '👨‍🔧', context: 'Eletricista em Lucan, por telefone', client: '"Não tenho tempo para isso agora."', clientEn: "I don't have time for this right now.", options: [
              { text: '"Esse é justamente o ponto. Precisamos de umas duas horas do seu tempo no total: fotos, sua lista de serviços e uma chamada. Todo o resto é com a gente, incluindo a papelada do voucher. E o que você recebe de volta é a tarde que hoje gasta atendendo ligação de agendamento."', good: true, feedback: 'Quantifica o esforço (duas horas) e inverte a objeção em benefício (devolve tempo).' },
              { text: '"Sem problema, ligo em seis meses."', good: false, feedback: 'Desistiu antes de clarificar. "Não tenho tempo" quase sempre é "imagino que vai dar trabalho".' },
              { text: '"Vai levar só umas cinco reuniões de uma hora."', good: false, feedback: 'Confirmou o medo dele. O esforço real é de duas horas no total.' },
            ] },
            { type: 'scenario', title: 'Objeção de necessidade', who: '🍣', context: 'Dono de sushi em Natal, por DM', client: '"Já tenho Instagram com 35 mil seguidores, não preciso de site."', options: [
              { text: '"Instagram não vende, site vende. Confia em mim."', good: false, feedback: 'Desvalorizou o que ele já faz bem e não deu evidência. Ele vai defender o Instagram.' },
              { text: '"O Instagram é perfeito para relacionamento, e você já faz isso muito bem com 35 mil seguidores. O site resolve outro problema: quando alguém que nunca ouviu falar de você digita \'sushi Natal\' no Google, o Instagram não aparece nessa busca. O site é o que coloca você na frente de quem ainda não te segue."', good: true, feedback: 'Complementaridade: valida o Instagram e mostra o momento da jornada em que só o site aparece.' },
              { text: '"Então tá bom, se mudar de ideia me avisa."', good: false, feedback: 'Aceitou a objeção como recusa. Ela é só incompletude: ele não vê a diferença funcional.' },
            ] },
            { type: 'scenario', title: 'Objeção de risco', who: '🦷', context: 'Dentista em Castleknock, na discovery call', client: '"Já tentei um site antes e não deu em nada."', clientEn: 'I tried a website before and it did nothing.', options: [
              { text: '"O nosso é diferente, usa tecnologia muito melhor."', good: false, feedback: 'Defendeu a categoria com jargão. Ele já ouviu isso do desenvolvedor anterior.' },
              { text: '"Você já teve uma experiência ruim com isso. O que você exigiria que fosse diferente numa próxima? E do que você não abre mão? … Certo. Um site sozinho não faz nada: ele precisa estar ligado à sua listagem do Google. E o que você acabou de me dizer entra na proposta como cláusula."', good: true, feedback: 'Reconhece a experiência, pergunta o que ele exigiria (a resposta vira cláusula da proposta: prazo com data, duas rodadas, propriedade) e a objeção desaparece sozinha.' },
              { text: '"Quem fez? Provavelmente era um amador."', good: false, feedback: 'Atacar o fornecedor anterior faz ele se sentir burro por ter contratado. Nunca.' },
            ] },
          ],
        },
        {
          id: 'simulador-2', title: 'Simulador · parte 2',
          blocks: [
            { type: 'scenario', title: 'Concorrência informal', who: '👩‍🍳', context: 'Dona de padaria em Blanchardstown', client: '"Meu sobrinho faz um site por muito menos."', clientEn: 'My nephew can build one for a lot less.', options: [
              { text: '"Provavelmente faz mesmo. E se ele também mantiver o site, cuidar da sua listagem do Google e atender o telefone quando quebrar daqui a oito meses, é um bom negócio. O que costuma acontecer é que o site é feito e depois ninguém atualiza. Pergunte a ele sobre a parte da manutenção antes de decidir."', good: true, feedback: 'Concorda primeiro e muda o eixo da comparação: de construção para manutenção, onde está a diferença real.' },
              { text: '"Sobrinho não é profissional. Depois não reclama."', good: false, feedback: 'Desvalorizou a família dela. Perdeu a venda e a simpatia.' },
              { text: '"Então faz com ele e depois me chama para consertar."', good: false, feedback: 'Sarcasmo não é técnica de vendas.' },
            ] },
            { type: 'scenario', title: 'Adiamento', who: '🧑‍💼', context: 'Dono de oficina, fim da conversa', client: '"Vou pensar e te falo."', clientEn: 'Let me think about it.', options: [
              { text: '"Claro, sem pressa. Qualquer coisa estou à disposição."', good: false, feedback: '"Vou pensar" quase nunca é sobre pensar. Você deixou a objeção real escondida.' },
              { text: '"Tranquilo. Só para eu te ajudar melhor: o que você acha que vai passar pela tua cabeça nessa decisão? Quais seriam as uma ou duas coisas principais? … Certo. Então sobre esse ponto: [trata diretamente]. Fecho quinta ou sexta?"', good: true, feedback: 'Desarma ("tranquilo"), isola a objeção real com uma pergunta que o faz nomear as uma ou duas coisas, discute só isso e fecha com data.' },
              { text: '"Se fechar hoje eu incluo o CMS de graça."', good: false, feedback: 'Pressão com brinde. Além de quebrar o preço fixo, não descobre o que ele está pensando.' },
            ] },
            { type: 'scenario', title: 'Evasão', who: '👨‍💼', context: 'Gerente-proprietário de loja, por e-mail', client: '"Me manda umas informações que eu dou uma olhada."', clientEn: 'Send me some information and I\'ll have a look.', options: [
              { text: '(envia o PDF de apresentação com todos os pacotes e preços)', good: false, feedback: 'Folheto genérico confirma a saída educada. Ele não vai ler.' },
              { text: '"Mando sim. Só que, por experiência, o material sozinho não responde as dúvidas que sempre aparecem. Prefiro te mostrar em 20 minutos. Quinta ou sexta?"', good: true, feedback: 'Aceita sem confrontar, explica por que o material sozinho não resolve e converte o pedido em reunião com duas opções de data.' },
              { text: '"Não trabalho com material por e-mail, só em reunião."', good: false, feedback: 'Rígido e confrontador. Aceite, explique e converta em 20 minutos com duas datas.' },
            ] },
            { type: 'scenario', title: 'Conforto', who: '🍔', context: 'Dono de hamburgueria em Natal, no walk-through', client: '"Meu negócio funciona bem sem site."', options: [
              { text: '"Exatamente, e isso é ótimo. Mas deixa eu te fazer uma pergunta: o concorrente do lado também não funcionava bem. Agora imagina se ele lançar o site antes de você. Quem aparece primeiro no Google quando alguém busca \'hambúrguer\' no seu bairro? O site não é sobre consertar algo quebrado: é sobre garantir que o crescimento que você já tem não seja capturado por outra pessoa."', good: true, feedback: 'Valida o sucesso e usa ancoragem competitiva local: o medo de perder território, sem pressão explícita.' },
              { text: '"Funciona bem hoje. E amanhã?"', good: false, feedback: 'Ameaça vaga, sem evidência. Ele responde "amanhã também".' },
              { text: '"Todo negócio precisa de site em 2026."', good: false, feedback: 'Generalidade. Ele acabou de dizer que o dele não precisa.' },
            ] },
            { type: 'callout', tone: 'ok', title: 'Lembrete', html: 'Scripts não são robôs. São pontos de partida. Você lê a situação, adapta o tom e mantém a essência. Cliente não percebe script bem feito; percebe atendimento ruim.' },
          ],
        },
        {
          id: 'simulador-3', title: 'Simulador · parte 3: as que escondem outra coisa',
          blocks: [
            { type: 'text', html: `<p>Quatro objeções do Playbook Comercial que costumam esconder outra coisa, ou pedir para transferir o risco. Em todas, a saída é isolar antes de discutir.</p>` },
            { type: 'scenario', title: 'Objeção de sócio', who: '👩‍💼', context: 'Sócia de um restaurante, no fim da reunião de proposta', client: '"Preciso falar com meu sócio antes."', clientEn: 'I need to talk to my partner first.', options: [
              { text: '"Claro. Por curiosidade: na tua própria opinião, se ele dissesse \'faz o que você achar melhor\', você faria? E por quê?"', good: true, feedback: 'Isola com uma hipótese. Se faria, falta só apoio e o sócio precisa estar na próxima reunião. Se não faria, há uma objeção real escondida, e é ela que você trata.' },
              { text: '"Sem problema, me avisa quando falar com ele."', good: false, feedback: 'Aceitou a objeção como recusa e saiu sem data. Reunião que termina sem próximo passo é reunião perdida.' },
              { text: '"Mas você é quem manda aqui, não é?"', good: false, feedback: 'Confronta e constrange. Nunca desvalorize o segundo decisor: ele precisa estar na reunião de proposta.' },
            ] },
            { type: 'scenario', title: 'Risco reverso', who: '🔧', context: 'Dono de oficina em Clonee', client: '"Pago depois que eu ver resultado."', clientEn: "I'll pay once I see results.", options: [
              { text: '"Fechado, quando o site trouxer cliente você paga."', good: false, feedback: 'Você colocou a receita em algo que não controla. Se o conteúdo atrasar ou a prioridade dele mudar, o resultado muda e ninguém tem culpa.' },
              { text: '"Entendo, e você tem todo direito de perguntar. Mas não colocamos parte da nossa receita em algo que não controlamos: se o conteúdo atrasar ou a prioridade mudar, o resultado muda e não é culpa de ninguém. O que dá para fazer é dividir o pagamento em marcos."', good: true, feedback: 'Desarma, explica o motivo sem defensiva e oferece o formato da tabela (marcos). Se ele insistir depois desse não, é falta de encaixe: encerre com cordialidade e suprima.' },
              { text: '"Isso é desconfiança. Se não confia, melhor não fazer."', good: false, feedback: 'Confronto. Ele tem direito de perguntar; você tem uma resposta pronta e um formato alternativo.' },
            ] },
            { type: 'scenario', title: 'Autonomia', who: '🧑‍🍳', context: 'Dono de padaria, por WhatsApp', client: '"Acho que vou tentar fazer sozinho primeiro."', clientEn: 'I think I\'ll try to do it myself first.', options: [
              { text: '"Dá para fazer, e eu não escondo nada: está tudo no YouTube. A pergunta é quanto vale o teu tempo aprendendo isso, e quanto custa cada mês que o site não está no ar. Você já parou para calcular o custo de não fazer?"', good: true, feedback: 'Não desvaloriza a opção dele, e traz o custo do tempo e o custo de cada mês sem o site: a conta que ele ainda não fez.' },
              { text: '"Você vai fazer errado e depois vai me chamar para consertar."', good: false, feedback: 'Desrespeitoso. Fecha a porta.' },
              { text: '"Tudo bem, boa sorte."', good: false, feedback: 'Desistiu sem isolar. Ele nem calculou o custo de não fazer.' },
            ] },
            { type: 'scenario', title: 'Pedido de referência', who: '🦷', context: 'Dentista em Castleknock', client: '"Quero falar com um cliente de vocês antes de decidir."', clientEn: 'I want to talk to one of your clients before deciding.', options: [
              { text: '"Claro, a Coady Shipping vai te ligar amanhã."', good: false, feedback: 'Prometeu por terceiros. Clientes não têm obrigação de responder. Nunca prometa que vão.' },
              { text: '"Posso tentar. Antes: o que exatamente ele precisaria te dizer para você se considerar satisfeito? Porque talvez eu já consiga te responder isso agora."', good: true, feedback: 'Qualifica o pedido: muitas vezes a dúvida real se resolve na hora, com o caso e o número. Se ainda precisar, você tenta, sem prometer.' },
              { text: '"Não passo contato de cliente."', good: false, feedback: 'Fechado e sem alternativa. Ele quer prova; você tem casos com número.' },
            ] },
            { type: 'callout', tone: 'ok', title: 'Lembrete', html: 'Scripts não são robôs. São pontos de partida. Você lê a situação, adapta o tom e mantém a estrutura: desarmar, isolar, discutir, compromisso.' },
          ],
        },
      ],
    },

    /* ═══════════════════════════ MÓDULO 9 ═══════════════════════════ */
    {
      id: 'proposta-fechamento', icon: '📝', minutes: 16,
      title: 'Proposta, fechamento e passagem de bastão',
      subtitle: 'O que vai na proposta, o que acontece no "sim" e como não prometer o que não dá.',
      lessons: [
        {
          id: 'proposta', title: 'A proposta',
          blocks: [
            { type: 'text', html: `<p>Enviada em até <strong>48 horas</strong> e <strong>apresentada ao vivo, nunca só por e-mail</strong>. Proposta que chega sozinha na caixa de entrada vira comparação de preço. Oito blocos, nesta ordem.</p>` },
            { type: 'steps', items: [
              { title: 'Retomada do diagnóstico', html: 'O problema dele, nas palavras dele. Termina com: "é isso que você precisa que a gente resolva?"' },
              { title: 'Objetivos do projeto', html: 'O que estará diferente quando terminar.' },
              { title: 'Trabalho parecido', html: 'Um caso real, com número real. Mesmo segmento, se possível.' },
              { title: 'O que vamos fazer', html: 'Escopo em linguagem simples, sem lista de tecnologia. Inclui o que não está incluído e a propriedade: domínio, hospedagem e código são do cliente.' },
              { title: 'Quem faz o quê', html: 'Nomes, responsabilidades e o que precisamos dele.' },
              { title: 'Cronograma', html: 'Semana a semana, com a dependência dita em voz alta: a maior parte do prazo é conteúdo, não código.' },
              { title: 'Retorno', html: 'Quanto isso pode representar, com a conta feita na frente dele (a conta da pergunta 4 do diagnóstico).' },
              { title: 'Investimento', html: 'O número, as formas de pagamento e o voucher. A manutenção mensal entra aqui como parte do projeto, nunca como upsell no final.' },
            ] },
            { type: 'table', head: ['Condição', 'Padrão', 'Por quê'], rows: [
              ['Pagamento', '50% no aceite + 50% na publicação', 'Padrão. À vista antes do início: 5% de desconto. Três parcelas: +5%. A tabela vale para todos.'],
              ['Validade', '14 dias', 'Curta o suficiente para criar decisão.'],
              ['Revisões', 'Duas rodadas incluídas', 'Rodadas adicionais são orçadas à parte.'],
              ['Conteúdo', 'Fornecido pelo cliente', 'O cronograma começa a contar quando o conteúdo chega.'],
            ] },
            { type: 'callout', tone: 'info', title: 'Quem escreve a proposta', html: 'Você prepara a retomada do diagnóstico (com as palavras do cliente) e as informações da conversa; o administrador fecha o escopo, o número e o cronograma. Nunca apresente uma proposta sem essa revisão, e nunca a envie só por e-mail.' },
            { type: 'quiz', q: 'Como a proposta chega ao cliente?', options: [
              'Por e-mail, em PDF, para ele ler com calma.',
              'Apresentada ao vivo, numa reunião marcada no fim do diagnóstico com duas opções de data.',
              'Por WhatsApp, só com o preço.',
            ], answer: 1, why: 'Proposta que chega sozinha na caixa de entrada vira comparação de preço. Ela é apresentada ao vivo, começando pela retomada do diagnóstico nas palavras dele.' },
          ],
        },
        {
          id: 'no-sim', title: 'No "sim": o que acontece no mesmo dia',
          blocks: [
            { type: 'text', html: `<p>No "sim", seis coisas acontecem no mesmo dia. Fechar é o fim do ciclo comercial e o começo do ciclo de entrega: passagem malfeita gera retrabalho, mesmo quando quem vendeu é quem vai entregar.</p>` },
            { type: 'steps', items: [
              { title: 'Ficha de passagem preenchida', html: 'O que foi vendido, para quem, com que promessas, prazos e dependências. É o que a entrega vai ler.', meta: 'Mesmo dia' },
              { title: 'Fatura do sinal emitida', html: '50% do valor, com vencimento explícito.', meta: 'Mesmo dia' },
              { title: 'Pedido de conteúdo enviado', html: 'O cronograma inteiro depende disso chegar. Quanto antes for pedido, antes chega.', meta: 'Mesmo dia · script abaixo' },
              { title: 'Inscrição do voucher iniciada (Irlanda)', html: 'Imediatamente. São 3 a 6 semanas; em paralelo com o projeto, nunca depois.', meta: 'Dia 1' },
              { title: 'Kickoff agendado', html: 'Chamada de alinhamento com data definida, não "quando der".', meta: 'Data fixa' },
              { title: 'Acesso ao Google Business Profile solicitado', html: 'Sem ele, metade do valor entregue não acontece. Peça junto com o conteúdo.', meta: 'Com instruções passo a passo' },
            ] },
            { type: 'script', title: 'Pedido de conteúdo', pt: 'Para começar precisamos de quatro coisas:\n\n1. Fotos do negócio — 10 a 15 já bastam. Fotos de celular servem\n2. Seus serviços com preços, mesmo que aproximados\n3. Um parágrafo sobre o negócio — como começou, o que o torna diferente\n4. Acesso ao seu Google Business Profile (mando as instruções)\n\nA maior parte do cronograma é espera por isso, então quanto antes chegar, antes a gente entra no ar.', en: "To get started we need four things:\n\n1. Photos of the business — 10-15 is plenty. Phone photos are fine\n2. Your services with prices, however roughly\n3. A paragraph about the business — how it started, what makes it different\n4. Access to your Google Business Profile (I'll send instructions)\n\nMost of the timeline is waiting on this, so the sooner it lands the sooner we're live." },
            { type: 'callout', tone: 'warn', title: 'No Brasil: nunca fazer', html: '<ul style="padding-left:1.2rem"><li>Nunca registrar o domínio no CNPJ da consultoria: sempre no do cliente.</li><li>Nunca começar trabalho sem contrato assinado e entrada paga.</li><li>Nunca prometer prazos por mensagem informal.</li></ul>No fechamento, o cliente também escolhe a Modalidade A ou B.' },
            { type: 'checklist', title: 'Passagem de bastão para o Marcus (o que você entrega documentado)', items: [
              'Resumo da conversa com as palavras do cliente (seção 1 da proposta)',
              'Pacote e, no Brasil, modalidade A/B escolhida',
              'Situação do voucher (Irlanda): elegibilidade confirmada e inscrição iniciada',
              'Contrato assinado e comprovante da entrada',
              'Status do pedido de conteúdo e do acesso ao Google Business Profile',
              'Data do kickoff',
              'Qualquer promessa feita ao cliente (para não haver surpresa)',
            ] },
            { type: 'quiz', q: 'Cliente irlandês disse "sim" hoje. Quando começa a inscrição do voucher?', options: [
              'Quando o site estiver pronto, para o valor bater certo.',
              'Hoje, em paralelo com o projeto: leva 3–6 semanas.',
              'Depois da segunda parcela.',
            ], answer: 1, why: 'Se começar só no fim, o cliente fica sem o dinheiro justamente quando a fatura final chega. É aí que a relação azeda.' },
          ],
        },
        {
          id: 'expectativas', title: 'Prazos e expectativas',
          blocks: [
            { type: 'text', html: `<p>A maior parte das frustrações de cliente nasce de uma expectativa errada criada na venda. Sua função é criar a expectativa certa.</p>` },
            { type: 'compare', title: 'Prazos', label: 'Item', rows: [
              { label: 'Site de 1 ou 5 páginas', br: 'Essencial: 7 dias úteis · Profissional: 14 dias úteis', ie: '1–2 semanas' },
              { label: 'Projetos maiores', br: 'Premium: 21–30 dias úteis', ie: 'Sistemas complexos: 4+ semanas' },
              { label: 'Quando o prazo começa a contar', br: 'Após a entrada e o briefing completo', ie: 'Quando o conteúdo chega ("não começamos até o conteúdo estar aqui")' },
              { label: 'Revisões', br: '1 a 3 rodadas conforme o pacote', ie: 'Duas rodadas incluídas' },
            ] },
            { type: 'cards', cols: 2, items: [
              { icon: '✅', title: 'Sempre incluído', html: 'Domínio no nome do cliente, hospedagem, SSL, backups, configuração inicial do Google Business Profile, treinamento curto após a entrega. A manutenção mensal (€60–150) é parte do projeto desde o dia 1.' },
              { icon: '➕', title: 'Orçado à parte', html: 'Fotos profissionais, criação de logo (temos parceiros), anúncios pagos, e-commerce (Custom), aplicativos nativos, conteúdo escrito além do enviado pelo cliente.' },
            ] },
            { type: 'callout', tone: 'rule', title: 'Frase que você vai repetir sempre', html: '"A maior parte do cronograma é conteúdo, não código." Quanto antes as fotos e a lista de serviços chegarem, antes o site entra no ar.' },
            { type: 'quiz', q: 'Cliente pergunta se vocês fazem o logo. O que você diz?', options: [
              '"Sim, está incluído no pacote."',
              '"Não diretamente. Trabalhamos com a identidade que você já tem; se precisar de logo, indicamos parceiros ou orçamos à parte."',
              '"Logo não importa para o site."',
            ], answer: 1, why: 'Logo é orçado à parte ou feito por parceiros. Prometer o que não está no escopo é a origem da discussão de escopo lá na frente.' },
          ],
        },
      ],
    },

    /* ═══════════════════════════ MÓDULO 10 ═══════════════════════════ */
    {
      id: 'regras-do-jogo', icon: '🏁', minutes: 18,
      title: 'Pós-venda, regras do jogo e seus 30 dias',
      subtitle: 'Indicações, compliance, as regras inegociáveis, os números do funil e o seu plano de início.',
      lessons: [
        {
          id: 'ritual', title: 'O ritual de encerramento e as indicações',
          blocks: [
            { type: 'text', html: `<p>Cold email é como se conseguem os primeiros cinco clientes. <strong>Indicações e estudos de caso são como se conseguem os próximos cinquenta.</strong> Os trinta minutos ao fim de cada projeto são a diferença entre reiniciar o funil todo mês e construir algo que acumula.</p>` },
            { type: 'steps', items: [
              { title: 'Depoimento em vídeo de 60 segundos', html: 'Câmera de celular. Três perguntas: Qual era o problema? O que mudou? Você recomendaria? Vídeo vale cinco vezes uma citação escrita.' },
              { title: 'Foto com o cliente no estabelecimento', html: 'Com o site aberto num laptop ou celular.' },
              { title: 'Capturas de antes/depois', html: 'Listagem do Google Maps antes, site no ar depois. Vira o slider da página de estudo de caso.' },
              { title: 'Um número', html: '"De zero a 40 visitas por semana", "3 agendamentos online na primeira semana", "pedidos de orçamento triplicaram". Estudo de caso sem número não vai ao ar.' },
              { title: 'Permissão por escrito', html: 'Para usar nome, imagem e logo.' },
              { title: 'Peça a indicação, na hora', html: 'O pico de satisfação é o momento certo, e ele nunca vai estar mais alto do que agora.' },
            ] },
            { type: 'script', title: 'O pedido de indicação', pt: '"Fico feliz que tenha gostado. Posso pedir um favor? A maior parte do nosso trabalho vem de boca a boca. Tem mais alguém que você conheça aqui da região, tocando um negócio, que esteja na mesma situação em que vocês estavam? Sem pressão nenhuma. Se lembrar de alguém, uma apresentação vale mais para a gente do que qualquer anúncio."', en: "\"Glad you're happy with it. Can I ask a favour? Most of our work comes through word of mouth. Is there anyone else you know running a business around here who's in the same spot you were? No pressure either way. If someone comes to mind, an introduction is worth more to us than any advertising.\"" },
            { type: 'callout', tone: 'tip', title: 'Quando alguém indicar', html: 'Envie a Sequência C no mesmo dia: "{Nome de quem indicou} sugeriu que eu entrasse em contato". É o e-mail de maior conversão que você vai mandar.' },
            { type: 'quiz', q: 'Um cliente acabou de dizer que adorou o site. Qual é o momento certo de pedir indicação?', options: [
              'Agora, no pico de satisfação.',
              'Daqui a três meses, quando ele tiver resultados.',
              'Nunca; pedir indicação parece desespero.',
            ], answer: 0, why: 'O pico de satisfação nunca vai estar mais alto do que agora. Peça na hora, com o script, sem pressão.' },
          ],
        },
        {
          id: 'compliance', title: 'Regras inegociáveis e compliance',
          blocks: [
            { type: 'text', html: `<p>Estas regras protegem o domínio, a reputação e a consultoria contra multas. Não há exceções, nem "só desta vez".</p>` },
            { type: 'checklist', title: 'As regras que você nunca quebra (leia e marque cada uma)', items: [
              'Nunca enviar cold email de marcusfernandes.ie: só do domínio de envio separado',
              'Nunca anexar nada no primeiro e-mail',
              'Nunca um quarto e-mail: sem resposta após três = supressão',
              'Nunca automatizar WhatsApp nem mandar para número pessoal',
              'Nunca DM no LinkedIn no mesmo dia do aceite',
              'Nunca prometer prazo por mensagem informal',
              'Nunca dar desconto por conta própria: o preço é fixo',
              'Nunca registrar domínio no nosso nome/CNPJ',
              'Nunca começar trabalho sem contrato assinado e entrada paga',
              'Nunca abordar de novo quem está na lista de supressão',
            ] },
            { type: 'compare', title: 'Compliance por mercado', label: 'Tema', rows: [
              { label: 'Regime de e-mail', br: 'LGPD: base legal e transparência; opt-out sempre disponível.', ie: 'B2B é opt-out, desde que: endereço comercial, assunto só sobre a atividade dele, sem oposição prévia, remetente identificado, opt-out funcional em toda mensagem.' },
              { label: 'Autônomos', br: 'Pessoa física: cuidado redobrado com consentimento.', ie: 'Sole traders são pessoas naturais: legítimo interesse sob o GDPR, com LIA documentada (o administrador mantém) e direito de oposição claro.' },
              { label: 'Endereços', br: 'Prefira contato comercial público.', ie: 'Prefira info@ e bookings@ a endereços de pessoas nomeadas.' },
              { label: 'Multas', br: 'LGPD: até 2% do faturamento.', ie: 'Até €5.000 (pessoa física) e €50.000 (empresa) por infração.' },
              { label: 'No site do cliente', br: 'Política de privacidade, banner de cookies, consentimento nos formulários.', ie: 'Política de privacidade e cookies (GDPR).' },
            ] },
            { type: 'callout', tone: 'rule', title: 'A lista de supressão não é burocracia', html: 'É o controle que mantém a consultoria em conformidade. Checada antes de todo envio. Quem disse "não" ou não respondeu a três nunca é abordado de novo com a mesma abordagem.' },
            { type: 'quiz', q: 'Um prospect respondeu "não, obrigado" há dois meses. Agora ele abriu uma segunda loja. Você pode escrever?', options: [
              'Sim, imediatamente: é um motivo novo.',
              'Não. Quem disse não é suprimido permanentemente. Motivo novo vale só para quem não respondeu, e após seis meses.',
              'Sim, mas só por WhatsApp.',
            ], answer: 1, why: '"Não, obrigado" = supressão permanente. A regra dos seis meses com motivo novo vale para quem simplesmente não respondeu.' },
          ],
        },
        {
          id: 'metricas-30-dias', title: 'Os números e os seus primeiros 30 dias',
          blocks: [
            { type: 'text', html: `<p>O funil inteiro cabe numa revisão semanal. Cada estágio tem um número saudável e um de alerta, e cada alerta aponta para uma causa diferente.</p>` },
            {"type": "video", "title": "Lendo o funil", "desc": "Os números de uma semana saudável e o que cada sintoma significa.", "scenes": [{"dur": 5, "caption": "O funil inteiro cabe numa revisão semanal.", "narration": "O funil inteiro cabe numa revisão semanal. Cada estágio tem um número saudável e um de alerta.", "visual": {"kind": "title", "text": "O funil cabe numa <em>revisão semanal</em>."}}, {"dur": 13, "caption": "A matemática do funil: 200 abordagens, aproximadamente 1 cliente.", "narration": "Duzentos prospects abordados. Dez respostas: cinco por cento. Seis auditorias entregues. Três reuniões de diagnóstico. Duas propostas. Um cliente fechado. Uma semana de prospecção a duzentas abordagens produz aproximadamente um cliente.", "visual": {"kind": "funnel", "rows": [{"label": "Abordados", "value": "200", "pct": 100}, {"label": "Respostas (5%)", "value": "10", "pct": 40}, {"label": "Auditorias (60%)", "value": "6", "pct": 28}, {"label": "Diagnósticos (50%)", "value": "3", "pct": 16}, {"label": "Propostas (67%)", "value": "2", "pct": 11}, {"label": "Cliente (50%)", "value": "1", "pct": 6}]}}, {"dur": 12, "caption": "Cada sintoma aponta para uma causa.", "narration": "Abertura baixa é entregabilidade. Abre mas não responde: as observações estão genéricas. Responde mas não marca reunião: o relatório não converte em conversa. Reunião boa e proposta não sai: não pedimos o próximo passo com duas datas. Fecha mas o dinheiro não entra: régua de cobrança.", "visual": {"kind": "bullets", "title": "Cada sintoma aponta para uma causa", "items": ["Abertura baixa → entregabilidade", "Abre mas não responde → observações genéricas", "Responde mas não marca reunião → o relatório não converte em conversa", "Reunião boa, proposta não sai → não pedimos o próximo passo", "Fecha mas o dinheiro não entra → régua de cobrança"]}}, {"dur": 7, "caption": "Um estágio por vez.", "narration": "Corrija um estágio por vez, de cima para baixo. Mexer em dois ao mesmo tempo impede saber o que funcionou.", "visual": {"kind": "title", "text": "Um estágio <em>por vez</em>.", "sub": "Corrija de cima para baixo. Mexer em dois ao mesmo tempo impede saber o que funcionou."}}]},
            { type: 'stat', items: [
              { value: '200', label: 'abordagens por semana' },
              { value: '≥ 40%', label: 'taxa de abertura' },
              { value: '≥ 5%', label: 'taxa de resposta' },
              { value: '2–3', label: 'reuniões de diagnóstico por semana' },
              { value: '≥ 30%', label: 'fechamento sobre propostas' },
              { value: '≈ 1', label: 'cliente por semana' },
            ] },
            { type: 'callout', tone: 'info', title: 'A matemática do funil', html: '200 prospects abordados → 10 respostas (5%) → 6 auditorias entregues (60%) → 3 diagnósticos (50%) → 2 propostas (67%) → 1 cliente (50%). Uma semana de prospecção a 200 abordagens produz aproximadamente um cliente. A recorrência é o que muda o jogo: um projeto vale €1.200 uma vez; o mesmo cliente em manutenção vale €720 a €1.800 por ano, todo ano.' },
            { type: 'table', head: ['Sintoma', 'Causa provável e correção'], rows: [
              ['Abertura baixa (< 25%)', 'Entregabilidade. Avise o administrador: SPF/DKIM/DMARC e aquecimento.'],
              ['Boa abertura, poucas respostas (< 2%)', 'Os três achados estão genéricos demais. Mais pesquisa por prospect.'],
              ['Responde mas não marca reunião', 'O relatório não converte em conversa. Termine a auditoria com um próximo passo mais direto.'],
              ['Reunião boa, proposta não sai', 'Não pedimos o próximo passo. Fechar sempre com duas opções de data.'],
              ['Boas propostas, poucos fechamentos (< 15%)', 'Preço errado ou prospects errados. Revise o ICP.'],
              ['Bounce acima de 3%', 'Lista suja. Pare e verifique os e-mails.'],
              ['Fecha mas o dinheiro não entra', 'Cobrança. Aplicar a régua: ela tem dono e tem calendário.'],
            ] },
            { type: 'callout', tone: 'tip', title: 'Um estágio por vez', html: 'Corrija de cima para baixo. Mexer em dois ao mesmo tempo impede saber o que funcionou.' },
            { type: 'text', html: `<h4>Seus primeiros 30 dias, {Seu nome}</h4>` },
            { type: 'steps', items: [
              { title: 'Semana 1 · Aprender e observar', html: 'Concluir esta Academia. Ler o Playbook Comercial e o Playbook Dublin. Acompanhar uma reunião de diagnóstico gravada e um walk-through com o administrador. Montar assinatura, link de agendamento e planilha.', meta: 'Nada é enviado nesta semana' },
              { title: 'Semana 2 · Primeira lista', html: 'Pesquisar e pontuar 50 prospects: um vertical, uma área. Escrever três achados específicos para os dez melhores e revisar com o administrador.', meta: 'Lista revisada antes de enviar' },
              { title: 'Semana 3 · Primeiros envios', html: '10 por dia subindo para 20. Auditorias entregues em até 48 horas, sempre. Segundos 50 prospects pesquisados.', meta: '10 → 20/dia' },
              { title: 'Semana 4 · Volume e correção', html: '30 por dia estável. Follow-ups rodando. Primeiras reuniões de diagnóstico suas, gravadas. Primeiras propostas apresentadas ao vivo. Métricas revisadas, um gargalo identificado e corrigido.', meta: '30/dia estável' },
            ] },
            { type: 'table', head: ['Meta até o dia 90', 'Número'], rows: [
              ['Auditorias entregues', '15'],
              ['Chamadas realizadas', '8'],
              ['Clientes fechados', '3'],
              ['Clientes em manutenção', '3 de 3'],
              ['Estudos de caso no ar', '3'],
              ['Indicações recebidas', '2'],
            ] },
            { type: 'callout', tone: 'ok', title: 'O que realmente decide', html: 'Duas coisas, e nenhuma delas é o site: <strong>os três achados do primeiro e-mail</strong> e <strong>o ritual de encerramento em todo projeto</strong>. Se você fizer só essas duas coisas com disciplina, o resto acontece.' },
            { type: 'quiz', q: 'Sua taxa de abertura está em 45%, mas a de resposta em 1,5%. Qual é o problema mais provável?', options: [
              'Entregabilidade: os e-mails estão caindo no spam.',
              'Personalização fraca: as três observações estão genéricas. Reescreva a auditoria de dez prospects e meça de novo.',
              'Volume insuficiente: precisa enviar mais.',
            ], answer: 1, why: 'Abertura boa significa que o e-mail chega e o assunto funciona. Resposta abaixo de 2% significa personalização fraca. Uma mudança, dez prospects, medir, decidir.' },
          ],
        },
      ],
    },
  ],

  /* ═══════════════════════════ PROVA FINAL ═══════════════════════════ */
  exam: {
    passScore: 75,
    questions: [
      { topic: 'Posicionamento', q: 'O que o dono de negócio local realmente compra de nós?', options: ['Um site bonito com a tecnologia mais moderna.', 'Os clientes que hoje perde para um concorrente com presença online melhor.', 'Hospedagem com 99,9% de uptime.'], answer: 1, why: 'Toda mensagem aponta para a lacuna, nunca para design ou tecnologia.' },
      { topic: 'Produto', q: 'O que vem junto com o pacote Website, além das páginas?', options: ['Apenas o site e o domínio.', 'Google Business Profile, SEO local, formulário e a manutenção mensal desde a publicação.', 'Um aplicativo nativo.'], answer: 1, why: '"Mais do que as páginas": o que traz cliente é a ficha do Google, o SEO local e o formulário. A manutenção (€60–150/mês) é parte do projeto desde o primeiro dia.' },
      { topic: 'Voucher', q: 'Quais são os três critérios do Trading Online Voucher?', options: ['12+ meses operando, menos de 10 funcionários, faturamento abaixo de €2M.', 'Ter site, ter Instagram, ter CNPJ.', 'Estar em Dublin, ter mais de 10 funcionários, faturar acima de €2M.'], answer: 0, why: 'Os três precisam ser verdadeiros ao mesmo tempo. Cobre até 50%, até €2.500, em 3–6 semanas.' },
      { topic: 'Brasil', q: 'Qual é a "arma secreta" no mercado brasileiro?', options: ['O Trading Online Voucher.', 'O esboço do site pronto antes da venda, com fotos, avaliações e nomes da equipe.', 'Desconto de 50% para quem fechar na hora.'], answer: 1, why: 'O cliente vê o site dele antes de pagar. "Give before you ask."' },
      { topic: 'Qualificação', q: 'Um prospect marcou 52 pontos de 100. O que você faz?', options: ['Aborda com a Sequência A.', 'Aborda com a Sequência B.', 'Não aborda; revisita em seis meses com motivo novo.'], answer: 2, why: 'Abordamos apenas acima de 60. Abaixo disso, a dor não é suficiente para gerar resposta.' },
      { topic: 'Achados', q: 'Qual é um achado específico?', options: ['"Seu site poderia ser mais moderno."', '"Vocês estão na página 2 para \'plumber Lucan\' e a FixIt aparece acima."', '"Falta presença online."'], answer: 1, why: 'Verdadeiro, verificável, não óbvio e nomeia o concorrente.' },
      { topic: 'Cold email', q: 'Depois do terceiro e-mail sem resposta, o que acontece?', options: ['Quarto e-mail com desconto.', 'Ligação no dia seguinte.', 'Supressão; revisitar só após seis meses com motivo genuinamente novo.'], answer: 2, why: 'Sem resposta após três = não é lead. Insistir gera reclamações que queimam o domínio.' },
      { topic: 'Primeiro e-mail', q: 'Pode anexar a auditoria no primeiro e-mail?', options: ['Sim, adianta o processo.', 'Não: anexo derruba a entregabilidade. Peça a resposta primeiro e envie depois, em até 48h.', 'Só se for PDF pequeno.'], answer: 1, why: 'Regra inegociável de entregabilidade.' },
      { topic: 'Preço', q: 'Quando e como você diz o preço?', options: ['Na reunião de diagnóstico, assim que entender o problema.', 'Na reunião de proposta, ao vivo, depois de calibrar o escopo: diz o número e para de falar.', 'Por e-mail, junto com o PDF da proposta.'], answer: 1, why: 'O diagnóstico termina com duas opções de data. A proposta é apresentada ao vivo; o número vem depois das três perguntas de calibragem, e quem fala depois do preço negocia contra si mesmo.' },
      { topic: 'Objeções', q: '"Preciso pensar." O que você faz primeiro?', options: ['Manda a proposta por e-mail e espera.', 'Desarma e isola: "Tranquilo. O que você acha que vai passar pela tua cabeça nessa decisão? Quais seriam as uma ou duas coisas principais?"', 'Oferece 10% de desconto para fechar hoje.'], answer: 1, why: '"Preciso pensar" quase nunca é a objeção real. A estrutura é desarmar, isolar, discutir, compromisso. Desconto fora da tabela nunca.' },
      { topic: 'Fechamento', q: 'Cliente irlandês disse "sim". Quando começa a inscrição do voucher?', options: ['No mesmo dia, em paralelo com o projeto.', 'Quando o site estiver pronto.', 'Depois da segunda parcela.'], answer: 0, why: 'São 3–6 semanas. Se começar no fim, o cliente fica sem o dinheiro quando a fatura final chega.' },
      { topic: 'Pós-venda', q: 'Quando você pede indicação?', options: ['No pico de satisfação, logo após a entrega, com o ritual de encerramento.', 'Só depois de seis meses.', 'Nunca.'], answer: 0, why: 'Cold email traz os primeiros cinco clientes; indicações e estudos de caso trazem os próximos cinquenta.' },
    ],
  },
};

/* ═══════════════════════════ COLA RÁPIDA ═══════════════════════════ */
const CHEATSHEET = [
  { heading: 'Frases de bolso', type: 'script', title: 'Apresentação', pt: 'Nós construímos a metade online dos pequenos negócios — o site, a listagem do Google e o sistema de agendamento que hoje come a sua tarde.', en: 'We build the online half of small businesses — the website, the Google listing, and the booking system that stops eating your afternoon.' },
  { heading: 'Preços de referência (confirme com o administrador antes de citar fora do padrão)', type: 'compare', title: 'Tabela de preços', label: 'Pacote', rows: [
    { label: 'Entrada', br: 'Essencial: R$ 1.497 + R$ 97/mês', ie: 'Website: €1.200 (€600 com voucher) + €60–150/mês de manutenção' },
    { label: 'Intermediário', br: 'Profissional ⭐: R$ 2.497 + R$ 197/mês', ie: 'Growth/Custom: €3.500 (€1.750 com voucher)' },
    { label: 'Avançado', br: 'Premium: R$ 3.997 + R$ 297/mês', ie: 'Custom: a partir de €5.000 (−€2.500 com voucher)' },
    { label: 'Manutenção', br: 'Inclusa na mensalidade · Modalidade B (CMS): + R$ 990 setup + R$ 60/mês', ie: '€60–150/mês desde a publicação, apresentada no dia 1' },
    { label: 'Hora avulsa', br: 'R$ 150/h (mín. 1h) · 5h R$ 675 · 10h R$ 1.275', ie: '€30/h · nada é cobrado por hora no Website/Custom' },
    { label: 'Pagamento', br: 'PIX · cartão até 12× · boleto · TED · 50% + 50%', ie: '50% aceite + 50% publicação (padrão) · à vista −5% · 3 parcelas +5% · SEPA, Stripe, Wise' },
    { label: 'Subsídio', br: '—', ie: 'Trading Online Voucher: 50%, até €2.500, 12+ meses, <10 funcionários, <€2M, 3–6 semanas' },
  ] },
  { heading: 'Cadência e regras', type: 'table', head: ['Item', 'Regra'], rows: [
    ['Cold email', 'Dia 0 → Dia 4 → Dia 11 → supressão. Nunca um 4º e-mail. Nunca anexo no 1º.'],
    ['Score 0–100', 'Web 20 · Sinal 20 · Reputação 20 · Contato 20 · Atividade 20. Aborde só acima de 60. Seq. A padrão; site saudável e >60 → Seq. B'],
    ['Auditoria', '2 páginas, linguagem simples, 48 horas, só após o "sim". Termina com próximo passo direto: o link da reunião'],
    ['WhatsApp (IE)', 'Só número comercial público, manual, um punhado por dia'],
    ['LinkedIn', 'Conexão sem pitch; DM só após 24h do aceite; 2 posts por semana'],
    ['Reunião de diagnóstico', '30 min, gravada: abertura (assumir o controle) · o que eu vi · 6 blocos de perguntas · validar · como trabalhamos (3–5 min) · quem decide · duas opções de data. Sem preço.'],
    ['Preço', 'Só na proposta ao vivo, depois de calibrar ("como você enxerga?", "as datas encaixam?", "é isso?"). Diga o número e cale. "Mais €60/mês para o site não envelhecer."'],
    ['Proposta', 'Até 48h · apresentada ao vivo, nunca só por e-mail · 8 blocos (retomada, objetivos, caso, escopo, quem faz o quê, cronograma, retorno, investimento) · validade 14 dias · 2 revisões'],
    ['Objeções', 'Desarmar → isolar ("dinheiro de lado, você faria?") → discutir → compromisso com data. Formato, nunca desconto fora da tabela.'],
    ['No "sim"', 'Ficha de passagem · fatura do sinal · pedido de conteúdo · voucher no dia 1 · kickoff com data · acesso ao GBP'],
    ['Prazos', 'IE: 1–2 semanas (site), 4+ (sistemas) · BR: 7 / 14 / 21–30 dias úteis'],
  ] },
  { heading: 'Nunca', type: 'callout', tone: 'rule', title: 'As regras que não se quebram', html: 'Enviar de marcusfernandes.ie · anexo no 1º e-mail · 4º e-mail · WhatsApp automatizado ou para número pessoal · prazo por mensagem informal · desconto fora da tabela · proposta só por e-mail · reunião sem data marcada no fim · domínio no nosso nome · começar sem contrato e entrada · abordar quem está na lista de supressão · vender para quem quer pagar só depois do resultado.' },
  { heading: 'Números saudáveis do funil', type: 'stat', items: [
    { value: '200', label: 'abordagens/semana' }, { value: '≥ 40%', label: 'abertura' }, { value: '≥ 5%', label: 'resposta' }, { value: '2–3', label: 'diagnósticos/semana' }, { value: '≥ 30%', label: 'fechamento' }, { value: '≈ 1', label: 'cliente/semana' },
  ] },
  { heading: 'Provas', type: 'cards', items: [
    { icon: '🚢', title: 'Coady Shipping · Dublin 11', html: 'Site institucional. Pedidos de orçamento 3×.' },
    { icon: '💻', title: 'Alfa Tecnologia · Pipa, BR', html: 'Site multilíngue com catálogo e ordem de serviço online.' },
    { icon: '🪪', title: 'ComplyPic', html: 'SaaS de fotos para passaporte e vistos.' },
    { icon: '🏋️', title: 'NattyCore', html: 'Coach de treino com IA.' },
  ] },
  { heading: 'Contato da consultoria', type: 'table', head: ['Canal', 'Endereço'], rows: [
    ['Site', 'marcusfernandes.ie'],
    ['E-mail', 'marcusffernandes@hotmail.com'],
    ['Telefone / WhatsApp', '+353 83 201 1655'],
    ['Base', 'Dublin 15, Irlanda'],
  ] },
];


/* ═══════════════════════════ FOLHETO PARA O CLIENTE ═══════════════════════════
   Uma página para imprimir, enviar como imagem ou colar como texto.
   Por mercado (ie = Irlanda/Europa, br = Brasil) e idioma. `{Seu nome}`
   vira o nome de quem está logado. */
const LEAFLET = {
  ie: {
    en: {
      tagline: 'Websites for local business · Dublin 15',
      title: 'Your business is good. Online, it should be too.',
      subtitle: 'We build the online half of small businesses: the website, the Google listing and the booking form that stops eating your afternoon. Fixed price, agreed in writing before anything starts.',
      problemsTitle: 'Three things that quietly cost you money',
      problems: [['Invisible on Google.', 'Someone nearby searches for what you do. Your competitor appears; you don\'t.'], ['No site, or a broken one.', 'People leave before they see what you offer, especially on a phone.'], ['Bookings still by phone.', 'Half the afternoon goes to WhatsApp and callbacks.']],
      includesTitle: 'What the Website package includes',
      includes: ['Single-page or 5-page website', 'Google Business Profile, verified and set up', 'Local SEO for the searches people make near you', 'Contact or booking form', 'A clear list of the photos and text to gather, walked through with you', 'Monthly maintenance (€60–150) from launch: hosting, updates and small edits', 'Changes answered on WhatsApp, same day', 'Domain, hosting account and code in your name from day one'],
      processTitle: 'How it works',
      process: [['Free audit (48h).', 'Two pages, plain English: where you stand on Google and the three things to fix first.'], ['A 30-minute conversation.', 'We understand your goal and what is in the way; then we present a proposal with scope and number in writing.'], ['Build (1–2 weeks).', 'Once your photos and service list are in. Most of the timeline is content, not code.'], ['Live, and kept alive.', 'Site live, Google listing sorted, monthly maintenance so it never goes stale.']],
      moneyTitle: 'The State pays half',
      money: ['Trading Online Voucher (Local Enterprise Office): up to 50% of eligible costs, up to €2,500.', 'You qualify if you\'ve been trading 12+ months, have under 10 staff and turnover under €2M.', 'We handle the paperwork end to end: two quotes, the form, the follow-ups. You approve, we file.', 'Payment: 50% to start, 50% on publication (5% off if paid upfront; three instalments +5%). Bank transfer (SEPA), Stripe or Wise.'],
      proof: [['3×', 'quote requests after the new site — Coady Shipping, Dublin 11'], ['12+', 'projects delivered since 2022'], ['0', 'lock-in: domain, hosting and code stay in your name']],
      ctaTitle: 'Next step', cta: 'Say "yes" and your free two-page audit is with you in 48 hours. No pitch, no strings.',
      contactRole: "Marcus Fernandes' team",
    },
    pt: {
      tagline: 'Sites para negócios locais · Dublin 15',
      title: 'Seu negócio é bom. Online, ele precisa ser também.',
      subtitle: 'Construímos a metade online dos pequenos negócios: o site, a ficha do Google e o formulário de agendamento que para de comer a sua tarde. Preço fixo, acordado por escrito antes de qualquer coisa começar.',
      problemsTitle: 'Três coisas que custam dinheiro toda semana',
      problems: [['Invisível no Google.', 'Alguém perto de você busca o que você faz. O concorrente aparece; você não.'], ['Sem site, ou com um quebrado.', 'As pessoas saem antes de ver o que você oferece, principalmente no celular.'], ['Agendamento ainda por telefone.', 'Metade da tarde vai embora em WhatsApp e retornos de ligação.']],
      includesTitle: 'O que o pacote Website inclui',
      includes: ['Site de página única ou de 5 páginas', 'Google Business Profile verificado e configurado', 'SEO local para as buscas que as pessoas fazem perto de você', 'Formulário de contato ou de agendamento', 'Lista clara das fotos e textos a reunir, revisada junto com você', 'Manutenção mensal (€60–150) desde a publicação: hospedagem, atualizações e pequenas edições', 'Alterações respondidas no WhatsApp, no mesmo dia', 'Domínio, conta de hospedagem e código no seu nome desde o dia 1'],
      processTitle: 'Como funciona',
      process: [['Auditoria gratuita (48h).', 'Duas páginas, em linguagem simples: onde você está no Google e as três coisas a corrigir primeiro.'], ['Uma conversa de 30 minutos.', 'Entendemos o seu objetivo e o que está no caminho; depois apresentamos uma proposta com escopo e valor por escrito.'], ['Construção (1–2 semanas).', 'Assim que suas fotos e a lista de serviços chegarem. A maior parte do prazo é conteúdo, não código.'], ['No ar, e mantido no ar.', 'Site publicado, ficha do Google ajustada, manutenção mensal para nunca envelhecer.']],
      moneyTitle: 'O Estado paga metade',
      money: ['Trading Online Voucher (Local Enterprise Office): até 50% dos custos elegíveis, até €2.500.', 'Você se qualifica se opera há 12+ meses, tem menos de 10 funcionários e fatura menos de €2M.', 'Nós cuidamos da papelada de ponta a ponta: os dois orçamentos, o formulário, os follow-ups. Você aprova, nós protocolamos.', 'Pagamento: 50% para começar, 50% na publicação (5% de desconto à vista; três parcelas +5%). Transferência (SEPA), Stripe ou Wise.'],
      proof: [['3×', 'pedidos de orçamento após o novo site — Coady Shipping, Dublin 11'], ['12+', 'projetos entregues desde 2022'], ['0', 'lock-in: domínio, hospedagem e código ficam no seu nome']],
      ctaTitle: 'Próximo passo', cta: 'Diga "sim" e a sua auditoria gratuita de duas páginas chega em 48 horas. Sem pitch, sem compromisso.',
      contactRole: 'Equipe Marcus Fernandes',
    },
  },
  br: {
    pt: {
      tagline: 'Sites para negócios locais',
      title: 'Seu negócio é bom. Online, ele precisa ser também.',
      subtitle: 'Construímos a metade online do seu negócio: o site, a ficha do Google e o botão de agendamento que tira o telefone da sua mão. Preço fixo, combinado antes de começar.',
      problemsTitle: 'Três coisas que custam dinheiro toda semana',
      problems: [['Invisível no Google.', 'Alguém na sua cidade busca o que você faz. O concorrente aparece; você não.'], ['Sem site, ou com um quebrado.', 'As pessoas saem antes de ver o que você oferece, principalmente no celular.'], ['Agendamento ainda por telefone.', 'Metade da tarde vai embora em WhatsApp e retornos de ligação.']],
      includesTitle: 'O que está incluído',
      includes: ['Site profissional no seu domínio .com.br', 'Ficha do Google (Google Meu Negócio) configurada', 'Aparecer no Google para quem busca o seu serviço na sua cidade', 'Botão de WhatsApp e formulário de contato', 'Hospedagem, segurança (cadeado) e backup inclusos na mensalidade', 'Pequenas alterações de texto, foto e preço feitas por nós', 'Site e domínio no seu nome, desde o primeiro dia', 'Nota fiscal em todo pagamento'],
      processTitle: 'Como funciona',
      process: [['Esboço pronto.', 'Você recebe o link do seu site já montado, com suas fotos e avaliações reais, antes de pagar qualquer coisa.'], ['Conversa de 15 minutos.', 'Vemos o site juntos no seu celular e escolhemos o pacote que faz sentido para o momento do negócio.'], ['Contrato e entrada.', 'Assinatura digital e 50% de entrada por PIX. O prazo começa quando o conteúdo chega.'], ['No ar em 7 a 14 dias úteis.', 'Site publicado, ficha do Google ajustada e treinamento rápido para você.']],
      moneyTitle: 'Investimento',
      money: ['Três pacotes: Essencial (R$ 1.497 + R$ 97/mês), Profissional (R$ 2.497 + R$ 197/mês) e Premium (R$ 3.997 + R$ 297/mês).', 'Setup em até 12× no cartão, ou 50% de entrada + 50% na entrega por PIX ou boleto, sem juros.', 'A mensalidade mantém o site no ar, seguro, atualizado e com pequenas alterações inclusas.', '7 dias de arrependimento com reembolso integral. Após 12 meses, cancelamento livre com 30 dias de aviso.'],
      proof: [['3×', 'pedidos de orçamento após o novo site — Coady Shipping, Dublin'], ['12+', 'projetos entregues desde 2022'], ['100%', 'seu: site, domínio e código no seu nome']],
      ctaTitle: 'Próximo passo', cta: 'Responda "quero ver" e mandamos o esboço do seu site em até 48 horas. Sem compromisso.',
      contactRole: 'Equipe Marcus Fernandes',
    },
  },
};

window.COURSE = COURSE; window.GLOSSARY = GLOSSARY; window.CHEATSHEET = CHEATSHEET; window.LEAFLET = LEAFLET;
