import React from 'react';
import { CheckCircleIcon } from '../icons';
import { SementeForm } from './SementeForm';
import { WEBINAR_DATE_LABEL } from './sementeConfig';

export const SementeInscricao: React.FC = () => {
  return (
    <section
      className="px-6 py-10 bg-[#050709] border-t border-border-dark"
      id="inscricao"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-4 font-mono">
            Saia com uma visão muito mais clara do que pode estar mantendo sua
            carreira parada.
          </h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-2xl">
          <div className="grid md:grid-cols-1">
            {/* Left Side: O que está incluso */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0d1117]/50">
              <h3 className="text-primary font-mono font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                <CheckCircleIcon />
                Ao final do webinário, você vai entender:
              </h3>

              <ul className="space-y-6">
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Por que entregar muito não garante avanço na carreira
                    <p className="text-sm text-gray-500">
                      E qual é a diferença entre fazer um bom trabalho e
                      produzir sinais de prontidão.
                    </p>
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Quais padrões podem estar mantendo você no mesmo lugar
                    <p className="text-sm text-gray-500">
                      Mesmo quando você trabalha, recebe bons feedbacks e
                      acredita estar fazendo tudo certo.
                    </p>
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Por que “continue assim” não é uma direção de carreira
                    <p className="text-sm text-gray-500">
                      E por que sua evolução não pode depender apenas da
                      capacidade do seu gestor de traduzir o próximo passo.
                    </p>
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    O que precisa estar organizado para avançar
                    <p className="text-sm text-gray-500">
                      Para parar de responder à estagnação simplesmente com mais
                      cursos, mais tarefas ou mais espera.
                    </p>
                  </span>
                </li>
              </ul>

              <div className="text-3xl mt-6 pt-6 border-t border-dashed border-border-dark flex justify-between items-center">
                <span className="font-mono text-gray-500 uppercase">
                  Investimento
                </span>
                <span className="font-black text-primary font-mono">R$ 0</span>
              </div>
            </div>

            {/* Right Side: Formulário */}
            <div className="p-8 bg-[#161b22] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>

              <h3 className="text-white font-mono font-bold text-xl mb-4 relative z-10">
                Reserve Seu Lugar
              </h3>
              <SementeForm />
              <span className="text-1xl text-gray-400 font-mono mt-4 block text-center">
                {WEBINAR_DATE_LABEL}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
