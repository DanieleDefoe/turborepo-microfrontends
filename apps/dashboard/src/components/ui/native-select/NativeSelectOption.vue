<!-- @fallthroughAttributes true -->
<!-- @strictTemplates true -->

<script lang="ts" setup>
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";

  const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <option :class="cn('bg-popover text-popover-foreground', props.class)">
    <slot />
  </option>
</template>
