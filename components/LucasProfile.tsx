import React from 'react';
import { scrollToSection } from '../utils/scroll';

export const LucasProfile: React.FC = () => {
    return (
        <section className="bg-surface-dark py-10 px-6 text-white border-y border-border-dark">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">
                        Identificando o Erro no Sistema...
                    </h2>
                    <p className="text-gray-400 mt-4 font-light text-lg">
                        Lucas é inteligente e altamente competente. Ele pensa em uma carreira em tech há meses, mas está paralisado pela incerteza.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-6">
                            <div className="flex gap-4 p-4 rounded-lg bg-background-dark border border-border-dark">
                                <div className="size-10 rounded bg-red-900/20 flex items-center justify-center shrink-0 text-red-400 border border-red-900/30">
                                    <span className="material-symbols-outlined">psychology_alt</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white font-mono">Error: Math_Module_Missing</h4>
                                    <p className="text-gray-500 text-sm">Ele acha que precisa ser um gênio em matemática para ser programador.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-lg bg-background-dark border border-border-dark">
                                <div className="size-10 rounded bg-red-900/20 flex items-center justify-center shrink-0 text-red-400 border border-red-900/30">
                                    <span className="material-symbols-outlined">sentiment_worried</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white font-mono">Error: Age_Limit_Exceeded?</h4>
                                    <p className="text-gray-500 text-sm">Lucas acha que 30 anos é o limite. Ele não sabe qual perfil de pessoas o mercado valoriza.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-lg bg-background-dark border border-border-dark">
                                <div className="size-10 rounded bg-red-900/20 flex items-center justify-center shrink-0 text-red-400 border border-red-900/30">
                                    <span className="material-symbols-outlined">psychology_alt</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white font-mono">Error: Infinite_Research_Loop</h4>
                                    <p className="text-gray-500 text-sm">
                                        Ele acompanha 10 influenciadores diferentes, mas não consegue ter clareza do que realmente fazer. É o 'Eterno Pesquisador'.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-lg bg-background-dark border border-border-dark">
                                <div className="size-10 rounded bg-red-900/20 flex items-center justify-center shrink-0 text-red-400 border border-red-900/30">
                                    <span className="material-symbols-outlined">laptop_mac</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white font-mono">Error: Hardware_Check_Failed</h4>
                                    <p className="text-gray-500 text-sm">Ele não tem certeza se o computador pessoal dele é capaz de rodar os programas necessários para aprender a programar.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl"></div>
                        <div className="bg-background-dark p-8 rounded-xl border border-border-dark relative shadow-2xl font-mono text-sm">
                            <div className="flex items-center gap-4 mb-6 border-b border-border-dark pb-6">
                                <div
                                    className="size-14 bg-gray-800 rounded bg-cover bg-center border border-gray-700"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqpb_0oUzVPAruddM7T2MnkSCKyotyxWcn1BBnZEa2yugilb_Tbt9Pe4GA73P4RbgmxanJ4o0lGe6WbtGNnnJ0VRi3lcdTKnFVCE5IFU_dfTZzEOZ5MaBRt_NVkFiYG9Re4AXpQcMMNlPoClzWZzYSvP6nwlQPp_5Q6brmVOUxBXcj1lIhUxDWg-BnjkFoETkZ_v8WQpBXDk0h-7DCpWJ-2_TlWZkBaap8mNA1vDpbPykwPr6tHYTtGoi4n5TSf5xaLPn0wr-cjwFa')" }}
                                ></div>
                                <div>
                                    <div className="text-base font-bold text-lg text-primary">user_lucas</div>
                                    <div className="text-base text-gray-500">Desenvolvedor Aspirante</div>
                                </div>
                            </div>
                            <div className="text-base space-y-4 text-gray-400">
                                <p><span className="text-blue-400">➜</span> ~ escaneando obstáculos...</p>
                                <p><span className="text-blue-400">➜</span> ~ nível de medo: <span className="text-red-400">Alto</span></p>
                                <p><span className="text-blue-400">➜</span> ~ risco de investimento: <span className="text-red-400">Crítico</span></p>
                                <p className="mt-4 text-white font-bold text-base"><span className="text-blue-400">➜</span> ~ recomendação: <span className="text-primary">./init_test_protocol.sh</span></p>
                                <p className="mt-4 text-blue-400 font-bold text-base"><span className="text-blue-400">➜</span> ~ diagnóstico: <span className="text-primary">Pronto para começar!</span></p>
                            </div>
                            <button
                                onClick={() => scrollToSection('pricing')}
                                className="mt-8 w-full py-4 rounded bg-white text-[#0D1117] font-bold hover:bg-gray-200 transition-colors font-mono uppercase tracking-wide"
                            >
                                &gt; Executar Teste
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
