import { Type, type Static } from '@sinclair/typebox';

export const SendResultsBody = Type.Object({
  sessionId: Type.String(),
  email: Type.Optional(Type.String()),
});
export type SendResultsBodyType = Static<typeof SendResultsBody>;
