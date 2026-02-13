import React from 'react';

export const MindsetShiftV2: React.FC = () => {
  return (
    <section className="bg-primary py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-[#0D1117] mb-8 font-mono leading-tight">
          "SEU MEDO NÃO É COVARDIA. <br /> É INTELIGÊNCIA FINANCEIRA."
        </h2>

        <div className="space-y-4 text-[#0D1117] text-lg md:text-xl font-medium max-w-3xl mx-auto">
          <p>
            Você não está procrastinando. Você está tentando gerenciar riscos
            sem ter as ferramentas certas.
          </p>
          <p>
            O mercado quer te vender o curso <strong>ANTES</strong> de saber se
            você serve para a área.
          </p>
          <p className="opacity-80 italic">
            Isso é como um médico marcar a cirurgia antes de pedir o exame de
            sangue.
          </p>

          <div className="mt-8 pt-8 border-t border-black/10 inline-block">
            <span className="bg-[#0D1117] text-primary px-6 py-3 rounded-lg font-bold font-mono uppercase tracking-widest text-sm">
              Nós vamos inverter essa lógica
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
