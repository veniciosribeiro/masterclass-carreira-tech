import { Type, type Static } from '@sinclair/typebox';

export const SaveResultBody = Type.Object({
  sessionId: Type.Optional(Type.String()),
  userName: Type.String({ minLength: 1 }),
  userEmail: Type.String({ format: 'email' }),
  answers: Type.Any(),
  areaScores: Type.Any(),
  profile: Type.String({ minLength: 1 }),
  behavioralScores: Type.Any(),
  resultJson: Type.Any(),
});

export type SaveResultBodyType = Static<typeof SaveResultBody>;
