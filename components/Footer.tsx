import React from 'react';
import { TerminalIcon } from './icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050709] text-gray-500 py-12 px-6 border-t border-border-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <TerminalIcon className="text-primary" />
          <span className="font-bold text-white font-mono">TechCareer Test-Drive</span>
        </div>
        <div className="flex gap-6 text-sm font-mono">
          <a className="hover:text-primary transition-colors" href="#">./Termos</a>
          <a className="hover:text-primary transition-colors" href="#">./Privacidade</a>
          <a className="hover:text-primary transition-colors" href="#">./Contato</a>
        </div>
        <div className="text-sm font-mono">
          © 2023 TechCareer Inc.
        </div>
      </div>
    </footer>
  );
};