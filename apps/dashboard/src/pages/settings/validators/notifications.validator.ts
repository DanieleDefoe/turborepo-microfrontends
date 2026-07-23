import { z } from "zod";

export const notificationsValidator = z.object({
  communication_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  mobile: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
  social_emails: z.boolean().default(false).optional(),
  type: z.enum(["all", "mentions", "none"], {
    error: "You need to select a notification type.",
  }),
});

export type NotificationsValidator = z.infer<typeof notificationsValidator>;
