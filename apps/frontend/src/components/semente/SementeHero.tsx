import React from 'react';
import { scrollToSection } from '../../utils/scroll';
import { SementeProofCard } from './SementeProofCard';
import { WEBINAR_DATE_LABEL } from './sementeConfig';

export const SementeHero: React.FC = () => {
  return (
    <section className="relative bg-background-dark text-white px-6 py-10 lg:py-20 overflow-hidden border-b border-border-dark">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#19e65e 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      ></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <span className="inline-block self-center lg:self-start text-primary tracking-widest uppercase text-md font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            {WEBINAR_DATE_LABEL}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-black leading-tight tracking-tight font-mono">
            Para desenvolvedores que entregam muito mas não são promovidos.
          </h1>
          <p className="text-gray-400 font-light text-lg md:text-lg max-w-3xl mx-auto lg:mx-0">
            Entenda quais são os 4 erros que fazem muitos desenvolvedores
            permanecerem estagnados, e o que fazer para avançar sem depender
            apenas de entregar mais ou esperar que alguém perceba o seu valor.
          </p>
          <div className="flex justify-center lg:justify-start pt-4">
            <button
              onClick={() => scrollToSection('inscricao')}
              className="flex items-center justify-center h-14 px-8 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-base font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(25,230,94,0.2)] font-mono uppercase"
            >
              &gt; Quero Minha Vaga &lt;
            </button>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <SementeProofCard />
        </div>
      </div>
    </section>
  );
};
