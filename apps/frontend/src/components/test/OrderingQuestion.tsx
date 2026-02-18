import React, { useState, useCallback } from 'react';
import { OrderingStep } from '../../test/testTypes';

interface OrderingQuestionProps {
  title: string;
  description?: string;
  steps: OrderingStep[];
  orderedIds: string[];
  onReorder: (_newOrder: string[]) => void;
}

export const OrderingQuestion: React.FC<OrderingQuestionProps> = ({
  title,
  description,
  steps,
  orderedIds,
  onReorder,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const getStepById = (id: string) => steps.find((s) => s.id === id);

  const moveItem = useCallback(
    (fromIndex: number, toIndex: number) => {
      const newOrder = [...orderedIds];
      const [moved] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, moved);
      onReorder(newOrder);
    },
    [orderedIds, onReorder]
  );

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Needed for Firefox
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveItem(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-text-header font-mono">
          {title}
        </h2>
        {description && (
          <p className="text-text-main text-sm md:text-base mt-2">
            {description}
          </p>
        )}
        <p className="text-xs text-primary/70 font-mono mt-3 flex items-center gap-1.5">
          <span>↕️</span> Arraste os itens para reordenar ou use as setas
        </p>
      </div>

      <div className="space-y-2">
        {orderedIds.map((id, index) => {
          const step = getStepById(id);
          if (!step) return null;

          const isDragged = draggedIndex === index;
          const isDragOver = dragOverIndex === index && draggedIndex !== index;

          return (
            <div
              key={id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-grab active:cursor-grabbing select-none
                ${isDragged ? 'opacity-50 border-primary bg-primary/5' : ''}
                ${isDragOver ? 'border-primary/60 bg-primary/5' : 'border-border-dark bg-surface-dark'}
                ${!isDragged && !isDragOver ? 'hover:border-primary/30' : ''}
              `}
            >
              {/* Position number */}
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold font-mono text-sm flex items-center justify-center">
                {index + 1}
              </span>

              {/* Drag handle */}
              <span className="text-text-main/40 text-lg flex-shrink-0">⠿</span>

              {/* Step text */}
              <span className="flex-1 text-sm md:text-base text-text-main">
                {step.text}
              </span>

              {/* Up/Down buttons for mobile */}
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (index > 0) moveItem(index, index - 1);
                  }}
                  disabled={index === 0}
                  className="w-7 h-7 rounded-md bg-background-dark text-text-main/40 hover:text-primary hover:bg-primary/10 flex items-center justify-center text-xs transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (index < orderedIds.length - 1)
                      moveItem(index, index + 1);
                  }}
                  disabled={index === orderedIds.length - 1}
                  className="w-7 h-7 rounded-md bg-background-dark text-text-main/40 hover:text-primary hover:bg-primary/10 flex items-center justify-center text-xs transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                >
                  ▼
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
