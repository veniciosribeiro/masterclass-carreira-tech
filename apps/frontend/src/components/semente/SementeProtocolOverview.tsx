import React from 'react';
import {
  VisibilityIcon,
  PsychologyIcon,
  ArrowForwardIcon,
  RefreshIcon,
} from '../icons';

const DISCOVERY_CARDS = [
  {
    icon: VisibilityIcon,
    iconClass: 'bg-blue-900/20 text-blue-400 border-blue-900/30',
    titleClass: 'text-blue-400',
    title: 'Entrega sem evidência',
    description:
      'O que você faz pode não deixar claro que está pronto para assumir o próximo nível.',
  },
  {
    icon: PsychologyIcon,
    iconClass: 'bg-purple-900/20 text-purple-400 border-purple-900/30',
    titleClass: 'text-purple-400',
    title: 'Feedback sem direção',
    description:
      '"Continue assim" e "apareça mais" não esclarecem o que precisa mudar.',
  },
  {
    icon: ArrowForwardIcon,
    iconClass: 'bg-amber-900/20 text-amber-400 border-amber-900/30',
    titleClass: 'text-amber-400',
    title: 'Crescimento sem destino',
    description:
      'Sem um destino declarado, qualquer curso, projeto ou mudança pode parecer progresso.',
  },
  {
    icon: RefreshIcon,
    iconClass: 'bg-primary/10 text-primary border-primary/30',
    titleClass: 'text-primary',
    title: 'Desenvolvimento disperso',
    description:
      'Tentar desenvolver tudo simultaneamente divide energia e dificulta a construção das capacidades mais importantes.',
  },
];

export const SementeProtocolOverview: React.FC = () => {
  return (
    <section
      className="bg-surface-dark py-10 px-6 overflow-hidden relative"
      id="descobertas"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white font-mono leading-tight">
            Quatro padrões que podem manter um bom desenvolvedor no mesmo lugar.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {DISCOVERY_CARDS.map(
            ({ icon: Icon, iconClass, titleClass, title, description }) => (
              <div
                key={title}
                className="p-8 bg-surface-dark border border-border-dark rounded-2xl shadow-lg hover:border-primary/30 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`size-12 rounded-lg flex items-center justify-center shrink-0 border ${iconClass}`}
                  >
                    <Icon className="text-2xl" />
                  </div>
                  <h4 className={`font-bold text-xl font-mono ${titleClass}`}>
                    {title}
                  </h4>
                </div>
                <p className="text-gray-400 font-light leading-relaxed">
                  {description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
