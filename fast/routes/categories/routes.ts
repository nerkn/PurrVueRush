import { FastifyInstance } from "fastify";
import { CategorySchemas } from "./zodschemas";
import { findSubCategories, prisma } from "../../libs/db";

import fp from "fastify-plugin";

export function categoriesRoute(
  fastify: FastifyInstance,
  ops: any,
  done: () => void
) {
  console.log("ops are:", ops);
  fastify.get("/categories", async (request, reply) => {
    return await prisma.category.findMany();
  });
  fastify.post("/categories", async (request, reply) => {
    let data = CategorySchemas.create.parse(request.body);
    const cat = await prisma.category.create({
      data: {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    return cat;
  });
  fastify.put("/categories/:id", async (request, reply) => {
    let data = CategorySchemas.create.parse(request.body);
    let { id } = CategorySchemas.id.parse(request.params);

    const cat = await prisma.category.update({
      data: {
        ...data,
        updated_at: new Date(),
      },
      where: {
        id,
      },
    });
    return cat;
  });
  fastify.get("/categories/:id", async (request, reply) => {
    let { id } = CategorySchemas.id.parse(request.params);

    return reply.send(
      await prisma.category.findUnique({
        where: { id },
      })
    );
    //prisma.category.
  });
  fastify.get("/categories/findSubCategories/:id", async (request, reply) => {
    let { id } = CategorySchemas.id.parse(request.params);
    return reply.send(await findSubCategories(prisma, [id]));
  });
  fastify.get("/categories/ProductCount", async () => {
    return (
      await prisma.product.groupBy({
        by: ["category_id"],
        _count: true,
      })
    ).map((pc) => ({ cid: pc.category_id, c: pc._count }));
  });
  fastify.get("/categories/:id/Products", async (request) => {
    let { id } = CategorySchemas.id.parse(request.params);
    return prisma.product.findMany({
      where: { category_id: id },
      select: { id: true, name: true },
    });
  });
  done();
}
export default fp(categoriesRoute);
