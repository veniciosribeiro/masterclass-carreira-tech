import { Type, type Static } from "@sinclair/typebox";

// --- Create Session ---
export const CreateSessionBody = Type.Object({
  name: Type.String({ minLength: 1 }),
});

export type CreateSessionBodyType = Static<typeof CreateSessionBody>;

// --- Save Progress ---
export const SaveProgressBody = Type.Object({
  answers: Type.Array(Type.Any()),
  currentQuestion: Type.Integer({ minimum: 0 }),
  shuffledOrderings: Type.Optional(
    Type.Record(Type.String(), Type.Array(Type.String())),
  ),
});

export type SaveProgressBodyType = Static<typeof SaveProgressBody>;

// --- Params with session ID ---
export const SessionParams = Type.Object({
  id: Type.String({ format: "uuid" }),
});

export type SessionParamsType = Static<typeof SessionParams>;
