import React from 'react';
import {
  SentimentWorriedIcon,
  VisibilityIcon,
  PsychologyIcon,
  ArrowForwardIcon,
  RefreshIcon,
} from '../icons';

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
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            O Que Você Vai Ver ao Vivo
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono leading-tight">
            Para cada travamento da sua carreira,{' '}
            <span className="text-primary">um diagnóstico claro.</span>
          </h2>
          <p className="text-gray-400 mt-6 font-light text-md">
            O Webinário existe para explicar a raiz de exatamente estes quatro
            pontos.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Bloco 1 — Erro 1: entrega vs. evidência */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <SentimentWorriedIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">
                    "Entrego bem, mas nada muda no reconhecimento"
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Você acredita que a entrega fala por si mesma. Mas continua
                    no mesmo lugar.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-blue-900/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-900/30">
                  <VisibilityIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">
                      Por Que Entregar Não Vira Evidência
                    </h4>
                    <div className="text-[10px] font-mono text-blue-400 bg-blue-900/10 py-0.5 px-2 rounded border border-blue-900/20 uppercase">
                      Ao Vivo
                    </div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    A diferença entre o que você faz e o que fica visível,
                    compreensível e utilizável por quem decide sobre a sua
                    carreira.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 2 — Erro 2: gestor "continue assim" */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <SentimentWorriedIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">
                    "Você está indo bem, continue assim"
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Você volta pro trabalho sem saber o que precisa mudar — e
                    tenta compensar com mais entrega.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-purple-900/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-900/30">
                  <PsychologyIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">
                      A Armadilha do Feedback Genérico
                    </h4>
                    <div className="text-[10px] font-mono text-purple-400 bg-purple-900/10 py-0.5 px-2 rounded border border-purple-900/20 uppercase">
                      Ao Vivo
                    </div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Por que "continue assim" não é uma direção — e por que essa
                    tradução não pode depender só do seu gestor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 3 — Erro 3: destino difuso */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <SentimentWorriedIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">
                    "Eu só quero crescer e me desenvolver"
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Sem um destino claro, qualquer curso, projeto ou mudança
                    parece uma saída possível.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-green-900/20 text-green-400 flex items-center justify-center shrink-0 border border-green-900/30">
                  <ArrowForwardIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">
                      Por Que "Quero Crescer" Não É um Destino
                    </h4>
                    <div className="text-[10px] font-mono text-green-400 bg-green-900/10 py-0.5 px-2 rounded border border-green-900/20 uppercase">
                      Ao Vivo
                    </div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Por que "crescer" é uma direção vaga — e por que, sem um
                    destino declarado, qualquer movimento parece progresso.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 4 — Erro 4: tentar desenvolver tudo */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <SentimentWorriedIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">
                    "Preciso melhorar em tudo ao mesmo tempo"
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Técnico, comunicação, liderança, inglês — você abre várias
                    frentes e a energia se divide.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                  <RefreshIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">
                      Por Que Tentar Tudo Trava Você
                    </h4>
                    <div className="text-[10px] font-mono text-primary bg-primary/10 py-0.5 px-2 rounded border border-primary/20 uppercase">
                      Ao Vivo
                    </div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Por que tentar desenvolver tudo ao mesmo tempo divide sua
                    energia — e por que priorizar não é abandonar o resto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
