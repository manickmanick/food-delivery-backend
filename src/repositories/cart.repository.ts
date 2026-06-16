import prisma from "../config/prisma";

export class CartRepository {
  async findCartByUserId(userId: number) {
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

  async createCart(userId: number, restaurantId: number) {
    return prisma.cart.create({
      data: {
        userId,
        restaurantId,
      },
    });
  }

  async findCartItem(cartId: number, menuItemId: number) {
    return prisma.cartItem.findFirst({
      where: {
        cartId,
        menuItemId,
      },
    });
  }

  async createCartItem(cartId: number, menuItemId: number, quantity: number) {
    return prisma.cartItem.create({
      data: {
        cartId,
        menuItemId,
        quantity,
      },
    });
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number) {
    return prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });
  }

  async getCart(userId: number) {
    return prisma.cart.findUnique({
      where: {
        userId,
      },

      include: {
        restaurant: true,

        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }

  async deleteCartItem(cartItemId: number) {
    return prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  }

  async clearCart(cartId: number) {
    return prisma.cartItem.deleteMany({
      where: {
        cartId,
      },
    });
  }
}
