import { scrollToSection } from '@/utils/scroll';
import React from 'react';
import { ArrowForwardIcon } from './icons';

export const Offer: React.FC = () => {
  return (
    <section className="px-6 py-20 relative overflow-hidden bg-background-dark">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-primary/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <button
          onClick={() => scrollToSection('pricing')}
          className="w-full md:w-auto h-20 px-12 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-xl md:text-2xl font-black shadow-[0_0_40px_rgba(25,230,94,0.4)] transition-all transform hover:scale-105 font-mono uppercase tracking-wide flex items-center justify-center gap-4 mx-auto">
          <span>QUERO MEU DIAGNÓSTICO AGORA</span>
          <ArrowForwardIcon className="text-3xl" />
        </button>

        <p className="mt-8 text-gray-500 font-mono text-sm">
          Acesso imediato • Pagamento Único • Garantia Total
        </p>
      </div>
    </section>
  );
};