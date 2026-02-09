import React from 'react';
import { PsychologyIcon, SettingsSystemDaydreamIcon, VisibilityIcon, TimerIcon } from './icons';

export const Modules: React.FC = () => {
  return (
    <section className="px-6 py-10 bg-background-dark" id="mechanism">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">The Black Box</span>
          <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono">Conheça o Protocolo de Validação da <span className="text-primary">Carreira Tech™</span></h2>
          <p className="text-gray-400 mt-4 font-light text-lg">Não é uma aula. É um laboratório prático de 3 etapas.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-surface-dark p-8 rounded-xl shadow-lg border border-border-dark hover:border-primary/50 transition-all duration-300 group flex flex-col">
            <div className="size-14 rounded bg-blue-900/20 border border-blue-900/50 text-blue-400 flex items-center justify-center mb-6 group-hover:text-blue-300">
              <PsychologyIcon className="text-3xl" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-white font-mono">1. O Teste de Processamento</h3>
            <p className="text-gray-400 mb-4 flex-1">Vamos testar o "Hardware" do seu cérebro. Usaremos exercícios de lógica pura para saber se você tem o raciocínio sequencial de um programador sênior.</p>
            <div className="text-xs font-mono text-blue-400 bg-blue-900/10 py-1 px-2 rounded w-fit uppercase">Sem Código</div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-dark p-8 rounded-xl shadow-lg border border-border-dark hover:border-primary/50 transition-all duration-300 group flex flex-col">
            <div className="size-14 rounded bg-purple-900/20 border border-purple-900/50 text-purple-400 flex items-center justify-center mb-6 group-hover:text-purple-300">
              <SettingsSystemDaydreamIcon className="text-3xl" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-white font-mono">2. Auditoria de Hardware</h3>
            <p className="text-gray-400 mb-4 flex-1">Você realmente precisa de um computador de R$ 10k? Vamos auditar seu setup atual. Spoiler: Você vai economizar milhares de reais descobrindo o que é mito e o que é essencial.</p>
            <div className="text-xs font-mono text-purple-400 bg-purple-900/10 py-1 px-2 rounded w-fit uppercase">Auditoria Técnica</div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-dark p-8 rounded-xl shadow-lg border border-border-dark hover:border-primary/50 transition-all duration-300 group flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <VisibilityIcon className="text-8xl" />
            </div>
            <div className="size-14 rounded bg-primary/10 border border-primary/30 text-primary flex items-center justify-center mb-6">
              <TimerIcon className="text-3xl" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-white font-mono">3. O Raio-X da Rotina</h3>
            <p className="text-gray-400 mb-4 flex-1">Vou te colocar na cadeira de um Dev por 40 minutos. Você vai sentir a pressão de resolver um problema real. Se sentir pânico, eu te salvei de um erro caro.</p>
            <div className="text-xs font-mono text-primary bg-primary/10 py-1 px-2 rounded w-fit uppercase">Teste de Estresse</div>
          </div>
        </div>
      </div>
    </section>
  );
};