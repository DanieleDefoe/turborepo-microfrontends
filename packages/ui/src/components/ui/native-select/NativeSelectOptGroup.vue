<script lang="ts" setup>
  import { cn } from "@ap/ui/lib/utils";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <optgroup
    data-slot="native-select-optgroup"
    :class="cn('bg-[Canvas] text-[CanvasText]', props.class)"
  >
    <slot />
  </optgroup>
</template>
