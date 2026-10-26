import React from 'react';
import { TerminalIcon } from './icons';
import { PRIVACY_POLICY_PATH } from '../utils/privacyPolicy';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background-deep text-gray-500 py-12 px-6 border-t border-border-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <TerminalIcon className="text-primary" />
          <span className="font-bold text-white font-mono">
            Masterclass Test-Drive da Carreira Tech
          </span>
        </div>
        <div className="text-md font-mono flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <a
            href={PRIVACY_POLICY_PATH}
            className="underline hover:text-primary"
          >
            Política de Privacidade
          </a>
          <span>
            © {new Date().getFullYear()} Media Labs - CNPJ: 16.577.628/0001-94
          </span>
        </div>
      </div>
    </footer>
  );
};
