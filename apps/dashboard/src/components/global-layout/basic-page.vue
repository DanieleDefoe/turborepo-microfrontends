<script lang="ts" setup>
  import BasicHeader from "./basic-header.vue";
  import type { LayoutHeaderProps } from "./types";

  defineProps<LayoutHeaderProps>();
</script>

<template>
  <main>
    <BasicHeader :description="description" :sticky="sticky" :title="title">
      <template #actions>
        <slot name="actions" />
      </template>
    </BasicHeader>

    <main class="py-4">
      <slot />
    </main>
  </main>
</template>
