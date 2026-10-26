import React, { useId, useState } from 'react';
import { registerForWebinar } from '../../services/apiClient';
import { getExternalId, sendEvent } from '../../utils/metaPixel';
import {
  PRIVACY_POLICY_PATH,
  PRIVACY_POLICY_VERSION,
} from '../../utils/privacyPolicy';
import { SEMENTE_LEAD_STORAGE_KEY } from './sementeConfig';

// Teto de espera pelo Lead antes de sair da página: uma API lenta não pode
// travar o usuário no botão.
const LEAD_MAX_WAIT_MS = 1500;

export const SementeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const consentId = useId();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const fullName = name.trim();
      const cleanEmail = email.trim();

      // Resolve o external_id (o mesmo id que a events API vai usar pro Lead
      // abaixo) ANTES de registrar, pra guardar o vínculo direto na
      // inscrição — mesmo que o Lead falhe/demore depois, ainda sabemos
      // exatamente qual usuário da laravel-api é esse. Normalmente já está
      // pronto aqui, porque o Init antecipado do index.html roda em paralelo
      // ao carregamento do bundle.
      const externalId = await getExternalId();
      // A caixa é obrigatória (required): só chega aqui com o aceite marcado.
      await registerForWebinar(fullName, cleanEmail, externalId, {
        marketingConsent: consent,
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      });

      // Lead direto do navegador, como o PageView: IP, User-Agent e cookie
      // são os do visitante. Precisa terminar antes de sair da página, porque
      // a navegação abaixo recarrega tudo. A URL é capturada aqui porque o
      // payload só é montado depois do await do Init, e o Lead deve levar a
      // página do formulário, não a de obrigado.
      const eventSourceUrl = window.location.href;
      // O nome vai como a pessoa digitou: a laravel-api guarda assim (CRM e demais
      // canais) e só põe em minúsculas o que manda à Meta. O Pixel do navegador
      // recebe a versão em minúsculas (ver sendEvent).
      const nameParts = fullName.trim().split(/\s+/).filter(Boolean);
      await Promise.race([
        sendEvent(
          'Lead',
          { value: 0, currency: 'BRL', source: 'webinar_semente' },
          {
            eventSourceUrl,
            userData: {
              em: cleanEmail.toLowerCase(),
              // Nome completo como digitado, para o CRM e os demais canais.
              full_name: nameParts.join(' '),
              fn: nameParts[0],
              ...(nameParts.length > 1
                ? { ln: nameParts[nameParts.length - 1] }
                : {}),
            },
          }
        ),
        new Promise((resolve) => setTimeout(resolve, LEAD_MAX_WAIT_MS)),
      ]);

      // Deixa o lead na sessão para a página de obrigado montar o link
      // personalizado da pesquisa. Se o storage não estiver disponível (modo
      // privado, etc.), a página de obrigado apenas omite o cartão da pesquisa.
      try {
        sessionStorage.setItem(
          SEMENTE_LEAD_STORAGE_KEY,
          JSON.stringify({ name: fullName, email: cleanEmail })
        );
      } catch {
        // sem storage: segue sem o cartão da pesquisa
      }

      // Recarga completa (não navigate): o Pixel só aceita um PageView
      // explícito por carregamento, então numa navegação client-side o
      // PageView de /obrigado nunca chegaria ao browser (ver metaPixel.ts).
      window.location.assign('/webinario-carreira-tech/obrigado');
    } catch (err) {
      console.error('[SEMENTE_FORM] Failed to register:', err);
      setError(
        'Não conseguimos concluir sua inscrição agora. Tente novamente em instantes.'
      );
      // Só reabilita no erro: no sucesso a página recarrega, e reabilitar
      // antes disso deixaria dar um segundo clique no meio da navegação.
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative z-10">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          required
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 px-4 rounded-lg bg-background-dark border border-border-dark text-white placeholder-gray-500 focus:outline-none focus:border-primary"
        />
        <input
          type="email"
          required
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 px-4 rounded-lg bg-background-dark border border-border-dark text-white placeholder-gray-500 focus:outline-none focus:border-primary"
        />
        {/* Aceite obrigatório e desmarcado por padrão. Por decisão do Expert, o
            formulário só tem a frase curta: as finalidades e o aviso de que o
            aceite é condição da inscrição gratuita (LGPD, art. 9º, §3º) ficam
            na Política. Revogar é pelo descadastro ou pelo e-mail dela. */}
        <label
          htmlFor={consentId}
          className="flex items-start gap-3 text-left text-sm text-gray-400 leading-snug cursor-pointer"
        >
          <input
            id={consentId}
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-primary cursor-pointer"
          />
          <span>
            Li e aceito a{' '}
            <a
              href={PRIVACY_POLICY_PATH}
              target="_blank"
              rel="noopener"
              className="text-primary underline hover:text-primary-hover"
            >
              Política de Privacidade
            </a>
            .
          </span>
        </label>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="h-14 rounded-lg bg-primary hover:bg-primary-hover text-on-primary text-base font-bold transition-all transform hover:scale-105 shadow-glow-cta font-mono uppercase disabled:opacity-60 disabled:hover:scale-100"
        >
          {submitting ? 'Enviando...' : 'QUERO MINHA VAGA'}
        </button>
        <p className="text-gray-400 text-sm text-center">
          O link do Zoom chega no seu e-mail.
        </p>
      </div>
    </form>
  );
};
