import { AreaKey, BehavioralScores, NormalizedScores } from './testTypes';

export const EXPLANATIONS = {
    areas: {
        frontend: {
            high: 'Você demonstra uma sensibilidade visual apurada e forte empatia com a experiência do usuário. Seu foco natural está em como o produto é percebido e utilizado.',
            medium: 'Você compreende bem a importância da interface, mas talvez seu interesse técnico esteja dividido com outras camadas da aplicação.',
            low: 'Seu foco natural não parece ser o visual ou a interação direta com o usuário, preferindo desafios mais lógicos ou estruturais.',
        },
        backend: {
            high: 'Sua lógica de sistemas é robusta e você se sente confortável lidando com o que os usuários não veem: performance, segurança e arquitetura.',
            medium: 'Você entende a estrutura dos sistemas, mas pode preferir trabalhar em componentes onde o resultado seja mais visível ou menos abstrato.',
            low: 'Sistemas complexos, bancos de dados e APIs talvez não sejam o que mais te empolga na tecnologia no momento.',
        },
        dataAI: {
            high: 'Sua mente busca padrões naturalmente. Você tende a tomar decisões baseadas em evidências e tem curiosidade sobre como a inteligência pode ser automatizada.',
            medium: 'Você valoriza dados para embasar decisões, mas seu interesse principal pode estar mais na construção de aplicações do que na análise pura.',
            low: 'A análise profunda de dados e estatística não parece ser seu principal motor de interesse, o que é comum em perfis mais "mão na massa" de produto.',
        },
    },
    behavioral: {
        resilience: {
            high: 'Você demonstra alta tolerância à frustração. Diante de erros complexos, sua tendência é persistir e ver o problema como um desafio, não um bloqueio.',
            medium: 'Você lida bem com problemas até certo ponto, mas pode se beneficiar de pausas estratégicas para não deixar a frustração afetar sua produtividade.',
            low: 'Erros persistentes podem te desgastar rapidamente. Desenvolver "casca grossa" para bugs difíceis será um foco importante na sua carreira.',
        },
        logic: {
            high: 'Seu pensamento é altamente estruturado. Você tende a quebrar grandes problemas em partes menores com facilidade, uma habilidade essencial para engenharia.',
            medium: 'Você consegue seguir raciocínios lógicos, mas em cenários de alta pressão ou complexidade, pode precisar de ferramentas externas (desenhos, anotações) para se organizar.',
            low: 'Você pode ter um perfil mais intuitivo ou criativo. Na programação, precisará treinar conscientemente a estruturação passo-a-passo do pensamento.',
        },
        proactivity: {
            high: 'Você tem um instinto natural para resolver problemas antes que eles escalem. Não espera ordens; vê uma falha e já pensa na solução.',
            medium: 'Você executa bem o que é pedido e resolve problemas quando surgem, mas talvez não tenha o hábito de caçar melhorias proativamente.',
            low: 'Você pode preferir ambientes com tarefas muito bem definidas. Na tecnologia, buscar autonomia para resolver problemas será um diferencial importante.',
        },
    },
};

function getLevel(score: number): 'high' | 'medium' | 'low' {
    if (score >= 70) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
}

export function generateExplanations(scores: NormalizedScores) {
    const areaExplanations: Record<AreaKey, string> = {
        frontend: EXPLANATIONS.areas.frontend[getLevel(scores.areasPercent.frontend)],
        backend: EXPLANATIONS.areas.backend[getLevel(scores.areasPercent.backend)],
        dataAI: EXPLANATIONS.areas.dataAI[getLevel(scores.areasPercent.dataAI)],
    };

    const behavioralExplanations: Record<keyof BehavioralScores, string> = {
        resilience: EXPLANATIONS.behavioral.resilience[getLevel(scores.behavioralPercent.resilience)],
        logic: EXPLANATIONS.behavioral.logic[getLevel(scores.behavioralPercent.logic)],
        proactivity: EXPLANATIONS.behavioral.proactivity[getLevel(scores.behavioralPercent.proactivity)],
    };

    return { areaExplanations, behavioralExplanations };
}
