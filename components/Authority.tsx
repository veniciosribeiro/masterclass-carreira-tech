import React from 'react';

export const Authority: React.FC = () => {
  return (
    <section className="bg-background-dark py-20 px-6 text-white border-y border-border-dark" id="authority">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-sm tracking-widest uppercase">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            Validado por quem contrata
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono leading-tight">
            Venicios <span className="text-gray-500">[Ribeiro]</span>
          </h2>
          <div className="space-y-6 text-lg text-gray-400">
            <p className="border-l-4 border-primary pl-4 italic text-white">
              Eu criei a Masterclass Test-Drive da Carreira Tech porque cansei de ver pessoas competentes e com potencial
              completamente perdidas, sem saber se tem aptidão e como ingressar na tecnologia.
              Eu quero te dar a clareza que eles não tiveram.
            </p>
            <ul className="space-y-4 mt-6">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span>Coordenador de Engenharia de Software.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span>20 Anos de Experiência no Campo de Batalha.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span>Mais de 400 Sessões de Mentorias Individuais.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl transform rotate-3 scale-105 opacity-50"></div>
          <div className="relative rounded-xl overflow-hidden border border-border-dark shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqpb_0oUzVPAruddM7T2MnkSCKyotyxWcn1BBnZEa2yugilb_Tbt9Pe4GA73P4Rbgmxan4o0lGe6WbtGNnn2J0VRi3lcdTKnFVCE5IFU_dfTZzEOZ5MaBRt_NVkFiYG9Re4AXpQcMMNlPoClzWZzYSvP6nwlQPp_5Q6brmVOUxBXcj1lIhUxDWg-BnjkFoETkZ_v8WQpBXDk0h-7DCpWJ-2_TlWZkBaap8mNA1vDpbPykwPr6tHYTtGoi4n5TSf5xaLPn0wr-cjwFa"
              alt="Venicios - Hiring Manager"
              className="w-full h-auto object-cover aspect-[4/5]"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
              <div className="font-mono text-white text-xl font-bold">Venicios.sys</div>
              <div className="font-mono text-primary text-sm">Root Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};