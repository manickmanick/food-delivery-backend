import prisma from "../config/prisma";

export class MenuRepository {
  async create(data: {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    restaurantId: number;
    categoryId: number;
  }) {
    return prisma.menuItem.create({
      data,
    });
  }

  async findAll() {
    return prisma.menuItem.findMany({
      include: {
        category: true,
        restaurant: true,
      },
    });
  }

  async findById(id: number) {
    return prisma.menuItem.findUnique({
      where: {
        id,
      },

      include: {
        restaurant: true,
        category: true,
      },
    });
  }

  async update(id: number, data: any) {
    return prisma.menuItem.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.menuItem.delete({
      where: {
        id,
      },
    });
  }
  async findByRestaurantId(restaurantId: number) {
    return prisma.menuItem.findMany({
      where: {
        restaurantId,
      },

      include: {
        category: true,
      },
    });
  }
}
