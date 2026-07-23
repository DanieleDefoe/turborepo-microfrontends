<script lang="ts" setup>
  import { BasicPage } from "@/components/global-layout";

  import { columns } from "./components/columns";
  import DataTable from "./components/data-table.vue";
  import TaskCreate from "./components/task-create.vue";
  import TaskImport from "./components/task-import.vue";
  import tasks from "./data/tasks.json";
</script>

<template>
  <BasicPage description="Tasks description" sticky title="Tasks">
    <template #actions>
      <TaskImport />
      <TaskCreate />
    </template>
    <div class="overflow-x-auto">
      <DataTable :columns="columns" :data="tasks" />
    </div>
  </BasicPage>
</template>
