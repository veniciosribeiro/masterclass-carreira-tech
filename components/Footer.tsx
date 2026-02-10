import React from 'react';
import { TerminalIcon } from './icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050709] text-gray-500 py-12 px-6 border-t border-border-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <TerminalIcon className="text-primary" />
          <span className="font-bold text-white font-mono">Masterclass da Carreira Tech</span>
        </div>
        <div className="flex gap-6 text-md font-mono">
          <a className="hover:text-primary transition-colors" href="#">./Termos</a>
          <a className="hover:text-primary transition-colors" href="#">./Privacidade</a>
          <a className="hover:text-primary transition-colors" href="#">./Contato</a>
        </div>
        <div className="text-md font-mono">
          © {new Date().getFullYear()} Media Labs - CNPJ: 16.577.628/0001-94.
        </div>
      </div>
    </footer>
  );
};