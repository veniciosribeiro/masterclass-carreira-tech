import { Type, Static } from '@sinclair/typebox';

export const AddEmailBody = Type.Object({
  email: Type.String({ format: 'email' }),
  name: Type.Optional(Type.String()),
});

export type AddEmailBodyType = Static<typeof AddEmailBody>;

export const GetResultsQuery = Type.Object({
  page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
  limit: Type.Optional(Type.Number({ default: 10, minimum: 1, maximum: 100 })),
  q: Type.Optional(Type.String()),
});

export type GetResultsQueryType = Static<typeof GetResultsQuery>;
