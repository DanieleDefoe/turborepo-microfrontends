import { z } from "zod";

export const teamAddValidator = z.object({
  logo: z.string().optional(),
  name: z
    .string()
    .min(1, { error: "Group name is required" })
    .max(50, { error: "Group name must be less than 50 characters" }),
  slug: z
    .string()
    .min(1, { error: "Group name is required" })
    .max(50, { error: "Group name must be less than 50 characters" }),
});

export type TeamAddValidator = z.infer<typeof teamAddValidator>;
