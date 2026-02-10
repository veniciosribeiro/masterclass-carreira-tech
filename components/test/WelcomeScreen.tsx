import React, { useState } from 'react';
import { validateEmail } from '../../services/testService';

interface WelcomeScreenProps {
    onStart: (name: string, email: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
    const [isValidating, setIsValidating] = useState(false);

    const validate = () => {
        const e: typeof errors = {};
        if (!name.trim()) e.name = 'Nome é obrigatório';
        if (!email.trim()) e.email = 'Email é obrigatório';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email inválido';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsValidating(true);
        setErrors({});

        try {
            const result = await validateEmail(email.trim());

            if (!result.authorized) {
                setErrors({
                    email: 'Este email não tem acesso à masterclass. Verifique se usou o email correto do cadastro.',
                });
                setIsValidating(false);
                return;
            }

            // Use the name from the DB if available, otherwise use the input
            const finalName = result.name || name.trim();
            onStart(finalName, email.trim());
        } catch {
            // If validation fails due to network, allow access (fail open)
            console.warn('Email validation failed, allowing access');
            onStart(name.trim(), email.trim());
        } finally {
            setIsValidating(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg">
                {/* Logo / Branding */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-medium text-primary uppercase tracking-wider mb-6">
                        <span className="text-sm">⌨️</span>
                        PROTOCOLO DE APTIDÃO
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-text-header font-mono leading-tight">
                        Teste de <span className="text-primary">Aptidão</span> Tech
                    </h1>
                    <p className="text-text-main mt-4 text-sm md:text-base max-w-md mx-auto">
                        Descubra se você tem mais afinidade com <strong className="text-primary">Front-End</strong>,{' '}
                        <strong className="text-blue-400">Back-End</strong> ou{' '}
                        <strong className="text-purple-400">Dados & IA</strong>.
                    </p>
                </div>

                {/* Card */}
                <form onSubmit={handleSubmit} className="bg-surface-dark border border-border-dark rounded-2xl p-8 shadow-glow">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-main mb-1.5 font-mono">
                                Seu Nome
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Como você se chama?"
                                disabled={isValidating}
                                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-border-dark text-text-header placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-main mb-1.5 font-mono">
                                Seu Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seuemail@exemplo.com"
                                disabled={isValidating}
                                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-border-dark text-text-header placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isValidating}
                        className="w-full mt-8 h-14 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-base font-bold transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(25,230,94,0.2)] font-mono uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {isValidating ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Validando acesso...
                            </span>
                        ) : (
                            '> Iniciar Teste <'
                        )}
                    </button>

                    <div className="mt-5 flex items-center justify-center gap-2 text-xs text-text-main/60">
                        <span>🔒</span>
                        <span>Acesso exclusivo para alunos da masterclass</span>
                    </div>
                </form>

                {/* Info cards */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                    {[
                        { icon: '📊', label: '10 perguntas' },
                        { icon: '⏱️', label: '5 minutos' },
                        { icon: '📄', label: 'resultado imediato' },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="bg-surface-dark/50 border border-border-dark rounded-xl p-3 text-center"
                        >
                            <div className="text-xl mb-1">{item.icon}</div>
                            <div className="text-xs text-text-main font-mono">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
