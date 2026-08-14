import React from 'react';
import { VerifiedIcon } from '../icons';

export const BussolaProofCard: React.FC = () => {
  return (
    <div className="relative perspective-1000 group flex justify-center w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[460px] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50" />

      <div className="relative w-full max-w-lg bg-[#0D1117] border border-[#30363D] shadow-2xl rounded-sm transform transition-transform duration-700 hover:scale-[1.02] md:rotate-y-[-12deg] md:rotate-x-[5deg] hover:rotate-0 p-8 flex flex-col gap-5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

        <div className="text-center py-3">
          <span className="inline-flex items-center gap-1.5 text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-3 py-1.5 rounded bg-primary/10 mb-4">
            <VerifiedIcon className="text-sm" />
            CASO REAL
          </span>
          <p className="text-white text-xl font-mono leading-relaxed">
            Um desenvolvedor Pleno que achava que levaria{' '}
            <span className="text-gray-500 line-through decoration-red-500 decoration-2">
              4 anos
            </span>{' '}
            pra ser promovido. Foi promovido em{' '}
            <span className="text-primary font-bold">12 meses</span>.
          </p>
          <span className="inline-block mt-4 text-xs font-mono text-primary bg-primary/10 py-1 px-3 rounded border border-primary/20 uppercase">
            + 5 casos reais na seção de provas
          </span>
        </div>

        <div className="w-2/3 mx-auto h-px bg-[#30363D]" />
      </div>

      <style>{`.perspective-1000{perspective:1000px}.rotate-y-[-12deg]{transform:rotateY(-12deg)}.rotate-x-[5deg]{transform:rotateX(5deg)}`}</style>
    </div>
  );
};
