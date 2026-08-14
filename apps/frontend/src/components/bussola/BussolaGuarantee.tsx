import React from 'react';
import { ShieldLockIcon } from '../icons';

const steps = [
  {
    label: '7 Dias',
    title: 'Decida depois de entrar',
    description:
      'Entre, conheça a metodologia e veja a experiência por dentro. Se decidir que não faz sentido para você, solicite o reembolso integral dentro dos primeiros 7 dias.',
  },
  {
    label: '90 Dias',
    title: 'Execute a jornada',
    description:
      'Conclua as aulas e exercícios, execute seu plano e realize os movimentos profissionais previstos. Se cumprir as condições e não atingir os marcos definidos, você recebe uma intervenção corretiva individual.',
  },
  {
    label: '+90 Dias',
    title: 'Execute a rota corrigida',
    description:
      'Aplique os ajustes, realize novos movimentos e registre as respostas. Cumpridas as condições da garantia sem atingir os critérios previstos, você pode solicitar o reembolso integral do valor pago.',
  },
];

export const BussolaGuarantee: React.FC = () => {
  return (
    <section className="py-10 lg:py-16 bg-surface-dark border-b border-border-dark">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center p-6 rounded-full bg-[#19e65e]/5 border border-[#19e65e]/20 mb-6 relative">
          <div className="absolute inset-0 bg-[#19e65e]/20 blur-xl rounded-full"></div>
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
          <p className="text-gray-300 leading-relaxed">
            A garantia 90+90 não promete promoção ou aumento.
          </p>
          <p className="text-white font-bold leading-relaxed mt-1">
            Ela protege quem executa o método, cumpre as condições e ainda assim
            não alcança os marcos definidos.
          </p>
        </div>
      </div>
    </section>
  );
};
