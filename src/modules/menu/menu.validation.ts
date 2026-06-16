import { z } from "zod";

export const createMenuItemSchema = z.object({
  name: z.string().min(2),

  description: z.string().optional(),

  price: z.number().positive(),

  imageUrl: z.string().optional(),

  restaurantId: z.number(),

  categoryId: z.number(),
});

export const updateMenuItemSchema =
  createMenuItemSchema.partial();