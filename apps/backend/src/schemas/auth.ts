import { Type, type Static } from "@sinclair/typebox";

export const ValidateEmailBody = Type.Object({
  email: Type.String({ format: "email" }),
});

export type ValidateEmailBodyType = Static<typeof ValidateEmailBody>;

export const ValidateEmailResponse = Type.Object({
  authorized: Type.Boolean(),
  name: Type.Optional(Type.String()),
  token: Type.Optional(Type.String()),
});
