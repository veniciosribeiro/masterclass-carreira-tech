import React from 'react';
import { ExpandMoreIcon } from '../icons';

// A gravação existe, mas não é anunciada aqui: pela Fórmula de Lançamento ela
// só é divulgada 2 dias antes do fechamento do carrinho. Também não dizer que
// "não haverá gravação". O aviso de venda fica só no último item, por decisão
// do Expert (13/10/2026).
const FAQ_ITEMS = [
  {
    question: 'Para quem é este webinário?',
    answer:
      'Para desenvolvedores empregados (Júnior, Pleno ou Sênior) que sentem que entregam, mas não são reconhecidos à altura do que fazem.',
  },
  {
    question: 'O webinário é pago?',
    answer: 'Não. É gratuito e ao vivo. Basta se inscrever com nome e e-mail.',
  },
  {
    question: 'Como recebo o link de acesso?',
    answer:
      'O webinário é no Zoom, e o link chega por e-mail conforme a data se aproxima. Depois de se inscrever, você também recebe o convite para o grupo do WhatsApp, para não perder o lembrete.',
  },
  {
    question: 'E se meu gestor não souber conduzir uma conversa de carreira?',
    answer:
      'O seu desenvolvimento não pode depender de você ter o gestor ideal. É um dos pontos que eu abordo ao vivo.',
  },
  {
    question: 'E se eu quiser mudar de empresa?',
    answer:
      'O webinário serve para as duas rotas. O que quem decide precisa enxergar vale tanto para crescer onde você está quanto para escolher a próxima empresa com informação.',
  },
  {
    question: 'Vou ter que ficar me vendendo ou puxando o saco?',
    answer:
      'Não. Visibilidade não é falar mais nem virar alguém que você não é. É fazer quem decide entender o que você faz e o impacto disso.',
  },
  {
    question: 'Vai ter alguma oferta no webinário?',
    answer:
      'Sim. No final, eu apresento a Bússola, o meu curso, para quem quiser colocar em prática o que viu. Comprar é opcional.',
  },
];

export const SementeFAQ: React.FC = () => {
  return (
    <section
      className="px-6 py-10 bg-background-dark border-t border-border-dark"
      id="faq"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            Antes de se Inscrever
          </span>
          <h2 className="text-3xl md:text-4xl font-black leading-tight font-mono text-center mt-6 text-white">
            Perguntas Frequentes
          </h2>
        </div>
        <div className="space-y-4">
          {FAQ_ITEMS.map(({ question, answer }) => (
            <details
              key={question}
              className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20"
            >
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-surface-hover transition-colors">
                <span className="font-mono text-sm md:text-base">
                  &gt; {question}
                </span>
                <span className="transition group-open:rotate-180 text-primary">
                  <ExpandMoreIcon />
                </span>
              </summary>
              <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
                {answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
