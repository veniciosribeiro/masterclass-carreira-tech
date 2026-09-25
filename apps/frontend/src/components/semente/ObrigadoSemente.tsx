import React from 'react';
import { PageTitle } from '../seo/PageTitle';
import { MetaPixel } from '../analytics/MetaPixel';
import { BUSSOLA_PIXEL_ID } from '../../utils/metaPixel';
import { WEBINAR_COMMUNITY_LINK } from './sementeConfig';
import { SementeFooter } from './SementeFooter';

export const ObrigadoSemente: React.FC = () => {
  return (
    <div className="min-h-screen font-display bg-background-dark text-text-main overflow-x-hidden antialiased flex flex-col">
      <PageTitle title="Inscrição Confirmada — Webinário Carreira Tech" />
      <MetaPixel pixelId={BUSSOLA_PIXEL_ID} />
      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 font-mono">
            Inscrição Confirmada!
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Você garantiu sua vaga no Webinário. Enviamos a confirmação para o
            seu e-mail e vamos avisar por lá quando a data e o horário forem
            confirmados.
          </p>
          <div className="bg-surface-dark border border-border-dark rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-3 text-primary">
              Entre no grupo agora
            </h3>
            <p className="text-gray-400 mb-6">
              Para não perder o lembrete e o link de acesso, entre no grupo
              oficial do Webinário.
            </p>
            <a
              href={WEBINAR_COMMUNITY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-8 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-base font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(25,230,94,0.2)] font-mono uppercase"
            >
              Entrar no Grupo
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Fique de olho na sua caixa de entrada (e no spam) nos próximos dias.
          </p>
        </div>
      </section>
      <SementeFooter />
    </div>
  );
};
