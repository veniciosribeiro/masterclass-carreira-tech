import React from 'react';
import { QuestionOption } from '../../test/testTypes';

interface MultipleChoiceQuestionProps {
    title: string;
    description?: string;
    options: QuestionOption[];
    selectedOptionId?: string;
    onSelect: (_optionId: string) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  title,
  description,
  options,
  selectedOptionId,
  onSelect,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-text-header font-mono">{title}</h2>
        {description && (
          <p className="text-text-main text-sm md:text-base mt-2">{description}</p>
        )}
      </div>

      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;
          const letter = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer group
                ${isSelected
              ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(25,230,94,0.15)]'
              : 'border-border-dark bg-surface-dark hover:border-primary/40 hover:bg-surface-dark/80'
            }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-mono transition-colors
                    ${isSelected
              ? 'bg-primary text-[#0D1117]'
              : 'bg-background-dark text-text-main group-hover:text-primary'
            }`}
                >
                  {letter}
                </span>
                <span
                  className={`text-sm md:text-base leading-relaxed pt-0.5 transition-colors
                    ${isSelected ? 'text-text-header' : 'text-text-main'}`}
                >
                  {option.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
