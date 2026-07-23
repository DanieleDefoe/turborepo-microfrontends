<script lang="ts" setup>
  import { Loader2Icon } from "@lucide/vue";
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
</script>

<template>
  <Loader2Icon
    aria-label="Loading"
    role="status"
    :class="cn('size-4 animate-spin', props.class)"
  />
</template>
