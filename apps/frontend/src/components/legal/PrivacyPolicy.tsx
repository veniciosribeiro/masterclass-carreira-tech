import React from 'react';
import { PageTitle } from '../seo/PageTitle';
import { ROUTE_TITLES } from '../../seo/routeTitles';
import { SementeFooter } from '../semente/SementeFooter';
import { TerminalIcon } from '../icons';
import {
  PRIVACY_CONTROLLER,
  PRIVACY_POLICY_UPDATED_LABEL,
} from '../../utils/privacyPolicy';

// Sem MetaPixel nesta página de propósito: quem lê a política não precisa ser
// medido para anúncio. O texto descreve os fluxos reais (formulário, events
// API, n8n, Twenty, Mautic, Chatwoot, Formbricks, IA); ao mudar um deles,
// atualize a seção e PRIVACY_POLICY_VERSION.

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-4">
      {title}
    </h2>
    <div className="space-y-4 text-gray-300 leading-relaxed">{children}</div>
  </section>
);

interface ListProps {
  items: React.ReactNode[];
}

const List: React.FC<ListProps> = ({ items }) => (
  <ul className="list-disc pl-6 space-y-2">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong className="text-white font-semibold">{children}</strong>
);

const MailLink: React.FC = () => (
  <a
    href={`mailto:${PRIVACY_CONTROLLER.email}`}
    className="text-primary underline hover:text-green-400"
  >
    {PRIVACY_CONTROLLER.email}
  </a>
);

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen font-display bg-background-dark text-text-main overflow-x-hidden antialiased">
      <PageTitle title={ROUTE_TITLES['/politica-de-privacidade']} />
      <header className="w-full border-b border-border-dark px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <TerminalIcon className="text-3xl text-primary" />
          <span className="text-lg font-bold text-white font-mono">
            Venicios Ribeiro — Carreira Tech
          </span>
        </div>
      </header>

      <main className="px-6 py-10 md:py-14">
        <article className="max-w-3xl mx-auto space-y-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black font-mono text-white leading-tight">
              Política de Privacidade
            </h1>
            <p className="text-gray-500 font-mono text-sm mt-3">
              Última atualização: {PRIVACY_POLICY_UPDATED_LABEL}
            </p>
            <p className="text-gray-300 leading-relaxed mt-6">
              Esta política explica quais dados pessoais coletamos nos sites e
              serviços Carreira Tech (como o webinário, o teste de aptidão e a
              Bússola), para que usamos, com quem compartilhamos, por quanto
              tempo guardamos e como você exerce os seus direitos, segundo a Lei
              Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).
            </p>
          </div>

          <Section
            id="controlador"
            title="1. Quem é o responsável pelos seus dados"
          >
            <p>
              A controladora dos dados é a{' '}
              <Strong>{PRIVACY_CONTROLLER.name}</Strong>,{' '}
              {PRIVACY_CONTROLLER.document}. O encarregado pelo tratamento de
              dados pessoais é <Strong>{PRIVACY_CONTROLLER.dpo}</Strong>.
            </p>
            <p>
              Para qualquer assunto sobre os seus dados, escreva para{' '}
              <MailLink />.
            </p>
          </Section>

          <Section id="dados" title="2. Quais dados coletamos">
            <p>
              <Strong>Dados que você nos informa:</Strong>
            </p>
            <List
              items={[
                <>
                  <Strong>Inscrição no webinário:</Strong> nome e e-mail.
                </>,
                <>
                  <Strong>Pesquisa enviada depois da inscrição</Strong>{' '}
                  (opcional): respostas sobre a sua carreira, como objetivo,
                  situação profissional, nível, idade, faixa salarial e tempo
                  sem promoção, e o seu celular, se você informar.
                </>,
                <>
                  <Strong>Teste de aptidão:</Strong> nome, e-mail, respostas e o
                  resultado gerado.
                </>,
                <>
                  <Strong>Conversas:</Strong> mensagens que você nos envia por
                  e-mail ou WhatsApp, incluindo áudios.
                </>,
                <>
                  <Strong>Compras:</Strong> os dados que a plataforma de
                  pagamento nos repassa sobre a compra, como nome, e-mail,
                  produto e valor.
                </>,
              ]}
            />
            <p>
              <Strong>Dados coletados automaticamente</Strong> quando você
              acessa as páginas:
            </p>
            <List
              items={[
                'endereço IP, tipo de navegador e de dispositivo, páginas visitadas, data e hora;',
                'parâmetros de campanha presentes no link (como UTMs e o identificador de clique do anúncio) e a plataforma de anúncio de onde você veio;',
                'localização aproximada (cidade, estado, CEP e país) estimada a partir do endereço IP;',
                'cookies e um identificador de visitante (veja a seção 8).',
              ]}
            />
            <p>
              <Strong>Grupo de WhatsApp:</Strong> se você entrar no grupo do
              webinário, o seu nome e o seu número ficam visíveis para os
              participantes e administradores, conforme as regras do WhatsApp.
            </p>
          </Section>

          <Section id="finalidades" title="3. Para que usamos os seus dados">
            <List
              items={[
                <>
                  <Strong>Inscrição e participação no webinário</Strong>: enviar
                  o link de acesso, avisos e lembretes.
                </>,
                <>
                  <Strong>Comunicações de conteúdo e oferta</Strong>: enviar
                  conteúdos sobre carreira e ofertas de cursos e mentorias por
                  e-mail e, se tivermos o seu número, por WhatsApp.
                </>,
                <>
                  <Strong>Atendimento e relacionamento</Strong>: responder às
                  suas mensagens e registrar o histórico do contato no nosso
                  CRM.
                </>,
                <>
                  <Strong>Personalização e análise por IA</Strong>: entender o
                  seu momento e o seu interesse e definir as próximas
                  comunicações (veja a seção 4).
                </>,
                <>
                  <Strong>Medição de anúncios</Strong>: saber de qual anúncio
                  veio cada inscrição e medir o resultado das campanhas.
                </>,
                <>
                  <Strong>Teste de aptidão e compras</Strong>: gerar o seu
                  resultado e relatório, entregar o que você comprou e cumprir
                  obrigações legais e fiscais.
                </>,
                <>
                  <Strong>Segurança</Strong>: proteger os sites contra fraude e
                  abuso.
                </>,
              ]}
            />
            <p>
              <Strong>Bases legais (art. 7º da LGPD):</Strong> para a inscrição
              no webinário, as comunicações de conteúdo e oferta e a análise por
              IA, o seu <Strong>consentimento</Strong>, dado na caixa do
              formulário. Para o teste e as compras, a execução do serviço ou do
              contrato que você pediu e o cumprimento de obrigação legal. Para
              atendimento, medição de anúncios e segurança, o nosso{' '}
              <Strong>legítimo interesse</Strong>, sempre respeitando os seus
              direitos.
            </p>
            <div className="p-5 rounded-lg bg-surface-dark border border-primary/30">
              <p>
                <Strong>A inscrição gratuita depende do consentimento.</Strong>{' '}
                O webinário é gratuito e, em troca, pedimos o seu aceite para
                receber as nossas comunicações. Por isso a caixa de aceite é
                obrigatória para se inscrever (art. 9º, §3º, da LGPD). Você pode
                revogar o consentimento a qualquer momento, pelo link de
                descadastro dos e-mails ou escrevendo para <MailLink />. A
                partir daí, paramos de enviar as comunicações.
              </p>
            </div>
          </Section>

          <Section id="ia" title="4. Uso de inteligência artificial">
            <p>Usamos inteligência artificial para:</p>
            <List
              items={[
                <>
                  <Strong>Transcrever áudios</Strong> que você nos envia. A
                  transcrição é feita em computador próprio, sem envio do áudio
                  a terceiros.
                </>,
                <>
                  <Strong>Resumir e analisar conversas e interações</Strong>,
                  com o modelo Claude, da Anthropic. Antes da análise, retiramos
                  do texto o seu telefone e o seu e-mail.
                </>,
                <>
                  <Strong>Tomar decisões automatizadas</Strong>: a IA pode
                  classificar o seu perfil e o seu interesse e, com base nisso,
                  definir quais comunicações e ofertas você recebe, sem revisão
                  humana.
                </>,
              ]}
            />
            <p>
              Você tem o direito de pedir a <Strong>revisão</Strong> de uma
              decisão tomada só por tratamento automatizado que afete os seus
              interesses, e de receber informações claras sobre os critérios
              usados (art. 20 da LGPD). Para isso, escreva para <MailLink />.
            </p>
          </Section>

          <Section id="compartilhamento" title="5. Com quem compartilhamos">
            <p>
              <Strong>Não vendemos os seus dados.</Strong> Eles são tratados em
              ferramentas instaladas em servidores contratados por nós (o banco
              de dados dos sites, a nossa API de eventos, o CRM, a ferramenta de
              e-mail, a de atendimento, a de pesquisas e a de automação) e
              compartilhados apenas com fornecedores que nos ajudam a prestar o
              serviço:
            </p>
            <List
              items={[
                <>
                  <Strong>Hospedagem:</Strong> Hostinger e OVH (servidores).
                </>,
                <>
                  <Strong>Rede e segurança:</Strong> Cloudflare.
                </>,
                <>
                  <Strong>Envio de e-mails:</Strong> Amazon Web Services (Amazon
                  SES).
                </>,
                <>
                  <Strong>Anúncios e medição:</Strong> Meta (Pixel e API de
                  Conversões), que recebe dados do evento de inscrição, como
                  e-mail, nome, IP e navegador, para associar a inscrição ao
                  anúncio.
                </>,
                <>
                  <Strong>Mensagens:</Strong> WhatsApp.
                </>,
                <>
                  <Strong>Inteligência artificial:</Strong> Anthropic.
                </>,
                <>
                  <Strong>Transmissão do webinário:</Strong> Zoom.
                </>,
                <>
                  <Strong>Pagamentos:</Strong> a plataforma de pagamento usada
                  na compra (como a Cakto), que trata os dados de pagamento
                  segundo a política dela.
                </>,
                <>
                  <Strong>Autoridades</Strong>, quando a lei ou uma ordem
                  judicial exigir.
                </>,
              ]}
            />
          </Section>

          <Section
            id="transferencia"
            title="6. Transferência para fora do Brasil"
          >
            <p>
              Alguns desses fornecedores, como Meta, Amazon Web Services,
              Cloudflare, Anthropic e Zoom, tratam dados em outros países,
              principalmente nos Estados Unidos. Essas transferências acontecem
              só para as finalidades desta política e nas hipóteses do art. 33
              da LGPD.
            </p>
          </Section>

          <Section id="retencao" title="7. Por quanto tempo guardamos">
            <p>
              Guardamos os seus dados enquanto houver relacionamento com você,
              ou até você pedir a exclusão. Quando você pedir, apagamos ou
              anonimizamos os dados, exceto os que a lei nos obriga a guardar,
              como os registros de compra para fins fiscais. Revogar o
              consentimento interrompe as comunicações; para apagar os dados,
              peça a exclusão.
            </p>
          </Section>

          <Section id="cookies" title="8. Cookies e identificadores">
            <List
              items={[
                <>
                  <Strong>_fbp e _fbc</Strong> (Meta, até 90 dias): ligam a sua
                  visita e a sua inscrição ao anúncio que você viu ou clicou.
                </>,
                <>
                  <Strong>Identificador de visitante</Strong> (domínio
                  api.foconoobjetivo.com): reconhece o mesmo visitante entre as
                  páginas para medir campanhas.
                </>,
                <>
                  <Strong>Cookies técnicos da Cloudflare</Strong>: segurança e
                  proteção contra abuso.
                </>,
                <>
                  <Strong>Armazenamento do navegador</Strong>: o acesso ao teste
                  de aptidão e, por alguns instantes, o nome e o e-mail da
                  inscrição para montar o link da pesquisa.
                </>,
              ]}
            />
            <p>
              Você pode apagar ou bloquear cookies nas configurações do seu
              navegador. Isso pode afetar o funcionamento de partes do site.
              Você também pode ajustar os anúncios que vê nas preferências de
              anúncios da Meta.
            </p>
          </Section>

          <Section id="direitos" title="9. Os seus direitos">
            <p>Pela LGPD (art. 18), você pode pedir, a qualquer momento:</p>
            <List
              items={[
                'confirmação de que tratamos os seus dados e acesso a eles;',
                'correção de dados incompletos, inexatos ou desatualizados;',
                'anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desacordo com a lei;',
                'portabilidade dos dados a outro fornecedor;',
                'eliminação dos dados tratados com base no consentimento;',
                'informação sobre com quem compartilhamos os seus dados;',
                'informação sobre a possibilidade de não consentir e as consequências disso;',
                'revogação do consentimento;',
                'revisão de decisões automatizadas (veja a seção 4).',
              ]}
            />
            <p>
              Para exercer qualquer um deles, escreva para <MailLink />.
              Respondemos em até 15 dias. Você também pode apresentar reclamação
              à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </Section>

          <Section id="seguranca" title="10. Segurança">
            <p>
              Usamos conexão criptografada (HTTPS) e restringimos o acesso às
              ferramentas que guardam os seus dados. Nenhum sistema é totalmente
              imune a incidentes; se acontecer um incidente que possa trazer
              risco relevante a você, avisaremos você e a ANPD, como manda a
              lei.
            </p>
          </Section>

          <Section id="menores" title="11. Menores de idade">
            <p>
              Os nossos serviços são voltados a profissionais adultos e não se
              destinam a menores de 18 anos.
            </p>
          </Section>

          <Section id="alteracoes" title="12. Alterações desta política">
            <p>
              Podemos atualizar esta política. A data da última atualização fica
              no topo da página, e cada aceite no formulário registra a versão
              vigente naquele momento.
            </p>
          </Section>
        </article>
      </main>

      <SementeFooter />
    </div>
  );
};
