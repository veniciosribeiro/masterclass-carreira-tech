import React from 'react';
import { PDFReportCard } from './PDFReportCard';
import { AutoAwesomeIcon, CheckCircleIcon } from './icons';

export const AptitudeReportHighlight: React.FC = () => {
  return (
    <section
      className="px-6 py-16 bg-background-dark border-t border-border-dark relative overflow-hidden"
      id="report"
    >
      {/* Background grid/glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-glow-purple/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Copy */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-3 py-1.5 rounded-full bg-primary/10 mb-6 shadow-[0_0_15px_rgba(25,230,94,0.15)]">
                <AutoAwesomeIcon className="text-sm" />
                Diferencial Exclusivo
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white font-mono leading-tight mb-4">
                O seu{' '}
                <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#10b981]">
                  Relatório de Aptidão Tech
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                Você sai sabendo exatamente onde se encaixa no mercado. Não é
                opinião — é baseado em{' '}
                <strong className="text-primary">dados.</strong> Seu perfil, sua
                afinidade, seus próximos passos.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                  <CheckCircleIcon className="text-sm" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-mono mb-1">
                    Perfil Dominante
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Descubra se você é Front-End, Back-End, Dados ou Full Stack
                    com % exata de afinidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                  <CheckCircleIcon className="text-sm" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-mono mb-1">
                    Gráfico de Afinidade
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Visualização clara e quantificada da sua compatibilidade com
                    cada área.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                  <CheckCircleIcon className="text-sm" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-mono mb-1">
                    Próximos Passos
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Recomendação direta da Stack específica para o seu perfil e
                    o que estudar primeiro.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0D1117] border border-[#30363D] rounded-xl shadow-lg inline-block w-full">
              <p className="text-gray-400 text-sm leading-relaxed">
                <strong className="text-white font-mono">
                  Único no mercado:
                </strong>{' '}
                Você sai com clareza não só SE tech é pra você, mas{' '}
                <span className="text-primary">QUAL ÁREA</span> faz mais sentido
                pro seu perfil.
              </p>
            </div>
          </div>

          {/* Right Side: PDF Report Card 3D */}
          <div className="flex justify-center items-center relative py-10 lg:py-0">
            {/* Decorative orbit ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/5 rounded-full pointer-events-none hidden md:block"></div>

            <PDFReportCard />
          </div>
        </div>
      </div>
    </section>
  );
};
