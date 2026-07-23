import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Marker } from "./Marker.vue";
export { default as MarkerContent } from "./MarkerContent.vue";
export { default as MarkerIcon } from "./MarkerIcon.vue";

export const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground",
  {
    variants: {
      variant: {
        border: "border-border border-b pb-2",
        default: "",
        separator:
          "before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-border",
      },
    },
  }
);
export type MarkerVariants = VariantProps<typeof markerVariants>;
