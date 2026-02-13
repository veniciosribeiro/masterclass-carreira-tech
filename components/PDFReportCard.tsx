import React from 'react';

const ChartBar = ({ width, color, label, value, delay }: { width: string; color: string; label: string; value: string; delay: string }) => {
  const [animatedWidth, setAnimatedWidth] = React.useState('0%');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(width);
    }, parseInt(delay) || 0);
    return () => clearTimeout(timer);
  }, [width, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-[10px] text-gray-400 font-sans mb-1 uppercase tracking-wide">
        <span>{label}</span>
        <span className="font-bold text-white">{value}</span>
      </div>
      <div className="h-1.5 rounded-sm w-full bg-[#161B22] overflow-hidden">
        <div
          className={`h-full rounded-sm ${color} transition-all duration-1000 ease-out`}
          style={{ width: animatedWidth }}
        />
      </div>
    </div>
  );
};

export const PDFReportCard: React.FC = () => {
  return (
    <div className="relative perspective-1000 group flex justify-center w-full">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50" />

      <div className="relative w-full max-w-[400px] h-[460px] bg-[#0D1117] border border-[#30363D] shadow-2xl rounded-sm transform transition-transform duration-700 hover:scale-[1.02] md:rotate-y-[-12deg] md:rotate-x-[5deg] hover:rotate-0 p-5 flex flex-col justify-between overflow-hidden">

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

        {/* PDF Header Section */}
        <div className="mt-4 text-center space-y-2">
          <div>
            <h3 className="text-2xl font-bold text-white leading-none font-sans">Relatório de</h3>
            <h3 className="text-2xl font-bold text-white leading-none font-sans">Aptidão Tech</h3>
          </div>

          <div className="w-2/3 mx-auto h-px bg-[#30363D] my-3" />

          <div className="space-y-1">
            <div className="text-xs text-gray-300 font-sans">Nome de Usuário</div>
            <div className="text-[10px] text-gray-500 font-sans">usuario@email.com</div>
          </div>
        </div>

        {/* Profile Box */}
        <div className="mt-4 bg-[#161B22] border border-primary/50 rounded p-4 text-center relative">
          <div className="text-[12px] text-primary uppercase tracking-wider mb-1 font-sans font-bold">Seu Perfil Dominante</div>
          <div className="text-lg font-bold text-white font-sans">Desenvolvedor Front-End</div>
        </div>

        {/* Fake Charts */}
        <div className="mt-4 space-y-1 opacity-80">
          <div className="text-[8px] text-primary font-bold uppercase mb-2 font-sans">Afinidade por Área</div>
          <ChartBar label="Front-End" value="92%" width="92%" color="bg-primary" delay="0ms" />
          <ChartBar label="Back-End" value="45%" width="45%" color="bg-[#3b82f6]" delay="200ms" />
          <ChartBar label="Dados & IA" value="30%" width="30%" color="bg-[#7c3aed]" delay="400ms" />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-[#30363D]">
          <div className="text-[8px] text-center text-gray-500 font-sans">
                        Masterclass Test-Drive Da Carreira Tech — Documento Oficial
          </div>
        </div>
      </div>

      <style>{`
                .perspective-1000 { perspective: 1000px; }
                .rotate-y-[-12deg] { transform: rotateY(-12deg); }
                .rotate-x-[5deg] { transform: rotateX(5deg); }
            `}</style>
    </div>
  );
};
