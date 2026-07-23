<script lang="ts" setup>
  import { XIcon } from "@lucide/vue";
  import type { Table } from "@tanstack/vue-table";
  import { computed } from "vue";

  import {
    DataTableFacetedFilter,
    DataTableViewOptions,
  } from "@/components/data-table";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { callTypes, userTypes } from "../data/data";
  import type { User } from "../data/schema";

  interface DataTableToolbarProps {
    table: Table<User>;
  }

  const props = defineProps<DataTableToolbarProps>();

  const isFiltered = computed(
    () => props.table.getState().columnFilters.length > 0
  );
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center flex-1 space-x-2">
      <Input
        class="h-8 w-[150px] lg:w-[250px]"
        placeholder="Filter users by username..."
        :model-value="(table.getColumn('username')?.getFilterValue() as string) ?? ''"
        @input="table.getColumn('username')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        title="Status"
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        :options="callTypes"
      />
      <DataTableFacetedFilter
        title="Role"
        v-if="table.getColumn('role')"
        :column="table.getColumn('role')"
        :options="userTypes"
      />

      <Button
        class="h-8 px-2 lg:px-3"
        variant="ghost"
        v-if="isFiltered"
        @click="table.resetColumnFilters()"
      >
        Reset
        <XIcon class="size-4 ml-2" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
