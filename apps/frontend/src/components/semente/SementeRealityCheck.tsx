import React from 'react';
import { ErrorIcon, VerifiedIcon } from '../icons';

export const SementeRealityCheck: React.FC = () => {
  return (
    <section className="px-6 py-10 bg-background-sunken" id="realidade">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black leading-tight font-mono text-white">
            A decisão sobre a sua promoção acontece numa sala em que você não
            está.
          </h2>
          <p className="text-gray-400 text-lg mt-6">
            Na minha experiência, quem participa dessa conversa fala do que
            consegue enxergar de você. Se só quem senta ao seu lado entende o
            seu trabalho, quem defende você chega com pouco material.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="p-10 rounded-xl bg-surface-dark border border-red-900/30 relative overflow-hidden group">
              <div className="absolute left-0 top-0 w-1 h-full bg-red-600"></div>
              <h3 className="text-red-400 font-bold font-mono mb-2 flex items-center gap-2">
                <ErrorIcon />
                "Você precisa aparecer mais."
              </h3>
              <p className="text-gray-400">
                É um feedback vazio: você ouve que precisa mudar, mas sai sem
                saber o quê. E acaba tentando compensar a falta de direção com
                mais entrega.
              </p>
            </div>
          </div>

          <div className="p-10 rounded-xl bg-surface-dark border border-primary/30 relative overflow-hidden group">
            <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>
            <h3 className="text-primary font-bold font-mono mb-2 flex items-center gap-2">
              <VerifiedIcon />
              Visibilidade não é falar mais
            </h3>
            <p className="text-gray-400">
              É tornar o seu trabalho e o impacto dele compreensíveis para quem
              participa das decisões sobre a sua carreira.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
