import { z } from "zod";

export const userStatusSchema = z.enum([
  "active",
  "inactive",
  "invited",
  "suspended",
]);
export type UserStatus = z.infer<typeof userStatusSchema>;

export const userRoleSchema = z.enum([
  "superadmin",
  "admin",
  "cashier",
  "manager",
]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  createdAt: z.coerce.date(),
  email: z.string(),
  firstName: z.string(),
  id: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  role: userRoleSchema,
  status: userStatusSchema,
  updatedAt: z.coerce.date(),
  username: z.string(),
});
export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);
