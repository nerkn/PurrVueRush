import { boolean, string, z } from "zod";

export const CategorySchemas = {
  id: z.object({
    id: z.coerce.number(),
  }),
  create: z.object({
    name: z.string(),
    //picture: z.ZodOptional.string(),
    parent_id: z.number(),
  }),
};
