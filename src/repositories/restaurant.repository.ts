import prisma from "../config/prisma";

export class RestaurantRepository {
  async create(data: {
    name: string;
    description?: string;
    address: string;
    ownerId: number;
  }) {
    return prisma.restaurant.create({
      data,
    });
  }

  async findAll() {
    return prisma.restaurant.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    return prisma.restaurant.findUnique({
      where: {
        id,
      },

      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
