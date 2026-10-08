import React from 'react';
import { PageTitle } from '../seo/PageTitle';
import { ROUTE_TITLES } from '../../seo/routeTitles';
import { MetaPixel } from '../analytics/MetaPixel';
import { BUSSOLA_PIXEL_ID } from '../../utils/metaPixel';
import {
  SEMENTE_LEAD_STORAGE_KEY,
  WEBINAR_COMMUNITY_LINK,
  buildSurveyUrl,
} from './sementeConfig';
import { SementeFooter } from './SementeFooter';

// Link personalizado da pesquisa, montado com o lead que acabou de se
// inscrever. Sem lead na sessão (acesso direto à página, storage indisponível),
// retorna null e o cartão da pesquisa não aparece: um link sem e-mail geraria
// uma resposta impossível de ligar a um inscrito.
function getSurveyUrl(): string | null {
  try {
    const raw = sessionStorage.getItem(SEMENTE_LEAD_STORAGE_KEY);
    if (!raw) return null;
    const { name, email } = JSON.parse(raw) as {
      name?: string;
      email?: string;
    };
    return name && email ? buildSurveyUrl(name, email) : null;
  } catch {
    return null;
  }
}

export const ObrigadoSemente: React.FC = () => {
  const surveyUrl = React.useMemo(getSurveyUrl, []);

  return (
    <div className="min-h-screen font-display bg-background-dark text-text-main overflow-x-hidden antialiased flex flex-col">
      <PageTitle title={ROUTE_TITLES['/webinario-carreira-tech/obrigado']} />
      <MetaPixel pixelId={BUSSOLA_PIXEL_ID} />
      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 font-mono">
            Inscrição Realizada!
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Enviamos uma confirmação de inscrição para o seu e-mail.
          </p>
          <div className="bg-surface-dark border border-border-dark rounded-xl p-8 mb-8">
            {surveyUrl ? (
              <>
                <h3 className="text-xl font-bold mb-6 text-primary">
                  O que você mais precisa?
                </h3>
                <a
                  href={surveyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-14 px-8 rounded-lg border border-primary text-primary hover:bg-primary hover:text-[#0D1117] text-base font-bold transition-all font-mono uppercase"
                >
                  Responder agora
                </a>
                <p className="text-gray-400 mt-6">
                  Leva poucos minutos e eu uso as respostas para te ajudar no
                  Webinário.
                </p>
                <div className="border-t border-border-dark my-8" />
              </>
            ) : (
              <h3 className="text-xl font-bold mb-6 text-primary">
                Entre no grupo agora
              </h3>
            )}
            <a
              href={WEBINAR_COMMUNITY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-8 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-base font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(25,230,94,0.2)] font-mono uppercase"
            >
              Entrar no Grupo
            </a>
            <p className="text-gray-400 mt-6">
              Para não perder o lembrete e o link de acesso, entre no grupo
              oficial do Webinário.
            </p>
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
