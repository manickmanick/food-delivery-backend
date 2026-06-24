import { Response } from "express";

import { CartService } from "./cart.service";
import { AuthRequest } from "../../types/auth-request";

const cartService = new CartService();

export class CartController {
  async addToCart(req: AuthRequest, res: Response) {
    const result = await cartService.addToCart(
      req.user!.id,
      req.body.menuItemId,
      req.body.quantity,
    );

    return res.status(200).json(result);
  }

  async getCart(req: AuthRequest, res: Response) {
    const cart = await cartService.getCart(req.user!.id);

    return res.status(200).json({
      success: true,
      data: cart,
    });
  }

  async updateQuantity(req: AuthRequest, res: Response) {
    const item = await cartService.updateQuantity(
      Number(req.params.id),
      req.body.quantity,
      req.user!.id,
    );
    return res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      data: item,
    });
  }

  async removeItem(req: AuthRequest, res: Response) {
    await cartService.removeItem(Number(req.params.id), req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Item removed successfully",
    });
  }

  async clearCart(req: AuthRequest, res: Response) {
    await cartService.clearCart(req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  }
}
