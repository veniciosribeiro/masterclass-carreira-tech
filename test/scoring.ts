import { questions } from './questions';
import {
    Answer,
    AreaScores,
    BehavioralScores,
    NormalizedScores,
    ProfileResult,
    ProfileType,
    Question,
} from './testTypes';

// ─── SCORING ENGINE ───────────────────────────────────────

/**
 * Calculates how accurate an ordering answer is (0-1 scale).
 * Uses normalized Kendall tau distance for fairness.
 */
function orderingAccuracy(submittedIds: string[], question: Question): number {
    if (!question.steps) return 0;
    const correctOrder = [...question.steps].sort((a, b) => a.correctPosition - b.correctPosition).map(s => s.id);
    const n = correctOrder.length;
    if (n <= 1) return 1;

    // Count pairwise inversions
    let inversions = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const posA = submittedIds.indexOf(correctOrder[i]);
            const posB = submittedIds.indexOf(correctOrder[j]);
            if (posA > posB) inversions++;
        }
    }
    const maxInversions = (n * (n - 1)) / 2;
    return 1 - inversions / maxInversions;
}

/**
 * Calculate raw area scores from all answers.
 */
function calculateRawAreaScores(answers: Answer[]): AreaScores {
    const scores: AreaScores = { frontend: 0, backend: 0, dataAI: 0 };

    for (const answer of answers) {
        const question = questions.find(q => q.id === answer.questionId);
        if (!question) continue;

        if (question.type === 'multiple_choice' && answer.selectedOptionId) {
            const option = question.options?.find(o => o.id === answer.selectedOptionId);
            if (option) {
                scores.frontend += option.weights.frontend;
                scores.backend += option.weights.backend;
                scores.dataAI += option.weights.dataAI;
            }
        } else if (question.type === 'ordering' && answer.orderedStepIds) {
            const accuracy = orderingAccuracy(answer.orderedStepIds, question);
            if (question.orderingWeights) {
                scores.frontend += question.orderingWeights.frontend * accuracy;
                scores.backend += question.orderingWeights.backend * accuracy;
                scores.dataAI += question.orderingWeights.dataAI * accuracy;
            }
        }
    }

    return scores;
}

/**
 * Calculate raw behavioral scores from all answers.
 */
function calculateRawBehavioralScores(answers: Answer[]): BehavioralScores {
    const scores: BehavioralScores = { resilience: 0, logic: 0, proactivity: 0 };

    for (const answer of answers) {
        const question = questions.find(q => q.id === answer.questionId);
        if (!question) continue;

        if (question.type === 'multiple_choice' && answer.selectedOptionId) {
            const option = question.options?.find(o => o.id === answer.selectedOptionId);
            if (option?.behavioral) {
                scores.resilience += option.behavioral.resilience ?? 0;
                scores.logic += option.behavioral.logic ?? 0;
                scores.proactivity += option.behavioral.proactivity ?? 0;
            }
        } else if (question.type === 'ordering' && answer.orderedStepIds) {
            const accuracy = orderingAccuracy(answer.orderedStepIds, question);
            if (question.orderingBehavioral) {
                scores.resilience += (question.orderingBehavioral.resilience ?? 0) * accuracy;
                scores.logic += (question.orderingBehavioral.logic ?? 0) * accuracy;
                scores.proactivity += (question.orderingBehavioral.proactivity ?? 0) * accuracy;
            }
        }
    }

    return scores;
}

/**
 * Calculate max possible scores by picking the best option for each question.
 */
function calculateMaxScores(): { maxArea: AreaScores; maxBehavioral: BehavioralScores } {
    const maxArea: AreaScores = { frontend: 0, backend: 0, dataAI: 0 };
    const maxBehavioral: BehavioralScores = { resilience: 0, logic: 0, proactivity: 0 };

    for (const question of questions) {
        if (question.type === 'multiple_choice' && question.options) {
            // For each area, add the max possible from any option
            maxArea.frontend += Math.max(...question.options.map(o => o.weights.frontend));
            maxArea.backend += Math.max(...question.options.map(o => o.weights.backend));
            maxArea.dataAI += Math.max(...question.options.map(o => o.weights.dataAI));

            maxBehavioral.resilience += Math.max(...question.options.map(o => o.behavioral?.resilience ?? 0));
            maxBehavioral.logic += Math.max(...question.options.map(o => o.behavioral?.logic ?? 0));
            maxBehavioral.proactivity += Math.max(...question.options.map(o => o.behavioral?.proactivity ?? 0));
        } else if (question.type === 'ordering') {
            if (question.orderingWeights) {
                maxArea.frontend += question.orderingWeights.frontend;
                maxArea.backend += question.orderingWeights.backend;
                maxArea.dataAI += question.orderingWeights.dataAI;
            }
            if (question.orderingBehavioral) {
                maxBehavioral.resilience += question.orderingBehavioral.resilience ?? 0;
                maxBehavioral.logic += question.orderingBehavioral.logic ?? 0;
                maxBehavioral.proactivity += question.orderingBehavioral.proactivity ?? 0;
            }
        }
    }

    return { maxArea, maxBehavioral };
}

function normalize(raw: number, max: number): number {
    if (max === 0) return 0;
    return Math.round((raw / max) * 100);
}

/**
 * Main scoring function — returns normalized scores.
 */
export function calculateScores(answers: Answer[]): NormalizedScores {
    const rawArea = calculateRawAreaScores(answers);
    const rawBehavioral = calculateRawBehavioralScores(answers);
    const { maxArea, maxBehavioral } = calculateMaxScores();

    return {
        areas: rawArea,
        areasPercent: {
            frontend: normalize(rawArea.frontend, maxArea.frontend),
            backend: normalize(rawArea.backend, maxArea.backend),
            dataAI: normalize(rawArea.dataAI, maxArea.dataAI),
        },
        behavioral: rawBehavioral,
        behavioralPercent: {
            resilience: normalize(rawBehavioral.resilience, maxBehavioral.resilience),
            logic: normalize(rawBehavioral.logic, maxBehavioral.logic),
            proactivity: normalize(rawBehavioral.proactivity, maxBehavioral.proactivity),
        },
    };
}

// ─── PROFILE DETERMINATION ────────────────────────────────

const HYBRID_THRESHOLD = 15; // % difference to consider hybrid

const profileData: Record<string, Omit<ProfileResult, 'primary'>> = {
    frontend: {
        label: 'Desenvolvedor Front-End',
        emoji: '🎨',
        description:
            'Você tem uma forte afinidade com o lado visual e interativo da tecnologia. Seu perfil indica que você pensa em como o usuário vê e sente o produto — isso é a essência do Front-End.',
        strengths: [
            'Pensamento visual e estético',
            'Foco na experiência do usuário',
            'Interesse em interfaces interativas',
            'Sensibilidade para detalhes visuais',
        ],
        recommendation:
            'Comece por HTML, CSS e JavaScript. Depois evolua para React ou Vue.js. Frameworks como Next.js serão seu próximo passo natural.',
    },
    backend: {
        label: 'Desenvolvedor Back-End',
        emoji: '⚙️',
        description:
            'Você pensa em como as coisas funcionam "por baixo dos panos". Seu perfil mostra afinidade com lógica, sistemas e performance — o coração de qualquer Back-End.',
        strengths: [
            'Pensamento lógico e estruturado',
            'Resolução sistemática de problemas',
            'Foco em performance e escalabilidade',
            'Interesse em arquitetura de sistemas',
        ],
        recommendation:
            'Comece com uma linguagem como Python ou Java. Aprenda sobre APIs REST, bancos de dados SQL e arquitetura de sistemas. Node.js ou Go são excelentes próximos passos.',
    },
    dataAI: {
        label: 'Especialista em Dados & IA',
        emoji: '📊',
        description:
            'Você tem uma mente analítica e curiosidade por padrões. Seu perfil indica forte afinidade com análise de dados, tomada de decisão baseada em evidências e inteligência artificial.',
        strengths: [
            'Pensamento analítico',
            'Curiosidade por padrões e tendências',
            'Tomada de decisão baseada em dados',
            'Interesse em inteligência artificial',
        ],
        recommendation:
            'Comece com Python e bibliotecas como Pandas e NumPy. Depois explore SQL, visualização de dados e Machine Learning com scikit-learn. Estatística será sua amiga.',
    },
    frontend_backend: {
        label: 'Desenvolvedor Full-Stack',
        emoji: '🚀',
        description:
            'Você tem afinidade tanto com o visual quanto com a lógica dos sistemas. Esse perfil híbrido é ideal para quem quer ter uma visão completa do produto.',
        strengths: [
            'Visão holística do produto',
            'Versatilidade técnica',
            'Capacidade de conectar interface e lógica',
            'Perfil valorizado no mercado',
        ],
        recommendation:
            'Comece com JavaScript e domine tanto React (Front) quanto Node.js (Back). Next.js une os dois mundos. Bancos de dados e APIs REST completam seu kit.',
    },
    frontend_dataAI: {
        label: 'Especialista em Visualização de Dados',
        emoji: '📈',
        description:
            'Você combina pensamento visual com análise de dados. Esse perfil único é perfeito para dashboards, relatórios interativos e produtos de data visualization.',
        strengths: [
            'Comunicação visual de dados',
            'Pensamento analítico + estético',
            'Interesse em dashboards interativos',
            'Capacidade de tornar dados compreensíveis',
        ],
        recommendation:
            'Comece com Python e JavaScript. Explore D3.js, Chart.js e ferramentas como Streamlit ou Dash. Tableau e Power BI também são caminhos valiosos.',
    },
    backend_dataAI: {
        label: 'Engenheiro de Dados',
        emoji: '🔧',
        description:
            'Você combina lógica de sistemas com análise de dados. Esse perfil é essencial para pipelines, infraestrutura de dados e sistemas inteligentes.',
        strengths: [
            'Arquitetura de dados',
            'Pensamento sistêmico',
            'Escalabilidade de soluções de dados',
            'Integração de IA em sistemas',
        ],
        recommendation:
            'Comece com Python e SQL. Domine bancos relacionais e NoSQL. Explore Apache Spark, Airflow e serviços cloud de dados (AWS/GCP). MLOps é o próximo nível.',
    },
    generalist: {
        label: 'Perfil Generalista',
        emoji: '🌐',
        description:
            'Você tem interesse equilibrado pelas diferentes áreas da tecnologia. Isso é ótimo para quem quer explorar antes de especializar — e muitos profissionais de sucesso começaram assim.',
        strengths: [
            'Interesse amplo por tecnologia',
            'Adaptabilidade',
            'Visão geral do ecossistema',
            'Facilidade para colaborar entre equipes',
        ],
        recommendation:
            'Comece por JavaScript — ele permite explorar Front-End, Back-End e até dados. Construa projetos pequenos em cada área para descobrir onde seu coração bate mais forte.',
    },
};

export function determineProfile(scores: NormalizedScores): ProfileResult {
    const { areasPercent } = scores;
    const entries: [string, number][] = [
        ['frontend', areasPercent.frontend],
        ['backend', areasPercent.backend],
        ['dataAI', areasPercent.dataAI],
    ];

    entries.sort((a, b) => b[1] - a[1]);
    const [first, second] = entries;
    const diff = first[1] - second[1];

    let profileKey: ProfileType;
    if (diff <= HYBRID_THRESHOLD && first[1] > 0) {
        // Hybrid — sort keys alphabetically for consistent lookup
        const sorted = [first[0], second[0]].sort();
        profileKey = `${sorted[0]}_${sorted[1]}` as ProfileType;
    } else {
        profileKey = first[0] as ProfileType;
    }

    // Fallback for edge cases
    if (!profileData[profileKey]) {
        profileKey = 'generalist';
    }

    return {
        primary: profileKey,
        ...profileData[profileKey],
    };
}
