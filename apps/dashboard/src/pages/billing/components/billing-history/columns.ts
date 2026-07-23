import type { ColumnDef } from "@tanstack/vue-table";

import { DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { statuses } from "./data/data";
import type { Billing } from "./data/schema";
import DataTableRowActions from "./data-table-row-actions.vue";

export const columns: ColumnDef<Billing>[] = [
  {
    accessorKey: "id",
    cell: ({ row }) => h("div", {}, row.getValue("id")),
    enableHiding: false,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<Billing>, { column, title: "ID" }),
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => h("div", {}, row.getValue("amount")),
    enableHiding: false,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<Billing>, { column, title: "amount" }),
  },
  {
    accessorKey: "date",
    cell: ({ row }) => h("div", {}, row.getValue("date")),
    enableHiding: false,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<Billing>, { column, title: "billing date" }),
  },
  {
    accessorKey: "plan",
    cell: ({ row }) => h("div", {}, row.getValue("plan")),
    enableHiding: false,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<Billing>, { column, title: "billing plan" }),
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );
      if (!status) {
        return h("div", {}, row.getValue("status"));
      }

      const style = {
        color: status.color,
      };

      return h(
        Badge,
        {
          class: "flex max-w-[100px] items-center",
          style,
          variant: "secondary",
        },
        () => [
          status.icon &&
            h(status.icon, {
              class: "mr-2 h-4 w-4 text-muted-foreground",
              style,
            }),
          h("span", status.label),
        ]
      );
    },
    enableHiding: false,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<Billing>, { column, title: "status" }),
  },
  {
    accessorKey: "orderId",
    cell: ({ row }) => h("div", {}, row.getValue("orderId") || "N/A"),
    enableHiding: false,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<Billing>, { column, title: "Order ID" }),
  },
  {
    cell: ({ row }) => h(DataTableRowActions, { row }),
    id: "actions",
  },
];
