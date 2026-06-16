import { RestaurantRepository } from "../../repositories/restaurant.repository";

import { AppError } from "../../utils/app-error";

export class RestaurantService {
  private restaurantRepository = new RestaurantRepository();

  async createRestaurant(
    data: {
      name: string;
      description?: string;
      address: string;
    },
    ownerId: number,
  ) {
    return this.restaurantRepository.create({
      ...data,
      ownerId,
    });
  }

  async getRestaurants() {
    return this.restaurantRepository.findAll();
  }

  async getRestaurant(id: number) {
    const restaurant = await this.restaurantRepository.findById(id);

    if (!restaurant) {
      throw new AppError("Restaurant not found", 404);
    }

    return restaurant;
  }

  async updateRestaurant(
    restaurantId: number,
    data: {
      name?: string;
      description?: string;
      address?: string;
      isOpen?: boolean;
    },
    userId: number,
    role: string,
  ) {
    const restaurant = await this.restaurantRepository.findById(restaurantId);

    if (!restaurant) {
      throw new AppError("Restaurant not found", 404);
    }

    if (restaurant.ownerId !== userId) {
      throw new AppError("You are not allowed to update this restaurant", 403);
    }

    return this.restaurantRepository.update(restaurantId, data);
  }

  async deleteRestaurant(
  restaurantId: number,
  userId: number,
  role: string
) {

  const restaurant =
    await this.restaurantRepository.findById(
      restaurantId
    );

  if (!restaurant) {
    throw new AppError(
      "Restaurant not found",
      404
    );
  }

  if (
    restaurant.ownerId !== userId
  ) {
    throw new AppError(
      "You are not allowed to delete this restaurant",
      403
    );
  }

  await this.restaurantRepository.delete(
    restaurantId
  );

  return;
}
}
