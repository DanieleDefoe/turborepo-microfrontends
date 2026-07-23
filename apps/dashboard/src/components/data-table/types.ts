import type { ColumnDef } from "@tanstack/vue-table";

export interface FacetedFilterOption {
  icon?: Component;
  label: string;
  value: string;
}

export interface ServerPagination {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  page: number;
  pageSize: number;
  total: number;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  loading?: boolean;
  serverPagination?: ServerPagination;
}
