import React from 'react';
import {
  VisibilityIcon,
  PsychologyIcon,
  ArrowForwardIcon,
  RefreshIcon,
} from '../icons';

// Cenas do dia a dia, não conceitos: cada uma corresponde a um dos quatro
// erros do Bloco 5 do Roteiro do Webinário, na língua de quem os vive.
const DISCOVERY_CARDS = [
  {
    icon: VisibilityIcon,
    iconClass: 'bg-blue-900/20 text-blue-400 border-blue-900/30',
    text: 'Você entrega muito, mas ninguém na sala da decisão sabe o que você fez.',
  },
  {
    icon: PsychologyIcon,
    iconClass: 'bg-purple-900/20 text-purple-400 border-purple-900/30',
    text: 'Te dizem "continue assim" ou "apareça mais", e você não sabe o que mudar.',
  },
  {
    icon: ArrowForwardIcon,
    iconClass: 'bg-amber-900/20 text-amber-400 border-amber-900/30',
    text: 'Você faz curso atrás de curso sem saber para onde está indo.',
  },
  {
    icon: RefreshIcon,
    iconClass: 'bg-primary/10 text-primary border-primary/30',
    text: 'Você tenta melhorar em tudo ao mesmo tempo e não avança em nada.',
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
          <h2 className="text-3xl md:text-4xl font-black leading-tight font-mono text-white">
            Se você se reconhece em alguma dessas, o problema não é capacidade.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {DISCOVERY_CARDS.map(({ icon: Icon, iconClass, text }) => (
            <div
              key={text}
              className="p-8 bg-surface-dark border border-border-dark rounded-2xl shadow-lg hover:border-primary/30 transition-all duration-500 flex items-center gap-4"
            >
              <div
                className={`size-12 rounded-lg flex items-center justify-center shrink-0 border ${iconClass}`}
              >
                <Icon className="text-2xl" />
              </div>
              <p className="text-white font-bold text-lg font-mono leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
