import {
  OrderStatus,
} from "@prisma/client";

import { AppError }
from "../../utils/app-error";

import { OrderRepository }
from "../../repositories/order.repository";

export class OrderService {

  private orderRepository =
    new OrderRepository();

  async placeOrder(
    userId: number,
    addressId:number
  ) {

    const cart =
      await this.orderRepository
      .getCart(userId);

    if (!cart) {
      throw new AppError(
        "Cart not found",
        404
      );
    }

    if (
      cart.items.length === 0
    ) {
      throw new AppError(
        "Cart is empty",
        400
      );
    }

    return this.orderRepository
      .createOrderTransaction(
        userId,
        addressId
      );
  }

  async getMyOrders(
    userId: number
  ) {

    return this.orderRepository
      .findOrdersByUserId(
        userId
      );
  }

  async getOrderById(
    orderId: number,
    userId: number
  ) {

    const order =
      await this.orderRepository
      .findOrderById(
        orderId
      );

    if (!order) {
      throw new AppError(
        "Order not found",
        404
      );
    }

    if (
      order.userId !== userId
    ) {
      throw new AppError(
        "Forbidden",
        403
      );
    }

    return order;
  }

  async acceptOrder(
    orderId: number
  ) {

    return this.orderRepository
      .updateStatus(
        orderId,
        OrderStatus.ACCEPTED
      );
  }

  async updateOrderStatus(
    orderId: number,
    status: OrderStatus
  ) {

    return this.orderRepository
      .updateStatus(
        orderId,
        status
      );
  }
}