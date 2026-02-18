import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../../test/questions';
import { Answer } from '../../test/testTypes';
import { saveProgress } from '../../services/testService';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OrderingQuestion } from './OrderingQuestion';

interface QuestionStepperProps {
  sessionId: string | null;
  initialAnswers?: Answer[];
  initialQuestion?: number;
  initialOrderings?: Record<string, string[]>;
  onComplete: (_answers: Answer[]) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const QuestionStepper: React.FC<QuestionStepperProps> = ({
  sessionId,
  initialAnswers = [],
  initialQuestion = 0,
  initialOrderings = {},
  onComplete,
}) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(initialQuestion);
  const [answers, setAnswers] = useState<Map<string, Answer>>(() => {
    const map = new Map<string, Answer>();
    initialAnswers.forEach((a) => map.set(a.questionId, a));
    return map;
  });
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Track whether we've saved orderings to DB yet
  const orderingsSavedRef = useRef(false);

  // Shuffle ordering steps — use restored orderings if available, otherwise generate new
  const shuffledOrderings = useMemo(() => {
    const map = new Map<string, string[]>();
    questions.forEach((q) => {
      if (q.type === 'ordering' && q.steps) {
        if (initialOrderings[q.id]) {
          // Restore from session
          map.set(q.id, initialOrderings[q.id]);
        } else {
          map.set(q.id, shuffleArray(q.steps.map((s) => s.id)));
        }
      }
    });
    return map;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save shuffled orderings to DB once (so F5 restores same order)
  useEffect(() => {
    if (!sessionId || orderingsSavedRef.current) return;
    if (Object.keys(initialOrderings).length > 0) {
      orderingsSavedRef.current = true;
      return; // Already from DB
    }

    const orderingsObj: Record<string, string[]> = {};
    shuffledOrderings.forEach((ids, qId) => {
      orderingsObj[qId] = ids;
    });

    orderingsSavedRef.current = true;
    saveProgress(
      sessionId,
      initialAnswers,
      initialQuestion,
      orderingsObj
    ).catch(console.error);
  }, [
    sessionId,
    shuffledOrderings,
    initialOrderings,
    initialAnswers,
    initialQuestion,
  ]);

  const question = questions[currentIndex];
  const total = questions.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const currentAnswer = answers.get(question.id);

  const setAnswer = useCallback((answer: Answer) => {
    setAnswers((prev) => {
      const next = new Map(prev);
      next.set(answer.questionId, answer);
      return next;
    });
  }, []);

  const canProceed = useMemo(() => {
    if (!currentAnswer) return false;
    if (question.type === 'multiple_choice')
      return !!currentAnswer.selectedOptionId;
    if (question.type === 'ordering')
      return (currentAnswer.orderedStepIds?.length ?? 0) > 0;
    return false;
  }, [currentAnswer, question.type]);

  // Auto-register ordering answers with shuffled order
  useEffect(() => {
    if (question.type === 'ordering' && !answers.has(question.id)) {
      const initialOrder = shuffledOrderings.get(question.id) ?? [];
      setAnswer({
        questionId: question.id,
        questionType: 'ordering',
        orderedStepIds: initialOrder,
      });
    }
  }, [question.id, question.type, answers, shuffledOrderings, setAnswer]);

  const handleNext = useCallback(() => {
    const allAnswers = Array.from(answers.values());

    if (currentIndex < total - 1) {
      const nextIndex = currentIndex + 1;
      setDirection('next');
      setCurrentIndex(nextIndex);

      // Update URL
      if (sessionId) {
        navigate(`/teste/${sessionId}/${nextIndex + 1}`, { replace: true });
        // Save progress to DB (fire-and-forget)
        saveProgress(sessionId, allAnswers, nextIndex).catch(console.error);
      }
    } else {
      // Complete
      if (sessionId) {
        saveProgress(sessionId, allAnswers, currentIndex).catch(console.error);
      }
      onComplete(allAnswers);
    }
  }, [currentIndex, total, answers, sessionId, navigate, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setDirection('prev');
      setCurrentIndex(prevIndex);

      if (sessionId) {
        navigate(`/teste/${sessionId}/${prevIndex + 1}`, { replace: true });
      }
    }
  }, [currentIndex, sessionId, navigate]);

  const orderingIds =
    question.type === 'ordering'
      ? (currentAnswer?.orderedStepIds ??
        shuffledOrderings.get(question.id) ??
        [])
      : [];

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      {/* Progress bar */}
      <div className="sticky top-0 z-20 bg-background-dark/90 backdrop-blur-sm border-b border-border-dark">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-xs font-mono text-text-main/60 mb-2">
            <span>
              Pergunta{' '}
              <span className="text-primary font-bold">{currentIndex + 1}</span>{' '}
              de {total}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-surface-dark rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-green-300 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div
          className={`w-full max-w-2xl transition-all duration-300 ${
            direction === 'next'
              ? 'animate-[slideInRight_0.3s_ease-out]'
              : 'animate-[slideInLeft_0.3s_ease-out]'
          }`}
          key={question.id}
        >
          {/* Category pill */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider
                ${
                  question.category === 'logic'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : question.category === 'affinity'
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                }`}
            >
              {question.category === 'logic'
                ? '🧠 Lógica'
                : question.category === 'affinity'
                  ? '🎯 Afinidade'
                  : '💪 Comportamental'}
            </span>
          </div>

          {question.type === 'multiple_choice' && question.options && (
            <MultipleChoiceQuestion
              title={question.title}
              description={question.description}
              options={question.options}
              selectedOptionId={currentAnswer?.selectedOptionId}
              onSelect={(optionId) =>
                setAnswer({
                  questionId: question.id,
                  questionType: 'multiple_choice',
                  selectedOptionId: optionId,
                })
              }
            />
          )}

          {question.type === 'ordering' && question.steps && (
            <OrderingQuestion
              title={question.title}
              description={question.description}
              steps={question.steps}
              orderedIds={orderingIds}
              onReorder={(newOrder) =>
                setAnswer({
                  questionId: question.id,
                  questionType: 'ordering',
                  orderedStepIds: newOrder,
                })
              }
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-background-dark/90 backdrop-blur-sm border-t border-border-dark">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="h-11 px-6 rounded-lg border border-border-dark text-text-main font-mono text-sm hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Voltar
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`h-11 px-8 rounded-lg font-mono text-sm font-bold transition-all cursor-pointer
              ${
                canProceed
                  ? 'bg-primary hover:bg-green-400 text-[#0D1117] shadow-[0_0_15px_rgba(25,230,94,0.2)] hover:scale-[1.02]'
                  : 'bg-surface-dark text-text-main/30 cursor-not-allowed'
              }`}
          >
            {currentIndex === total - 1 ? 'Finalizar →' : 'Próxima →'}
          </button>
        </div>
      </div>
    </div>
  );
};
