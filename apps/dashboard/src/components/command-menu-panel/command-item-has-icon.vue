<script lang="ts" setup>
  import { MilestoneIcon } from "@lucide/vue";
  import type { Component } from "vue";

  const { icon } = defineProps<{
    name: string;
    icon?: Component;
  }>();
</script>

<template>
  <div class="flex items-center gap-2">
    <component class="size-4" :is="icon" v-if="icon" />
    <MilestoneIcon class="size-4" v-else />
    {{ name }}
  </div>
</template>
