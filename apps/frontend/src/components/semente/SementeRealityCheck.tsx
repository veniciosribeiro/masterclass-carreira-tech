import React from 'react';
import { ErrorIcon, VerifiedIcon } from '../icons';

export const SementeRealityCheck: React.FC = () => {
  return (
    <section className="px-6 py-10 bg-[#0b0e11]" id="realidade">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-3xl font-bold font-mono">
            Como demonstrar seu valor quando as expectativas não estão claras?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="p-10 rounded-xl bg-surface-dark border border-red-900/30 relative overflow-hidden group">
              <div className="absolute left-0 top-0 w-1 h-full bg-red-600"></div>
              <h4 className="text-red-400 font-bold font-mono mb-2 flex items-center gap-2">
                <ErrorIcon />
                "Você precisa aparecer mais."
              </h4>
              <p className="text-gray-400">
                É um feedback vazio: você ouve que precisa mudar, mas sai sem
                saber o quê. E acaba tentando compensar a falta de direção com
                mais entrega.
              </p>
            </div>
          </div>

          <div className="p-10 rounded-xl bg-surface-dark border border-primary/30 relative overflow-hidden group">
            <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>
            <h4 className="text-primary font-bold font-mono mb-2 flex items-center gap-2">
              <VerifiedIcon />
              Visibilidade não é falar mais
            </h4>
            <p className="text-gray-400">
              É tornar sua atuação, suas decisões e o impacto que produz
              compreensíveis para quem participa das decisões sobre sua
              carreira.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
