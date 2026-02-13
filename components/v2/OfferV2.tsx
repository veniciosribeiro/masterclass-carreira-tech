import React from 'react';
import { CloseIcon, CheckCircleIcon } from '../icons';

export const OfferV2: React.FC = () => {
  return (
    <section className="bg-surface-dark py-20 px-6 border-b border-border-dark" id="pricing">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 font-mono">
                        A OFERTA IRRECUSÁVEL
          </h2>
          <p className="text-gray-400 text-lg">
                        QUANTO CUSTA A SUA DÚVIDA?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Old Way */}
          <div className="bg-background-dark border border-red-500/30 p-8 rounded-2xl relative opacity-80 hover:opacity-100 transition-opacity">
            <h3 className="text-xl font-bold text-red-400 mb-6 font-mono border-b border-red-500/30 pb-4">
                            O JEITO ANTIGO <span className="text-sm block text-gray-500 font-normal mt-1">(RISCO ALTO)</span>
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CloseIcon className="text-red-500 mt-1" />
                <div>
                  <strong className="text-white block">Faculdade errada</strong>
                  <span className="text-gray-400">R$ 40.000 + 4 Anos perdidos</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CloseIcon className="text-red-500 mt-1" />
                <div>
                  <strong className="text-white block">Bootcamp caro</strong>
                  <span className="text-gray-400">R$ 3.000 + 6 Meses sem garantia</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CloseIcon className="text-red-500 mt-1" />
                <div>
                  <strong className="text-white block">Ansiedade Eterna</strong>
                  <span className="text-gray-400">Preço incalculável da dúvida</span>
                </div>
              </li>
            </ul>
          </div>

          {/* New Way */}
          <div className="bg-background-dark border border-primary p-8 rounded-2xl relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(25,230,94,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-[#0D1117] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                            Recomendado
            </div>
            <h3 className="text-xl font-bold text-primary mb-6 font-mono border-b border-primary/30 pb-4">
                            O JEITO NOVO <span className="text-sm block text-gray-300 font-normal mt-1">(SEGURANÇA)</span>
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CheckCircleIcon className="text-primary mt-1" />
                <div>
                  <strong className="text-white block">Masterclass Test-Drive</strong>
                  <span className="text-gray-400">1 Noite de Imersão</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircleIcon className="text-primary mt-1" />
                <div>
                  <strong className="text-white block">Investimento Único</strong>
                  <span className="text-gray-400 text-2xl text-white font-bold">R$ 97,00</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircleIcon className="text-primary mt-1" />
                <div>
                  <strong className="text-white block">Clareza Absoluta</strong>
                  <span className="text-gray-400">Resultado Imediato</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
