import type { ColumnDef } from "@tanstack/vue-table";

import { h } from "vue";

import { DataTableColumnHeader, SelectColumn } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { labels, priorities, statuses } from "../data/data";
import type { Task } from "../data/schema";
import DataTableRowActions from "./data-table-row-actions.vue";

export const columns: ColumnDef<Task>[] = [
  SelectColumn as ColumnDef<Task>,
  {
    accessorKey: "id",
    cell: ({ row }) => h("div", { class: "w-20" }, row.getValue("id")),
    enableHiding: false,
    enableSorting: false,
    header: ({ column }) =>
      h(DataTableColumnHeader<Task>, { column, title: "Task" }),
  },
  {
    accessorKey: "title",

    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return h("div", { class: "flex space-x-2" }, [
        label ? h(Badge, { variant: "outline" }, () => label.label) : null,
        h(
          "span",
          { class: "max-w-[500px] truncate font-medium" },
          row.getValue("title")
        ),
      ]);
    },
    header: ({ column }) =>
      h(DataTableColumnHeader<Task>, { column, title: "Title" }),
  },
  {
    accessorKey: "status",

    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return h("div", { class: "flex w-[100px] items-center" }, [
        status.icon &&
          h(status.icon, { class: "mr-2 h-4 w-4 text-muted-foreground" }),
        h("span", status.label),
      ]);
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    header: ({ column }) =>
      h(DataTableColumnHeader<Task>, { column, title: "Status" }),
  },
  {
    accessorKey: "priority",
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
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
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    header: ({ column }) =>
      h(DataTableColumnHeader<Task>, { column, title: "Priority" }),
  },
  {
    cell: ({ row }) => h(DataTableRowActions, { row }),
    id: "actions",
  },
];
