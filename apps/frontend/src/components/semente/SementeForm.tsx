import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerForWebinar } from '../../services/apiClient';
import { trackEvent } from '../../utils/metaPixel';

export const SementeForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await registerForWebinar(name.trim(), email.trim());
      trackEvent('Lead');
      navigate('/webinario-carreira-tech/obrigado');
    } catch (err) {
      console.error('[SEMENTE_FORM] Failed to register:', err);
      setError(
        'Não conseguimos concluir sua inscrição agora. Tente novamente em instantes.'
      );
    } finally {
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
          {submitting ? 'Enviando...' : 'Quero Minha Vaga'}
        </button>
      </div>
    </form>
  );
};
