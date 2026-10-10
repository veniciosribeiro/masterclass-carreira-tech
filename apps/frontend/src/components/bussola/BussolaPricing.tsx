import React from 'react';
import {
  ArrowForwardIcon,
  AutoAwesomeIcon,
  ExploreIcon,
  VerifiedIcon,
  VisibilityIcon,
} from '../icons';
import { CHECKOUT_URL } from './bussolaConfig';
import { sendEvent } from '../../utils/metaPixel';

// Segura o redirect por um instante pra dar tempo do POST pro events API
// (e o fbq('track') correspondente) completarem antes do browser navegar
// pra fora da página. Mesmo padrão do track.js pro clique de checkout.
const CHECKOUT_REDIRECT_DELAY_MS = 1500;

function handleCheckoutClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  redirectUrl: string,
  params: Record<string, unknown>
): void {
  event.preventDefault();
  void sendEvent('InitiateCheckout', params);
  setTimeout(() => {
    window.location.href = redirectUrl;
  }, CHECKOUT_REDIRECT_DELAY_MS);
}

// Valor de referência de cada bônus, aprovado pelo Expert em 10/10/2026.
const BONUSES: { name: string; desc: string; value: number }[] = [
  {
    name: 'Mentoria ao vivo em grupo',
    desc: 'Encontro mensal ao vivo, gravado e disponível para sempre.',
    value: 497,
  },
  {
    name: 'Comunidade privada por 12 meses',
    desc: 'Network, troca de experiências, vagas e suporte.',
    value: 397,
  },
  {
    name: 'LinkedIn Irresistível',
    desc: 'Como estruturar o seu perfil para ser encontrado e causar uma boa primeira impressão.',
    value: 297,
  },
  {
    name: 'Trilha da Influência',
    desc: 'Como se posicionar com a sua liderança, de forma estratégica e sincera.',
    value: 297,
  },
  {
    name: 'Currículo à Prova de ATS',
    desc: 'Como estruturar o currículo para a triagem e para quem o lê.',
    value: 197,
  },
  {
    name: 'Template de Documentação de Impacto',
    desc: 'Registre o que você fez e o impacto, sem depender da memória.',
    value: 67,
  },
  {
    name: 'Checklist de Pronto para Promoção',
    desc: 'Saiba se já é a hora de abrir a conversa de promoção.',
    value: 47,
  },
];

// O que o aluno leva de cada módulo (artefatos do Canvas, §3).
const COURSE: { name: string; desc: string }[] = [
  {
    name: 'Módulo 1 · Norte',
    desc: 'Você sai com a sua Declaração de Norte: destino único e rota justificada.',
  },
  {
    name: 'Módulo 2 · Raio-X Profissional',
    desc: 'Você sai com a leitura real da sua situação: competências, forças e feedbacks.',
  },
  {
    name: 'Módulo 3 · Régua do Destino',
    desc: 'Você sai com o Mapa da Distância entre onde está e o que o próximo nível exige.',
  },
  {
    name: 'Módulo 4 · Alavancas 20/80',
    desc: 'Você sai com os poucos blocos de avanço que merecem a sua energia primeiro.',
  },
  {
    name: 'Módulo 5 · Ação e Evidência',
    desc: 'Você sai com o seu PDI versionado e o primeiro ciclo de ação com evidências.',
  },
  {
    name: 'Ao vivo e gravado',
    desc: 'Um encontro por semana, de até 3 horas. Cada aula é editada e liberada em até 2 dias.',
  },
];

// O que o aluno leva da mentoria individual, sem prometer o 1:1.
const MENTORING: { name: string; desc: string; icon: React.FC }[] = [
  {
    name: 'O método da mentoria individual, mas em grupo',
    desc: 'As 5 etapas que eu aplico com meus mentorados, da direção até a prova do seu avanço.',
    icon: ExploreIcon,
  },
  {
    name: 'O seu caso, respondido ao vivo',
    desc: 'Todo mês você traz a sua situação para a mentoria em grupo e eu respondo na hora.',
    icon: VisibilityIcon,
  },
  {
    name: 'Duas revisões escritas do seu plano',
    desc: 'Eu reviso o seu plano completo e indico os ajustes que faria a você.',
    icon: VerifiedIcon,
  },
];

const ALSO_INCLUDED = [
  'Kits e exercícios de cada módulo',
  'Suporte por e-mail',
  'Kit de acompanhamento pós-curso',
];

const COURSE_VALUE = 597;

const brl = (value: number): string => `R$ ${value.toLocaleString('pt-BR')}`;

const bonusTotal = BONUSES.reduce((sum, b) => sum + b.value, 0);
const stackTotal = bonusTotal + COURSE_VALUE;

const boxClass =
  'relative flex flex-col overflow-hidden rounded-xl border-2 border-primary/60 bg-surface-dark p-8 shadow-[0_0_40px_rgba(25,230,94,0.12)]';
const colHeadClass =
  'relative z-10 grid grid-cols-[1fr_auto_auto] gap-x-5 items-end text-xs font-mono uppercase text-gray-500 pb-2 border-b border-border-dark';
const rowClass =
  'grid grid-cols-[1fr_auto_auto] gap-x-5 items-center py-4 border-b border-dashed border-border-dark';

export const BussolaPricing: React.FC = () => {
  return (
    <section
      className="px-6 py-10 bg-background-dark border-t border-border-dark"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 max-w-5xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-xs font-mono border border-primary/30 px-2 py-1 rounded bg-primary/10">
            Turma Inaugural
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-6 font-mono leading-tight">
            A escolha é sua: continuar invisível ou ser quem a liderança lembra
            na hora de promover?
          </h2>
          <p className="text-primary font-black font-mono text-xl md:text-3xl leading-snug mt-5">
            A Bússola tem tudo que você precisa + bônus exclusivos da turma
            inaugural
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {MENTORING.map((item) => (
            <div
              key={item.name}
              className="flex md:block gap-4 rounded-xl border border-border-dark bg-surface-dark p-5 md:p-6"
            >
              <span className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 border border-primary/30 text-primary text-2xl flex items-center justify-center md:mb-4">
                <item.icon />
              </span>
              <div>
                <h4 className="font-bold text-white font-mono mb-1 md:mb-2">
                  {item.name}
                </h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-1 gap-6 items-stretch">
          {/* Bônus */}
          <div className={boxClass}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/30 text-primary text-2xl flex items-center justify-center">
                <AutoAwesomeIcon />
              </span>
              <div>
                <h3 className="text-primary font-mono font-black uppercase tracking-widest text-lg leading-tight">
                  Bônus exclusivos
                </h3>
                <p className="text-gray-400 text-sm">
                  O valor de cada um, e quanto você paga hoje.
                </p>
              </div>
            </div>

            <div className={colHeadClass}>
              <span>Bônus</span>
              <span className="text-right">Valor</span>
              <span className="text-right">Hoje</span>
            </div>
            <ul className="relative z-10 flex flex-1 flex-col">
              {BONUSES.map((bonus) => (
                <li key={bonus.name} className={`${rowClass} flex-1`}>
                  <div>
                    <span className="block font-bold text-white font-mono">
                      {bonus.name}
                    </span>
                    <span className="block text-gray-400 text-sm mt-1">
                      {bonus.desc}
                    </span>
                  </div>
                  <span className="font-mono text-gray-500 line-through whitespace-nowrap text-right">
                    {brl(bonus.value)}
                  </span>
                  <span className="font-mono text-primary font-black text-xl whitespace-nowrap text-right">
                    R$ 0
                  </span>
                </li>
              ))}
            </ul>
            <p className="relative z-10 flex justify-between items-center gap-4 pt-5 font-mono font-black uppercase text-lg md:text-2xl leading-tight">
              <span className="text-white text-balance">
                Total de desconto somente em bônus
              </span>
              <span className="text-primary whitespace-nowrap">
                {brl(bonusTotal)}
              </span>
            </p>
          </div>

          {/* Curso */}
          <div className={boxClass}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/30 text-primary text-2xl flex items-center justify-center">
                <ExploreIcon />
              </span>
              <div>
                <h3 className="text-primary font-mono font-black uppercase tracking-widest text-lg leading-tight">
                  O curso
                </h3>
                <p className="text-gray-400 text-sm">
                  5 módulos, 14 aulas e 5 checkpoints. O que você leva de cada
                  um.
                </p>
              </div>
            </div>

            <div className={colHeadClass}>
              <span>Entrega</span>
              <span className="text-right">&nbsp;</span>
              <span className="text-right">Status</span>
            </div>
            <ul className="relative z-10">
              {COURSE.map((item) => (
                <li key={item.name} className={rowClass}>
                  <div>
                    <span className="block font-bold text-white font-mono">
                      {item.name}
                    </span>
                    <span className="block text-gray-400 text-sm mt-1">
                      {item.desc}
                    </span>
                  </div>
                  <span></span>
                  <span className="font-mono text-primary font-black text-lg whitespace-nowrap text-right">
                    Incluso
                  </span>
                </li>
              ))}
            </ul>

            <p className="relative z-10 text-gray-400 text-sm py-4 border-b border-dashed border-border-dark">
              <span className="text-gray-300 font-mono font-bold">
                Também incluso:
              </span>{' '}
              {ALSO_INCLUDED.join(' • ')}
            </p>

            <div className="relative z-10 mt-auto pt-8 text-center w-full">
              <p className="text-left font-mono font-black text-white text-lg md:text-xl leading-snug mb-4">
                Se você fosse comprar os bônus individualmente + o valor do
                curso
              </p>
              <div className="text-left font-mono text-base md:text-lg text-gray-300">
                <p className="flex justify-between py-1.5">
                  <span>7 bônus exclusivos</span>
                  <span>{brl(bonusTotal)}</span>
                </p>
                <p className="flex justify-between py-1.5">
                  <span>Curso completo</span>
                  <span>{brl(COURSE_VALUE)}</span>
                </p>
              </div>
              <p className="mt-2 flex justify-between items-center border-t border-dashed border-border-dark pt-4 font-mono font-black text-white uppercase text-xl md:text-2xl">
                <span>Valor total</span>
                <span className="line-through decoration-2 decoration-gray-500">
                  {brl(stackTotal)}
                </span>
              </p>
              <div className="max-w-4xl mx-auto">
                <p className="font-mono text-white text-xl md:text-2xl leading-snug mt-10 max-w-3xl mx-auto">
                  <span className="md:whitespace-nowrap">
                    Mas hoje, você não paga{' '}
                    <span className="whitespace-nowrap">{brl(stackTotal)}</span>
                    ,
                  </span>{' '}
                  <span className="md:whitespace-nowrap">
                    nem os <span className="whitespace-nowrap">R$ 5.997</span>{' '}
                    da mentoria individual.
                  </span>
                </p>
                <p className="font-mono font-bold text-primary text-lg md:text-xl leading-snug mt-8">
                  Na turma inaugural, você paga apenas:
                </p>
                <p className="text-4xl md:text-6xl font-black text-white font-mono mt-3 whitespace-nowrap">
                  12x de R$ 30,68
                </p>
                <p className="font-mono font-bold text-primary text-lg md:text-xl mt-3">
                  ou à vista por R$ 297
                </p>

                <a
                  href={CHECKOUT_URL}
                  onClick={(e) =>
                    handleCheckoutClick(e, CHECKOUT_URL, {
                      content_name: 'Turma inaugural',
                      value: 297,
                      currency: 'BRL',
                    })
                  }
                  className="w-full max-w-2xl mx-auto mt-6 h-14 rounded bg-primary hover:bg-green-400 text-[#0D1117] font-bold shadow-[0_0_25px_rgba(25,230,94,0.35)] transition-all font-mono uppercase text-lg tracking-wide flex items-center justify-center gap-2"
                >
                  <span>Entrar na turma inaugural</span>
                  <ArrowForwardIcon />
                </a>
                <p className="text-sm md:text-base text-white mt-4">
                  50 vagas na turma inaugural • 7 dias de garantia incondicional
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
