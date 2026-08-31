import React from 'react';
import { ErrorIcon, VerifiedIcon } from '../icons';

export const SementeRealityCheck: React.FC = () => {
  return (
    <section className="px-6 py-10 bg-[#0b0e11]" id="realidade">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">
            Entregar mais não produz clareza sobre sua prontidão para o próximo
            nível.
          </h2>
          <p className="text-gray-400 mt-4 font-light text-md">
            Trabalhar mais não resolve quando o problema não é performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="p-10 rounded-xl bg-surface-dark border border-red-900/30 relative overflow-hidden group">
              <div className="absolute left-0 top-0 w-1 h-full bg-red-600"></div>
              <h4 className="text-red-400 font-bold font-mono mb-2 flex items-center gap-2">
                <ErrorIcon />O Conselho Genérico
              </h4>
              <p className="text-gray-400">
                "Você precisa aparecer mais." Sem critérios, sem evidências
                esperadas, sem próximos passos. Você recebe uma cobrança — e tem
                que interpretar sozinho o que fazer com ela.
              </p>
            </div>

            <div className="p-10 rounded-xl bg-surface-dark border border-primary/30 relative overflow-hidden group">
              <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>
              <h4 className="text-primary font-bold font-mono mb-2 flex items-center gap-2">
                <VerifiedIcon />A Realidade no Webinário
              </h4>
              <p className="text-gray-400">
                Visibilidade não é falar mais alto, virar outra pessoa ou se
                transformar em influencer. É tornar seu trabalho e seu
                desenvolvimento compreensíveis para quem participa das decisões
                sobre sua carreira.
              </p>
            </div>
          </div>

          <div className="relative rounded-xl bg-[#161b22] border border-border-dark p-8 shadow-2xl">
            <h4 className="font-mono text-center text-gray-500 mb-6 text-sm">
              TRAJETÓRIA DE RECONHECIMENTO
            </h4>

            <div className="relative h-64 w-full border-l border-b border-gray-700">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 260"
                preserveAspectRatio="none"
              >
                <text
                  x="260"
                  y="10"
                  fill="#19e65e"
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  Direção + evidência
                </text>

                <path
                  d="M0,260 C40,250 80,230 120,180 C160,130 220,70 280,40 C320,20 350,40 370,20"
                  fill="none"
                  stroke="#19e65e"
                  strokeWidth="3"
                />

                <text
                  x="260"
                  y="250"
                  fill="#ef4444"
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  Esforço sem direção
                </text>

                <path
                  d="M0,260 C50,230 100,215 150,215 C200,215 250,235 370,225"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                />
              </svg>

              <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-500 rounded-full -ml-1 -mb-1"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-mono mt-4">
              <span>Reconhecimento percebido</span>
              <span>Tempo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
