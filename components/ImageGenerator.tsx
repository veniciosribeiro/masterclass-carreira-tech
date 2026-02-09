import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { ImageSize } from '../types';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('A futuristic coding station with neon lights in a dark room');
  const [size, setSize] = useState<ImageSize>('1K');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const imageUrl = await generateImage(prompt, size);
      setImage(imageUrl);
    } catch (err) {
        console.error(err);
      setError("Falha ao gerar imagem. Verifique se você selecionou uma chave de API paga válida.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-lab" className="px-6 py-20 bg-[#0b0e11] border-y border-border-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(25, 230, 94, 0.05) 0%, transparent 50%)' }}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <span className="material-symbols-outlined text-sm">science</span>
                Preview: Futuro do Trabalho
            </div>
          <h2 className="text-3xl md:text-4xl font-black text-white font-mono">Laboratório de Prototipagem IA</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Experimente o poder do <span className="text-primary font-mono">gemini-3-pro-image-preview</span>. 
            Test-drive nas ferramentas que você irá construir.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden p-1 shadow-2xl">
            {/* Controls */}
            <div className="lg:col-span-2 bg-[#0D1117] p-8 flex flex-col justify-center rounded-xl lg:rounded-r-none">
                <div className="mb-6">
                    <label className="block text-xs font-mono text-primary uppercase tracking-wider mb-2">Entrada de Prompt</label>
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-32 bg-surface-dark border border-border-dark rounded p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono text-sm resize-none"
                        placeholder="Descreva sua visão..."
                    />
                </div>
                
                <div className="mb-8">
                     <label className="block text-xs font-mono text-primary uppercase tracking-wider mb-2">Resolução de Saída</label>
                     <div className="grid grid-cols-3 gap-2">
                        {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                            <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`py-2 text-sm font-bold font-mono border rounded transition-all ${
                                    size === s 
                                    ? 'bg-primary text-black border-primary' 
                                    : 'bg-transparent text-gray-500 border-border-dark hover:border-gray-500'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                     </div>
                </div>

                <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded shadow-lg shadow-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono flex items-center justify-center gap-2 group"
                >
                    {loading ? (
                        <>
                           <span className="material-symbols-outlined animate-spin">refresh</span>
                           Processando...
                        </>
                    ) : (
                        <>
                            <span>&gt; Gerar_Asset</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">auto_awesome</span>
                        </>
                    )}
                </button>
                {error && (
                    <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 text-red-400 text-xs font-mono rounded">
                        Erro: {error}
                    </div>
                )}
            </div>

            {/* Preview */}
            <div className="lg:col-span-3 bg-black/50 relative min-h-[400px] flex items-center justify-center overflow-hidden rounded-xl lg:rounded-l-none border-l border-border-dark">
                {image ? (
                    <img src={image} alt="Generated output" className="w-full h-full object-contain" />
                ) : (
                    <div className="text-center p-8 opacity-50">
                        {loading ? (
                             <div className="flex flex-col items-center gap-4">
                                <div className="size-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                                <p className="font-mono text-primary animate-pulse">Inicializando Neural Render...</p>
                             </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4">
                                <span className="material-symbols-outlined text-6xl text-gray-700">image</span>
                                <p className="font-mono text-gray-500">Aguardando stream de entrada...</p>
                            </div>
                        )}
                    </div>
                )}
                 {/* Decorative Overlay */}
                 <div className="absolute top-0 left-0 p-4 font-mono text-xs text-gray-600 flex justify-between w-full pointer-events-none">
                    <span>RES: {size}</span>
                    <span>MDL: gemini-3-pro-image-preview</span>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};