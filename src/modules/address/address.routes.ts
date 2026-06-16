import { Router } from "express";

import { protect } from "../../middlewares/auth.middleware";

import { asyncHandler } from "../../middlewares/async-handler";

import { validate } from "../../middlewares/validate.middleware";

import { createAddressSchema, updateAddressSchema } from "./address.validation";

import { AddressController } from "./address.controller";

const router = Router();

const addressController = new AddressController();

router.post(
  "/",
  protect,
  validate(createAddressSchema),
  asyncHandler(addressController.createAddress.bind(addressController)),
);

router.get(
  "/",
  protect,
  asyncHandler(addressController.getAddresses.bind(addressController)),
);

router.get(
  "/:id",
  protect,
  asyncHandler(addressController.getAddressById.bind(addressController)),
);

router.put(
  "/:id",
  protect,
  validate(updateAddressSchema),
  asyncHandler(addressController.updateAddress.bind(addressController)),
);

router.delete(
  "/:id",
  protect,
  asyncHandler(addressController.deleteAddress.bind(addressController)),
);

router.patch(
  "/:id/default",
  protect,
  asyncHandler(addressController.setDefaultAddress.bind(addressController)),
);

export default router;
