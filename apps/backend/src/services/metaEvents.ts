const EVENTS_API_URL =
  process.env.META_EVENTS_API_URL ||
  'https://api.foconoobjetivo.com/events/send';
// Content_id oficial da masterclass. Ainda não está cadastrado em
// config/conversions.php na API de eventos (só tem 5074373, 4728662 e
// 1234567) — precisa ser adicionado lá, mapeado pro BUSSOLA_PIXEL_ID, senão
// cai no pixel/token default do .env em vez do certo.
//
// Não há campo test_event_code no payload — a API de eventos (Laravel)
// ignora esse campo; o código de teste do Test Events é configurado do
// lado dela via CONVERSIONS_API_TEST_CODE no .env, não por request.
const CONTENT_ID = process.env.META_EVENTS_CONTENT_ID || '123456';

interface SendLeadEventInput {
  email: string;
  name: string;
  eventSourceUrl?: string;
  fbc?: string;
  fbp?: string;
  externalId?: string;
}

interface EventsApiResponse {
  eventID?: string;
  [key: string]: unknown;
}

interface Logger {
  error: (obj: unknown, message?: string) => void;
}

/**
 * Envia o evento Lead direto pro api.foconoobjetivo.com/events/send
 * (servidor-a-servidor, já integrado ao Meta Conversions API), ancorado no
 * registro confiável em /api/webinar/register em vez de depender do
 * browser disparar depois do redirect. Retorna o eventID pro caller
 * repassar ao frontend, que espelha o mesmo evento no Pixel pra dedup.
 */
export async function sendLeadEvent(
  input: SendLeadEventInput,
  log: Logger,
): Promise<string | null> {
  const nameParts = input.name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const firstName = nameParts[0];
  const lastName =
    nameParts.length > 1 ? nameParts[nameParts.length - 1] : undefined;

  const payload: Record<string, unknown> = {
    contentId: CONTENT_ID,
    eventType: 'Lead',
    event_source_url: input.eventSourceUrl,
    _fbc: input.fbc,
    _fbp: input.fbp,
    userId: input.externalId,
    em: input.email.trim().toLowerCase(),
    fn: firstName,
    // Precisa bater com os mesmos valores do mirrorServerEvent() em
    // ObrigadoSemente.tsx — os dois lados desse Lead são mesclados pelo
    // Meta via eventID, e cada campo só sobrevive na versão final se pelo
    // menos um dos dois lados o enviar.
    value: 0,
    currency: 'BRL',
    source: 'webinar_semente',
  };
  if (lastName) payload.ln = lastName;

  try {
    const response = await fetch(EVENTS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`events API returned ${response.status}`);
    }

    const data = (await response.json()) as EventsApiResponse;
    return data.eventID ?? null;
  } catch (error) {
    log.error({ err: error }, 'Failed to send Lead event to events API');
    return null;
  }
}
