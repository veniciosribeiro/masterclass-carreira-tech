import React from 'react';
import { useTrackOnVisible } from '../../utils/metaPixel';
import { SementeForm } from './SementeForm';
import { WEBINAR_DATE_LABEL_2 } from './sementeConfig';

export const SementeInscricao: React.FC = () => {
  // ViewContent quando o usuário de fato chega à seção de inscrição (30% dela
  // na tela). Precisa ser uma fração, não 1px: em desktop a seção anterior
  // já espia por 2px na primeira tela e disparava o evento no carregamento.
  const inscricaoRef = useTrackOnVisible<HTMLElement>(
    'ViewContent',
    { content_name: 'inscricao' },
    { threshold: 0.3 }
  );

  return (
    <section
      ref={inscricaoRef}
      className="px-6 py-10 bg-[#050709] border-t border-border-dark"
      id="inscricao"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-4 font-mono">
            Ao final do webinário, você entenderá:
          </h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-2xl">
          <div className="grid md:grid-cols-1">
            {/* Left Side: O que está incluso */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0d1117]/50">
              <ul className="space-y-6">
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Por que{' '}
                    <strong className="text-white">
                      boas entregas nem sempre demonstram prontidão
                    </strong>{' '}
                    para o próximo nível.
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Como{' '}
                    <strong className="text-white">
                      feedbacks vazios, falta de direção e foco disperso
                    </strong>{' '}
                    podem dificultar o avanço.
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    O{' '}
                    <strong className="text-white">
                      caminho para conquistar reconhecimento e avançar na
                      carreira
                    </strong>{' '}
                    sem depender apenas de entregar mais ou esperar que alguém
                    perceba o seu valor.
                  </span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-dashed border-border-dark flex justify-between items-center">
                <span className="text-gray-400 group-hover:text-white transition-colors">
                  O encontro inclui{' '}
                  <strong className="text-white">casos reais</strong> de
                  desenvolvedores em diferentes momentos da carreira que
                  receberam{' '}
                  <strong className="text-white">aumento e promoção</strong>.
                </span>
              </div>

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
                Garanta a sua vaga
              </h3>
              <SementeForm />
              <span className="text-1xl text-gray-400 font-mono mt-4 block text-center">
                {WEBINAR_DATE_LABEL_2}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
