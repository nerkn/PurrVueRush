import { FastifyInstance } from "fastify";
import { prisma } from "../../libs/db";
import { ProductSchemas } from "./zodschemas";

const base = "/api/products";

export function productsRoute(
  fastify: FastifyInstance,
  ops: any,
  done: () => void
) {
  fastify.get(base, async (request, reply) => {
    return await prisma.product.findMany();
  });

  fastify.get(base + "/:id", async (request, reply) => {
    let { id } = ProductSchemas.id.parse(request.params);

    return reply.send(
      await prisma.product.findUnique({
        where: { id },
      })
    );
    //prisma.category.
  });
  fastify.post(base, async (request) => {
    let data = ProductSchemas.create.parse(request.body);
    const newProduct = await prisma.product.create({
      data: { ...data, created_at: new Date(), updated_at: new Date() },
    });
    return newProduct;
  });

  fastify.put(base + "/:id", async (request) => {
    let data = ProductSchemas.create.parse(request.body);
    let { id } = ProductSchemas.id.parse(request.params);
    const oldProduct = await prisma.product.update({
      data: { ...data, updated_at: new Date() },
      where: { id },
    });
    return oldProduct;
  });
  fastify.delete(base, async (request) => {
    let { id } = ProductSchemas.id.parse(request.body);
    prisma.product.delete({ where: { id } });
  });
  done();
}
