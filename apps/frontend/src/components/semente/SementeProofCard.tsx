import React from 'react';
import { VerifiedIcon } from '../icons';

export const SementeProofCard: React.FC = () => {
  return (
    <div className="relative perspective-1000 group flex justify-center w-full">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[460px] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50" />

      <div className="relative w-full max-w-lg bg-[#0D1117] border border-[#30363D] shadow-2xl rounded-sm transform transition-transform duration-700 hover:scale-[1.02] md:rotate-y-[-12deg] md:rotate-x-[5deg] hover:rotate-0 p-8 flex flex-col gap-5 overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-primary font-mono uppercase tracking-widest">
            Passaporte
          </span>
          <span className="text-xs text-gray-500 font-mono uppercase">
            #Webinário
          </span>
        </div>

        <div className="text-center py-3">
          <span className="inline-flex items-center gap-1.5 text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-3 py-1.5 rounded bg-primary/10 mb-4">
            <VerifiedIcon className="text-sm" />
            Estudos de Caso Reais
          </span>
          <p className="text-white text-xl font-mono leading-relaxed">
            Um desenvolvedor que achava que levaria{' '}
            <span className="text-gray-500 line-through decoration-red-500 decoration-2">
              4 anos
            </span>{' '}
            pra ser promovido. Foi promovido em{' '}
            <span className="text-primary font-bold">12 meses</span>.
          </p>
          <span className="inline-block mt-4 text-xs font-mono text-primary bg-primary/10 py-1 px-3 rounded border border-primary/20 uppercase">
            + 4 erros que te impedem de ser promovido
          </span>
        </div>

        <div className="w-2/3 mx-auto h-px bg-[#30363D]" />

        <div className="bg-[#161B22] border border-primary/30 rounded p-5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400 font-sans">Formato</span>
            <span className="text-base text-white font-sans font-bold">
              Transmissão ao vivo
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400 font-sans">
              Investimento
            </span>
            <span className="text-base text-primary font-sans font-bold">
              Gratuito
            </span>
          </div>
        </div>

        <div className="mt-1 pt-4 border-t border-dashed border-[#30363D] flex items-center justify-between">
          <span className="text-xs text-gray-500 font-mono">Carreira Tech</span>
          <span className="text-xs text-primary font-mono font-bold uppercase">
            Válido para 1 pessoa
          </span>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-[-12deg] { transform: rotateY(-12deg); }
        .rotate-x-[5deg] { transform: rotateX(5deg); }
      `}</style>
    </div>
  );
};
