import React from 'react';
import { BrainIcon, WorkIcon, VerifiedUserIcon } from '../icons';

export const MethodologyV2: React.FC = () => {
  return (
    <section className="bg-background-dark py-20 px-6 border-b border-border-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-mono">
            A SOLUÇÃO: O MÉTODO
          </h2>
          <p className="text-gray-400 text-lg">
            Apresento a{' '}
            <span className="text-primary font-bold">
              MASTERCLASS: O TEST-DRIVE TECH
            </span>
            .<br />
            Não é uma aula de código. É uma Auditoria de Viabilidade
            Profissional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-surface-dark border border-border-dark p-8 rounded-2xl relative group hover:border-primary/50 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BrainIcon className="text-6xl text-primary" />
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
              <BrainIcon />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">
              O TESTE DE APTIDÃO
            </h3>
            <h4 className="text-primary text-sm font-bold uppercase tracking-wider mb-4 border-b border-border-dark pb-2">
              Lógica na Prática
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Pare de achar. Vamos testar. Vou te expor a problemas reais de
              lógica (sem código complexo) para ver se o seu cérebro sente
              prazer ou dor na resolução. Descubra se você tem o "chip" mental
              necessário.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-dark border border-border-dark p-8 rounded-2xl relative group hover:border-primary/50 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <WorkIcon className="text-6xl text-primary" />
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
              <WorkIcon />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">
              A REALIDADE SEM FILTRO
            </h3>
            <h4 className="text-primary text-sm font-bold uppercase tracking-wider mb-4 border-b border-border-dark pb-2">
              O Mercado Nu e Cru
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Esqueça o setup colorido do Instagram. Vou te mostrar a rotina
              real: a pressão, as reuniões, a tela preta e o que realmente faz
              um Junior ser contratado (ou demitido).
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-dark border border-border-dark p-8 rounded-2xl relative group hover:border-primary/50 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <VerifiedUserIcon className="text-6xl text-primary" />
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
              <VerifiedUserIcon />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">
              O VEREDITO DO GESTOR
            </h3>
            <h4 className="text-primary text-sm font-bold uppercase tracking-wider mb-4 border-b border-border-dark pb-2">
              Critérios de Aprovação
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Um checklist matemático para cruzar sua idade, tempo, inglês e
              perfil comportamental. Ao final, você terá uma resposta binária:{' '}
              <strong>SIM</strong> (é seguro investir) ou <strong>NÃO</strong>{' '}
              (economize seu tempo).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
