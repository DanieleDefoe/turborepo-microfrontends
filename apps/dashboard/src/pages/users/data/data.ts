import {
  AwardIcon,
  BadgeDollarSignIcon,
  HandshakeIcon,
  ShieldIcon,
} from "@lucide/vue";
import { h } from "vue";

import type { FacetedFilterOption } from "@/components/data-table";

export const callTypes: (FacetedFilterOption & { style: string })[] = [
  {
    label: "Active",
    style: "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200",
    value: "active",
  },
  {
    label: "Inactive",
    style: "bg-neutral-300/40 border-neutral-300",
    value: "inactive",
  },
  {
    label: "Invited",
    style: "bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300",
    value: "invited",
  },
  {
    label: "Suspended",
    style:
      "bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10",
    value: "suspended",
  },
];

export const userTypes: FacetedFilterOption[] = [
  {
    icon: h(BadgeDollarSignIcon),
    label: "Superadmin",
    value: "superadmin",
  },
  {
    icon: h(HandshakeIcon),
    label: "Admin",
    value: "admin",
  },
  {
    icon: h(AwardIcon),
    label: "Manager",
    value: "manager",
  },
  {
    icon: h(ShieldIcon),
    label: "Cashier",
    value: "cashier",
  },
] as const;
