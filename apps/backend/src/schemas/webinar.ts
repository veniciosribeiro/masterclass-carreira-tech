import { Type, type Static } from '@sinclair/typebox';

export const RegisterWebinarBody = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
  // Mesmo external_id que a events API (laravel-api) usa pra essa pessoa —
  // guardado direto na inscrição pra ter um vínculo durável entre as duas
  // bases, independente do Lead do Meta CAPI (disparado pelo navegador)
  // ter chegado lá ou não.
  externalId: Type.Optional(Type.String({ minLength: 1 })),
});
export type RegisterWebinarBodyType = Static<typeof RegisterWebinarBody>;

export const RegisterWebinarResponse = Type.Object({
  registered: Type.Boolean(),
  // O Lead do Meta é disparado pelo navegador (SementeForm), não por aqui.
});
