import React from 'react';
import { VerifiedUserIcon } from '../icons';

export const SementeAuthority: React.FC = () => {
  return (
    <section
      className="bg-background-dark py-10 px-6 text-white border-y border-border-dark"
      id="mentor"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-1 lg:order-1 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl transform -rotate-3 scale-105 opacity-50"></div>
          <div className="relative rounded-xl overflow-hidden border border-border-dark shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="/assets/images/venicios-profile.webp"
              width={400}
              height={500}
              alt="Venicios Ribeiro - Mentor de Carreira Tech"
              className="w-full h-auto object-cover aspect-[3/3]"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
              <div className="font-mono text-white text-xl font-bold">
                Venicios Ribeiro
              </div>
              <div className="font-mono text-primary text-sm">
                Coordenador de Engenharia de Software
              </div>
            </div>
          </div>
        </div>

        <div className="order-2 lg:order-2">
          <div className="inline-flex items-center gap-2 mb-8 text-primary font-mono text-sm tracking-widest uppercase font-bold">
            <VerifiedUserIcon className="text-sm" />
            Quem Vai Conduzir o Webinário
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-mono leading-tight text-white">
            Não sou influencer vendedor de curso
          </h2>

          <div className="relative mb-8">
            <p className="text-gray-400 italic text-lg leading-relaxed">
              Estou na área de tecnologia há mais de 20 anos: 12 como
              programador e 8 em posições de liderança. Hoje sou Coordenador de
              Engenharia de Software no maior banco da América Latina, onde
              entrei como Tech Lead. Conduzi mais de 500 sessões de mentoria,
              analisei mais de 700 currículos e participei de decisões de
              contratação, promoção e desligamento — sei o que separa quem é
              reconhecido de quem fica invisível, porque estive dos dois lados
              da mesa.
            </p>
          </div>

          <div className="relative mb-8">
            <p className="text-gray-400 italic text-lg leading-relaxed border-l-4 border-primary pl-6">
              Criei esse Webinário porque cansei de ver profissionais
              competentes trabalhando duro e continuando invisíveis, sem saber o
              que realmente precisa mudar.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-y border-border-dark py-6">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">
                +20
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Anos de Experiência — 12 como desenvolvedor, 8 como líder.
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">
                +500
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Sessões de Mentoria Realizadas — Sei o que te trava e o que te
                destrava.
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">
                +700
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Currículos Analisados — Sei o que separa quem avança de quem
                fica parado.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
