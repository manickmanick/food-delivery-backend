import prisma from "../config/prisma";

export class AddressRepository {
  async create(data: any) {
    return prisma.address.create({
      data,
    });
  }

  async findAllByUserId(userId: number) {
    return prisma.address.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return prisma.address.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: any) {
    return prisma.address.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.address.delete({
      where: {
        id,
      },
    });
  }

  async clearDefaultAddresses(userId: number) {
    return prisma.address.updateMany({
      where: {
        userId,
      },

      data: {
        isDefault: false,
      },
    });
  }
}
