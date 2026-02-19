import { Question } from "./testTypes.js";

export const questions: Question[] = [
  // ═══════════════════════════════════════════
  // CATEGORIA 1 — RACIOCÍNIO LÓGICO
  // ═══════════════════════════════════════════
  {
    id: "q1_sandwich",
    type: "ordering",
    category: "logic",
    title: "Lógica do Sanduíche",
    description:
      "Você precisa programar um robô para fazer um sanduíche. Selecione os passos na ordem correta.",
    steps: [
      { id: "s1", text: "Pegar o pão", correctPosition: 0 },
      { id: "s2", text: "Cortar o pão ao meio", correctPosition: 1 },
      { id: "s3", text: "Pegar a faca e a maionese", correctPosition: 2 },
      { id: "s4", text: "Passar maionese no pão", correctPosition: 3 },
      { id: "s5", text: "Colocar alface no pão", correctPosition: 4 },
      { id: "s6", text: "Colocar fatia de queijo", correctPosition: 5 },
      { id: "s7", text: "Colocar fatia de presunto", correctPosition: 6 },
      {
        id: "s8",
        text: "Fechar o sanduíche com a outra metade do pão",
        correctPosition: 7,
      },
    ],
    orderingWeights: { backend: 3, dataAI: 2, frontend: 1 },
    orderingBehavioral: { logic: 5, proactivity: 0, resilience: 0 },
  },

  {
    id: "q2_frustration",
    type: "multiple_choice",
    category: "behavioral",
    title: "Tolerância à Frustração",
    description:
      "Você passou 6 horas debugando um código. Descobre que o erro era uma vírgula no lugar errado. Qual sua reação?",
    options: [
      {
        id: "a",
        text: '"Aprendi a nunca mais cometer esse erro"',
        weights: { frontend: 1, backend: 1, dataAI: 1 },
        behavioral: { resilience: 4, proactivity: 2, logic: 1 },
      },
      {
        id: "b",
        text: '"Pelo menos resolvi"',
        weights: { frontend: 1, backend: 1, dataAI: 1 },
        behavioral: { resilience: 2, proactivity: 0, logic: 1 },
      },
      {
        id: "c",
        text: '"Isso é ridículo, perdi 6 horas por nada"',
        weights: { frontend: 0, backend: 0, dataAI: 0 },
        behavioral: { resilience: 0, proactivity: 0, logic: 0 },
      },
      {
        id: "d",
        text: '"Vou criar um checklist para evitar isso"',
        weights: { frontend: 1, backend: 2, dataAI: 2 },
        behavioral: { resilience: 5, proactivity: 5, logic: 3 },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // CATEGORIA 2 — AFINIDADE DE ÁREA
  // ═══════════════════════════════════════════
  {
    id: "q3_ecommerce",
    type: "multiple_choice",
    category: "affinity",
    title: "Problema de E-commerce",
    description:
      "Um e-commerce está perdendo vendas. Clientes abandonam o carrinho. Como você atacaria o problema?",
    options: [
      {
        id: "a",
        text: "Redesenhar a interface para tornar o checkout mais intuitivo e bonito",
        weights: { frontend: 3, backend: 0, dataAI: 0 },
        behavioral: { proactivity: 2 },
      },
      {
        id: "b",
        text: "Otimizar a API e o banco para o checkout carregar mais rápido",
        weights: { frontend: 0, backend: 3, dataAI: 0 },
        behavioral: { logic: 2 },
      },
      {
        id: "c",
        text: "Analisar os dados de conversão e criar recomendações inteligentes de produtos",
        weights: { frontend: 0, backend: 0, dataAI: 3 },
        behavioral: { logic: 3 },
      },
      {
        id: "d",
        text: "Melhorar o formulário de checkout e simplificar a experiência visual",
        weights: { frontend: 2, backend: 1, dataAI: 0 },
        behavioral: { proactivity: 1 },
      },
    ],
  },

  {
    id: "q4_app_attraction",
    type: "multiple_choice",
    category: "affinity",
    title: "O que te Atrai num App?",
    description:
      "Ao usar um aplicativo pela primeira vez, o que mais chama sua atenção?",
    options: [
      {
        id: "a",
        text: "As animações, transições suaves e a experiência visual",
        weights: { frontend: 3, backend: 0, dataAI: 0 },
      },
      {
        id: "b",
        text: "Saber que funciona perfeitamente mesmo com milhões de usuários simultâneos",
        weights: { frontend: 0, backend: 3, dataAI: 0 },
      },
      {
        id: "c",
        text: 'As recomendações personalizadas e como ele parece "ler sua mente"',
        weights: { frontend: 0, backend: 0, dataAI: 3 },
      },
      {
        id: "d",
        text: "Que os botões estejam no lugar certo e tudo funcione sem travar",
        weights: { frontend: 2, backend: 1, dataAI: 0 },
      },
    ],
  },

  {
    id: "q5_bug_production",
    type: "multiple_choice",
    category: "affinity",
    title: "Bug em Produção",
    description:
      "Um bug crítico foi reportado em produção. Usuários estão reclamando. Qual sua primeira ação?",
    options: [
      {
        id: "a",
        text: "Verificar se a interface está mostrando a mensagem de erro correta ao usuário",
        weights: { frontend: 2, backend: 0, dataAI: 0 },
        behavioral: { proactivity: 1 },
      },
      {
        id: "b",
        text: "Mergulhar nos logs do servidor e consultas do banco de dados",
        weights: { frontend: 0, backend: 3, dataAI: 0 },
        behavioral: { logic: 3 },
      },
      {
        id: "c",
        text: "Analisar métricas e dashboards para entender a escala do impacto",
        weights: { frontend: 0, backend: 0, dataAI: 3 },
        behavioral: { logic: 2, proactivity: 2 },
      },
      {
        id: "d",
        text: "Reproduzir o erro na interface do usuário para entender o fluxo",
        weights: { frontend: 2, backend: 1, dataAI: 0 },
        behavioral: { logic: 2 },
      },
    ],
  },

  {
    id: "q6_dream_project",
    type: "multiple_choice",
    category: "affinity",
    title: "Projeto dos Sonhos",
    description:
      "Se pudesse escolher qualquer projeto, qual te empolgaria mais?",
    options: [
      {
        id: "a",
        text: "Criar um dashboard interativo com gráficos animados e dark mode",
        weights: { frontend: 3, backend: 0, dataAI: 0 },
        behavioral: { proactivity: 2 },
      },
      {
        id: "b",
        text: "Construir uma API que processa milhares de requisições por segundo",
        weights: { frontend: 0, backend: 3, dataAI: 0 },
        behavioral: { logic: 2 },
      },
      {
        id: "c",
        text: "Treinar um modelo de IA para prever tendências de mercado",
        weights: { frontend: 0, backend: 0, dataAI: 3 },
        behavioral: { logic: 3 },
      },
      {
        id: "d",
        text: "Desenvolver um sistema de chat em tempo real",
        weights: { frontend: 1, backend: 2, dataAI: 0 },
        behavioral: { proactivity: 1, logic: 1 },
      },
    ],
  },

  {
    id: "q7_recipes",
    type: "multiple_choice",
    category: "affinity",
    title: "Organizando Receitas",
    description:
      "Você precisa organizar 1.000 receitas de cozinha num sistema. Como faria?",
    options: [
      {
        id: "a",
        text: "Criaria um app bonito com fotos grandes, categorias visuais e filtros intuitivos",
        weights: { frontend: 3, backend: 0, dataAI: 0 },
      },
      {
        id: "b",
        text: "Faria um banco de dados relacional com busca eficiente e API RESTful",
        weights: { frontend: 0, backend: 3, dataAI: 0 },
        behavioral: { logic: 2 },
      },
      {
        id: "c",
        text: "Classificaria por nutrientes e usaria IA para sugerir combinações saudáveis",
        weights: { frontend: 0, backend: 0, dataAI: 3 },
        behavioral: { logic: 2 },
      },
      {
        id: "d",
        text: "Faria um site simples mas funcional com busca por nome",
        weights: { frontend: 1, backend: 1, dataAI: 0 },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // CATEGORIA 3 — PERFIL COMPORTAMENTAL
  // ═══════════════════════════════════════════
  {
    id: "q8_debug_steps",
    type: "ordering",
    category: "behavioral",
    title: "Debug por Eliminação",
    description:
      "Sua página web aparece completamente em branco. Ordene os passos de investigação do mais lógico ao menos lógico.",
    steps: [
      {
        id: "d1",
        text: "Abrir o console do navegador e verificar erros",
        correctPosition: 0,
      },
      {
        id: "d2",
        text: "Verificar se o arquivo HTML está carregando",
        correctPosition: 1,
      },
      {
        id: "d3",
        text: "Checar se o JavaScript está sendo executado",
        correctPosition: 2,
      },
      {
        id: "d4",
        text: "Verificar se a API está respondendo",
        correctPosition: 3,
      },
      {
        id: "d5",
        text: "Checar se o CSS não está escondendo tudo",
        correctPosition: 4,
      },
      { id: "d6", text: "Perguntar no StackOverflow", correctPosition: 5 },
    ],
    orderingWeights: { backend: 2, dataAI: 1, frontend: 2 },
    orderingBehavioral: { logic: 5, proactivity: 2, resilience: 2 },
  },

  {
    id: "q9_pressure",
    type: "multiple_choice",
    category: "behavioral",
    title: "Priorização sob Pressão",
    description:
      "Sexta-feira, 17h. Você tem 3 tarefas urgentes: um bug que afeta 100 usuários, uma feature para o demo do CEO na segunda, e um relatório de performance atrasado. Qual atacar primeiro?",
    options: [
      {
        id: "a",
        text: "O bug — está impactando usuários reais agora",
        weights: { frontend: 1, backend: 2, dataAI: 0 },
        behavioral: { resilience: 3, proactivity: 3, logic: 4 },
      },
      {
        id: "b",
        text: "A feature do CEO — visibilidade política é crítica",
        weights: { frontend: 1, backend: 1, dataAI: 0 },
        behavioral: { resilience: 1, proactivity: 2, logic: 1 },
      },
      {
        id: "c",
        text: "O relatório — já está atrasado e tenho os dados",
        weights: { frontend: 0, backend: 0, dataAI: 2 },
        behavioral: { resilience: 1, proactivity: 1, logic: 2 },
      },
      {
        id: "d",
        text: "Avalio rapidamente a complexidade de cada um e monto um plano",
        weights: { frontend: 1, backend: 1, dataAI: 1 },
        behavioral: { resilience: 4, proactivity: 5, logic: 5 },
      },
    ],
  },

  {
    id: "q10_learning",
    type: "multiple_choice",
    category: "affinity",
    title: "Estilo de Aprendizado",
    description:
      "Quando precisa aprender uma tecnologia nova, qual abordagem prefere?",
    options: [
      {
        id: "a",
        text: "Tutoriais visuais e interativos — preciso VER o resultado na tela",
        weights: { frontend: 2, backend: 0, dataAI: 0 },
        behavioral: { proactivity: 1 },
      },
      {
        id: "b",
        text: "Documentação oficial e código fonte — quero entender por baixo dos panos",
        weights: { frontend: 0, backend: 2, dataAI: 1 },
        behavioral: { logic: 3, proactivity: 2 },
      },
      {
        id: "c",
        text: "Papers acadêmicos e datasets para experimentar com dados reais",
        weights: { frontend: 0, backend: 0, dataAI: 3 },
        behavioral: { logic: 3 },
      },
      {
        id: "d",
        text: "Projetos práticos — já começo construindo algo e aprendo fazendo",
        weights: { frontend: 1, backend: 1, dataAI: 0 },
        behavioral: { proactivity: 4, resilience: 2 },
      },
    ],
  },
];
