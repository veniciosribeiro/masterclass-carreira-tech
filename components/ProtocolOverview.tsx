import React from 'react';
import { PsychologyAltIcon, SentimentWorriedIcon, LaptopIcon, PsychologyIcon, SettingsSystemDaydreamIcon, TimerIcon, ArrowForwardIcon } from './icons';

export const ProtocolOverview: React.FC = () => {
  return (
    <section className="bg-background-dark py-10 px-6 overflow-hidden relative" id="overview">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
                        O Protocolo de Desbloqueio
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono leading-tight">
                        Para cada trava mental, <span className="text-primary">uma chave de acesso.</span>
          </h2>
          <p className="text-gray-400 mt-6 font-light text-md">
                        Você precisa de um método que elimine as suas dúvidas.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Block 1: Logic / Intelligence */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            {/* Left: The Fear (LucasProfile style) */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500 font-mono text-6xl font-black select-none pointer-events-none">ERROR 404</div>
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <PsychologyAltIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">Trava: "Sou de Humanas"</h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                                        "Acho que preciso ser um gênio em matemática avançada para programar. Se eu não souber cálculo, não sirvo pra isso."
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Solution (Modules style) */}
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-blue-900/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-900/30">
                  <PsychologyIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">Módulo 1: Teste de Processamento</h4>
                    <div className="text-[10px] font-mono text-blue-400 bg-blue-900/10 py-0.5 px-2 rounded border border-blue-900/20 uppercase">Sem Código</div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed mb-4">
                                        Vamos testar o "Hardware" do seu cérebro com exercícios de <strong>lógica pura e padrões visuais</strong>. Nenhuma fórmula matemática é necessária.
                  </p>
                  <div className="text-primary text-sm font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                        Diagnóstico: Potencial Lógico <ArrowForwardIcon className="text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Setup / Hardware */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            {/* Left: The Fear */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500 font-mono text-6xl font-black select-none pointer-events-none">ERROR 500</div>
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <LaptopIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">Trava: "Meu computador é fraco"</h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                                        "Não tenho dinheiro para comprar um MacBook Pro de R$ 15 mil. Sem o equipamento certo, vou ficar pra trás."
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Solution */}
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-purple-900/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-900/30">
                  <SettingsSystemDaydreamIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">Módulo 2: Auditoria de Hardware</h4>
                    <div className="text-[10px] font-mono text-purple-400 bg-purple-900/10 py-0.5 px-2 rounded border border-purple-900/20 uppercase">Auditoria</div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed mb-4">
                                        Você vai descobrir que programar exige menos máquina do que editar vídeo. Vamos auditar seu setup e mostrar que você já tem o que precisa.
                  </p>
                  <div className="text-primary text-sm font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                        Diagnóstico: Compatibilidade Técnica <ArrowForwardIcon className="text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Routine / Pressure */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            {/* Left: The Fear */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500 font-mono text-6xl font-black select-none pointer-events-none">ERROR 403</div>
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <SentimentWorriedIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">Trava: "Tenho medo de falhar"</h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                                        "Dizem que a pressão é grande. E se eu investir tempo e descobrir que odeio ficar sentado resolvendo problemas?"
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Solution */}
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                  <TimerIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">Módulo 3: O Raio-X da Rotina</h4>
                    <div className="text-[10px] font-mono text-primary bg-primary/10 py-0.5 px-2 rounded border border-primary/20 uppercase">Simulação</div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed mb-4">
                                        Vou te colocar na cadeira de um Dev Jr por 40 minutos. Você vai sentir a pressão real. Se sentir pânico, eu te salvei de um erro caro.
                  </p>
                  <div className="text-primary text-sm font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                        Diagnóstico: Resiliência Emocional <ArrowForwardIcon className="text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
