import React from 'react';
import { CheckCircleIcon } from '../icons';

export const AuthorityV2: React.FC = () => {
  return (
    <section className="bg-background-dark py-20 px-6 text-white border-y border-border-dark">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Image Column */}
        <div className="relative order-1 lg:order-1">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl transform -rotate-3 scale-105 opacity-50"></div>
          <img
            src="/assets/images/venicios-profile.webp"
            alt="Venicios Ribeiro"
            className="relative rounded-xl border border-border-dark shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full max-w-md mx-auto"
          />
        </div>

        {/* Text Column */}
        <div className="order-2 lg:order-2">
          <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-mono mb-4 border border-primary/20 uppercase tracking-widest">
                        Hiring Manager
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono leading-tight">
                        QUEM VAI TE AVALIAR?
          </h2>

          <p className="text-gray-400 text-lg mb-8">
                        Eu não sou um "Youtuber de Tecnologia". <br />
                        Eu sou <strong>Coordenador de Engenharia de Software</strong> com +20 anos de campo de batalha.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-4 bg-surface-dark rounded-lg border border-border-dark">
              <CheckCircleIcon className="text-primary text-xl" />
              <div>
                <strong className="text-white block text-xl font-mono">+300 Contratações Realizadas</strong>
                <span className="text-gray-400 text-sm">(Do estagiário ao Sênior)</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-surface-dark rounded-lg border border-border-dark">
              <CheckCircleIcon className="text-primary text-xl" />
              <div>
                <strong className="text-white block text-xl font-mono">+700 Currículos Analisados</strong>
                <span className="text-gray-400 text-sm">(Eu sei o que é descartado em 5 segundos)</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-surface-dark rounded-lg border border-border-dark">
              <CheckCircleIcon className="text-primary text-xl" />
              <div>
                <strong className="text-white block text-xl font-mono">+400 Mentorias Individuais</strong>
                <span className="text-gray-400 text-sm">(Eu conheço as travas de quem está começando)</span>
              </div>
            </div>
          </div>

          <p className="text-lg italic text-gray-400 border-l-4 border-primary pl-6">
                        "Eu não estou aqui para te agradar. Estou aqui para te dar a segurança que ninguém mais teve coragem de te dar."
          </p>
        </div>
      </div>
    </section>
  );
};
