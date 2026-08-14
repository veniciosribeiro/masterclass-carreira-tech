import React from 'react';
import {
  WorkIcon,
  VisibilityIcon,
  ArrowForwardIcon,
  WorkspacePremiumIcon,
} from '../icons';

export const BussolaProvas: React.FC = () => {
  return (
    <section className="px-6 py-10 bg-surface-dark" id="provas">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            Provas Reais
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono">
            O método nasceu de problemas reais de carreira.
          </h2>
          <p className="text-gray-400 mt-4 font-light">
            Casos anonimizados e autorizados de desenvolvedores acompanhados em
            mentoria individual.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
            <div className="size-12 rounded bg-blue-900/20 border border-blue-900/50 text-blue-400 flex items-center justify-center mb-4 group-hover:text-blue-300">
              <WorkIcon />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white font-mono">
              Desenvolvedor Júnior
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Entregava muito, mas colocava toda a responsabilidade do avanço na
              gestão e não entendia os critérios por trás das decisões.
            </p>
            <span className="inline-block text-xs font-mono text-primary bg-primary/10 py-1 px-3 rounded border border-primary/20 uppercase">
              Aumento + promoção
            </span>
          </div>
          <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
            <div className="size-12 rounded bg-purple-900/20 border border-purple-900/50 text-purple-400 flex items-center justify-center mb-4 group-hover:text-purple-300">
              <VisibilityIcon />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white font-mono">
              Invisível para Quem Decidia
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Fazia boas entregas, mas seu impacto não era percebido pelos pares
              e por outras lideranças envolvidas na decisão.
            </p>
            <span className="inline-block text-xs font-mono text-primary bg-primary/10 py-1 px-3 rounded border border-primary/20 uppercase">
              Aumento + promoção
            </span>
          </div>
          <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
            <div className="size-12 rounded bg-green-900/20 border border-green-900/50 text-green-400 flex items-center justify-center mb-4 group-hover:text-green-300">
              <ArrowForwardIcon />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white font-mono">
              Estagiário
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Não tinha direção clara sobre o que precisava construir para
              sustentar sua efetivação.
            </p>
            <span className="inline-block text-xs font-mono text-primary bg-primary/10 py-1 px-3 rounded border border-primary/20 uppercase">
              Efetivado em 1 ano
            </span>
          </div>
          <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
            <div className="size-12 rounded bg-orange-900/20 border border-orange-900/50 text-orange-400 flex items-center justify-center mb-4 group-hover:text-orange-300">
              <WorkspacePremiumIcon />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white font-mono">
              Pleno Rumo a Sênior
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              O gestor direto já o via como pronto, mas ainda faltavam
              evidências capazes de sustentar a decisão diante dos demais
              envolvidos.
            </p>
            <span className="inline-block text-xs font-mono text-primary bg-primary/10 py-1 px-3 rounded border border-primary/20 uppercase">
              Promovido a Sênior em 1 ano
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
