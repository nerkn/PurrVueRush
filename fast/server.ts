import Fastify from "fastify";
import categoriesRoute from "./routes/categories/routes.js";
import { prisma } from "./libs/db.js";
import { productsRoute } from "./routes/products/routes.js";
import { fileUploadRoute } from "./routes/fileUpload/routes.js";
import staticServe from "@fastify/static";
import path from "path";

const fastify = Fastify({
  logger: true,
});

fastify.register(staticServe, {
  root: [
    new URL("./public", import.meta.url),
    new URL("../frontend/dist", import.meta.url),
  ],
});
fastify.get("/", function (request, reply) {
  return reply.send({ hello: "world" });
});
fastify.decorate("prisma", prisma);
fastify.register(categoriesRoute);
fastify.register(productsRoute);
fastify.register(fileUploadRoute);

// Run the server!
fastify.listen({ host: "0.0.0.0", port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
