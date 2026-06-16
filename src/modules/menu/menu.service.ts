import { MenuRepository }
from "../../repositories/menu.repository";

import { RestaurantRepository }
from "../../repositories/restaurant.repository";

import { AppError }
from "../../utils/app-error";

export class MenuService {

  private menuRepository =
    new MenuRepository();

  private restaurantRepository =
    new RestaurantRepository();

  async createMenuItem(
    data: any,
    userId: number
  ) {

    const restaurant =
      await this.restaurantRepository
      .findById(data.restaurantId);

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
        "Not allowed",
        403
      );
    }

    return this.menuRepository.create(
      data
    );
  }

  async getMenuItems() {

    return this.menuRepository.findAll();

  }

  async getMenuItem(id: number) {

    const item =
      await this.menuRepository.findById(
        id
      );

    if (!item) {
      throw new AppError(
        "Menu item not found",
        404
      );
    }

    return item;
  }

  async updateMenuItem(
    id: number,
    data: any,
    userId: number
  ) {

    const item =
      await this.menuRepository.findById(
        id
      );

    if (!item) {
      throw new AppError(
        "Menu item not found",
        404
      );
    }

    if (
      item.restaurant.ownerId !== userId
    ) {
      throw new AppError(
        "Not allowed",
        403
      );
    }

    return this.menuRepository.update(
      id,
      data
    );
  }

  async deleteMenuItem(
    id: number,
    userId: number
  ) {

    const item =
      await this.menuRepository.findById(
        id
      );

    if (!item) {
      throw new AppError(
        "Menu item not found",
        404
      );
    }

    if (
      item.restaurant.ownerId !== userId
    ) {
      throw new AppError(
        "Not allowed",
        403
      );
    }

    await this.menuRepository.delete(id);
  }
}