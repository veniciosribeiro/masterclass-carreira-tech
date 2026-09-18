import { useEffect, useRef, type RefObject } from 'react';

/**
 * Meta Pixel — público Webinário Carreira Tech + Bússola (CM-P010, A2.4).
 * Separado do público da Masterclass para não misturar audiências/lookalikes.
 *
 * Cada evento é enviado tanto pro Pixel do browser (fbq) quanto pra API de
 * eventos própria (api.foconoobjetivo.com/events/send, já integrada com o
 * Meta Conversions API) usando o mesmo eventID, pra ativar a deduplicação
 * nativa do Meta entre Pixel e CAPI. Padrão portado do track.js.
 */
export const BUSSOLA_PIXEL_ID = '2915608258822003';

const EVENTS_API_URL =
  import.meta.env.VITE_META_EVENTS_API_URL ||
  'https://api.foconoobjetivo.com/events/send';
// Content_id oficial da masterclass. Ainda não está cadastrado em
// config/conversions.php na API de eventos (só tem 5074373, 4728662 e
// 1234567) — precisa ser adicionado lá, mapeado pro BUSSOLA_PIXEL_ID, senão
// cai no pixel/token default do .env em vez do certo.
const CONTENT_ID = import.meta.env.VITE_META_EVENTS_CONTENT_ID || '123456';

// Domínio raiz compartilhado por todas as propriedades — precisa ser um
// domínio pai do host atual (ex.: carreira-tech.foconoobjetivo.com) pra
// esses cookies serem gravados e viajarem junto no fetch pra events API.
const COOKIE_DOMAIN = '.foconoobjetivo.com';
const FBP_FBC_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 dias — padrão do Meta Pixel pra _fbp/_fbc

// O external_id/userId NÃO é mais gerenciado por cookie aqui — a
// api.foconoobjetivo.com/events/send já mantém um cookie userId próprio
// (HttpOnly, setado pelo middleware EnsureUserIdCookie), que é a fonte de
// verdade: viaja automaticamente em toda requisição via credentials:
// 'include', sobrevive ao teto de 7 dias/24h do ITP do Safari (que só
// afeta cookies escritos por JS), e o servidor já ignora qualquer userId
// que a gente mande no corpo em favor desse cookie. Só guardamos aqui o
// valor que a resposta do 'Init' devolve, pra poder repassar pro nosso
// próprio backend quando ele precisar chamar a events API server-a-servidor
// (essa chamada não carrega o cookie do navegador, então precisa do valor
// explícito) — ver getResolvedExternalId().

// Eventos que não são padrão do Meta viram fbq('trackCustom', ...) em vez de
// fbq('track', ...). Lista portada do track.js; nenhum é usado hoje, mas
// mantém paridade caso scroll/vídeo tracking seja adicionado depois.
const CUSTOM_EVENT_TYPES = new Set([
  'Scroll_25',
  'Scroll_50',
  'Scroll_75',
  'Scroll_90',
  'Timer_1min',
  'PlayVideo',
  'ViewVideo_25',
  'ViewVideo_50',
  'ViewVideo_75',
  'ViewVideo_90',
]);

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

interface EventsApiResponse {
  eventID?: string;
  ct?: string;
  st?: string;
  zp?: string;
  country?: string;
  external_id?: string;
  fbc?: string;
  fbp?: string;
  [key: string]: unknown;
}

// Promise por pixelId, não um Set — qualquer chamador que precise disparar
// fbq('track', ...) depois (ex.: espelhar um evento vindo do backend) pode
// aguardar essa promise pra garantir que fbq('init', ...) já foi chamado
// antes, mesmo que os dois efeitos disparem no mesmo commit do React.
const pixelReadyPromises = new Map<string, Promise<void>>();

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

export function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  for (const cookie of document.cookie.split('; ')) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue ?? '');
  }
  return null;
}

/**
 * O atributo `domain` só é aceito pelo browser se for o host atual ou um
 * domínio pai dele — um Set-Cookie com domain=.foconoobjetivo.com é
 * silenciosamente ignorado (sem erro) em qualquer outro host, como
 * localhost. Nesse caso cai pra host-only cookie (sem atributo domain),
 * que é o que se quer em dev local de qualquer forma.
 */
function resolveCookieDomain(): string | null {
  if (typeof window === 'undefined') return null;
  const { hostname } = window.location;
  const rootHost = COOKIE_DOMAIN.slice(1); // 'foconoobjetivo.com'
  return hostname === rootHost || hostname.endsWith(COOKIE_DOMAIN)
    ? COOKIE_DOMAIN
    : null;
}

function writeCookie(name: string, value: string, ttlMs: number): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + ttlMs).toUTCString();
  const domain = resolveCookieDomain();
  const domainAttr = domain ? `; domain=${domain}` : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/${domainAttr}; SameSite=Lax`;
}

// Preenchido a partir da resposta do 'Init' (ver initializePixel) — nunca
// gerado no client.
let resolvedExternalId: string | null = null;

/**
 * external_id que a api.foconoobjetivo.com resolveu pra essa sessão
 * (cookie HttpOnly dela, ecoado na resposta do 'Init'). Só existe depois
 * do handshake inicial ter completado; null até lá. Uso principal: repassar
 * pro nosso próprio backend nas chamadas servidor-a-servidor (ex.: Lead em
 * /webinar/register), que não têm acesso ao cookie do navegador.
 */
export function getResolvedExternalId(): string | null {
  return resolvedExternalId;
}

function generateFbp(): string {
  const random = Math.floor(Math.random() * 1e10);
  return `fb.1.${Date.now()}.${random}`;
}

function captureFbcFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : null;
}

function extractFbclid(fbc: string): string | null {
  const parts = fbc.split('.');
  return parts.length === 4 ? parts[3] : null;
}

/**
 * Mantém _fbp/_fbc vivos independente do fbevents.js ter carregado — se o
 * clique veio de um anúncio novo (fbclid mudou), atualiza _fbc; senão só
 * renova o TTL. Roda no boot e depois de cada evento.
 */
function syncFbpFbc(): void {
  if (typeof document === 'undefined') return;

  const existingFbp = readCookie('_fbp');
  writeCookie('_fbp', existingFbp || generateFbp(), FBP_FBC_TTL_MS);

  const existingFbc = readCookie('_fbc');
  const capturedFbc = captureFbcFromUrl();

  if (existingFbc) {
    const shouldReplace =
      capturedFbc !== null &&
      extractFbclid(existingFbc) !== extractFbclid(capturedFbc);
    writeCookie(
      '_fbc',
      shouldReplace ? capturedFbc : existingFbc,
      FBP_FBC_TTL_MS
    );
  } else if (capturedFbc) {
    writeCookie('_fbc', capturedFbc, FBP_FBC_TTL_MS);
  }
}

async function postToEventsApi(
  eventType: string,
  data: Record<string, unknown>
): Promise<EventsApiResponse | null> {
  try {
    const payload = {
      contentId: CONTENT_ID,
      eventType,
      event_source_url: window.location.href,
      _fbc: readCookie('_fbc'),
      _fbp: readCookie('_fbp'),
      ...data,
    };

    const response = await fetch(EVENTS_API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`events API returned ${response.status}`);
    }

    const responseData = (await response.json()) as EventsApiResponse;
    adoptResolvedFbpFbc(responseData);
    return responseData;
  } catch (err) {
    console.error(`[metaPixel] failed to send ${eventType}:`, err);
    return null;
  }
}

/**
 * A events API resolve _fbc/_fbp do lado servidor (fbclid novo na URL, ou
 * restaurado do último valor conhecido do usuário quando o cookie local
 * expirou — _fbp/_fbc escritos por JS são limitados a 7 dias/24h pelo ITP
 * do Safari). Adota esse valor no cookie local em toda resposta, pra não
 * ficar gerando um _fbp novo à toa quando o servidor já sabia o certo.
 */
function adoptResolvedFbpFbc(responseData: EventsApiResponse): void {
  if (responseData.fbp) {
    writeCookie('_fbp', responseData.fbp, FBP_FBC_TTL_MS);
  }
  if (responseData.fbc) {
    writeCookie('_fbc', responseData.fbc, FBP_FBC_TTL_MS);
  }
}

/**
 * Envia o evento pra api.foconoobjetivo.com/events/send (que repassa pro
 * Meta CAPI) e espelha no Pixel do browser com o mesmo eventID devolvido,
 * pra deduplicação. 'Init' é um handshake privado com o backend de eventos
 * (retorna geo pra Advanced Matching) e não dispara fbq.
 */
export async function sendEvent(
  eventType: string,
  data: Record<string, unknown> = {}
): Promise<EventsApiResponse | null> {
  if (typeof window === 'undefined') return null;

  const responseData = await postToEventsApi(eventType, data);
  if (!responseData) return null;
  if (eventType === 'Init') return responseData;

  if (CUSTOM_EVENT_TYPES.has(eventType)) {
    window.fbq?.('trackCustom', eventType, data, {
      eventID: responseData.eventID,
    });
  } else {
    window.fbq?.(
      'track',
      eventType,
      { content_ids: [CONTENT_ID], ...data },
      { eventID: responseData.eventID }
    );
  }

  syncFbpFbc();
  return responseData;
}

function initializePixel(pixelId: string): Promise<void> {
  let promise = pixelReadyPromises.get(pixelId);
  if (promise) return promise;

  promise = (async () => {
    ensureFbqScript();
    const init = (await sendEvent('Init')) ?? {};
    resolvedExternalId = init.external_id ?? null;
    window.fbq?.('init', pixelId, {
      ct: init.ct || '',
      st: init.st || '',
      zp: init.zp || '',
      country: init.country || '',
      external_id: resolvedExternalId || '',
    });
  })();
  pixelReadyPromises.set(pixelId, promise);
  return promise;
}

/**
 * Injeta o script base, inicializa o pixel uma única vez (com Advanced
 * Matching enriquecido via handshake 'Init') e dispara PageView a cada
 * chamada (uma por mount de página/rota).
 */
export async function trackPageView(pixelId: string): Promise<void> {
  if (typeof window === 'undefined') return;

  syncFbpFbc();
  await initializePixel(pixelId);
  await sendEvent('PageView');
}

/**
 * Dispara um evento de conversão (Lead, InitiateCheckout, etc.) — fire and
 * forget. Para fluxos que precisam esperar o envio completar antes de
 * navegar (ex.: clique num link de checkout), use sendEvent() diretamente.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  void sendEvent(eventName, params);
}

/**
 * Espelha no Pixel do browser um evento que já foi reportado ao Meta CAPI
 * pelo backend (ex.: Lead server-side em /webinar/register), usando o
 * mesmo eventID pra deduplicação. Aguarda fbq('init', ...) ter rodado —
 * necessário porque este espelho normalmente dispara de um useEffect
 * separado do <MetaPixel>, que pode não ter terminado a inicialização
 * ainda no mesmo commit do React.
 */
export async function mirrorServerEvent(
  pixelId: string,
  eventType: string,
  data: Record<string, unknown>,
  eventId: string | null
): Promise<void> {
  if (typeof window === 'undefined') return;

  await initializePixel(pixelId);
  window.fbq?.(
    'track',
    eventType,
    { content_ids: [CONTENT_ID], ...data },
    eventId ? { eventID: eventId } : undefined
  );
}

/**
 * Anexa um IntersectionObserver ao elemento do ref devolvido e dispara
 * `eventName` (via trackEvent — Pixel + CAPI com dedup) na primeira vez que
 * ele entra na viewport, uma única vez. Mesmo padrão do IntersectionObserver
 * de ViewContent/AddToWishlist do track.js, adaptado pra hook do React.
 */
export function useTrackOnVisible<T extends HTMLElement = HTMLElement>(
  eventName: string,
  params?: Record<string, unknown>
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          trackEvent(eventName, params);
          observer.unobserve(el);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dispara só uma vez por elemento; params não precisa re-executar o effect
  }, [eventName]);

  return ref;
}
