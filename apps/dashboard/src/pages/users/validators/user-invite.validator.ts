import { z } from "zod";

export const userInviteValidator = z.object({
  description: z.string().optional(),
  email: z.email(),
  role: z.enum(["superadmin", "admin", "cashier", "manager"]),
});

export type UserInviteValidator = z.infer<typeof userInviteValidator>;
