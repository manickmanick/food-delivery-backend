import { AppError } from "../../utils/app-error";
import { CreateAddressDto } from "./address.types";
import { AddressRepository } from "../../repositories/address.repository";

export class AddressService {
  private addressRepository = new AddressRepository();

  async createAddress(userId: number, body: CreateAddressDto) {
    if (body.isDefault) {
      await this.addressRepository.clearDefaultAddresses(userId);
    }

    return this.addressRepository.create({
      ...body,
      userId,
    });
  }

  async getAddresses(userId: number) {
    return this.addressRepository.findAllByUserId(userId);
  }

  async getAddressById(addressId: number, userId: number) {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    if (address.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    return address;
  }

  async updateAddress(
    addressId: number,
    userId: number,
    body: CreateAddressDto,
  ) {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    if (address.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    if (body.isDefault) {
      await this.addressRepository.clearDefaultAddresses(userId);
    }

    return this.addressRepository.update(addressId, body);
  }

  async deleteAddress(addressId: number, userId: number) {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    if (address.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    await this.addressRepository.delete(addressId);
  }

  async setDefaultAddress(addressId: number, userId: number) {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    if (address.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    await this.addressRepository.clearDefaultAddresses(userId);

    return this.addressRepository.update(addressId, {
      isDefault: true,
    });
  }
}
