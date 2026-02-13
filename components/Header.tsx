import React from 'react';
import { scrollToSection } from '@/utils/scroll';
import { TerminalIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/95 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <TerminalIcon className="text-3xl" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-white hidden sm:block font-mono">
            Masterclass da <span className="text-primary">Carreira Tech</span>_
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
          <a className="text-gray-400 hover:text-primary transition-colors" href="#reality">./Realidade</a>
          <a className="text-gray-400 hover:text-primary transition-colors" href="#mechanism">./O_Metodo</a>
          <a className="text-gray-400 hover:text-primary transition-colors" href="#authority">./Mentor</a>
          <a className="text-gray-400 hover:text-primary transition-colors" href="#pricing">./Decisao</a>
          <a className="text-gray-400 hover:text-primary transition-colors" href="#faq">./FAQ</a>
        </nav>
        <button
          onClick={() => scrollToSection('pricing')}
          className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-green-400 transition-colors text-[#0D1117] text-sm font-bold tracking-wide font-mono uppercase">
          <span>&gt; Garantir_Vaga</span>
        </button>
      </div>
    </header>
  );
};