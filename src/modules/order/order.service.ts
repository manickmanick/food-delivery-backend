import { OrderStatus } from "@prisma/client";

import { AppError } from "../../utils/app-error";

import { OrderRepository } from "../../repositories/order.repository";
import { AddressRepository } from "../../repositories/address.repository";
import { getIO } from "../../socket";

export class OrderService {
  private orderRepository = new OrderRepository();
  private addressRepository = new AddressRepository();

  async placeOrder(userId: number, addressId: number) {
    const cart = await this.orderRepository.getCart(userId);

    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    if (cart.items.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    const address = await this.addressRepository.findByIdAndUserId(
      addressId,
      userId,
    );

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    return this.orderRepository.createOrderTransaction(userId, addressId);
  }

  async getMyOrders(userId: number) {
    return this.orderRepository.findOrdersByUserId(userId);
  }

  async getOrderById(orderId: number, userId: number) {
    const order = await this.orderRepository.findOrderById(orderId);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (order.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    return order;
  }

  async acceptOrder(orderId: number, ownerId: number) {
    const order = await this.orderRepository.findOrderForOwner(orderId);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (order.restaurant.ownerId !== ownerId) {
      throw new AppError("Forbidden", 403);
    }

    const updateOrder = await this.orderRepository.updateStatus(
      orderId,
      OrderStatus.ACCEPTED,
    );
    getIO().to(`user-${order.userId}`).emit("order-status-updated", {
      orderId,
      status: "ACCEPTED",
    });
    return updateOrder;
  }

  async updateOrderStatus(
    orderId: number,
    status: OrderStatus,
    ownerId: number,
  ) {
    const order = await this.orderRepository.findOrderForOwner(orderId);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (order.restaurant.ownerId !== ownerId) {
      throw new AppError("Forbidden", 403);
    }

    const updateOrder = await this.orderRepository.updateStatus(
      orderId,
      status,
    );
    getIO().to(`user-${order.userId}`).emit("order-status-updated", {
      orderId,
      status,
    });
    return updateOrder;
  }

  async getRestaurantOrders(ownerId: number) {
    return this.orderRepository.findOrdersByRestaurantOwner(ownerId);
  }
}
