import React from 'react';
import {
  CheckCircleIcon,
  WorkspacePremiumIcon,
  ArrowForwardIcon,
} from '../icons';
import { STARTER_CHECKOUT_URL, PREMIUM_CHECKOUT_URL } from './bussolaConfig';
import { trackEvent } from '../../utils/metaPixel';

export const BussolaPricing: React.FC = () => {
  return (
    <section
      className="px-6 py-10 bg-[#050709] border-t border-border-dark"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            Turma Inaugural
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-6 mb-4 font-mono">
            Escolha sua forma de fazer a jornada.
          </h2>
          <p className="text-gray-400 text-md">
            Os dois planos incluem o Método Bússola completo. A diferença está
            no nível de acompanhamento individual.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Starter */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-dark bg-[#0d1117]/50">
              <h3 className="text-gray-300 font-mono font-bold uppercase tracking-widest text-sm mb-3 flex items-center gap-2">
                <CheckCircleIcon className="text-primary" />
                Starter
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Para quem quer executar o método com suporte coletivo e revisões
                do plano.
              </p>

              <ul className="space-y-4">
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Curso completo
                  </span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Kits, exercícios e templates
                  </span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Kit de acompanhamento pós-curso
                  </span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Suporte por e-mail
                  </span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Aulões coletivos quinzenais
                  </span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    2 revisões escritas do plano
                  </span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Grupo privado por 6 meses
                  </span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Garantia de 7 dias + garantia condicional 90+90
                  </span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-dashed border-border-dark flex justify-between items-center">
                <span className="text-sm font-mono text-gray-500 uppercase">
                  Investimento
                </span>
                <div className="text-right">
                  <span className="text-2xl font-black text-white font-mono">
                    R$597
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    ou até 12x no cartão (juros da operadora)
                  </p>
                </div>
              </div>

              <a
                href={STARTER_CHECKOUT_URL}
                onClick={() =>
                  trackEvent('InitiateCheckout', {
                    content_name: 'Starter',
                    value: 597,
                    currency: 'BRL',
                  })
                }
                className="w-full mt-8 h-14 rounded bg-primary hover:bg-green-400 text-[#0D1117] font-bold transition-all font-mono uppercase text-lg tracking-wide flex items-center justify-center gap-2"
              >
                <span>Quero o Starter</span>
                <ArrowForwardIcon />
              </a>
            </div>

            {/* Premium */}
            <div className="p-8 md:p-12 bg-[#161b22] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>
              <div className="absolute top-6 right-6 bg-primary text-[#0D1117] px-3 py-1 rounded-full text-xs font-bold font-mono uppercase">
                Mais Popular
              </div>

              <h3 className="text-primary font-mono font-bold uppercase tracking-widest text-sm mb-3 flex items-center gap-2 relative z-10">
                <WorkspacePremiumIcon />
                Premium
              </h3>
              <p className="text-gray-400 text-sm mb-6 relative z-10">
                Para quem quer tudo do Starter + acompanhamento individual.
              </p>

              <ul className="space-y-4 relative z-10">
                <li className="flex justify-between items-center">
                  <span className="text-white">Tudo do Starter</span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white">
                    1 sessão individual de 90 min comigo
                  </span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white">Revisão de CV</span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white">Orientação de LinkedIn</span>
                  <span className="font-mono text-primary font-bold whitespace-nowrap ml-4">
                    Incluso
                  </span>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-dashed border-border-dark flex justify-between items-center relative z-10">
                <span className="text-sm font-mono text-gray-400 uppercase">
                  Investimento
                </span>
                <div className="text-right">
                  <span className="text-3xl font-black text-white font-mono">
                    R$997
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    ou até 12x no cartão (juros da operadora)
                  </p>
                </div>
              </div>

              <a
                href={PREMIUM_CHECKOUT_URL}
                onClick={() =>
                  trackEvent('InitiateCheckout', {
                    content_name: 'Premium',
                    value: 997,
                    currency: 'BRL',
                  })
                }
                className="w-full mt-8 h-14 rounded bg-primary hover:bg-green-400 text-[#0D1117] font-bold shadow-[0_0_15px_rgba(25,230,94,0.3)] transition-all font-mono uppercase text-lg tracking-wide flex items-center justify-center gap-2 relative z-10"
              >
                <span>Quero o Premium</span>
                <ArrowForwardIcon />
              </a>
              <p className="text-xs text-gray-500 mt-4 text-center relative z-10">
                Apenas 10 vagas na turma inaugural
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
