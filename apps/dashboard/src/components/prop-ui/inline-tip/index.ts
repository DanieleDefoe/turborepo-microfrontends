import type { VariantProps } from "class-variance-authority";

import { cva } from "class-variance-authority";

export { default as InlineTip } from "./InlineTip.vue";

export const inlineTipVariants = cva("", {
  defaultVariants: {
    variant: "info",
  },
  variants: {
    variant: {
      error: "bg-rose-400 dark:bg-rose-600",
      info: "bg-stone-400 dark:bg-stone-600",
      success: "bg-green-400 dark:bg-green-600",
      warning: "bg-yellow-400 dark:bg-yellow-600",
    },
  },
});

export type InlineTipVariants = VariantProps<typeof inlineTipVariants>;
