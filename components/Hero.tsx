import React from 'react';
import { scrollToSection } from '../utils/scroll';
import { TerminalIcon, ArrowForwardIcon, VerifiedIcon, PlayArrowIcon } from './icons';
import { PDFReportCard } from './PDFReportCard';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-background-dark text-white px-6 py-10 lg:py-20 overflow-hidden border-b border-border-dark">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#19e65e 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-black leading-tight tracking-tight font-mono">
            Você tem a <span className="text-primary">Lógica</span> para se tornar Programador ou estão te <span className="text-red-400">Iludindo</span> com o desejo pelo salário?
          </h1>
          <p className="text-gray-400 font-light text-md md:text-lg max-w-3xl mx-auto lg:mx-0 font-light">
            Participe da Masterclass Da Carreira Tech e descubra qual o seu perfil ANTES de gastar milhares de reais em uma faculdade, bootcamp ou cursos que só te trarão prejuízo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button
              onClick={() => scrollToSection('pricing')}
              className="flex items-center justify-center h-14 px-8 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-base font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(25,230,94,0.2)] font-mono uppercase"
            >
              &gt; Participar da Masterclass &lt;
            </button>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-md text-primary px-4 font-mono">
              <VerifiedIcon className="text-primary" />
              Garantia de 30 Dias
            </div>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
          <PDFReportCard />
        </div>
      </div>
    </section>
  );
};