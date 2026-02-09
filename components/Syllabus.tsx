import React from 'react';
import { VisibilityIcon, DnsIcon, AttachMoneyIcon, VerifiedIcon, QuizIcon } from './icons';

export const Syllabus: React.FC = () => {
    return (
        <section className="px-6 py-10 bg-surface-dark" id="modules">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">O Plano de Estudos</span>
                    <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono">O Kit de Ferramentas do Candidato</h2>
                    <p className="text-gray-400 mt-4 font-light">Além do acesso ao laboratório, você recebe estes 4 artefatos de decisão para consultar sempre que precisar.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
                        <div className="size-12 rounded bg-blue-900/20 border border-blue-900/50 text-blue-400 flex items-center justify-center mb-4 group-hover:text-blue-300">
                            <VisibilityIcon />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white font-mono">01. Manual Anti-Ilusão (PDF)</h3>
                        <p className="text-sm text-gray-400">Um glossário com a verdade sobre cargos, salários reais (CLT vs PJ) e o que esperar da primeira entrevista.</p>
                    </div>
                    <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
                        <div className="size-12 rounded bg-purple-900/20 border border-purple-900/50 text-purple-400 flex items-center justify-center mb-4 group-hover:text-purple-300">
                            <DnsIcon />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white font-mono">02. Checklist de Hardware Econômico</h3>
                        <p className="text-sm text-gray-400">A lista exata de especificações mínimas para comprar (ou manter) seu notebook sem gastar um centavo a mais.</p>
                    </div>
                    <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
                        <div className="size-12 rounded bg-green-900/20 border border-green-900/50 text-green-400 flex items-center justify-center mb-4 group-hover:text-green-300">
                            <AttachMoneyIcon />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white font-mono">03. Calculadora de Viabilidade Financeira</h3>
                        <p className="text-sm text-gray-400">Uma planilha simples: jogue o valor da faculdade/curso e descubra em quantos meses o investimento se paga.</p>
                    </div>
                    <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2">
                            <VerifiedIcon className="text-primary/10 text-6xl -mr-2 -mt-2 group-hover:text-primary/20 transition-colors" />
                        </div>
                        <div className="size-12 rounded bg-primary/10 border border-primary/30 text-primary flex items-center justify-center mb-4">
                            <QuizIcon />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white font-mono">04. Seu Laudo de Aptidão Técnica</h3>
                        <p className="text-sm text-gray-400">O documento final com o resultado do seu teste. A prova concreta de que você tem (ou não) o perfil lógico exigido.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
