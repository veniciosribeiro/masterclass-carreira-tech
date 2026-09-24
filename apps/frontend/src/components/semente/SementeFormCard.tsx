import React from 'react';
import { CheckCircleIcon } from '../icons';
import { SementeForm } from './SementeForm';
import { WEBINAR_DATE_LABEL_2 } from './sementeConfig';

// Duplicado de SementeProofCard — mesma moldura visual (glow, borda,
// linha de destaque no topo), mas o conteúdo é o formulário de inscrição
// em vez do estudo de caso. Sem o tilt 3D do original: rotacionar campos
// de formulário em perspectiva atrapalha o preenchimento.
export const SementeFormCard: React.FC = () => {
  return (
    <div className="relative group flex justify-center w-full">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[460px] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50" />

      <div className="relative w-full max-w-lg bg-[#0D1117] border border-[#30363D] shadow-2xl rounded-sm p-8 flex flex-col gap-5 overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-primary font-mono uppercase tracking-widest">
            Inscrição
          </span>
          <span className="text-xs text-gray-500 font-mono uppercase">
            #Webinário
          </span>
        </div>

        <div className="text-center pt-1">
          <span className="inline-flex items-center gap-1.5 text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-3 py-1.5 rounded bg-primary/10 mb-4">
            <CheckCircleIcon className="text-sm" />
            Vagas gratuitas e limitadas
          </span>
        </div>

        <SementeForm />

        <div className="pt-4 border-t border-dashed border-[#30363D] flex justify-center items-center">
          <span className="inline-block self-center lg:self-start tracking-widest uppercase text-sm font-mono px-2 py-1">
            {WEBINAR_DATE_LABEL_2}
          </span>
        </div>
      </div>
    </div>
  );
};
