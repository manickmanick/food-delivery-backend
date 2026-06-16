import prisma from "../config/prisma";

export class CartItemRepository {
  async findCartItemById(cartItemId: number) {
    return prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },

      include: {
        cart: {
          select: {
            userId: true,
          },
        },
      },
    });
  }
}
