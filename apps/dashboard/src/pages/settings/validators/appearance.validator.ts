import { z } from "zod";

export const appearanceValidator = z.object({
  font: z.enum(["inter", "manrope", "system"], {
    error: "Please select a font.",
  }),
  theme: z.enum(["light", "dark"], {
    error: "Please select a theme.",
  }),
});

export type AppearanceValidator = z.infer<typeof appearanceValidator>;
