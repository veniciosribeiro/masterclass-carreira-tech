import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Answer, TestResult } from '../../test/testTypes';
import { calculateScores, determineProfile } from '../../test/scoring';
import {
  saveTestResult,
  createSession,
  getSession,
  completeSession,
  SessionData,
} from '../../services/testService';
import { WelcomeScreen } from './WelcomeScreen';
import { QuestionStepper } from './QuestionStepper';
import { LoadingScreen } from './LoadingScreen';
import { ResultsScreen } from './ResultsScreen';

type TestPhase = 'welcome' | 'questions' | 'loading' | 'results' | 'restoring';

export const AptitudeTest: React.FC = () => {
  const { sessionId, step } = useParams<{ sessionId?: string; step?: string }>();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<TestPhase>('welcome');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [restoredAnswers, setRestoredAnswers] = useState<Answer[]>([]);
  const [restoredQuestion, setRestoredQuestion] = useState<number>(0);
  const [restoredOrderings, setRestoredOrderings] = useState<Record<string, string[]>>({});

  // Restore session on mount if URL has sessionId
  useEffect(() => {
    if (!sessionId) return;

    // Already initialized from this session
    if (currentSessionId === sessionId) return;

    setPhase('restoring');

    getSession(sessionId).then((session) => {
      if (!session) {
        // Invalid session — go to welcome
        navigate('/teste', { replace: true });
        setPhase('welcome');
        return;
      }

      if (session.status === 'completed') {
        // Already completed — go to welcome for new attempt
        navigate('/teste', { replace: true });
        setPhase('welcome');
        return;
      }

      setCurrentSessionId(session.session_id);
      setUserName(session.user_name || '');
      setUserEmail(session.user_email || '');
      setRestoredAnswers(session.answers || []);
      setRestoredQuestion(session.current_question || 0);
      setRestoredOrderings(session.shuffled_orderings || {});

      // Determine phase from step param
      if (step === 'loading') {
        setPhase('loading');
      } else if (step === 'resultado') {
        setPhase('loading');
      } else {
        setPhase('questions');
      }
    });
  }, [sessionId, currentSessionId, navigate, step]);

  const handleStart = useCallback(
    async (name: string, email: string) => {
      const result = await createSession(email, name);

      if ('error' in result) {
        console.error('Failed to create session:', result.error);
        return;
      }

      const session = result as SessionData;
      setCurrentSessionId(session.session_id);
      setUserName(name);
      setUserEmail(email);

      if (session.resumed && session.current_question > 0) {
        // Resuming — restore state
        setRestoredAnswers(session.answers || []);
        setRestoredQuestion(session.current_question);
        setRestoredOrderings(session.shuffled_orderings || {});
        setPhase('questions');
        navigate(`/teste/${session.session_id}/${session.current_question + 1}`, { replace: true });
      } else {
        setRestoredAnswers([]);
        setRestoredQuestion(0);
        setRestoredOrderings({});
        setPhase('questions');
        navigate(`/teste/${session.session_id}/1`, { replace: true });
      }

      window.scrollTo(0, 0);
    },
    [navigate],
  );

  const handleQuestionsComplete = useCallback(
    async (answers: Answer[]) => {
      setPhase('loading');
      window.scrollTo(0, 0);

      if (currentSessionId) {
        navigate(`/teste/${currentSessionId}/loading`, { replace: true });
        await completeSession(currentSessionId);
      }

      const scores = calculateScores(answers);
      const profile = determineProfile(scores);

      const testResult: TestResult = {
        userName,
        userEmail,
        answers,
        scores,
        profile,
        timestamp: new Date().toISOString(),
      };

      setResult(testResult);
      saveTestResult(testResult).catch(console.error);
    },
    [userName, userEmail, currentSessionId, navigate],
  );

  const handleLoadingComplete = useCallback(() => {
    setPhase('results');
    if (currentSessionId) {
      navigate(`/teste/${currentSessionId}/resultado`, { replace: true });
    }
    window.scrollTo(0, 0);
  }, [currentSessionId, navigate]);

  if (phase === 'restoring') {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-text-main font-mono text-sm">Restaurando sessão...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {phase === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {phase === 'questions' && (
        <QuestionStepper
          sessionId={currentSessionId}
          initialAnswers={restoredAnswers}
          initialQuestion={restoredQuestion}
          initialOrderings={restoredOrderings}
          onComplete={handleQuestionsComplete}
        />
      )}
      {phase === 'loading' && <LoadingScreen onComplete={handleLoadingComplete} />}
      {phase === 'results' && result && <ResultsScreen result={result} />}
    </>
  );
};
