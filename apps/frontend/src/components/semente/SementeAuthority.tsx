import React from 'react';

export const SementeAuthority: React.FC = () => {
  return (
    <section
      className="bg-background-dark py-10 px-6 text-white border-y border-border-dark"
      id="mentor"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div className="order-1 lg:order-1 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl transform -rotate-3 scale-105 opacity-50"></div>
          <div className="relative rounded-xl overflow-hidden border border-border-dark shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="/assets/images/venicios-profile-1024.webp"
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
          <div className="inline-flex items-center gap-2 mb-3 text-primary font-mono text-3xl md:text-3xl tracking-widest uppercase font-bold">
            <h2>Já estive dos dois lados da mesa.</h2>
          </div>

          <div className="relative mb-4 text-gray-400 italic text-lg leading-relaxed">
            <p className="mb-3">
              Também passei por isso e conheço a frustração de quem está
              esperando o reconhecimento e ele não vem. Acreditava que entregar
              muito era suficiente e seria percebido naturalmente.
            </p>
            <p className="mb-3">
              Estou na área de tecnologia há mais de 20 anos: 12 como
              programador e 8 em posições de liderança.
            </p>
            <p>
              Hoje sou Coordenador de Engenharia de Software no maior banco da
              América Latina. Sei o que separa quem é reconhecido de quem fica
              invisível, porque estive dos dois lados da mesa.
            </p>
          </div>

          <div className="relative mb-6">
            <p className="text-gray-400 italic text-lg leading-relaxed border-l-4 border-primary pl-6">
              Criei esse Webinário porque cansei de ver profissionais
              competentes trabalhando duro e continuando invisíveis, sem saber o
              que realmente precisa mudar.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-6 border-y border-border-dark py-4">
            <div>
              <div className="text-3xl md:text-3xl font-bold text-white mb-1 font-mono">
                20+
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                <p className="text-sm text-white mb-2">ANOS EM TECNOLOGIA</p>
                <p>12 COMO DESENVOLVEDOR</p>
                <p>8 EM LIDERANÇA</p>
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-3xl font-bold text-white mb-1 font-mono">
                500+
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                <p className="text-sm text-white mb-2">SESSÕES DE MENTORIA</p>
                <p>SEI O QUE TE TRAVA E O QUE TE DESTRAVA</p>
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-3xl font-bold text-white mb-1 font-mono">
                700+
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                <p className="text-sm text-white mb-2">CURRÍCULOS ANALISADOS</p>
                <p>SEI O QUE TE ELIMINA E O QUE TE DESTACA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
