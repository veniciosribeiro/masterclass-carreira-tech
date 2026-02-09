export type ImageSize = '1K' | '2K' | '4K';

// Fix: Define AIStudio interface to match the global type expected by the environment
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}