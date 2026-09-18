import { Type, type Static } from '@sinclair/typebox';

export const RegisterWebinarBody = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
  // Sinais de identidade do Meta Pixel, capturados no browser (cookies
  // _fbc/_fbp e external_id) — usados pro Lead server-side no Meta CAPI.
  fbc: Type.Optional(Type.String()),
  fbp: Type.Optional(Type.String()),
  externalId: Type.Optional(Type.String()),
  eventSourceUrl: Type.Optional(Type.String()),
});
export type RegisterWebinarBodyType = Static<typeof RegisterWebinarBody>;

export const RegisterWebinarResponse = Type.Object({
  registered: Type.Boolean(),
  // eventID usado pra deduplicar com o disparo espelhado no Pixel do
  // browser; null se o envio pro events API falhou.
  eventId: Type.Union([Type.String(), Type.Null()]),
});
