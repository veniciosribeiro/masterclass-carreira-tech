import React from 'react';
import { ExpandMoreIcon } from './icons';

export const FAQ: React.FC = () => {
  return (
    <section
      className="px-6 py-10 bg-background-dark border-t border-border-dark"
      id="faq"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            Antes de Decidir
          </span>
          <h2 className="text-3xl font-bold text-center mt-6 text-white font-mono">
            Perguntas Frequentes
          </h2>
        </div>
        <div className="space-y-4">
          {/* FAQ 1: Acesso */}
          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Como recebo o acesso?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Imediato. Assim que o pagamento for aprovado, você recebe um
              e-mail com suas credenciais. Acesso liberado em minutos — sem
              espera, sem burocracia.
            </div>
          </details>

          {/* FAQ 2: Disponibilidade */}
          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Por quanto tempo fica disponível?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Acesso vitalício on-demand. Assista no seu ritmo, reveja os
              módulos quantas vezes quiser. A masterclass é sua para sempre.
            </div>
          </details>

          {/* FAQ 3: E se não for pra mim? */}
          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; E se eu descobrir que tech não é pra mim?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Então você acabou de economizar R$50 mil e 4 anos numa faculdade
              errada — por apenas R$97. Essa é exatamente a função da
              Masterclass: te dar a resposta, seja ela qual for. Saber que{' '}
              <strong>não</strong> é pra você vale tanto quanto saber que{' '}
              <strong>é</strong>. Ambas te libertam da paralisia.
            </div>
          </details>

          {/* FAQ 4: Já comprei cursos */}
          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Já comprei cursos e não terminei. Serve pra mim?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              É exatamente pra você. Se você comprou cursos mas nunca terminou
              ou se sentiu perdido no meio do caminho, a Masterclass funciona
              como um filtro estratégico. Ela te ajuda a entender o "porquê" e o
              "como" da indústria antes de se atolar em sintaxe de novo.
            </div>
          </details>

          {/* FAQ 5: Pré-requisitos */}
          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Preciso saber programar ou ter notebook potente?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Não. Zero conhecimento prévio. E no Módulo 2 você descobre que não
              precisa de PC de R$10k — qualquer notebook com SSD e 8GB de RAM já
              resolve. O teste de aptidão é 100% conceitual, sem escrever uma
              linha de código.
            </div>
          </details>

          {/* FAQ 6: Garantia */}
          <details className="group bg-surface-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">
                &gt; Tem garantia?
              </span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">
                // Response:
              </span>
              Sim. 30 dias de garantia incondicional. Se após assistir a
              Masterclass você sentir que não valeu os R$97, devolvemos 100% do
              seu investimento. Sem perguntas, sem burocracia. O risco é todo
              nosso.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};
