import React from 'react';
import { CloseIcon } from '../icons';

export const DiagnosisV2: React.FC = () => {
  const symptoms = [
    {
      title: 'O Colecionador de Conteúdo',
      description: 'Seu Instagram é cheio de posts salvos sobre "Dicas de Python" e "Rotina Dev", mas você nunca aplicou uma linha de código.',
    },
    {
      title: 'A Síndrome das 20 Abas',
      description: 'Você pesquisa faculdades e bootcamps obsessivamente, mas fecha o navegador sem se inscrever porque o medo de jogar dinheiro fora te paralisa.',
    },
    {
      title: 'O Medo da Idade',
      description: "Você olha para os \"garotos prodígio\" e pensa: \"Será que aos [sua idade] eu ainda consigo aprender isso ou meu cérebro já 'passou do ponto'?\"",
    },
    {
      title: 'A Desconfiança Cognitiva',
      description: 'No fundo, seu maior pavor é sentar para estudar e descobrir que não tem inteligência suficiente para a área.',
    },
  ];

  return (
    <section className="bg-surface-dark py-20 px-6 border-b border-border-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500/10 text-red-400 px-4 py-1 rounded-full text-xs font-mono mb-4 border border-red-500/20 uppercase tracking-widest">
                        O Diagnóstico
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 font-mono leading-tight">
                        VOCÊ ESTÁ PRESO NO <br className="hidden md:block" /> <span className="text-red-500">"LIMBO DO ASPIRANTE"?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Se você se identifica com 3 ou mais itens abaixo, você não precisa de um curso de programação. Você precisa de um diagnóstico.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {symptoms.map((item, index) => (
            <div key={index} className="bg-background-dark border border-border-dark p-6 rounded-xl hover:border-red-500/50 transition-colors duration-300 group">
              <div className="flex items-start gap-4">
                <div className="mt-1 min-w-[24px] text-red-500 group-hover:scale-110 transition-transform">
                  <CloseIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
