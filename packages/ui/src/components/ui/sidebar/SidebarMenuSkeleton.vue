<script lang="ts" setup>
  import { Skeleton } from "@ap/ui/components/skeleton";
  import { cn } from "@ap/ui/lib/utils";
  import type { HTMLAttributes } from "vue";
  import { computed } from "vue";

  const props = defineProps<{
    showIcon?: boolean;
    class?: HTMLAttributes["class"];
  }>();

  const width = computed(() => `${Math.floor(Math.random() * 40) + 50}%`);
</script>

<template>
  <div
    data-sidebar="menu-skeleton"
    data-slot="sidebar-menu-skeleton"
    :class="cn('h-8 gap-2 rounded-md px-2 flex items-center', props.class)"
  >
    <Skeleton
      class="size-4 rounded-md"
      data-sidebar="menu-skeleton-icon"
      v-if="showIcon"
    />

    <Skeleton
      class="h-4 max-w-(--skeleton-width) flex-1"
      data-sidebar="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>
