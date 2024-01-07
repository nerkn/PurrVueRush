import { boolean, string, z } from "zod";

export const FileUploadSchemas = {
  id: z.object({
    id: z.coerce.number(),
  }),
  create: z.object({
    name: z.string(),
    //picture: z.ZodOptional.string(),
    parent_id: z.number(),
  }),
};
