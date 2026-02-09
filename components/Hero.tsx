import React from 'react';
import { scrollToSection } from '../utils/scroll';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-background-dark text-white px-6 py-10 lg:py-20 overflow-hidden border-b border-border-dark">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#19e65e 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-medium text-primary uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">terminal</span>
            PROTOCOLO DE VALIDAÇÃO DA CARREIRA TECH
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-black leading-tight tracking-tight font-mono">
            Você tem a <span className="text-primary">Lógica</span> para se tornar Programador ou estão te <span className="text-red-400">Iludindo</span> com o desejo pelo salário?
          </h1>
          <p className="text-gray-400 font-light text-md md:text-lg max-w-3xl mx-auto lg:mx-0 font-light">
            6 em cada 10 alunos desistem da TI no primeiro ano, perdendo tempo e dinheiro. <span className="text-red-400 font-bold">Não entre nessa estatística.</span>
          </p>
          <p className="text-gray-400 font-light text-md md:text-lg max-w-3xl mx-auto lg:mx-0 font-light">
            Na <span className="text-primary font-bold">Masterclass</span> você vai entender o que realmente é preciso para ser <span className="text-primary font-bold">Programador</span> e se você tem o perfil para entrar na área.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button
              onClick={() => scrollToSection('pricing')}
              className="flex items-center justify-center h-14 px-8 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-base font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(25,230,94,0.2)] font-mono uppercase"
            >
              &gt; Participar da Masterclass
              <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </button>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-md text-primary px-4 font-mono">
              <span className="material-symbols-outlined text-primary">verified</span>
              Garantia Total de 30 Dias
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl"></div>
          <div
            className="relative rounded-xl overflow-hidden border border-border-dark shadow-2xl bg-surface-dark aspect-video flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/images/hero-bg.png')" }}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button className="size-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer group">
                <span className="material-symbols-outlined text-white text-4xl ml-1 group-hover:scale-110 transition-transform">play_arrow</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};