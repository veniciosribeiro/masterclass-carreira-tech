import React from 'react';
import {
  PlayArrowIcon,
  QuizIcon,
  VerifiedUserIcon,
  DnsIcon,
  TimerIcon,
  ShieldLockIcon,
  RefreshIcon,
} from '../icons';

const entregaveis = [
  {
    title: 'Curso completo ao vivo',
    description: '5 módulos, 14 aulas e 5 checkpoints ao longo de 5 semanas.',
    icon: PlayArrowIcon,
    color: 'blue',
  },
  {
    title: 'Kits, exercícios e templates',
    description:
      'Instrumentos práticos para transformar cada etapa do método em decisão e execução.',
    icon: QuizIcon,
    color: 'purple',
  },
  {
    title: 'Duas revisões escritas do seu plano',
    description:
      'Seu plano completo passa por análise e recebe orientação para ajustes.',
    icon: VerifiedUserIcon,
    color: 'green',
  },
  {
    title: 'Suporte por e-mail',
    description:
      'Canal assíncrono para remover dúvidas que poderiam travar sua execução.',
    icon: DnsIcon,
    color: 'orange',
  },
  {
    title: 'Aulão coletivo quinzenal',
    description:
      'Dúvidas, estudos de caso e aplicação do método em diferentes contextos.',
    icon: TimerIcon,
    color: 'blue',
  },
  {
    title: 'Grupo privado por 6 meses',
    description:
      'Espaço para continuidade, troca e acompanhamento depois das cinco semanas.',
    icon: ShieldLockIcon,
    color: 'purple',
  },
  {
    title: 'Kit de acompanhamento pós-curso',
    description:
      'Recursos para continuar registrando movimentos, respostas e evidências depois da conclusão.',
    icon: RefreshIcon,
    color: 'green',
  },
] as const;

const colorClasses = {
  blue: 'bg-blue-900/20 border-blue-900/50 text-blue-400 group-hover:text-blue-300',
  purple:
    'bg-purple-900/20 border-purple-900/50 text-purple-400 group-hover:text-purple-300',
  green:
    'bg-green-900/20 border-green-900/50 text-green-400 group-hover:text-green-300',
  orange:
    'bg-orange-900/20 border-orange-900/50 text-orange-400 group-hover:text-orange-300',
} as const;

export const BussolaEntregaveis: React.FC = () => {
  return (
    <section
      className="px-6 py-10 lg:py-16 bg-[#0d1117] border-b border-border-dark"
      id="entregaveis"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            Entregáveis
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono">
            O Que Você Leva Para Executar a Jornada
          </h2>
          <p className="text-gray-400 mt-4 font-light">
            Você não termina a Bússola apenas sabendo mais sobre carreira. Você
            termina com estruturas para continuar executando.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entregaveis.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group"
              >
                <div
                  className={`size-12 rounded border flex items-center justify-center mb-4 ${colorClasses[item.color]}`}
                >
                  <Icon />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white font-mono">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
