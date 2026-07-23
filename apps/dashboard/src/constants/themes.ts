import { MoveHorizontalIcon, UnfoldHorizontalIcon } from "@lucide/vue";

export const THEMES = [
  "zinc",
  "red",
  "rose",
  "orange",
  "green",
  "blue",
  "yellow",
  "violet",
] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_PRIMARY_COLORS: { theme: Theme; primaryColor: string }[] = [
  { primaryColor: "oklch(44.2% 0.017 285.786)", theme: "zinc" },
  { primaryColor: "oklch(57.7% 0.245 27.325)", theme: "red" },
  { primaryColor: "oklch(0.645 0.246 16.439)", theme: "rose" },
  { primaryColor: "oklch(0.705 0.213 47.604)", theme: "orange" },
  { primaryColor: "oklch(0.723 0.219 149.579)", theme: "green" },
  { primaryColor: "oklch(48.8% 0.243 264.376)", theme: "blue" },
  { primaryColor: "oklch(68.1% 0.162 75.834)", theme: "yellow" },
  { primaryColor: "oklch(0.606 0.25 292.717)", theme: "violet" },
] as const;

export type Radius = (typeof RADIUS)[number];
export const RADIUS = [0, 0.25, 0.5, 0.75, 1] as const;

export type ContentLayout = "full" | "centered";
export const CONTENT_LAYOUTS = [
  { icon: UnfoldHorizontalIcon, label: "Full", value: "full" },
  { icon: MoveHorizontalIcon, label: "Centered", value: "centered" },
] as const;
