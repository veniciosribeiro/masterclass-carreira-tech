import React from 'react';
import { ShieldLockIcon } from './icons';

export const Guarantee: React.FC = () => {
  return (
    <section className="py-10 bg-surface-dark border-b border-border-dark">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center p-6 rounded-full bg-[#19e65e]/5 border border-[#19e65e]/20 mb-8 relative">
          <div className="absolute inset-0 bg-[#19e65e]/20 blur-xl rounded-full"></div>
          <ShieldLockIcon className="text-5xl text-primary relative z-10" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-mono">Garantia de Diagnóstico ou Reembolso</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          Participe da Masterclass. Realize os testes. <br />
          Se ao final você ainda estiver com dúvida, ou se achar que não valeu a pena, eu devolvo 100% dos seus R$97.
        </p>
        <div className="p-6 bg-background-dark border border-border-dark rounded-xl max-w-lg mx-auto">
          <p className="font-mono text-primary text-md">
            O risco financeiro é meu.
          </p>
          <p className="font-mono text-primary text-md">
            O seu único risco é continuar na dúvida.
          </p>
        </div>
      </div>
    </section>
  );
};