import React from 'react';
import { ExpandMoreIcon } from './icons';

export const FAQ: React.FC = () => {
  return (
    <section className="px-6 py-10 bg-surface-dark border-t border-border-dark" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">Central de Suporte</span>
          <h2 className="text-3xl font-bold text-center mt-6 text-white font-mono">Perguntas Frequentes</h2>
        </div>
        <div className="space-y-4">
          <details className="group bg-background-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">&gt; Como recebo o acesso?</span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">// Response:</span>
              O acesso é imediato. Assim que seu pagamento for aprovado, você receberá um e-mail com suas credenciais de login para nossa plataforma de alunos. Você pode começar a masterclass em minutos.
            </div>
          </details>
          <details className="group bg-background-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">&gt; Por quanto tempo o conteúdo fica disponível?</span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">// Response:</span>
              Você tem acesso vitalício on-demand a esta edição da masterclass. Assista no seu próprio ritmo, retroceda e revisite os módulos sempre que precisar de uma revisão sobre os conceitos ou configuração de infraestrutura.
            </div>
          </details>
          <details className="group bg-background-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">&gt; Tem suporte para dúvidas?</span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">// Response:</span>
              Sim! Cada aula tem uma seção de comentários dedicada onde nossa equipe e comunidade interagem. Para problemas técnicos com sua conta, também fornecemos um e-mail de suporte dedicado para garantir que você nunca fique preso.
            </div>
          </details>
          <details className="group bg-background-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">&gt; Já comprei cursos, serve para mim?</span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">// Response:</span>
              Com certeza. Se você comprou cursos mas nunca os terminou ou se sentiu "perdido", isso é exatamente o que você precisa. Funciona como um filtro estratégico para ajudá-lo a entender o "porquê" e o "como" da indústria antes de se atolar em sintaxe novamente.
            </div>
          </details>
          <details className="group bg-background-dark rounded-lg border border-border-dark overflow-hidden transition-all duration-300 open:border-primary/30 open:ring-1 open:ring-primary/20">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white text-lg hover:bg-[#1c2128] transition-colors">
              <span className="font-mono text-sm md:text-base">&gt; O teste de lógica emite certificado?</span>
              <span className="transition group-open:rotate-180 text-primary">
                <ExpandMoreIcon />
              </span>
            </summary>
            <div className="text-gray-400 p-6 pt-0 leading-relaxed border-t border-transparent group-open:border-border-dark group-open:pt-6 font-light">
              <span className="text-primary font-mono text-xs block mb-2">// Response:</span>
              Sim. Ao concluir o módulo final, você receberá seu <strong>Relatório de Aptidão</strong> personalizado. Este documento certifica suas capacidades de raciocínio lógico e pode ser uma adição poderosa ao seu portfólio profissional, mesmo fora de tech.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};