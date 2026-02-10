import React from 'react';
import { ErrorIcon, VerifiedIcon } from './icons';

export const RealityCheck: React.FC = () => {
  return (
    <section className="px-6 py-10 bg-[#0b0e11]" id="reality">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">
            O "Cemitério dos Devs" está cheio de gente que confundiu <span className="text-gray-600 line-through decoration-red-500 decoration-2">Hype</span> com Vocação.
          </h2>
          <p className="text-gray-400 mt-4 font-light text-md">
            Influenciadores Digitais faturam alto vendendo cursos e promessas, mas a realidade é que a maioria é enganada pelo Hype do mercado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="p-10 rounded-xl bg-surface-dark border border-red-900/30 relative overflow-hidden group">
              <div className="absolute left-0 top-0 w-1 h-full bg-red-600"></div>
              <h4 className="text-red-400 font-bold font-mono mb-2 flex items-center gap-2">
                <ErrorIcon />
                A Fantasia dos Influenciadores
              </h4>
              <p className="text-gray-400">
                "Trabalhe da praia", "Ganhe 5k em 6 meses", "Aprenda IA sem ser programador", "Compre meu curso e seja contratado", "Trabalhe no exterior e ganhe em dólar".
              </p>
            </div>

            <div className="p-10 rounded-xl bg-surface-dark border border-primary/30 relative overflow-hidden group">
              <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>
              <h4 className="text-primary font-bold font-mono mb-2 flex items-center gap-2">
                <VerifiedIcon />
                A Realidade na Masterclass
              </h4>
              <p className="text-gray-400">
                Você precisa descobrir se tem perfil para ser programador, entender o mercado, o dia-a-dia de um dev e ter as respostas para as suas dúvidas.
              </p>
            </div>
          </div>

          <div className="relative rounded-xl bg-[#161b22] border border-border-dark p-8 shadow-2xl">
            <h4 className="font-mono text-center text-gray-500 mb-6 text-sm">ANÁLISE DE TRAJETÓRIA</h4>

            {/* Simple CSS Graph Visualization */}
            <div className="relative h-64 w-full border-l border-b border-gray-700">
              {/* Combined SVG for both lines */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 260" preserveAspectRatio="none">
                {/* Labels for Estrategyst */}
                <text x="315" y="10" fill="#19e65e" fontSize="13" fontFamily="monospace" fontWeight="bold">Masterclass</text>

                {/* Green Line (Estrategista) - starts from origin with smoother curves */}
                <path d="M0,260 C40,250 80,230 120,180 C160,130 220,70 280,40 C320,20 350,40 370,20" fill="none" stroke="#19e65e" strokeWidth="3" />

                {/* Labels for Pato */}
                <text x="290" y="230" fill="#ef4444" fontSize="13" fontFamily="monospace" fontWeight="bold">Influenciadores</text>

                {/* Red Line (Pato) - starts from origin */}
                <path d="M0,260 C50,210 100,160 150,160 C200,160 250,260 370,240" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />
              </svg>

              {/* Origin point marker */}
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-500 rounded-full -ml-1 -mb-1"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-mono mt-4">
              <span>Resultado</span>
              <span>Tempo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};