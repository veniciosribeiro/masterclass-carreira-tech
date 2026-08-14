import React from 'react';
import { TerminalIcon } from '../icons';

export const SementeFooter: React.FC = () => {
  return (
    <footer className="bg-[#050709] text-gray-500 py-12 px-6 border-t border-border-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <TerminalIcon className="text-primary" />
          <span className="font-bold text-white font-mono">
            Venicios Ribeiro — Carreira Tech
          </span>
        </div>
        <div className="text-md font-mono">
          © {new Date().getFullYear()} Venicios Ribeiro — Carreira Tech
        </div>
      </div>
    </footer>
  );
};
