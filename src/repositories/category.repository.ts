import prisma from "../config/prisma";

export class CategoryRepository {
  async findAll() {
    return prisma.category.findMany();
  }

  async findById(id: number) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }
}
