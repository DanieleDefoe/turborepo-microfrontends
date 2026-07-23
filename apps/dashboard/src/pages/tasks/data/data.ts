import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  CirclePlusIcon,
  TimerOffIcon,
} from "@lucide/vue";
import { h } from "vue";

export const labels = [
  {
    label: "Bug",
    value: "bug",
  },
  {
    label: "Feature",
    value: "feature",
  },
  {
    label: "Documentation",
    value: "documentation",
  },
];

export const statuses = [
  {
    icon: h(CircleHelpIcon),
    label: "Backlog",
    value: "backlog",
  },
  {
    icon: h(CircleIcon),
    label: "Todo",
    value: "todo",
  },
  {
    icon: h(TimerOffIcon),
    label: "In Progress",
    value: "in progress",
  },
  {
    icon: h(CircleCheckIcon),
    label: "Done",
    value: "done",
  },
  {
    icon: h(CirclePlusIcon),
    label: "Canceled",
    value: "canceled",
  },
];

export const priorities = [
  {
    icon: h(ArrowDownIcon),
    label: "Low",
    value: "low",
  },
  {
    icon: h(ArrowRightIcon),
    label: "Medium",
    value: "medium",
  },
  {
    icon: h(ArrowUpIcon),
    label: "High",
    value: "high",
  },
];
