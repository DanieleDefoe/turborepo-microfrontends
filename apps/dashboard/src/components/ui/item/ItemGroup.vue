<script lang="ts" setup>
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
</script>

<template>
  <div
    data-slot="item-group"
    role="list"
    :class="cn('group/item-group flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
