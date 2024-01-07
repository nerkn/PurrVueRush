import { PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";
import { FastifyInstance } from "fastify";

export type fastifyPrisma = FastifyInstance & {
  prisma: PrismaClient<
    {
      log: "info"[];
    },
    never,
    DefaultArgs
  >;
};
