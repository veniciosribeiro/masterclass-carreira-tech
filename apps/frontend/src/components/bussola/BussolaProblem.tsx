import React from 'react';
import { PsychologyIcon, RefreshIcon, VisibilityIcon } from '../icons';

const boxes = [
  {
    title: 'Sem Destino',
    description:
      'Qualquer curso parece importante. Qualquer feedback parece urgente. Qualquer oportunidade parece um caminho.',
    icon: PsychologyIcon,
  },
  {
    title: 'Sem Jornada',
    description:
      'Você melhora várias coisas ao mesmo tempo, mas não sabe quais realmente reduzem a distância até o próximo nível.',
    icon: RefreshIcon,
  },
  {
    title: 'Sem Evidência',
    description:
      'Mesmo quando evolui, fica difícil demonstrar de forma concreta que já consegue sustentar mais responsabilidade.',
    icon: VisibilityIcon,
  },
];

export const BussolaProblem: React.FC = () => {
  return (
    <section className="px-6 py-10 lg:py-16 bg-[#0b0e11]" id="diagnostico">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
          <span className="inline-block self-center text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            Diagnóstico
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-mono leading-tight">
            Você pode trabalhar muito e ainda não estar construindo o seu
            próximo nível.
          </h2>
          <p className="text-gray-400 font-light text-md leading-relaxed">
            Trabalhar mais aumenta sua velocidade. Mas, sem um destino
            profissional claro, você não sabe se esse esforço está aproximando
            você da carreira que quer construir.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {boxes.map((box) => {
            const Icon = box.icon;
            return (
              <div
                key={box.title}
                className="bg-surface-dark p-6 rounded-xl shadow-sm border border-red-900/30 hover:border-red-900/50 transition-all duration-300 group"
              >
                <div className="size-12 rounded bg-red-900/20 border border-red-900/50 text-red-400 flex items-center justify-center mb-4">
                  <Icon />
                </div>
                <h3 className="font-bold text-lg mb-2 text-red-400 font-mono uppercase tracking-wide">
                  {box.title}
                </h3>
                <p className="text-sm text-gray-400">{box.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center bg-surface-dark border border-primary/30 rounded-xl p-8 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-bold text-white font-mono leading-snug">
            O problema não é necessariamente trabalhar pouco.{' '}
            <span className="text-primary">
              É trabalhar sem uma jornada que organize o seu avanço.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
