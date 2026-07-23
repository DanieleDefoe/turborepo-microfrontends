<script generic="T" lang="ts" setup>
  import type { Column, Table as VueTable } from "@tanstack/vue-table";
  import { FlexRender } from "@tanstack/vue-table";
  import type { CSSProperties } from "vue";

  import NoResultFound from "@/components/no-result-found.vue";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import DataTableLoading from "./table-loading.vue";
  import DataTablePagination from "./table-pagination.vue";
  import type { DataTableProps } from "./types";

  defineProps<
    DataTableProps<T> & {
      table: VueTable<T>;
    }
  >();

  function getCommonPinningStyles(column: Column<T>): CSSProperties {
    const isPinned = column.getIsPinned();
    return {
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      position: isPinned ? "sticky" : "relative",
      right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
      width: `${column.getSize()}px`,
      zIndex: isPinned ? 1 : 0,
    };
  }
</script>

<template>
  <div class="space-y-4">
    <slot name="toolbar" />

    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :class="{ 'bg-background': header.column.getIsPinned() }"
              :style="getCommonPinningStyles(header.column)"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :props="header.getContext()"
                :render="header.column.columnDef.header"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody v-if="!loading">
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="{ 'bg-background': cell.column.getIsPinned() }"
                :style="getCommonPinningStyles(cell.column)"
              >
                <FlexRender
                  :props="cell.getContext()"
                  :render="cell.column.columnDef.cell"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell class="h-24 text-center" :colspan="columns.length">
              <NoResultFound />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <DataTableLoading v-if="loading" />
    </div>

    <DataTablePagination
      v-if="!loading"
      :server-pagination="serverPagination"
      :table="table"
    />
  </div>
</template>
