import React, { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { getProfileLabel, getProfileEmoji } from '../../test/profileLabels';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

interface TestResult {
  id: string;
  userName: string;
  userEmail: string;
  profile: string;
  createdAt: string;
  areaScores: Record<string, number>;
}

interface DashboardData {
  data: TestResult[];
  total: number;
  page: number;
  totalPages: number;
}

export const AdminDashboard: React.FC = () => {
  // Auth State
  const [authHeader, setAuthHeader] = useState<string | null>(
    localStorage.getItem('admin_auth')
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Data State
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Add Email State
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [addStatus, setAddStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [addMessage, setAddMessage] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      if (!authHeader) return; // Don't fetch if not logged in

      setLoading(true);
      try {
        const query = new URLSearchParams({
          page: page.toString(),
          limit: '10',
          ...(debouncedSearch && { q: debouncedSearch }),
        });

        const res = await fetch(`${API_BASE}/admin/results?${query}`, {
          headers: {
            Authorization: authHeader,
          },
        });

        if (res.status === 401) {
          // Auth failed/expired
          logout();
          return;
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch results', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, debouncedSearch, authHeader]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const token = btoa(`${username}:${password}`);
    const header = `Basic ${token}`;
    localStorage.setItem('admin_auth', header);
    setAuthHeader(header);
  };

  const logout = () => {
    localStorage.removeItem('admin_auth');
    setAuthHeader(null);
  };

  // Helper: Profile Colors (keyed off exact profile keys from DB)
  const getProfileColor = (profile: string): string => {
    const colors: Record<string, string> = {
      frontend: 'bg-blue-900/30 text-blue-300 border-blue-500/20',
      backend: 'bg-green-900/30 text-green-300 border-green-500/20',
      dataAI: 'bg-yellow-900/30 text-yellow-300 border-yellow-500/20',
      frontend_backend: 'bg-purple-900/30 text-purple-300 border-purple-500/20',
      frontend_dataAI: 'bg-pink-900/30 text-pink-300 border-pink-500/20',
      backend_dataAI: 'bg-orange-900/30 text-orange-300 border-orange-500/20',
      generalist: 'bg-gray-800 text-gray-300 border-gray-600',
    };
    return colors[profile] ?? 'bg-gray-800 text-gray-300 border-gray-600';
  };

  // Handle PDF Download
  const handleDownloadPDF = async (id: string, name: string) => {
    if (!authHeader) return;
    try {
      const res = await fetch(`${API_BASE}/admin/results/${id}/pdf`, {
        headers: { Authorization: authHeader },
      });

      if (res.status === 401) {
        logout();
        return;
      }

      if (!res.ok) throw new Error('Falha ao baixar PDF');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${name.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      setAddStatus('error');
      setAddMessage('Erro ao baixar PDF. Tente novamente.');
    }
  };

  // Handle Add Email
  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authHeader) return;

    setAddStatus('loading');
    setAddMessage('');

    try {
      const res = await fetch(`${API_BASE}/admin/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({ email: newEmail, name: newName }),
      });

      const json = await res.json();

      if (res.ok) {
        setAddStatus('success');
        setAddMessage(`Sucesso: ${json.message}`);
        setNewEmail('');
        setNewName('');
      } else {
        setAddStatus('error');
        setAddMessage(`Erro: ${json.message || 'Falha ao adicionar'}`);
        if (res.status === 401) logout();
      }
    } catch {
      setAddStatus('error');
      setAddMessage('Erro de conexão ao servidor.');
    }
  };

  // Login Screen
  if (!authHeader) {
    return (
      <div className="min-h-screen bg-background-dark font-display text-text-main flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-surface-dark border border-border-dark rounded-xl p-8 shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold text-text-header mb-6 text-center">
              Acesso Administrativo
            </h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm mb-1">Usuário</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-2 focus:border-primary outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-2 focus:border-primary outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-green-400 text-black font-bold py-2 rounded-lg transition-colors mt-2"
              >
                Entrar
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark font-display text-text-main flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-header">
            Painel Administrativo
          </h1>
          <button
            onClick={logout}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            Sair
          </button>
        </div>

        {/* Section 1: Add Email */}
        <section className="bg-surface-dark border border-border-dark rounded-xl p-6 mb-12 shadow-lg">
          <h2 className="text-xl font-bold text-text-header mb-4 flex items-center gap-2">
            ✉️ Autorizar Novo E-mail
          </h2>
          <form
            onSubmit={handleAddEmail}
            className="flex flex-col md:flex-row gap-4 items-end"
          >
            <div className="flex-1 w-full">
              <label className="block text-sm mb-1">Nome (Opcional)</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-2 focus:border-primary outline-none transition-colors"
                placeholder="Ex: João Silva"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm mb-1">E-mail *</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-2 focus:border-primary outline-none transition-colors"
                placeholder="aluno@exemplo.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={addStatus === 'loading'}
              className="bg-primary hover:bg-green-400 text-black font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {addStatus === 'loading' ? 'Adicionando...' : 'Autorizar'}
            </button>
          </form>
          {addMessage && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm ${addStatus === 'success' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}
            >
              {addMessage}
            </div>
          )}
        </section>

        {/* Section 2: Results */}
        <section className="bg-surface-dark border border-border-dark rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-text-header">
              📊 Resultados dos Testes
            </h2>

            {/* Search */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nome ou e-mail..."
                className="bg-background-dark border border-border-dark rounded-lg px-4 py-2 w-full md:w-64 focus:border-primary outline-none"
              />
              <button
                className="bg-background-dark hover:bg-border-dark border border-border-dark text-text-header p-2 rounded-lg transition-colors"
                title="Buscar"
              >
                🔍
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Carregando dados...
            </div>
          ) : !data?.data?.length ? (
            <div className="text-center py-12 text-gray-500">
              Nenhum resultado encontrado.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-dark text-text-header text-sm uppercase tracking-wider">
                    <th className="p-4">Data</th>
                    <th className="p-4">Nome</th>
                    <th className="p-4">E-mail</th>
                    <th className="p-4">Perfil</th>
                    <th className="p-4">Afinidade</th>
                    <th className="p-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark">
                  {data.data.map((result) => (
                    <tr
                      key={result.id}
                      className="hover:bg-background-dark/50 transition-colors"
                    >
                      <td className="p-4 text-sm">
                        {new Date(result.createdAt).toLocaleDateString('pt-BR')}{' '}
                        <br />
                        <span className="text-xs text-gray-500">
                          {new Date(result.createdAt).toLocaleTimeString(
                            'pt-BR'
                          )}
                        </span>
                      </td>
                      <td className="p-4 font-medium">{result.userName}</td>
                      <td className="p-4 text-gray-400">{result.userEmail}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold border ${getProfileColor(
                            result.profile
                          )}`}
                        >
                          {getProfileEmoji(result.profile)}{' '}
                          {getProfileLabel(result.profile)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1 min-w-[120px]">
                          {(
                            [
                              {
                                key: 'frontend',
                                label: '🎨 FE',
                                color: '#3b82f6',
                              },
                              {
                                key: 'backend',
                                label: '⚙️ BE',
                                color: '#22c55e',
                              },
                              {
                                key: 'dataAI',
                                label: '📊 AI',
                                color: '#eab308',
                              },
                            ] as const
                          ).map(({ key, label, color }) => {
                            const pct = result.areaScores?.[key] ?? 0;
                            return (
                              <div
                                key={key}
                                className="flex items-center gap-2"
                              >
                                <span className="text-[10px] text-gray-400 w-9 shrink-0">
                                  {label}
                                </span>
                                <div className="flex-1 h-1.5 bg-background-dark rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      width: `${pct}%`,
                                      backgroundColor: color,
                                    }}
                                  />
                                </div>
                                <span className="text-[10px] font-mono text-gray-400 w-7 text-right">
                                  {pct}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() =>
                            handleDownloadPDF(result.id, result.userName)
                          }
                          className="text-primary hover:underline text-sm font-medium bg-transparent border-none cursor-pointer"
                          title="Baixar PDF"
                        >
                          Ver PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-border-dark disabled:opacity-30 hover:bg-background-dark transition-colors"
              >
                Anterior
              </button>
              <span className="text-sm">
                Página{' '}
                <span className="text-text-header font-bold">{page}</span> de{' '}
                {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="px-4 py-2 rounded-lg border border-border-dark disabled:opacity-30 hover:bg-background-dark transition-colors"
              >
                Próxima
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
