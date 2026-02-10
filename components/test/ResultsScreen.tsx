import React from 'react';
import { TestResult } from '../../test/testTypes';
import { generatePDF } from '../../test/pdfGenerator';
import { generateResultJSON } from '../../services/testService';

interface ResultsScreenProps {
    result: TestResult;
}

const areaLabels: Record<string, { label: string; color: string; bgColor: string }> = {
    frontend: { label: 'Front-End', color: '#19e65e', bgColor: 'rgba(25,230,94,0.1)' },
    backend: { label: 'Back-End', color: '#3b82f6', bgColor: 'rgba(59,130,246,0.1)' },
    dataAI: { label: 'Dados & IA', color: '#a855f7', bgColor: 'rgba(168,85,247,0.1)' },
};

const behavioralLabels: Record<string, { label: string; emoji: string }> = {
    resilience: { label: 'Resiliência', emoji: '🛡️' },
    logic: { label: 'Lógica', emoji: '🧠' },
    proactivity: { label: 'Proatividade', emoji: '🚀' },
};

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ result }) => {
    const handleDownloadPDF = () => {
        generatePDF(result);
    };

    const handleDownloadJSON = () => {
        const json = generateResultJSON(result);
        const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `perfil-tech-${result.userName.replace(/\s+/g, '-').toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const { areasPercent, behavioralPercent } = result.scores;

    return (
        <div className="min-h-screen bg-background-dark px-4 py-8 md:py-16">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-medium text-primary uppercase tracking-wider mb-4">
                        ✅ ANÁLISE CONCLUÍDA
                    </div>
                    <div className="text-6xl mb-4">{result.profile.emoji}</div>
                    <h1 className="text-2xl md:text-3xl font-black text-text-header font-mono mb-2">
                        {result.profile.label}
                    </h1>
                    <p className="text-text-main text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                        {result.profile.description}
                    </p>
                </div>

                {/* Area Scores */}
                <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 mb-6">
                    <h2 className="text-sm font-mono font-bold text-text-header uppercase tracking-wider mb-5">
                        🎯 Afinidade por Área
                    </h2>
                    <div className="space-y-5">
                        {(Object.entries(areasPercent) as [string, number][]).map(([key, value]) => {
                            const info = areaLabels[key];
                            return (
                                <div key={key}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm font-mono text-text-main">{info.label}</span>
                                        <span className="text-sm font-mono font-bold" style={{ color: info.color }}>
                                            {value}%
                                        </span>
                                    </div>
                                    <div className="h-3 bg-background-dark rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000 ease-out"
                                            style={{
                                                width: `${value}%`,
                                                background: `linear-gradient(90deg, ${info.color}88, ${info.color})`,
                                                boxShadow: `0 0 10px ${info.color}40`,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Behavioral Scores */}
                <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 mb-6">
                    <h2 className="text-sm font-mono font-bold text-text-header uppercase tracking-wider mb-5">
                        💪 Perfil Comportamental
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {(Object.entries(behavioralPercent) as [string, number][]).map(([key, value]) => {
                            const info = behavioralLabels[key];
                            return (
                                <div key={key} className="text-center">
                                    <div className="text-2xl mb-1">{info.emoji}</div>
                                    <div className="text-xs font-mono text-text-main/60 mb-2">{info.label}</div>
                                    <div className="relative w-16 h-16 mx-auto">
                                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
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
                                                strokeDasharray={`${value}, 100`}
                                                strokeLinecap="round"
                                                className="transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs font-bold font-mono text-primary">{value}%</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Strengths */}
                <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 mb-6">
                    <h2 className="text-sm font-mono font-bold text-text-header uppercase tracking-wider mb-4">
                        ⚡ Seus Pontos Fortes
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                        {result.profile.strengths.map((s, i) => (
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
                    <p className="text-text-main text-sm leading-relaxed">{result.profile.recommendation}</p>
                </div>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleDownloadPDF}
                        className="flex-1 h-14 rounded-xl bg-primary hover:bg-green-400 text-[#0D1117] font-bold font-mono text-sm uppercase transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(25,230,94,0.2)] cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>📄</span> Baixar Relatório PDF
                    </button>
                    <button
                        onClick={handleDownloadJSON}
                        className="flex-1 h-14 rounded-xl border border-border-dark bg-surface-dark hover:border-primary/40 text-text-main font-mono text-sm transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>📋</span> Baixar JSON Estruturado
                    </button>
                </div>

                {/* Footer branding */}
                <div className="text-center mt-10 text-xs text-text-main/40 font-mono">
                    Masterclass Test-Drive da Carreira Tech — Venicios Ribeiro
                </div>
            </div>
        </div>
    );
};
