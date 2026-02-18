import React from 'react';
import { scrollToSection } from '../../utils/scroll';

export const HeroV2: React.FC = () => {
  return (
    <section className="relative bg-background-dark text-white px-6 py-16 lg:py-24 overflow-hidden border-b border-border-dark">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#19e65e 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      ></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight font-mono uppercase">
            Pare de namorar a tecnologia e decida se vai{' '}
            <span className="text-primary">casar</span> ou{' '}
            <span className="text-red-500">terminar</span>.
          </h1>

          <p className="text-gray-300 font-light text-lg md:text-xl max-w-2xl mx-auto lg:mx-0">
            Você está há meses com 20 abas abertas, salvando posts e pesquisando
            cursos, mas travado pelo medo de escolher errado?
            <br />
            <br />
            Faça um{' '}
            <strong className="text-white">
              Test-Drive da Carreira Tech
            </strong>{' '}
            em uma única noite antes de gastar anos e milhares de reais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
            <button
              onClick={() => scrollToSection('pricing')}
              className="flex items-center justify-center h-16 px-8 rounded-lg bg-primary hover:bg-green-400 text-[#0D1117] text-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(25,230,94,0.3)] font-mono uppercase tracking-wide"
            >
              QUERO FAZER MEU TEST-DRIVE (R$ 97)
            </button>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-2 text-primary font-mono text-sm mt-2">
            <span className="animate-pulse">●</span> (27/02/2026 - Ao Vivo)
          </div>
        </div>

        {/* Visual/Image */}
        <div className="relative flex justify-center items-center order-1 lg:order-2">
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-40"></div>
          <div className="relative rounded-2xl overflow-hidden border border-border-dark shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 max-w-md mx-auto">
            <img
              src="/assets/images/venicios-profile.webp"
              alt="Venicios Ribeiro"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6">
              <p className="text-white font-mono text-sm border-l-2 border-primary pl-3">
                "A indecisão é o único erro que custa caro."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
