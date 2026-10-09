import React from 'react';
import { useTrackOnVisible } from '../../utils/metaPixel';
import { WorkspacePremiumIcon } from '../icons';
import { SementeForm } from './SementeForm';
import { WEBINAR_DATE_LABEL_2 } from './sementeConfig';

// O que a pessoa leva do Webinário. A frase é montada como
// "{lead} {strong} {tail}", com o trecho do meio em destaque.
const LEARNINGS = [
  {
    lead: 'Por que',
    strong: 'entregar mais não está te aproximando',
    tail: 'da promoção.',
  },
  {
    lead: 'O que',
    strong: 'quem decide a sua promoção olha,',
    tail: 'e quase ninguém te conta.',
  },
  {
    lead: 'Por que',
    strong: 'ter visibilidade não é ficar se vendendo.',
    tail: '',
  },
];

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
          <h2 className="text-3xl md:text-4xl font-black leading-tight font-mono text-white mb-4">
            Ao final do webinário, você entenderá:
          </h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-2xl">
          <div className="grid md:grid-cols-1">
            {/* Left Side: O que está incluso */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0d1117]/50">
              <div className="grid md:grid-cols-3 gap-4">
                {LEARNINGS.map(({ lead, strong, tail }, i) => (
                  <div
                    key={strong}
                    className="relative p-6 rounded-xl bg-surface-dark border border-border-dark hover:border-primary/30 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/60"></div>
                    <span className="block text-primary font-mono font-bold text-xl mb-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-gray-400 leading-relaxed">
                      {lead} <strong className="text-white">{strong}</strong>
                      {tail ? ` ${tail}` : ''}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="p-6 rounded-xl bg-surface-dark border border-primary/30 relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>
                  <h4 className="text-primary font-bold font-mono text-lg mb-2 flex items-center gap-2">
                    <WorkspacePremiumIcon />
                    Casos reais
                  </h4>
                  <p className="text-gray-400">
                    Desenvolvedores em diferentes momentos da carreira que
                    receberam <strong className="text-white">aumento</strong> e{' '}
                    <strong className="text-white">promoção</strong>.
                  </p>
                </div>
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
