import React from 'react';
import { CheckCircleIcon } from '../icons';
import { SementeForm } from './SementeForm';

export const SementeInscricao: React.FC = () => {
  return (
    <section
      className="px-6 py-10 bg-[#050709] border-t border-border-dark"
      id="inscricao"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-4 font-mono">
            Garanta Sua Vaga
          </h2>
          <p className="text-gray-400 text-md">
            100% gratuito e ao vivo. Preencha o formulário e você recebe o
            acesso por e-mail.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Left Side: O que está incluso */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-dark bg-[#0d1117]/50">
              <h3 className="text-primary font-mono font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                <CheckCircleIcon />O Que Está Incluso
              </h3>

              <ul className="space-y-6">
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Sessão ao vivo com Venicios Ribeiro
                  </span>
                  <span className="font-mono text-primary font-bold">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    As 4 respostas desta página
                  </span>
                  <span className="font-mono text-primary font-bold">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Link de acesso por e-mail
                  </span>
                  <span className="font-mono text-primary font-bold">
                    Incluso
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Grupo com lembrete antes do início
                  </span>
                  <span className="font-mono text-primary font-bold">
                    Incluso
                  </span>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-dashed border-border-dark flex justify-between items-center">
                <span className="text-sm font-mono text-gray-500 uppercase">
                  Investimento
                </span>
                <span className="text-2xl font-black text-primary font-mono">
                  Gratuito
                </span>
              </div>
            </div>

            {/* Right Side: Formulário */}
            <div className="p-8 md:p-12 bg-[#161b22] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>

              <h3 className="text-white font-mono font-bold text-xl mb-1 relative z-10">
                Reserve Seu Lugar
              </h3>
              <p className="text-gray-400 text-sm mb-6 relative z-10">
                Sem custo, sem pegadinha. Só nome e e-mail.
              </p>
              <SementeForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
