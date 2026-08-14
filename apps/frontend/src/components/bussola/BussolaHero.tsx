import React from 'react';
import { scrollToSection } from '../../utils/scroll';

export const BussolaHero: React.FC = () => {
  return (
    <section className="relative bg-background-dark text-white px-6 py-10 lg:py-16 overflow-hidden border-b border-border-dark">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#19e65e 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      ></div>
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center relative z-10">
        <span className="inline-block text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
          TURMA INAUGURAL • 50 VAGAS
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-black leading-tight tracking-tight font-mono max-w-5xl">
          Seja reconhecido como um profissional pronto para o próximo nível.
        </h1>
        <p className="text-gray-400 font-light text-lg md:text-lg max-w-3xl mx-auto">
          Você não avança na carreira perseguindo reconhecimento. Você define um
          destino e percorre uma jornada que produz evidências de que está
          pronto para sustentar o próximo nível.
        </p>
        <div className="pt-4">
          <button
            onClick={() => scrollToSection('pricing')}
            className="flex items-center justify-center h-14 px-8 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-base font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(25,230,94,0.2)] font-mono uppercase"
          >
            &gt; QUERO MUDAR DE NÍVEL &lt;
          </button>
        </div>
        <p className="text-sm text-gray-500 font-mono">
          Ao vivo • 5 semanas • 7 dias de garantia incondicional
        </p>
      </div>
    </section>
  );
};
