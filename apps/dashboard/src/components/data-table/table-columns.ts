import type { ColumnDef } from "@tanstack/vue-table";

import { h } from "vue";

import { Checkbox } from "@/components/ui/checkbox";

import RadioCell from "./radio-cell.vue";

const FIXED_WIDTH_COLUMN = {
  enableResizing: false,
  maxSize: 32,
  minSize: 32,
  size: 32,
} as const;

export const SelectColumn: ColumnDef<any> = {
  id: "select",
  ...FIXED_WIDTH_COLUMN,
  cell: ({ row }) =>
    h(Checkbox, {
      ariaLabel: "Select row",
      modelValue: row.getIsSelected(),
      "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
    }),
  enableHiding: false,
  enableSorting: false,
  header: ({ table }) =>
    h(Checkbox, {
      ariaLabel: "Select all",
      modelValue:
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate"),
      "onUpdate:modelValue": (value) =>
        table.toggleAllPageRowsSelected(!!value),
    }),
};

export const RadioSelectColumn: ColumnDef<any> = {
  id: "radio-select",
  ...FIXED_WIDTH_COLUMN,
  cell: ({ row, table }) =>
    h(RadioCell, {
      checked: row.getIsSelected(),
      onClick: (event: MouseEvent) => {
        event.stopPropagation();
        // cancel selection of all rows
        table.toggleAllRowsSelected(false);
        // select the current row
        row.toggleSelected(true);
      },
    }),
  enableHiding: false,
  enableSorting: false,
  header: () => null,
};
