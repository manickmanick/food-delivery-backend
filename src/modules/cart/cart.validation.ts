import { z } from "zod";

export const addToCartSchema = z.object({
  menuItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export const updateQuantitySchema = z.object({
  quantity: z.number().int().positive(),
});
