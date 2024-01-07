import { FastifyInstance } from "fastify";
import { prisma } from "../../libs/db";
import multipart from "@fastify/multipart";
import { FileUploadSchemas } from "./zodschemas";
import { createWriteStream } from "fs";
import { CategorySchemas } from "../categories/zodschemas";

export function fileUploadRoute(
  fastify: FastifyInstance,
  ops: any,
  done: () => void
) {
  fastify.register(multipart);

  fastify.post("/api/fileupload/product/:id", async (request, reply) => {
    let { id } = FileUploadSchemas.id.parse(request.params);
    let part = await request.file();
    let filename = `/images/products/${id}.webp`;
    if (part) {
      const writeStream = createWriteStream("./public" + filename);
      part.file.pipe(writeStream);
      return await prisma.product.update({
        data: { picture: filename },
        where: { id },
      });
    }
    throw Error("Wtf");
  });

  fastify.get("/api/fileupload/category/:id", async (request, reply) => {
    let { id } = CategorySchemas.id.parse(request.params);

    return reply.send(
      await prisma.product.findUnique({
        where: { id },
      })
    );
    //prisma.category.
  });
  done();
}
