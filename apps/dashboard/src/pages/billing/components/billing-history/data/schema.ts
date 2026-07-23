import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const billingSchema = z.object({
  amount: z.number(),
  date: z.iso.date(),
  description: z.string().optional(),
  file: z.string().optional(),
  id: z.number(),
  orderId: z.string().optional(),
  plan: z.enum(["Free", "Small Business", "Enterprise"]),
  status: z.enum(["paid", "unpaid", "overdue", "cancelled"]),
});

export type Billing = z.infer<typeof billingSchema>;
