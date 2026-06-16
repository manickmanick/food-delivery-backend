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
}
