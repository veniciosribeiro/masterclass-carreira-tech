import { Type, Static } from "@sinclair/typebox";

export const AddEmailBody = Type.Object({
  email: Type.String({ format: "email" }),
  name: Type.Optional(Type.String()),
});

export type AddEmailBodyType = Static<typeof AddEmailBody>;
