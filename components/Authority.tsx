import React from 'react';
import { VerifiedUserIcon } from './icons';

export const Authority: React.FC = () => {
  return (
    <section
      className="bg-background-dark py-10 px-6 text-white border-y border-border-dark"
      id="authority"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Image Column - Moved to Left */}
        <div className="order-1 lg:order-1 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl transform -rotate-3 scale-105 opacity-50"></div>
          <div className="relative rounded-xl overflow-hidden border border-border-dark shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="/assets/images/venicios-profile.webp"
              width={400}
              height={500}
              alt="Venicios Ribeiro - Coordenador de Engenharia de Software"
              className="w-full h-auto object-cover aspect-[3/3]"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
              <div className="font-mono text-white text-xl font-bold">
                Venicios.sys
              </div>
              <div className="font-mono text-primary text-sm">
                Root Administrator
              </div>
            </div>
          </div>
        </div>

        {/* Text Column - Moved to Right */}
        <div className="order-2 lg:order-2">
          <div className="inline-flex items-center gap-2 mb-2 text-primary font-mono text-sm tracking-widest uppercase font-bold">
            <VerifiedUserIcon className="text-sm" />
            Quem Vai Conduzir Essa Masterclass
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-mono leading-tight text-white">
            Venicios <span className="text-gray-500">[Ribeiro]</span>
          </h2>

          <div className="relative mb-8">
            <p className="text-gray-400 text-lg mb-8 font-light">
              Coordenador de Engenharia de Software, mentor e especialista em
              evolução de carreira.
            </p>

            <p className="text-gray-400 italic text-lg leading-relaxed">
              Não sou influencer vendedor de curso. Sou Gestor e uso essa visão
              para blindar profissionais contra erros de carreira, ajudando-os a
              encontrar seu caminho na área de tecnologia e a se desenvolverem
              profissionalmente.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 border-y border-border-dark py-6">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">
                +20
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Anos de Experiência
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">
                +500
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Sessões de Mentoria Realizadas
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">
                +700
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Currículos Analisados
              </div>
            </div>
          </div>

          <div className="relative">
            <p className="text-gray-400 italic text-lg leading-relaxed border-l-4 border-primary pl-6">
              Criei a Masterclass Test-Drive Da Carreira Tech porque cansei de
              ver pessoas competentes e com potencial completamente perdidas,
              sem orientação, sem saber se tem aptidão e como ingressar na
              tecnologia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
