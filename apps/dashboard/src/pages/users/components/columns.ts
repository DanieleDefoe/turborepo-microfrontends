import type { ColumnDef } from "@tanstack/vue-table";

import { h } from "vue";

import { DataTableColumnHeader, SelectColumn } from "@/components/data-table";
import { Copy } from "@/components/prop-ui/copy";
import Badge from "@/components/ui/badge/Badge.vue";
import { callTypes, userTypes } from "../data/data";
import type { User } from "../data/schema";
import DataTableRowActions from "./data-table-row-actions.vue";

export const columns: ColumnDef<User>[] = [
  SelectColumn as ColumnDef<User>,
  {
    accessorKey: "username",
    cell: ({ row }) => h("div", {}, row.getValue("username")),
    enableHiding: false,
    enableResizing: true,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<User>, { column, title: "username" }),
  },

  {
    accessorKey: "email",
    cell: ({ row }) =>
      h("div", {}, [
        h("span", {}, row.getValue("email")),
        h(Copy, {
          class: "ml-2",
          content: (row.getValue("email") || "") as string,
          size: "sm",
        }),
      ]),
    enableResizing: true,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<User>, { column, title: "Email" }),
  },

  {
    accessorKey: "phoneNumber",
    cell: ({ row }) => h("div", {}, row.getValue("phoneNumber")),
    enableResizing: true,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<User>, { column, title: "PhoneNumber" }),
  },

  {
    accessorKey: "status",

    cell: ({ row }) => {
      const callType = callTypes.find(
        (callType) => callType.value === row.getValue("status")
      );

      if (!callType) {
        return null;
      }

      return h(
        Badge,
        { class: `${callType.style || ""}`, variant: "outline" },
        () => callType.label
      );
    },
    enableResizing: true,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    header: ({ column }) =>
      h(DataTableColumnHeader<User>, { column, title: "Status" }),
  },

  {
    accessorKey: "role",
    cell: ({ row }) => {
      const priority = userTypes.find(
        (priority) => priority.value === row.getValue("role")
      );

      if (!priority) {
        return null;
      }

      return h("div", { class: "flex items-center" }, [
        priority.icon &&
          h(priority.icon, { class: "mr-2 h-4 w-4 text-muted-foreground" }),
        h("span", {}, priority.label),
      ]);
    },
    enableResizing: true,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<User>, { column, title: "Role" }),
  },

  {
    cell: ({ row }) => h(DataTableRowActions, { row }),
    id: "actions",
  },
];
