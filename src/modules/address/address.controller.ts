import { Response } from "express";

import { AuthRequest } from "../../types/auth-request";

import { AddressService } from "./address.service";

const addressService = new AddressService();

export class AddressController {
  async createAddress(req: AuthRequest, res: Response) {
    const address = await addressService.createAddress(req.user!.id, req.body);

    res.status(201).json({
      success: true,
      data: address,
    });
  }

  async getAddresses(req: AuthRequest, res: Response) {
    const addresses = await addressService.getAddresses(req.user!.id);

    res.json({
      success: true,
      data: addresses,
    });
  }

  async getAddressById(req: AuthRequest, res: Response) {
    const address = await addressService.getAddressById(
      Number(req.params.id),
      req.user!.id,
    );

    res.json({
      success: true,
      data: address,
    });
  }

  async updateAddress(req: AuthRequest, res: Response) {
    const address = await addressService.updateAddress(
      Number(req.params.id),
      req.user!.id,
      req.body,
    );

    res.json({
      success: true,
      data: address,
    });
  }

  async deleteAddress(req: AuthRequest, res: Response) {
    await addressService.deleteAddress(Number(req.params.id), req.user!.id);

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  }

  async setDefaultAddress(req: AuthRequest, res: Response) {
    const address = await addressService.setDefaultAddress(
      Number(req.params.id),
      req.user!.id,
    );

    res.json({
      success: true,
      data: address,
    });
  }
}
