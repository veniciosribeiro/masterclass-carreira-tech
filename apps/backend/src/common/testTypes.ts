export type QuestionType = "multiple_choice" | "ordering";

export type AreaKey = "frontend" | "backend" | "dataAI";

export interface AreaWeights {
  frontend: number;
  backend: number;
  dataAI: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  weights: AreaWeights;
  /** Behavioral tags for secondary scoring */
  behavioral?: {
    resilience?: number;
    logic?: number;
    proactivity?: number;
  };
}

export interface OrderingStep {
  id: string;
  text: string;
  correctPosition: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  category: "logic" | "affinity" | "behavioral";
  title: string;
  description?: string;
  /** For multiple_choice questions */
  options?: QuestionOption[];
  /** For ordering questions */
  steps?: OrderingStep[];
  /** Weights awarded for a perfect ordering answer */
  orderingWeights?: AreaWeights;
  orderingBehavioral?: {
    resilience?: number;
    logic?: number;
    proactivity?: number;
  };
}

export interface Answer {
  questionId: string;
  questionType: QuestionType;
  /** Selected option ID for multiple_choice */
  selectedOptionId?: string;
  /** Ordered step IDs for ordering */
  orderedStepIds?: string[];
}

export interface AreaScores {
  frontend: number;
  backend: number;
  dataAI: number;
}

export interface BehavioralScores {
  resilience: number;
  logic: number;
  proactivity: number;
}

export interface NormalizedScores {
  areas: AreaScores;
  areasPercent: AreaScores;
  behavioral: BehavioralScores;
  behavioralPercent: BehavioralScores;
}

export type ProfileType =
  | "frontend"
  | "backend"
  | "dataAI"
  | "frontend_backend"
  | "frontend_dataAI"
  | "backend_dataAI"
  | "generalist";

export interface ProfileResult {
  primary: ProfileType;
  label: string;
  emoji: string;
  description: string;
  strengths: string[];
  recommendation: string;
  /** Dynamic explanations based on score levels */
  areaExplanations?: Record<AreaKey, string>;
  behavioralExplanations?: Record<keyof BehavioralScores, string>;
}

export interface TestResult {
  id?: string;
  userName: string;
  userEmail: string;
  answers: Answer[];
  scores: NormalizedScores;
  profile: ProfileResult;
  timestamp: string;
}
