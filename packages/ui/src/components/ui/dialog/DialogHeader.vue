<script lang="ts" setup>
  import { cn } from "@ap/ui/lib/utils";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="cn('gap-2 flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
