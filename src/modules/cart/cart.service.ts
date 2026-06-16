import { AppError } from "../../utils/app-error";

import { CartRepository } from "../../repositories/cart.repository";

import { MenuRepository } from "../../repositories/menu.repository";
import { CartItemRepository } from "../../repositories/cartItem.repository";

export class CartService {
  private cartRepository = new CartRepository();
  private cartItemRepository = new CartItemRepository();
  private menuRepository = new MenuRepository();

  async addToCart(userId: number, menuItemId: number, quantity: number) {
    const menuItem = await this.menuRepository.findById(menuItemId);

    if (!menuItem) {
      throw new AppError("Menu item not found", 404);
    }

    let cart = await this.cartRepository.findCartByUserId(userId);

    /**
     * Cart does not exist
     */
    if (!cart) {
      const newCart = await this.cartRepository.createCart(
        userId,
        menuItem.restaurantId,
      );

      await this.cartRepository.createCartItem(
        newCart.id,
        menuItemId,
        quantity,
      );

      return {
        success: true,
        message: "Item added to cart",
      };
    }

    /**
     * Different restaurant
     */
    if (cart.restaurantId !== menuItem.restaurantId) {
      return {
        success: false,
        requiresCartReset: true,
        message: "Cart contains items from another restaurant",
      };
    }

    /**
     * Same restaurant
     */
    const existingItem = await this.cartRepository.findCartItem(
      cart.id,
      menuItemId,
    );

    if (existingItem) {
      await this.cartRepository.updateCartItemQuantity(
        existingItem.id,
        existingItem.quantity + quantity,
      );

      return {
        success: true,
        message: "Cart updated successfully",
      };
    }

    await this.cartRepository.createCartItem(cart.id, menuItemId, quantity);

    return {
      success: true,
      message: "Item added to cart",
    };
  }

  async getCart(userId: number) {
    const cart = await this.cartRepository.getCart(userId);

    if (!cart) {
      return {
        items: [],
        totalAmount: 0,
      };
    }

    const totalAmount = cart.items.reduce(
      (total: number, item) =>
        total + Number(item.menuItem.price) * item.quantity,
      0,
    );

    return {
      restaurant: cart.restaurant,
      items: cart.items,
      totalAmount,
    };
  }

  async updateQuantity(cartItemId: number, quantity: number, userId: number) {
    if (quantity <= 0) {
      throw new AppError("Quantity must be greater than 0", 400);
    }

    const cartItem = await this.cartItemRepository.findCartItemById(cartItemId);

    if (!cartItem) {
      throw new AppError("Cart item not found", 404);
    }

    if (cartItem.cart.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    return this.cartRepository.updateCartItemQuantity(cartItemId, quantity);
  }

  async removeItem(cartItemId: number, userId: number) {
    const cartItem = await this.cartItemRepository.findCartItemById(cartItemId);

    if (!cartItem) {
      throw new AppError("Cart item not found", 404);
    }

    if (cartItem.cart.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    await this.cartRepository.deleteCartItem(cartItemId);
  }

  async clearCart(userId: number) {
    const cart = await this.cartRepository.findCartByUserId(userId);

    if (!cart) {
      return;
    }

    await this.cartRepository.clearCart(cart.id);
  }
}
