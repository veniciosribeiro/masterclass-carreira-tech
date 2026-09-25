import React, { useState } from 'react';
import { registerForWebinar } from '../../services/apiClient';
import { sendEvent } from '../../utils/metaPixel';

// Teto de espera pelo Lead antes de sair da página: uma API lenta não pode
// travar o usuário no botão.
const LEAD_MAX_WAIT_MS = 1500;

export const SementeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const fullName = name.trim();
      const cleanEmail = email.trim();
      await registerForWebinar(fullName, cleanEmail);

      // Lead direto do navegador, como o PageView: IP, User-Agent e cookie
      // são os do visitante. Precisa terminar antes de sair da página, porque
      // a navegação abaixo recarrega tudo. A URL é capturada aqui porque o
      // payload só é montado depois do await do Init, e o Lead deve levar a
      // página do formulário, não a de obrigado.
      const eventSourceUrl = window.location.href;
      const nameParts = fullName.toLowerCase().split(/\s+/).filter(Boolean);
      await Promise.race([
        sendEvent(
          'Lead',
          { value: 0, currency: 'BRL', source: 'webinar_semente' },
          {
            eventSourceUrl,
            userData: {
              em: cleanEmail.toLowerCase(),
              fn: nameParts[0],
              ...(nameParts.length > 1
                ? { ln: nameParts[nameParts.length - 1] }
                : {}),
            },
          }
        ),
        new Promise((resolve) => setTimeout(resolve, LEAD_MAX_WAIT_MS)),
      ]);

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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="h-14 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-base font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(25,230,94,0.2)] font-mono uppercase disabled:opacity-60 disabled:hover:scale-100"
        >
          {submitting ? 'Enviando...' : 'PARTICIPAR DO WEBINÁRIO'}
        </button>
      </div>
    </form>
  );
};
