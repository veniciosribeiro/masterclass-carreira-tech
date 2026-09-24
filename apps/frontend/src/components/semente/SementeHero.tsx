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
            Entenda por que boas entregas nem sempre se transformam em
            reconhecimento.
          </h1>
          <p className="text-gray-400 font-light text-lg md:text-lg max-w-3xl mx-auto lg:mx-0">
            E o que precisa mudar para que um desenvolvedor que já entrega bem
            seja reconhecido e promovido.
          </p>
        </div>
        <div className="relative flex justify-center items-center">
          <SementeFormCard />
        </div>
      </div>
    </section>
  );
};
