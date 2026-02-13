import React from 'react';
import { CancelIcon, CheckCircleIcon, ArrowForwardIcon } from './icons';

export const Pricing: React.FC = () => {
  return (
    <section
      className="px-6 py-10 bg-[#050709] border-t border-border-dark"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-4 font-mono">
            A Matemática da sua Decisão
          </h2>
          <p className="text-gray-400 text-md">
            Saber que a tecnologia NÃO é para você vale tanto quanto saber que
            É. Ambas as respostas te libertam. A única ação que sai cara é
            continuar na dúvida.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Left Side: Traditional */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-dark bg-[#0d1117]/50">
              <h3 className="text-gray-500 text-red-500 font-mono font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                <CancelIcon className="text-red-500" />O Caminho Da Incerteza
              </h3>

              <ul className="space-y-6">
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Faculdade errada
                  </span>
                  <span className="font-mono text-red-400 font-bold">
                    R$500/mês + 3 Anos
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Bootcamp Genérico
                  </span>
                  <span className="font-mono text-red-400 font-bold">
                    R$2.000
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Curso do Influencer
                  </span>
                  <span className="font-mono text-red-400 font-bold">
                    R$300
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Overdose de Informação
                  </span>
                  <span className="font-mono text-red-400 font-bold">
                    Paralisia
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Tentativa e Erro
                  </span>
                  <span className="font-mono text-red-400 font-bold">
                    Sozinho e Perdido
                  </span>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-dashed border-border-dark flex justify-between items-center">
                <span className="text-sm font-mono text-gray-500 uppercase">
                  Custo do Erro
                </span>
                <span className="text-2xl font-black text-red-500 font-mono">
                  Incalculável
                </span>
              </div>
            </div>

            {/* Right Side: Test Drive */}
            <div className="p-8 md:p-12 bg-[#161b22] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>

              <h3 className="text-primary font-mono font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                <CheckCircleIcon />O Caminho da Clareza
              </h3>

              <ul className="space-y-6 relative z-10">
                <li className="flex justify-between items-center">
                  <span className="text-white">Check-up de Perfil</span>
                  <span className="font-mono text-primary font-bold">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white">Testes de aptidão</span>
                  <span className="font-mono text-primary font-bold">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white">Checklist de viabilidade</span>
                  <span className="font-mono text-primary font-bold">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white">Visão prática de mercado</span>
                  <span className="font-mono text-primary font-bold">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white">Duração</span>
                  <span className="font-mono text-primary font-bold">
                    1 Noite Imersiva
                  </span>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-dashed border-border-dark flex justify-between items-center relative z-10">
                <span className="text-sm font-mono text-gray-400 uppercase">
                  Custo da Segurança
                </span>
                <span className="text-3xl font-black text-white font-mono">
                  R$97,00
                </span>
              </div>

              <button className="w-full mt-8 h-14 rounded bg-primary hover:bg-green-400 text-[#0D1117] font-bold shadow-[0_0_15px_rgba(25,230,94,0.3)] transition-all font-mono uppercase text-lg tracking-wide flex items-center justify-center gap-2">
                <span>GARANTIR MEU DIAGNÓSTICO</span>
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
