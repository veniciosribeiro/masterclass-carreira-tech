import React from 'react';
import { ExpandMoreIcon } from '../icons';

export const SementeFAQ: React.FC = () => {
  return (
    <section
      className="px-6 py-10 bg-background-dark border-t border-border-dark"
      id="faq"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            Antes de se Inscrever
          </span>
          <h2 className="text-3xl font-bold text-center mt-6 text-white font-mono">
            Perguntas Frequentes
          </h2>
        </div>
        <div className="space-y-4">
          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; O Webinário é pago?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Não. É 100% gratuito e ao vivo. Basta se inscrever com nome e
              e-mail.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Como recebo o link de acesso?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Por e-mail, conforme a data se aproxima. Depois de se inscrever,
              você também recebe um link para entrar no grupo e não perder o
              lembrete.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Isso é uma venda disfarçada?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              O Webinário é conteúdo real, de graça, sobre os quatro pontos
              desta página. No final, você conhece uma oferta para quem quiser
              ir além — sem obrigação nenhuma de comprar.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; E se meu gestor não souber conduzir uma conversa de
                carreira?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              É uma das dúvidas mais comuns. A resposta curta: seu
              desenvolvimento não pode depender de você ter o gestor ideal — e é
              um dos pontos que o Webinário aborda ao vivo.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Para quem é esse Webinário?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Para desenvolvedores empregados (Júnior, Pleno ou Sênior) que
              sentem que entregam, mas não são reconhecidos à altura do que
              fazem.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};
