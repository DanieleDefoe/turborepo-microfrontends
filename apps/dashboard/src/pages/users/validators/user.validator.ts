import { z } from "zod";

import { userRoleSchema, userStatusSchema } from "../data/schema";

export const userValidator = z.object({
  email: z.email().min(1),
  firstName: z.string().min(1),
  id: z.string().optional(),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(1),
  role: userRoleSchema,
  status: userStatusSchema,
  username: z.string().min(1),
});

export type UserValidator = z.infer<typeof userValidator>;
