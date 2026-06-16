import { z } from "zod";

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "ACCEPTED",
    "PREPARING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ]),
});
