import { z } from "zod";

export const createAddressSchema = z.object({
  label: z.string().min(1),

  addressLine1: z.string().min(1),

  addressLine2: z.string().optional(),

  city: z.string().min(1),

  state: z.string().min(1),

  pincode: z.string().min(1),

  landmark: z.string().optional(),

  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
