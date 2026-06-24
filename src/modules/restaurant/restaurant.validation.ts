import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  address: z.string().min(5),
  imageUrl: z.string().url().optional(),
});

export const updateRestaurantSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  address: z.string().min(5).optional(),
  isOpen: z.boolean().optional(),
});
