import React from 'react';
import { VisibilityIcon, DnsIcon, AttachMoneyIcon, VerifiedIcon, QuizIcon } from './icons';

export const Syllabus: React.FC = () => {
    return (
        <section className="px-6 py-10 bg-surface-dark" id="modules">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">ARSENAL DE DECISÃO</span>
                    <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono">O Kit de Ferramentas</h2>
                    <p className="text-gray-400 mt-4 font-light">
                        Leve para casa documentos que valem mais do que o preço do ingresso.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
                        <div className="size-12 rounded bg-blue-900/20 border border-blue-900/50 text-blue-400 flex items-center justify-center mb-4 group-hover:text-blue-300">
                            <VisibilityIcon />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white font-mono">01. Manual Anti-Ilusão (PDF)</h3>
                        <p className="text-sm text-gray-400">A vacina contra promessas falsas. A verdade nua e crua sobre salários reais e o que esperar da faculdade no primeiro ano, sem o filtro do marketing.</p>
                    </div>
                    <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
                        <div className="size-12 rounded bg-purple-900/20 border border-purple-900/50 text-purple-400 flex items-center justify-center mb-4 group-hover:text-purple-300">
                            <DnsIcon />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white font-mono">02. Checklist de Hardware Econômico</h3>
                        <p className="text-sm text-gray-400">Pare de achar que precisa de um PC de R$ 10k. Receba um Checklist do que você realmente precisa para começar sem gastar um centavo a mais do que o necessário.</p>
                    </div>
                    <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 group">
                        <div className="size-12 rounded bg-green-900/20 border border-green-900/50 text-green-400 flex items-center justify-center mb-4 group-hover:text-green-300">
                            <AttachMoneyIcon />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white font-mono">03. Calculadora de Viabilidade Financeira</h3>
                        <p className="text-sm text-gray-400">Matemática contra a ansiedade. Insira o valor do curso que você quer fazer e descubra em quantos meses o investimento se paga. Se a conta não fechar, você não entra.</p>
                    </div>
                    <div className="bg-surface-dark p-6 rounded-xl shadow-sm border border-border-dark hover:border-primary/50 hover:bg-[#1c2128] transition-all duration-300 relative overflow-hidden group">
                        <div className="size-12 rounded bg-primary/10 border border-primary/30 text-primary flex items-center justify-center mb-4">
                            <QuizIcon />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white font-mono">04. Seu Laudo de Aptidão Técnica</h3>
                        <p className="text-sm text-gray-400">O Veredito. Não é um certificado de participação. É um documento atestando se sua lógica é compatível com a exigência do mercado. Sua prova de segurança.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
