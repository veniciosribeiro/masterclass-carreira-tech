/**
 * Meta Pixel — público Webinário Carreira Tech + Bússola (CM-P010, A2.4).
 * Separado do público da Masterclass para não misturar audiências/lookalikes.
 */
export const BUSSOLA_PIXEL_ID = '1029265373246794';

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const initializedPixels = new Set<string>();

function ensureFbqScript(): void {
  if (typeof window === 'undefined' || window.fbq) return;

  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue?.push(args);
    }
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';

  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
}

/**
 * Injeta o script base (se necessário), inicializa o pixel uma única vez
 * e dispara PageView a cada chamada (uma por mount de página/rota).
 */
export function trackPageView(pixelId: string): void {
  if (typeof window === 'undefined') return;

  ensureFbqScript();

  if (!initializedPixels.has(pixelId)) {
    window.fbq?.('init', pixelId);
    initializedPixels.add(pixelId);
  }

  window.fbq?.('track', 'PageView');
}

/**
 * Dispara um evento de conversão (Lead, InitiateCheckout, etc.) no pixel
 * já inicializado pela página atual.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  window.fbq?.('track', eventName, params);
}
