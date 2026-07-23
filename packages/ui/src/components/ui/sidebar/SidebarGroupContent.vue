<script lang="ts" setup>
  import { cn } from "@ap/ui/lib/utils";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
</script>

<template>
  <div
    data-sidebar="group-content"
    data-slot="sidebar-group-content"
    :class="cn('text-sm w-full', props.class)"
  >
    <slot />
  </div>
</template>
