import { Response } from "express";

import { OrderService } from "./order.service";

import { AuthRequest } from "../../types/auth-request";

const orderService =
  new OrderService();

export class OrderController {

  async placeOrder(
    req: AuthRequest,
    res: Response
  ) {

    const order =
      await orderService.placeOrder(
        req.user!.id
      );

    return res.status(201).json({
      success: true,
      message:
        "Order placed successfully",
      data: order,
    });
  }

  async getMyOrders(
    req: AuthRequest,
    res: Response
  ) {

    const orders =
      await orderService.getMyOrders(
        req.user!.id
      );

    return res.status(200).json({
      success: true,
      data: orders,
    });
  }

  async getOrderById(
    req: AuthRequest,
    res: Response
  ) {

    const order =
      await orderService.getOrderById(
        Number(req.params.id),
        req.user!.id
      );

    return res.status(200).json({
      success: true,
      data: order,
    });
  }

  async acceptOrder(
    req: AuthRequest,
    res: Response
  ) {

    const order =
      await orderService.acceptOrder(
        Number(req.params.id)
      );

    return res.status(200).json({
      success: true,
      message:
        "Order accepted",
      data: order,
    });
  }

  async updateOrderStatus(
    req: AuthRequest,
    res: Response
  ) {

    const order =
      await orderService.updateOrderStatus(
        Number(req.params.id),
        req.body.status
      );

    return res.status(200).json({
      success: true,
      message:
        "Order status updated",
      data: order,
    });
  }
}