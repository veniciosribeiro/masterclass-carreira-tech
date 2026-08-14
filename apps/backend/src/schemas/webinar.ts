import { Type, type Static } from '@sinclair/typebox';

export const RegisterWebinarBody = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
});
export type RegisterWebinarBodyType = Static<typeof RegisterWebinarBody>;

export const RegisterWebinarResponse = Type.Object({
  registered: Type.Boolean(),
});
