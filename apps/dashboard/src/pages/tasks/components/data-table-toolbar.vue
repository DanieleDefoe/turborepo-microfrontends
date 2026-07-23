<script lang="ts" setup>
  import { XIcon } from "@lucide/vue";
  import type { Table } from "@tanstack/vue-table";

  import {
    DataTableFacetedFilter,
    DataTableViewOptions,
  } from "@/components/data-table";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { priorities, statuses } from "../data/data";
  import type { Task } from "../data/schema";

  interface DataTableToolbarProps {
    table: Table<Task>;
  }

  const props = defineProps<DataTableToolbarProps>();

  const isFiltered = computed(
    () => props.table.getState().columnFilters.length > 0
  );
</script>

<template>
  <div class="flex items-center justify-between">
    <div
      class="flex flex-col items-start flex-1 space-y-2 md:items-center md:space-x-2 md:space-y-0 md:flex-row"
    >
      <Input
        class="h-8 w-[150px] lg:w-[250px]"
        placeholder="Filter tasks..."
        :model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
        @input="table.getColumn('title')?.setFilterValue($event.target.value)"
      />

      <div class="space-x-2">
        <DataTableFacetedFilter
          title="Status"
          v-if="table.getColumn('status')"
          :column="table.getColumn('status')"
          :options="statuses"
        />
        <DataTableFacetedFilter
          title="Priority"
          v-if="table.getColumn('priority')"
          :column="table.getColumn('priority')"
          :options="priorities"
        />
      </div>

      <Button
        class="h-8 px-2 lg:px-3"
        variant="ghost"
        v-if="isFiltered"
        @click="table.resetColumnFilters()"
      >
        Reset
        <XIcon class="size-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
