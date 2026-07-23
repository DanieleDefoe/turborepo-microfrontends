<script lang="ts" setup>
  import { Trash2Icon } from "@lucide/vue";

  import type { DataTableProps } from "@/components/data-table";

  import {
    DataTable,
    DataTableBulkActions,
    useGenerateVueTable,
  } from "@/components/data-table";

  import type { Task } from "../data/schema";

  import DataTableToolbar from "./data-table-toolbar.vue";
  import TaskDeleteBatch from "./task-delete-batch.vue";

  const props = defineProps<DataTableProps<Task>>();
  const table = useGenerateVueTable<Task>(props);

  const taskDeleteBatchOpen = shallowRef(false);
</script>

<template>
  <DataTableBulkActions entity-name="task" :table="table">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton
          aria-label="Delete selected tasks"
          class="size-8"
          size="icon"
          title="Delete selected tasks"
          variant="destructive"
          @click="taskDeleteBatchOpen = true"
        >
          <Trash2Icon />
          <span class="sr-only">Delete selected tasks</span>
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>Delete selected tasks</p>
      </UiTooltipContent>
    </UiTooltip>

    <TaskDeleteBatch v-model:open="taskDeleteBatchOpen" :table />
  </DataTableBulkActions>

  <DataTable :columns :data :loading :table>
    <template #toolbar>
      <DataTableToolbar class="w-full overflow-x-auto" :table="table" />
    </template>
  </DataTable>
</template>
