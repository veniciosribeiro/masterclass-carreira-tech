import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { getProfileLabel, getProfileEmoji } from '../../test/profileLabels';
import { questions } from '../../test/questions';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Scores {
  areas: Record<string, number>;
  areasPercent: Record<string, number>;
  behavioral: Record<string, number>;
  behavioralPercent: Record<string, number>;
}

interface Profile {
  primary: string;
  label: string;
  emoji: string;
  description: string;
  strengths: string[];
  recommendation: string;
  areaExplanations?: Record<string, string>;
  behavioralExplanations?: Record<string, string>;
}

interface Answer {
  questionId: string;
  questionType: 'multiple_choice' | 'ordering';
  selectedOptionId?: string;
  orderedStepIds?: string[];
}

interface StudentResult {
  id?: string;
  userName: string;
  userEmail: string;
  timestamp: string;
  scores: Scores;
  profile: Profile;
  answers: Answer[];
}

// ─── Area / Behavioral display config ─────────────────────────────────────────

const areaConfig = [
  {
    key: 'frontend',
    label: '🎨 Front-End',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
  },
  {
    key: 'backend',
    label: '⚙️ Back-End',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.1)',
  },
  {
    key: 'dataAI',
    label: '📊 Dados & IA',
    color: '#eab308',
    bg: 'rgba(234,179,8,0.1)',
  },
] as const;

const behavioralConfig = [
  { key: 'resilience', label: 'Resiliência', emoji: '🛡️' },
  { key: 'logic', label: 'Lógica', emoji: '🧠' },
  { key: 'proactivity', label: 'Proatividade', emoji: '🚀' },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export const AdminResultDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [result, setResult] = useState<StudentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  // Retrieve Basic Auth header stored during login
  const authHeader = localStorage.getItem('admin_auth');

  const fetchResult = useCallback(async () => {
    if (!authHeader) {
      navigate('/admin');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/admin/results/${id}`, {
        headers: { Authorization: authHeader },
      });
      if (res.status === 401) {
        sessionStorage.removeItem('admin_auth');
        navigate('/admin');
        return;
      }
      if (!res.ok) {
        setError('Resultado não encontrado.');
        return;
      }
      const data: StudentResult = await res.json();
      setResult(data);
    } catch {
      setError('Erro de conexão ao servidor.');
    } finally {
      setLoading(false);
    }
  }, [id, authHeader, navigate]);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  const handleDownloadPDF = async () => {
    if (!id || !result) return;
    setDownloading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/results/${id}/pdf`, {
        headers: { Authorization: authHeader! },
      });
      if (!res.ok) throw new Error('Failed to fetch PDF');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${result.userName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Erro ao baixar PDF. Tente novamente.');
    } finally {
      setDownloading(false);
    }
  };

  // ── Render states ──────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-text-main font-mono text-sm">
            Carregando perfil...
          </p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">
            {error ?? 'Resultado não encontrado.'}
          </p>
          <button
            onClick={() => navigate('/admin')}
            className="text-primary underline"
          >
            ← Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { scores, profile } = result;

  // ── Main render ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Back & actions bar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
          >
            ← Voltar ao Dashboard
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-mono hover:bg-primary/20 transition-colors disabled:opacity-50"
          >
            {downloading ? '⏳ Gerando...' : '📄 Baixar PDF'}
          </button>
        </div>

        {/* Student header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-medium text-primary uppercase tracking-wider mb-4">
            ✅ ANÁLISE CONCLUÍDA
          </div>
          <div className="text-6xl mb-4">{profile.emoji}</div>
          <h1 className="text-2xl md:text-3xl font-black text-text-header font-mono mb-1">
            {profile.label}
          </h1>
          <p className="text-text-main/60 text-sm font-mono mb-1">
            {result.userName}
          </p>
          <p className="text-text-main/40 text-xs font-mono">
            {result.userEmail}
          </p>
          <p className="text-text-main/30 text-xs font-mono mt-1">
            {new Date(result.timestamp).toLocaleString('pt-BR')}
          </p>
          <p className="text-text-main text-sm max-w-lg mx-auto leading-relaxed mt-4">
            {profile.description}
          </p>
        </div>

        {/* Area scores */}
        <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-mono font-bold text-text-header uppercase tracking-wider mb-5">
            🎯 Afinidade por Área
          </h2>
          <div className="space-y-5">
            {areaConfig.map(({ key, label, color, bg }) => {
              const pct = scores.areasPercent[key] ?? 0;
              const explanation = profile.areaExplanations?.[key];
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-mono text-text-main">
                      {label}
                    </span>
                    <span
                      className="text-sm font-mono font-bold"
                      style={{ color }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div className="h-3 bg-background-dark rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${color}88, ${color})`,
                        boxShadow: `0 0 10px ${color}40`,
                      }}
                    />
                  </div>
                  {explanation && (
                    <p
                      className="text-xs text-text-main/50 leading-relaxed px-1"
                      style={{
                        backgroundColor: bg,
                        borderRadius: '6px',
                        padding: '6px 8px',
                      }}
                    >
                      {explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Behavioral scores */}
        <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-mono font-bold text-text-header uppercase tracking-wider mb-5">
            💪 Perfil Comportamental
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {behavioralConfig.map(({ key, label, emoji }) => {
              const pct = scores.behavioralPercent[key] ?? 0;
              return (
                <div key={key} className="text-center">
                  <div className="text-2xl mb-1">{emoji}</div>
                  <div className="text-xs font-mono text-text-main/60 mb-2">
                    {label}
                  </div>
                  <div className="relative w-16 h-16 mx-auto">
                    <svg
                      viewBox="0 0 36 36"
                      className="w-full h-full -rotate-90"
                    >
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#161B22"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#19e65e"
                        strokeWidth="3"
                        strokeDasharray={`${pct}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold font-mono text-primary">
                        {pct}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Behavioral explanations */}
          {profile.behavioralExplanations && (
            <div className="space-y-2 mt-4">
              {behavioralConfig.map(({ key, label, emoji }) => {
                const explanation = profile.behavioralExplanations?.[key];
                if (!explanation) return null;
                return (
                  <div
                    key={key}
                    className="bg-background-dark/50 rounded-lg p-3"
                  >
                    <span className="text-xs text-text-main/60 font-mono">
                      {emoji} {label}:{' '}
                    </span>
                    <span className="text-xs text-text-main/50">
                      {explanation}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Strengths */}
        <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-mono font-bold text-text-header uppercase tracking-wider mb-4">
            ⚡ Pontos Fortes
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {profile.strengths.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10"
              >
                <span className="text-primary text-sm">✓</span>
                <span className="text-sm text-text-main">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-br from-primary/10 to-glow-purple/10 border border-primary/20 rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-mono font-bold text-primary uppercase tracking-wider mb-3">
            🗺️ Próximos Passos Recomendados
          </h2>
          <p className="text-text-main text-sm leading-relaxed">
            {profile.recommendation}
          </p>
        </div>

        {/* ── Admin-exclusive: Answers breakdown ────────────────────────────── */}
        <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 mb-10">
          <h2 className="text-sm font-mono font-bold text-text-header uppercase tracking-wider mb-1">
            📋 Respostas Individuais
          </h2>
          <p className="text-xs text-text-main/40 font-mono mb-5">
            Visível apenas no painel admin
          </p>

          <div className="space-y-4">
            {result.answers.map((answer, idx) => {
              const question = questions.find(
                (q) => q.id === answer.questionId
              );
              if (!question) return null;

              return (
                <div
                  key={answer.questionId}
                  className="border border-border-dark rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-text-main/30 mt-0.5 shrink-0">
                      #{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-main font-medium mb-3">
                        {question.title}
                      </p>

                      {/* Multiple choice */}
                      {question.type === 'multiple_choice' &&
                        answer.selectedOptionId && (
                          <div className="space-y-1.5">
                            {question.options?.map((opt) => {
                              const isSelected =
                                opt.id === answer.selectedOptionId;
                              return (
                                <div
                                  key={opt.id}
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                                    isSelected
                                      ? 'bg-primary/10 border border-primary/30 text-primary'
                                      : 'bg-background-dark/50 text-text-main/40'
                                  }`}
                                >
                                  <span>{isSelected ? '✓' : '○'}</span>
                                  <span>{opt.text}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                      {/* Ordering */}
                      {question.type === 'ordering' &&
                        answer.orderedStepIds && (
                          <div>
                            <p className="text-xs text-text-main/40 font-mono mb-2">
                              Sequência enviada:
                            </p>
                            <div className="space-y-1">
                              {answer.orderedStepIds.map((stepId, pos) => {
                                const step = question.steps?.find(
                                  (s) => s.id === stepId
                                );
                                const isCorrectPos =
                                  step?.correctPosition === pos + 1;
                                return (
                                  <div
                                    key={stepId}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono ${
                                      isCorrectPos
                                        ? 'bg-primary/10 border border-primary/20 text-primary'
                                        : 'bg-background-dark/50 text-text-main/50'
                                    }`}
                                  >
                                    <span className="text-text-main/30 shrink-0 w-4">
                                      {pos + 1}.
                                    </span>
                                    <span>{step?.text ?? stepId}</span>
                                    {isCorrectPos && (
                                      <span className="ml-auto text-primary/60">
                                        ✓
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile badge at bottom */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-dark border border-border-dark text-sm font-mono text-text-main/60">
            {getProfileEmoji(profile.primary)}{' '}
            {getProfileLabel(profile.primary)}
          </span>
        </div>
      </main>

      <Footer />
    </div>
  );
};
