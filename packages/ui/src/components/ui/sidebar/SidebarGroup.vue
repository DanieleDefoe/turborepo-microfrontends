<script lang="ts" setup>
  import { cn } from "@ap/ui/lib/utils";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
</script>

<template>
  <div
    data-sidebar="group"
    data-slot="sidebar-group"
    :class="cn('p-2 relative flex w-full min-w-0 flex-col', props.class)"
  >
    <slot />
  </div>
</template>
