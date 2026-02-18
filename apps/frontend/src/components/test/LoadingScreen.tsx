import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const stages = [
  { text: 'Processando suas respostas...', icon: '📋', duration: 2000 },
  { text: 'Analisando raciocínio lógico...', icon: '🧠', duration: 2000 },
  { text: 'Calculando afinidade por área...', icon: '🎯', duration: 2000 },
  { text: 'Gerando relatório personalizado...', icon: '📊', duration: 1500 },
  { text: 'Finalizando seu perfil...', icon: '✨', duration: 1000 },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let elapsed = 0;

    const totalDuration = stages.reduce((sum, s) => sum + s.duration, 0);

    const advanceStage = (stageIndex: number) => {
      if (stageIndex >= stages.length) {
        onComplete();
        return;
      }

      setCurrentStage(stageIndex);
      elapsed += stageIndex > 0 ? stages[stageIndex - 1].duration : 0;
      setProgress(Math.round((elapsed / totalDuration) * 100));

      timeout = setTimeout(() => {
        advanceStage(stageIndex + 1);
      }, stages[stageIndex].duration);
    };

    advanceStage(0);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Pulsing ring animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div
            className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"
            style={{ animationDuration: '2s' }}
          />
          <div
            className="absolute inset-2 rounded-full border-2 border-primary/30 animate-ping"
            style={{ animationDuration: '2s', animationDelay: '0.3s' }}
          />
          <div
            className="absolute inset-4 rounded-full border-2 border-primary/40 animate-ping"
            style={{ animationDuration: '2s', animationDelay: '0.6s' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl" style={{ animationDuration: '1s' }}>
              {stages[currentStage]?.icon}
            </span>
          </div>
        </div>

        {/* Stage text */}
        <p className="text-text-header text-lg font-mono font-medium mb-6 transition-all duration-300">
          {stages[currentStage]?.text}
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 bg-surface-dark rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-primary via-green-300 to-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-mono text-text-main/40">{progress}%</span>

        {/* Decorative dots */}
        <div className="mt-8 flex justify-center gap-2">
          {stages.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= currentStage ? 'bg-primary' : 'bg-surface-dark'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
