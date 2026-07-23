import {
  CircleDashedIcon,
  CircleSlashIcon,
  ClockAlertIcon,
  HandCoinsIcon,
} from "@lucide/vue";
import { h } from "vue";

export const plans = [
  { label: "Basic", value: "basic" },
  { label: "Small Business", value: "Small Business" },
  { label: "Enterprise", value: "Enterprise" },
];

export const statuses = [
  { color: "green", icon: h(HandCoinsIcon), label: "Paid", value: "paid" },
  {
    color: "orange",
    icon: h(CircleDashedIcon),
    label: "Unpaid",
    value: "unpaid",
  },
  { color: "red", icon: h(ClockAlertIcon), label: "Overdue", value: "overdue" },
  {
    color: "gray",
    icon: h(CircleSlashIcon),
    label: "Cancelled",
    value: "cancelled",
  },
];

export type PayState = "paid" | "unpaid" | "overdue" | "cancelled";
