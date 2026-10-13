import React from 'react';
import { SementeFormCard } from './SementeFormCard';
import { WEBINAR_DATE_LABEL_1 } from './sementeConfig';

export const SementeHero: React.FC = () => {
  return (
    <section className="relative bg-background-dark text-white px-6 py-10 lg:py-15 overflow-hidden border-b border-border-dark">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#19e65e 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      ></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <span className="inline-block self-center lg:self-start text-primary tracking-widest uppercase text-md font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            {WEBINAR_DATE_LABEL_1}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-black leading-tight tracking-tight font-mono">
            Promoção não é prêmio por entregar bem.
            {/* A premissa (linha 1) sozinha deixa a pergunta "então é prêmio
                pelo quê?" aberta; a promessa (linha 2) fecha no próprio título. */}
            <span className="block mt-4 text-lg md:text-2xl text-primary font-bold">
              Descubra o que quem decide precisa enxergar para considerar você
              pronto para o próximo nível.
            </span>
          </h1>
          {/* Hero com três níveis só: título, promessa e autoridade. A data
              fica no selo acima; o "sem se vender" é respondido na seção
              seguinte e no FAQ. A autoridade responde ao "quem é você para
              saber?" que a promessa provoca: por isso começa ligada a ela. */}
          <p className="text-gray-400 font-light text-lg max-w-3xl mx-auto lg:mx-0">
            Eu sei o que eles enxergam porque estive dos dois lados da mesa: 12
            anos como desenvolvedor e 8 participando de decisões de contratação,
            promoção e desligamento.
          </p>
        </div>
        <div className="relative flex justify-center items-center">
          <SementeFormCard />
        </div>
      </div>
    </section>
  );
};
