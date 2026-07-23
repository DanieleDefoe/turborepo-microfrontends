<script generic="T" lang="ts" setup>
  import { RefreshCcwIcon, Settings2Icon } from "@lucide/vue";
  import type { Table } from "@tanstack/vue-table";

  interface DataTableViewOptionsProps {
    table: Table<T>;
  }

  const props = defineProps<DataTableViewOptionsProps>();

  const columns = computed(() =>
    props.table
      .getAllColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== "undefined" && column.getCanHide()
      )
  );

  function resetColumnVisible() {
    columns.value.forEach((column) => column.toggleVisibility(true));
  }
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton class="hidden h-8 ml-auto lg:flex" size="sm" variant="outline">
        <Settings2Icon class="size-4 mr-2" />
        Columns View
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end" class="w-[150px]">
      <UiDropdownMenuLabel>Toggle columns</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />

      <UiDropdownMenuCheckboxItem
        class="capitalize"
        v-for="column in columns"
        :key="column.id"
        :model-value="column.getIsVisible()"
        @update:model-value="(value:boolean) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </UiDropdownMenuCheckboxItem>

      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem class="capitalize" @click="resetColumnVisible">
        <RefreshCcwIcon />
        Reset
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
