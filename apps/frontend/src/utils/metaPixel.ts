import { useEffect, useRef, type RefObject } from 'react';
import { DEFAULT_CONTENT_ID, DEFAULT_EVENTS_API_URL } from './metaEventsConfig';

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

// Os defaults ficam em metaEventsConfig.ts porque o vite.config.ts também os
// usa (Init antecipado no index.html) e precisa dos mesmos valores.
const EVENTS_API_URL =
  import.meta.env.VITE_META_EVENTS_API_URL || DEFAULT_EVENTS_API_URL;
const CONTENT_ID =
  import.meta.env.VITE_META_EVENTS_CONTENT_ID || DEFAULT_CONTENT_ID;

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
  disablePushState?: boolean;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
    // Promise do POST 'Init' disparado por um <script> inline do index.html
    // (ver vite.config.ts), antes do bundle JS terminar de baixar.
    __earlyEventsInit?: Promise<EventsApiResponse>;
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
  fn?: string;
  ln?: string;
  em?: string;
  ph?: string;
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
  // Por padrão o fbevents.js intercepta history.pushState/replaceState e
  // popstate e dispara um PageView por conta própria a cada um — inclusive
  // em clique de âncora (#seção) e no navigate() do React Router. Esse
  // PageView automático sai com um eventID gerado pelo Pixel
  // (ob3_plugin-set_..., OpenBridge), sem par no servidor, então nunca é
  // deduplicado com o PageView do CAPI: conta em dobro e infla o número de
  // PageViews a cada clique no menu.
  //
  // Contrapartida: o Pixel só aceita UM PageView explícito por carregamento
  // de página (o segundo é descartado em silêncio — só o caminho automático
  // de SPA pode repetir). Numa navegação client-side (ex.: /obrigado) o
  // nosso PageView explícito, com o eventID do servidor, não chega ao
  // browser; o do CAPI segue valendo, sem duplicata.
  fbq.disablePushState = true;

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
 *
 * Nunca FABRICA um _fbp novo quando ele não existe — só renova o TTL do
 * que já está lá. Gerar um valor às pressas aqui, antes de dar tempo do
 * servidor responder, é exatamente a corrida que sobrescrevia o histórico
 * correto no banco: a events API é quem decide (restaura do histórico do
 * usuário, ou gera um novo se realmente não existir em lugar nenhum) e o
 * client adota o que ela devolver via adoptResolvedFbpFbc().
 */
function syncFbpFbc(): void {
  if (typeof document === 'undefined') return;

  const existingFbp = readCookie('_fbp');
  if (existingFbp) {
    writeCookie('_fbp', existingFbp, FBP_FBC_TTL_MS);
  }

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

/**
 * Pega (uma única vez) o Init que o index.html já disparou antes do bundle
 * carregar. Assim o handshake — o request mais lento da sessão, já que paga
 * a conexão fria até a origem — roda em paralelo com o download do JS em vez
 * de só começar depois do React montar.
 */
function takeEarlyInit(): Promise<EventsApiResponse> | null {
  if (typeof window === 'undefined') return null;
  const early = window.__earlyEventsInit ?? null;
  window.__earlyEventsInit = undefined;
  return early;
}

async function postToEventsApi(
  eventType: string,
  data: Record<string, unknown>
): Promise<EventsApiResponse | null> {
  try {
    const early = eventType === 'Init' ? takeEarlyInit() : null;
    if (early) {
      try {
        const earlyData = await early;
        adoptResolvedFbpFbc(earlyData);
        return earlyData;
      } catch (err) {
        // Falhou (rede, CORS, 5xx) — cai no request normal abaixo.
        console.warn('[metaPixel] early Init failed, retrying:', err);
      }
    }

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
 *
 * Todo evento que não é o próprio 'Init' espera o handshake terminar antes de
 * sair. Sem isso, um evento disparado logo no carregamento corre contra o
 * Init: o cookie userId ainda não existe, a API gera um external_id novo só
 * pra ele (usuário fantasma, diferente do Init/PageView) e o fbq('track')
 * pode rodar antes do fbq('init'). Também evita um preflight CORS extra em
 * paralelo, que o navegador só consegue cachear depois do primeiro terminar.
 */
export async function sendEvent(
  eventType: string,
  data: Record<string, unknown> = {}
): Promise<EventsApiResponse | null> {
  if (typeof window === 'undefined') return null;

  if (eventType !== 'Init') await initializePixel(BUSSOLA_PIXEL_ID);

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
      // Perfil já conhecido do usuário (visitante recorrente com Lead
      // anterior) — alimenta o Advanced Matching do Pixel, não só o CAPI
      // do servidor. Só inclui os campos que existem, igual o track.js.
      ...(init.fn ? { fn: init.fn } : {}),
      ...(init.ln ? { ln: init.ln } : {}),
      ...(init.em ? { em: init.em } : {}),
      ...(init.ph ? { ph: init.ph } : {}),
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
 * ele fica visível, uma única vez. Mesmo padrão do IntersectionObserver de
 * ViewContent/AddToWishlist do track.js, adaptado pra hook do React.
 *
 * `threshold` é a fração do elemento que precisa estar na tela (0 a 1). Com
 * o padrão (0), 1px visível já dispara — numa tela de 900px de altura isso
 * bastava pra um evento "de scroll" sair no carregamento, sem o usuário
 * rolar. Cuidado com frações altas em seções mais altas que a viewport: se
 * a fração nunca puder ser atingida (ex.: 0.5 numa seção com o dobro da
 * altura da tela), o evento nunca dispara.
 */
export function useTrackOnVisible<T extends HTMLElement = HTMLElement>(
  eventName: string,
  params?: Record<string, unknown>,
  options?: { threshold?: number }
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const firedRef = useRef(false);
  const threshold = options?.threshold ?? 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // A 1ª notificação de um observer chega com isIntersecting=true
          // mesmo abaixo do threshold (basta 1px sobreposto) — por isso a
          // fração também é conferida aqui.
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= threshold &&
            !firedRef.current
          ) {
            firedRef.current = true;
            trackEvent(eventName, params);
            observer.unobserve(el);
          }
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dispara só uma vez por elemento; params e threshold não precisam re-executar o effect
  }, [eventName]);

  return ref;
}
