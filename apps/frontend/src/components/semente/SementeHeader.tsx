import React from 'react';
import { scrollToSection } from '../../utils/scroll';
import { TerminalIcon } from '../icons';

export const SementeHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/95 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <TerminalIcon className="text-3xl" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-white hidden sm:block font-mono">
            <span className="text-primary">
              Aceleração de Carreira Para Desenvolvedores
            </span>
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
          <a
            className="text-gray-400 hover:text-primary transition-colors"
            href="#realidade"
          >
            ./Realidade
          </a>
          <a
            className="text-gray-400 hover:text-primary transition-colors"
            href="#inscricao"
          >
            ./O_Que_Você_Vai_Ver
          </a>
          <a
            className="text-gray-400 hover:text-primary transition-colors"
            href="#mentor"
          >
            ./Mentor
          </a>
          <a
            className="text-gray-400 hover:text-primary transition-colors"
            href="#faq"
          >
            ./FAQ
          </a>
        </nav>
        <button
          onClick={() => scrollToSection('inscricao')}
          className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-primary-hover transition-colors text-on-primary text-sm font-bold tracking-wide font-mono uppercase"
        >
          <span>&gt; QUERO MINHA VAGA</span>
        </button>
      </div>
    </header>
  );
};
