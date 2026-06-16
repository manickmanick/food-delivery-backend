import { Response } from "express";

import { AuthRequest }
from "../../types/auth-request";

import { MenuService }
from "./menu.service";

const menuService =
  new MenuService();

export class MenuController {

  async createMenuItem(
    req: AuthRequest,
    res: Response
  ) {

    const item =
      await menuService.createMenuItem(
        req.body,
        req.user!.id
      );

    return res.status(201).json({
      success: true,
      data: item,
    });
  }

  async getMenuItems(
    req: AuthRequest,
    res: Response
  ) {

    const items =
      await menuService.getMenuItems();

    return res.json({
      success: true,
      data: items,
    });
  }

  async getMenuItem(
    req: AuthRequest,
    res: Response
  ) {

    const item =
      await menuService.getMenuItem(
        Number(req.params.id)
      );

    return res.json({
      success: true,
      data: item,
    });
  }

  async updateMenuItem(
    req: AuthRequest,
    res: Response
  ) {

    const item =
      await menuService.updateMenuItem(
        Number(req.params.id),
        req.body,
        req.user!.id
      );

    return res.json({
      success: true,
      data: item,
    });
  }

  async deleteMenuItem(
    req: AuthRequest,
    res: Response
  ) {

    await menuService.deleteMenuItem(
      Number(req.params.id),
      req.user!.id
    );

    return res.json({
      success: true,
      message:
        "Menu item deleted successfully",
    });
  }
}