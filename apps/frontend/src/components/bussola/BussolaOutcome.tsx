import React from 'react';
import {
  PsychologyIcon,
  ArrowForwardIcon,
  WorkspacePremiumIcon,
} from '../icons';
import { BussolaProofCard } from './BussolaProofCard';

export const BussolaOutcome: React.FC = () => {
  return (
    <section className="px-6 py-10 lg:py-16 bg-surface-dark border-b border-border-dark">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative flex justify-center items-center w-full">
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <BussolaProofCard />
        </div>

        <div className="flex flex-col gap-8">
          <span className="inline-block self-center lg:self-start text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            O Que Muda Com a Bússola
          </span>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-lg bg-purple-900/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-900/30">
                <PsychologyIcon className="text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white font-mono mb-1">
                  Você define o seu próximo nível
                </h4>
                <p className="text-gray-400 font-light leading-relaxed">
                  O crescimento deixa de ser uma intenção vaga e passa a ter um
                  destino profissional concreto.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-12 rounded-lg bg-green-900/20 text-green-400 flex items-center justify-center shrink-0 border border-green-900/30">
                <ArrowForwardIcon className="text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white font-mono mb-1">
                  Você constrói uma jornada até ele
                </h4>
                <p className="text-gray-400 font-light leading-relaxed">
                  Fica claro o que esse destino exige, onde você está e o que
                  precisa priorizar.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-12 rounded-lg bg-orange-900/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-900/30">
                <WorkspacePremiumIcon className="text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white font-mono mb-1">
                  Você produz evidências de prontidão
                </h4>
                <p className="text-gray-400 font-light leading-relaxed">
                  Sua evolução passa a gerar elementos concretos que sustentam
                  seus próximos movimentos profissionais.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest text-center lg:text-left">
            Destino <span className="text-primary">→</span> Jornada{' '}
            <span className="text-primary">→</span> Evidências{' '}
            <span className="text-primary">→</span> Prontidão
          </p>
        </div>
      </div>
    </section>
  );
};
