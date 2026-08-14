import React from 'react';
import { scrollToSection } from '../../utils/scroll';
import { ExpandMoreIcon } from '../icons';

export const BussolaFAQ: React.FC = () => {
  return (
    <section
      className="px-6 py-10 lg:py-16 bg-background-dark border-t border-border-dark"
      id="faq"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            Antes de Decidir
          </span>
          <h2 className="text-3xl font-bold text-center mt-6 text-white font-mono">
            Perguntas Frequentes
          </h2>
        </div>
        <div className="space-y-4">
          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Isso é um curso de programação?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Não. A Bússola é uma aceleração de carreira para desenvolvedores
              que já atuam profissionalmente e querem construir uma rota mais
              estratégica de avanço.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Quanto tempo dura?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              A turma inaugural acontece ao longo de 5 semanas, com encontros ao
              vivo e atividades de aplicação entre as aulas.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Preciso estar buscando promoção?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Não necessariamente. Seu destino pode envolver promoção, aumento,
              ampliação de responsabilidade, mudança interna ou preparação para
              uma oportunidade profissional melhor.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Posso parcelar?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Sim. O pagamento pode ser feito por Pix ou cartão, com
              parcelamento em até 12x no cartão e juros da operadora.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Qual a diferença entre Starter e Premium?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              O método é o mesmo. O Premium acrescenta acompanhamento
              individual, revisão de CV e orientação de LinkedIn.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Por que o Premium tem apenas 10 vagas?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Porque inclui uma sessão individual de 90 minutos e, nesta turma
              inaugural, a capacidade desse acompanhamento é limitada.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; E se eu não gostar?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Você possui 7 dias de garantia incondicional para solicitar o
              reembolso integral.
            </div>
          </details>

          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Como funciona o suporte?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              O programa inclui suporte por e-mail durante a jornada e aulões
              coletivos quinzenais para dúvidas e estudos de caso.
            </div>
          </details>
        </div>

        <div className="mt-16 text-center flex flex-col items-center gap-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white font-mono leading-tight max-w-xl">
            Seu próximo nível pode continuar sendo uma expectativa — ou pode se
            tornar um destino.
          </h3>
          <button
            onClick={() => scrollToSection('pricing')}
            className="flex items-center justify-center h-14 px-8 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-base font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(25,230,94,0.2)] font-mono uppercase"
          >
            &gt; QUERO CONSTRUIR MINHA JORNADA &lt;
          </button>
          <p className="text-sm text-gray-500 font-mono">
            Turma inaugural • 50 vagas • Ao vivo • 5 semanas
          </p>
        </div>
      </div>
    </section>
  );
};
