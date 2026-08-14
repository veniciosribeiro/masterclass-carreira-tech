import React from 'react';
import { WorkspacePremiumIcon } from '../icons';

export const SementeToolkit: React.FC = () => {
  return (
    <section className="px-6 py-10 bg-surface-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            Mais Casos Reais
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono">
            Mais 3 Desenvolvedores, o Mesmo Problema
          </h2>
          <p className="text-gray-400 mt-4 font-light">
            Três níveis diferentes. Todos há anos sem reconhecimento.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
            <div className="size-12 rounded bg-blue-900/20 border border-blue-900/50 text-blue-400 flex items-center justify-center mb-4 group-hover:text-blue-300">
              <WorkspacePremiumIcon />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white font-mono">
              Desenvolvedor Júnior
            </h3>
            <p className="text-sm text-gray-400">
              Buscava uma promoção, mas não entendia os critérios usados na
              decisão — e colocava a responsabilidade só na gestão. 3 anos sem
              nenhum reconhecimento.
            </p>
          </div>
          <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
            <div className="size-12 rounded bg-purple-900/20 border border-purple-900/50 text-purple-400 flex items-center justify-center mb-4 group-hover:text-purple-300">
              <WorkspacePremiumIcon />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white font-mono">
              Trabalho Invisível pros Pares
            </h3>
            <p className="text-sm text-gray-400">
              Entregava bem, mas o trabalho continuava invisível pros pares e
              pros outros gestores — como se nada daquilo existisse.
            </p>
          </div>
          <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
            <div className="size-12 rounded bg-green-900/20 border border-green-900/50 text-green-400 flex items-center justify-center mb-4 group-hover:text-green-300">
              <WorkspacePremiumIcon />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white font-mono">
              Pronto, mas Não Reconhecido pelos Outros
            </h3>
            <p className="text-sm text-gray-400">
              O próprio gestor já o via como alguém pronto para avançar. Os
              demais participantes da decisão, não.
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-sm italic text-center mt-8 max-w-2xl mx-auto">
          Três profissionais, três situações diferentes — mas a mesma sensação
          de estar preso no mesmo lugar.
        </p>
      </div>
    </section>
  );
};
