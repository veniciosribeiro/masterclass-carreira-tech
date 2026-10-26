import React from 'react';
import { ShieldLockIcon } from '../icons';

const steps = [
  {
    label: '30 Dias',
    title: 'Decida depois de entrar',
    description:
      'Entre, conheça a metodologia e veja a experiência por dentro. Se decidir que não faz sentido para você, solicite o reembolso integral em até 30 dias depois da compra.',
  },
  {
    label: 'Até 2 Meses',
    title: 'Assista e monte seu plano',
    description:
      'Assista todas as aulas e envie seu plano de ação para revisão em até 2 meses depois da compra.',
  },
  {
    label: 'Até 8 Meses',
    title: 'Execute e ajuste',
    description:
      'Execute o plano e faça duas sessões individuais de diagnóstico: a primeira até o 5º mês e a segunda até o 8º.',
  },
  {
    label: '12 Meses',
    title: 'Promoção, aumento ou reembolso',
    description:
      'Participe ao vivo de pelo menos 6 encontros da mentoria e registre duas conversas de carreira com sua liderança. Se, cumprido tudo isso, você não conquistar promoção nem aumento salarial em 12 meses da compra (na rota externa, nem a contratação em outra empresa), devolvemos o valor integral pago.',
  },
];

export const BussolaGuarantee: React.FC = () => {
  return (
    <section className="py-10 lg:py-16 bg-surface-dark border-b border-border-dark">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center p-6 rounded-full bg-primary/5 border border-primary/20 mb-6 relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <ShieldLockIcon className="text-5xl text-primary relative z-10" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 font-mono">
          Garantia Dupla
        </h2>

        <div className="flex flex-col items-stretch">
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <div className="bg-background-dark border border-border-dark rounded-xl p-6 text-left">
                <span className="inline-block text-xs font-mono text-primary bg-primary/10 py-1 px-3 rounded border border-primary/20 uppercase mb-3">
                  {step.label}
                </span>
                <h3 className="text-lg font-bold text-white font-mono mb-2 uppercase">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="text-primary text-2xl font-mono py-2">↓</div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-10 p-6 bg-primary/5 border border-primary/30 rounded-xl">
          <p className="text-white font-bold leading-relaxed">
            A garantia de 12 meses protege quem executa o método do começo ao
            fim. Vale promoção formalizada ou aumento individual, inclusive em
            outra empresa. Reajuste coletivo, como o dissídio, não conta. Se
            você escolher a rota externa, seu objetivo passa a ser mudar de
            empresa, e a contratação em outra empresa já é o resultado, qualquer
            que seja o salário.
          </p>
        </div>
      </div>
    </section>
  );
};
