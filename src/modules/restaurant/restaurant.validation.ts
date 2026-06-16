import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  address: z.string().min(5),
});