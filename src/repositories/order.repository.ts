import prisma from "../config/prisma";
import { Prisma } from "@prisma/client";

export class OrderRepository {
  async getCart(userId: number) {
    return prisma.cart.findUnique({
      where: {
        userId,
      },

      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }

  async createOrderTransaction(userId: number) {
    return prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: {
          userId,
        },

        include: {
          items: {
            include: {
              menuItem: true,
            },
          },
        },
      });

      if (!cart) {
        throw new Error("Cart not found");
      }

      let totalAmount = 0;

      for (const item of cart.items) {
        totalAmount += Number(item.menuItem.price) * item.quantity;
      }

      const order = await tx.order.create({
        data: {
          userId,
          restaurantId: cart.restaurantId,
          totalAmount,
        },
      });

      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.menuItem.price,
          },
        });
      }

      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      await tx.cart.delete({
        where: {
          id: cart.id,
        },
      });

      return order;
    });
  }

  async findOrdersByUserId(userId: number) {
    return prisma.order.findMany({
      where: {
        userId,
      },

      include: {
        items: {
          include: {
            menuItem: true,
          },
        },

        restaurant: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOrderById(orderId: number) {
    return prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        items: {
          include: {
            menuItem: true,
          },
        },

        restaurant: true,
        user: true,
      },
    });
  }

  async updateStatus(orderId: number, status: any) {
    return prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        status,
      },
    });
  }
}
