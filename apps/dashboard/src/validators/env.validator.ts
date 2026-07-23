import z from "zod";

export const EnvSchema = z.object({
  VITE_SERVER_API_PREFIX: z.string(),
  VITE_SERVER_API_TIMEOUT: z.coerce.number().default(5000),
  // Add your environment variables here, for example:
  // VITE_API_BASE_URL: z.string().url(),
  VITE_SERVER_API_URL: z.url(),
});

export type env = z.infer<typeof EnvSchema>;
