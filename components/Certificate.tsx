import React from 'react';

export const Certificate: React.FC = () => {
  return (
    <section className="py-16 bg-background-dark border-b border-border-dark">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/5 border border-primary/20 mb-6">
          <span className="material-symbols-outlined text-4xl text-primary">
            workspace_premium
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4 font-mono">
          Earn Your Logic Certificate
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 font-light">
          Upon completion, you'll receive a personalized{' '}
          <strong className="text-white">Aptitude Report</strong>. Even if you
          decide not to pursue coding, you'll have a certified analysis of your
          logical problem-solving skills.
        </p>
        <div className="flex justify-center gap-4 flex-wrap font-mono text-xs uppercase tracking-wider">
          <div className="h-12 px-6 bg-surface-dark border border-border-dark rounded flex items-center justify-center text-gray-400 font-bold">
            [ Verified ]
          </div>
          <div className="h-12 px-6 bg-surface-dark border border-border-dark rounded flex items-center justify-center text-gray-400 font-bold">
            [ Logic Certified ]
          </div>
          <div className="h-12 px-6 bg-surface-dark border border-border-dark rounded flex items-center justify-center text-gray-400 font-bold">
            [ Top 10% ]
          </div>
        </div>
      </div>
    </section>
  );
};
