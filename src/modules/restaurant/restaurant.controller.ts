import { Request, Response } from "express";

import { RestaurantService }
from "./restaurant.service";

import { AuthRequest }
from "../../types/auth-request";

const restaurantService =
  new RestaurantService();

export class RestaurantController {

  async createRestaurant(
    req: AuthRequest,
    res: Response
  ) {

    const restaurant =
      await restaurantService
      .createRestaurant(
        req.body,
        req.user!.id
      );

    return res.status(201).json({
      success: true,
      data: restaurant,
    });
  }

  async getRestaurants(
    req: Request,
    res: Response
  ) {

    const restaurants =
      await restaurantService
      .getRestaurants();

    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  }

  async getRestaurant(
    req: Request,
    res: Response
  ) {

    const restaurant =
      await restaurantService
      .getRestaurant(
        Number(req.params.id)
      );

    return res.status(200).json({
      success: true,
      data: restaurant,
    });
  }
}