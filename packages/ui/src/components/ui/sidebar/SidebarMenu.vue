<script lang="ts" setup>
  import { cn } from "@ap/ui/lib/utils";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
</script>

<template>
  <ul
    data-sidebar="menu"
    data-slot="sidebar-menu"
    :class="cn('gap-0 flex w-full min-w-0 flex-col', props.class)"
  >
    <slot />
  </ul>
</template>
