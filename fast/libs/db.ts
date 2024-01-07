import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["info"],
});

export async function findSubCategories(
  prisma: PrismaClient,
  categoryId: number[]
): Promise<number[]> {
  let cats = await prisma.category.findMany({
    where: {
      parent_id: { in: categoryId },
    },
  });
  let catsIds = cats.map((c) => c.id);
  console.log(cats);
  if (cats.length) {
    return [...categoryId, ...(await findSubCategories(prisma, catsIds))];
  }
  return categoryId;
}
