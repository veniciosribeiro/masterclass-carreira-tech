import React from 'react';
import {
  PsychologyAltIcon,
  SentimentWorriedIcon,
  LaptopIcon,
  PsychologyIcon,
  SettingsSystemDaydreamIcon,
  AttachMoneyIcon,
  VisibilityIcon,
} from './icons';

export const ProtocolOverview: React.FC = () => {
  return (
    <section
      className="bg-surface-dark py-10 px-6 overflow-hidden relative"
      id="mechanism"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            O Protocolo de Desbloqueio
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-6 text-white font-mono leading-tight">
            Para cada trava dúvida,{' '}
            <span className="text-primary">uma chave de acesso.</span>
          </h2>
          <p className="text-gray-400 mt-6 font-light text-md">
            Você precisa de um método que elimine as suas dúvidas.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Bloco 1: Reality Shock + Entregável */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            {/* Left: The Fear */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500 font-mono text-6xl font-black select-none pointer-events-none">
                ERROR 403
              </div>
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <SentimentWorriedIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">
                    Trava: "Tenho medo da rotina real"
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    "Vejo influenciadores trabalhando 4h por dia na praia
                    ganhando 5k. E se a realidade for muito mais estressante e
                    eu não aguentar a pressão?"
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Solution + Entregável */}
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              {/* Módulo */}
              <div className="flex items-start gap-4 mb-6">
                <div className="size-12 rounded-lg bg-blue-900/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-900/30">
                  <VisibilityIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">
                      Módulo 1: O Choque de Realidade
                    </h4>
                    <div className="text-[10px] font-mono text-blue-400 bg-blue-900/10 py-0.5 px-2 rounded border border-blue-900/20 uppercase">
                      Sem Filtro
                    </div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Vamos matar o hype. Você vai conhecer a rotina nua e crua, a
                    verdadeira curva salarial e a diferença entre ganhar
                    dinheiro rápido e construir uma carreira sólida.
                  </p>
                </div>
              </div>

              {/* ENTREGÁVEL */}
              <div className="border-t border-border-dark pt-6">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                    <AttachMoneyIcon className="text-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-bold text-base text-primary font-mono">
                        Entregável: "A Verdade que Ninguém Te Conta"
                      </h5>
                      <div className="text-[9px] font-mono text-gray-500 bg-gray-900/30 py-0.5 px-2 rounded border border-gray-700/30 uppercase">
                        PDF
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-light">
                      A vacina contra promessas falsas. Salários reais e o que
                      esperar da faculdade no primeiro ano, sem filtro de
                      marketing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 2: Setup / Hardware + Entregável */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            {/* Left: The Fear */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500 font-mono text-6xl font-black select-none pointer-events-none">
                ERROR 500
              </div>
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <LaptopIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">
                    Trava: "Meu computador é fraco"
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    "Não tenho dinheiro para comprar um MacBook de 15 mil. Meu
                    inglês não é fluente. Acho que estou velho demais para
                    competir com os mais novos."
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Solution + Entregável */}
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              {/* Módulo */}
              <div className="flex items-start gap-4 mb-6">
                <div className="size-12 rounded-lg bg-purple-900/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-900/30">
                  <SettingsSystemDaydreamIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">
                      Módulo 2: O Check-up de Infraestrutura
                    </h4>
                    <div className="text-[10px] font-mono text-purple-400 bg-purple-900/10 py-0.5 px-2 rounded border border-purple-900/20 uppercase">
                      Auditoria
                    </div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Você vai descobrir que programar exige menos máquina do que
                    imagina. Vamos auditar seus requisitos reais (hardware,
                    inglês, idade) e derrubar esses mitos.
                  </p>
                </div>
              </div>

              {/* ENTREGÁVEL */}
              <div className="border-t border-border-dark pt-6">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                    <LaptopIcon className="text-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-bold text-base text-primary font-mono">
                        Entregável: "Você Não Precisa de PC de R$ 10k"
                      </h5>
                      <div className="text-[9px] font-mono text-gray-500 bg-gray-900/30 py-0.5 px-2 rounded border border-gray-700/30 uppercase">
                        Checklist
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-light">
                      Receba um Checklist do que você realmente precisa para
                      começar sem gastar um centavo a mais do que o necessário.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 3: Financial Decision (ROI) + Entregável */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            {/* Left: The Fear */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500 font-mono text-6xl font-black select-none pointer-events-none">
                ERROR 402
              </div>
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <AttachMoneyIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">
                    Trava: "Tenho medo de rasgar dinheiro"
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    "Não sei se faço faculdade de 4 anos ou um bootcamp de 2 mil
                    reais. Tenho medo de investir alto, comprar dezenas de
                    cursos e acabar como um 'estudante profissional'
                    desempregado."
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Solution + Entregável */}
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              {/* Módulo */}
              <div className="flex items-start gap-4 mb-6">
                <div className="size-12 rounded-lg bg-green-900/20 text-green-400 flex items-center justify-center shrink-0 border border-green-900/30">
                  <AttachMoneyIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">
                      Módulo 3: A Decisão Financeira
                    </h4>
                    <div className="text-[10px] font-mono text-green-400 bg-green-900/10 py-0.5 px-2 rounded border border-green-900/20 uppercase">
                      ROI
                    </div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Uma análise fria do Retorno sobre Investimento. Vamos
                    colocar na balança Faculdade vs Bootcamp e calcular em
                    quanto tempo o seu investimento realmente se paga.
                  </p>
                </div>
              </div>

              {/* ENTREGÁVEL */}
              <div className="border-t border-border-dark pt-6">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                    <AttachMoneyIcon className="text-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-bold text-base text-primary font-mono">
                        Entregável: "Saiba em Quantos Meses o Investimento se
                        Paga"
                      </h5>
                      <div className="text-[9px] font-mono text-gray-500 bg-gray-900/30 py-0.5 px-2 rounded border border-gray-700/30 uppercase">
                        Calculadora
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-light">
                      Matemática contra a ansiedade. Insira o valor do curso que
                      você quer fazer e descubra em quantos meses o investimento
                      se paga. Se a conta não fechar, você não entra.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 4: Logic / Aptitude + Entregável */}
          <div className="grid md:grid-cols-2 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-lg group hover:border-primary/30 transition-all duration-500">
            {/* Left: The Fear */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border-dark bg-[#0D1117] flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500 font-mono text-6xl font-black select-none pointer-events-none">
                ERROR 404
              </div>
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-lg bg-red-900/20 text-red-400 flex items-center justify-center shrink-0 border border-red-900/30">
                  <PsychologyAltIcon className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-red-400 font-mono mb-2">
                    Trava: "Sou de Humanas"
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    "Acho que preciso ser um gênio em matemática avançada para
                    programar. Como vou saber se o meu cérebro funciona para
                    escrever códigos?"
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Solution + Entregável */}
            <div className="p-8 bg-surface-dark flex flex-col justify-center relative group-hover:bg-[#161b22] transition-colors">
              {/* Módulo */}
              <div className="flex items-start gap-4 mb-6">
                <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                  <PsychologyIcon className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl text-white font-mono">
                      Módulo 4: O Teste de Aptidão
                    </h4>
                    <div className="text-[10px] font-mono text-primary bg-primary/10 py-0.5 px-2 rounded border border-primary/20 uppercase">
                      Prática
                    </div>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Sem escrever uma linha de código, vamos testar o "Hardware"
                    do seu cérebro. Você vai passar pelo desafio da Lógica e
                    medir sua tolerância à frustração real.
                  </p>
                </div>
              </div>

              {/* ENTREGÁVEL */}
              <div className="border-t border-border-dark pt-6">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                    <PsychologyIcon className="text-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-bold text-base text-primary font-mono">
                        Entregável: "O Veredito: Tech é Pra Você ou Não?"
                      </h5>
                      <div className="text-[9px] font-mono text-gray-500 bg-gray-900/30 py-0.5 px-2 rounded border border-gray-700/30 uppercase">
                        Laudo
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-light">
                      O Veredito. Não é um certificado de participação. É um
                      documento atestando se sua lógica é compatível com a
                      exigência do mercado. Sua prova de segurança.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
