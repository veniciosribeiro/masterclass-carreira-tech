import React from 'react';
import {
  PsychologyIcon,
  VisibilityIcon,
  ArrowForwardIcon,
  RefreshIcon,
  WorkspacePremiumIcon,
} from '../icons';

const colorClasses = {
  purple: 'bg-purple-900/20 text-purple-400 border-purple-900/30',
  blue: 'bg-blue-900/20 text-blue-400 border-blue-900/30',
  green: 'bg-green-900/20 text-green-400 border-green-900/30',
  primary: 'bg-primary/10 text-primary border-primary/30',
  orange: 'bg-orange-900/20 text-orange-400 border-orange-900/30',
} as const;

export const BussolaModules: React.FC = () => {
  const modules = [
    {
      number: '01',
      title: 'Norte',
      outcome: 'Defina para onde sua carreira está indo.',
      description:
        'Transforme desejos como promoção, reconhecimento ou remuneração em um destino profissional capaz de orientar suas decisões.',
      icon: PsychologyIcon,
      color: 'purple' as const,
    },
    {
      number: '02',
      title: 'Raio-X Profissional',
      outcome: 'Entenda de onde você está partindo.',
      description:
        'Organize competências, entregas, forças, dificuldades e feedbacks para construir uma leitura real da sua situação atual.',
      icon: VisibilityIcon,
      color: 'blue' as const,
    },
    {
      number: '03',
      title: 'Régua do Destino e Distância',
      outcome: 'Descubra o que existe entre você e o destino.',
      description:
        'Compare sua condição atual com o que o próximo nível exige e torne visível a distância que precisa percorrer.',
      icon: ArrowForwardIcon,
      color: 'green' as const,
    },
    {
      number: '04',
      title: 'Gargalos 20/80',
      outcome: 'Decida o que merece sua energia primeiro.',
      description:
        'Priorize os poucos gargalos que mais limitam seu avanço em vez de tentar desenvolver tudo ao mesmo tempo.',
      icon: RefreshIcon,
      color: 'primary' as const,
    },
    {
      number: '05',
      title: 'Ação e Evidência',
      outcome: 'Transforme desenvolvimento em prontidão perceptível.',
      description:
        'Execute sua jornada, organize evidências e prepare movimentos profissionais coerentes com o destino escolhido.',
      icon: WorkspacePremiumIcon,
      color: 'orange' as const,
    },
  ];

  return (
    <section
      className="px-6 py-16 bg-[#0d1117] border-b border-border-dark"
      id="jornada"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            A Jornada Bússola
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono">
            Do destino ao próximo movimento profissional, em 5 etapas.
          </h2>
          <p className="text-gray-400 mt-4 font-light">
            Você não recebe uma lista genérica do que precisa melhorar. Cada
            etapa usa o que foi construído na anterior para definir o próximo
            passo.
          </p>
        </div>
        <div className="space-y-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.number}
                className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl font-black text-primary font-mono">
                    {module.number}
                  </div>
                  <div
                    className={`size-12 rounded-lg flex items-center justify-center shrink-0 border ${colorClasses[module.color]}`}
                  >
                    <Icon className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-primary font-mono uppercase tracking-widest mb-1">
                      {module.title}
                    </h3>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {module.outcome}
                    </h4>
                    <p className="text-gray-400">{module.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-500 font-mono mt-10 tracking-wide">
          5 semanas <span className="text-primary">•</span> 14 aulas{' '}
          <span className="text-primary">•</span> 5 checkpoints{' '}
          <span className="text-primary">•</span> Ao vivo
        </p>
      </div>
    </section>
  );
};
