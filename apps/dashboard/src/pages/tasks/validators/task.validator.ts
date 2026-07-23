import z from "zod";

export const taskValidator = z.object({
  label: z.string(),
  priority: z.string(),
  status: z.string(),
  title: z.string().min(2).max(50),
});

export type TaskValidator = z.infer<typeof taskValidator>;
