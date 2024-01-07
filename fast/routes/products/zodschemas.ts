import { boolean, string, z } from "zod";

export const ProductSchemas = {
  id: z.object({
    id: z.coerce.number(),
  }),
  create: z.object({
    name: z.string(),
    category_id: z.number(),
  }),
};
