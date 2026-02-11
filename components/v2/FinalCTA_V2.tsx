import React from 'react';
import { scrollToSection } from '../../utils/scroll';
import { ArrowForwardIcon } from '../icons';

export const FinalCTA_V2: React.FC = () => {
    return (
        <section className="bg-background-dark py-24 px-6 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 font-mono leading-tight">
                    O ÚNICO RISCO É CONTINUAR NA DÚVIDA.
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-12 text-left max-w-2xl mx-auto">
                    <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg">
                        <p className="text-gray-300">
                            Se você descobrir que Tecnologia <span className="text-red-400 font-bold">NÃO é para você</span>, você economizou milhares de reais e anos de frustração.
                        </p>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
                        <p className="text-gray-300">
                            Se você descobrir que Tecnologia <span className="text-primary font-bold">É para você</span>, você entra no jogo com confiança total e um plano validado.
                        </p>
                    </div>
                </div>

                <p className="text-xl text-gray-400 mb-8 font-light">
                    Pare de viver na borda da piscina. Molhe o pé antes de pular.
                </p>

                <button
                    onClick={() => scrollToSection('pricing')}
                    className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 bg-primary hover:bg-green-400 text-[#0D1117] text-xl font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(25,230,94,0.4)] font-mono uppercase tracking-wide w-full md:w-auto"
                >
                    GARANTIR MINHA VAGA NA MASTERCLASS (R$ 97)
                    <ArrowForwardIcon className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="mt-4 text-sm text-gray-500 font-mono">
                    (Vagas limitadas para a sessão de 27/02/2026)
                </div>
            </div>
        </section>
    );
};
