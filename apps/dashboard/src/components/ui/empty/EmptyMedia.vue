<script lang="ts" setup>
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";
  import type { EmptyMediaVariants } from ".";
  import { emptyMediaVariants } from ".";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
    variant?: EmptyMediaVariants["variant"];
  }>();
</script>

<template>
  <div
    data-slot="empty-icon"
    :class="cn(emptyMediaVariants({ variant }), props.class)"
    :data-variant="variant"
  >
    <slot />
  </div>
</template>
