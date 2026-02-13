import React from 'react';

const ChartBar = ({ width, color, label, value, delay }: { width: string; color: string; label: string; value: string; delay: string }) => (
  <div className="mb-4">
    <div className="flex justify-between text-[10px] text-gray-400 font-sans mb-1 uppercase tracking-wide">
      <span>{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
    <div className="h-1.5 rounded-sm w-full bg-[#161B22] overflow-hidden">
      <div
        className={`h-full rounded-sm ${color} animate-fill-width`}
        style={{ width, animationDelay: delay }}
      />
    </div>
  </div>
);

export const ResultsShowcase: React.FC = () => {
  return (
    <section className="px-6 py-10 bg-surface-dark border-b border-border-dark" id="results">
      <div className="max-w-7xl mx-auto">
        {/* Standard Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
                        O Resultado
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono leading-tight">
                        Não é só um quiz. É um <span className="text-primary">Diagnóstico Profissional</span>.
          </h2>
          <p className="text-gray-400 mt-4 font-light text-md max-w-2xl mx-auto">
                        Ao final do teste, você recebe um arquivo PDF de 3 páginas, gerado instantaneamente com base nas suas respostas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Feature List */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="bg-[#0D1117] p-8 rounded-xl border border-border-dark relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
              <h3 className="text-xl font-bold text-white font-mono mb-4">O que você recebe:</h3>
              <ul className="space-y-4 font-mono text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <span className="text-primary bg-primary/10 p-1 rounded">✓</span> Análise Profunda de Perfil
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary bg-primary/10 p-1 rounded">✓</span> Gráficos de Afinidade Técnica
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary bg-primary/10 p-1 rounded">✓</span> Explicações Detalhadas (Nível Sênior)
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary bg-primary/10 p-1 rounded">✓</span> Plano de Ação Recomendado
                </li>
              </ul>
            </div>

            <div className="bg-[#0D1117] p-6 rounded-xl border border-border-dark flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold font-mono text-sm">Download Instantâneo</h4>
                <p className="text-xs text-gray-500">Formato PDF A4 pronto para imprimir</p>
              </div>
            </div>
          </div>

          {/* Right: PDF 3D Mockup */}
          <div className="relative perspective-1000 group order-1 lg:order-2 justify-center py-0">
            {/* ... 3D Card Content (Keep existing logic) ... */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50" />

            <div className="relative bg-[#0D1117] border border-[#30363D] shadow-2xl rounded-sm transform transition-transform duration-700 hover:scale-[1.02] md:rotate-y-[-12deg] md:rotate-x-[5deg] hover:rotate-0 p-5 flex flex-col justify-between overflow-hidden">

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

              {/* PDF Header Section */}
              <div className="mt-6 text-center space-y-3">
                <div className="text-[8px] text-primary tracking-[0.2em] font-sans">PROTOCOLO DE APTIDÃO</div>

                <div>
                  <h3 className="text-2xl font-bold text-white leading-none font-sans">Relatório de</h3>
                  <h3 className="text-2xl font-bold text-white leading-none font-sans">Aptidão Tech</h3>
                </div>

                <div className="w-2/3 mx-auto h-px bg-[#30363D] my-3" />

                <div className="space-y-1">
                  <div className="text-xs text-gray-300 font-sans">Venicios Ribeiro</div>
                  <div className="text-[8px] text-gray-500 font-sans">usuario@email.com</div>
                </div>
              </div>

              {/* Profile Box */}
              <div className="mt-6 bg-[#161B22] border border-primary/50 rounded p-4 text-center relative">
                <div className="text-[8px] text-primary uppercase tracking-wider mb-1 font-sans font-bold">Seu Perfil Dominante</div>
                <div className="text-lg font-bold text-white font-sans">Especialista em Dados & IA</div>
              </div>

              {/* Fake Charts */}
              <div className="mt-6 space-y-1 opacity-80">
                <div className="text-[8px] text-primary font-bold uppercase mb-2 font-sans">Afinidade por Área</div>
                <ChartBar label="Front-End" value="92%" width="92%" color="bg-primary" delay="0ms" />
                <ChartBar label="Back-End" value="45%" width="45%" color="bg-[#3b82f6]" delay="200ms" />
                <ChartBar label="Dados & IA" value="30%" width="30%" color="bg-[#7c3aed]" delay="400ms" />
              </div>

              {/* Footer */}
              <div className="mt-auto pt-3 border-t border-[#30363D]">
                <div className="text-sm text-center text-gray-500 font-sans">
                                    Masterclass Test-Drive Da Carreira Tech — Documento Oficial
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
                .perspective-1000 { perspective: 1000px; }
                .rotate-y-[-12deg] { transform: rotateY(-12deg); }
                .rotate-x-[5deg] { transform: rotateX(5deg); }
                @keyframes fill-width {
                    from { width: 0; }
                    to { width: 100%; }
                }
                .animate-fill-width {
                    animation: fill-width 1.5s ease-out forwards;
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s infinite ease-in-out;
                }
            `}</style>
    </section>
  );
};
