import React from 'react';
import { TerminalIcon } from '../icons';

export const BussolaHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/95 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="size-9 text-primary">
            <TerminalIcon className="text-4xl" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white block font-mono">
            Bússola —{' '}
            <span className="text-primary">
              Aceleração de Carreira Para Desenvolvedores
            </span>
          </h2>
        </div>
      </div>
    </header>
  );
};
