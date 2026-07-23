<script lang="ts" setup>
  import { columns } from "./columns";
  import billings from "./data/billings.json";
  import type { Billing } from "./data/schema";
  import DataTable from "./data-table.vue";
</script>

<template>
  <DataTable :columns :data="billings as unknown as Billing[]" />
</template>
