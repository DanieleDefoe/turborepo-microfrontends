<script lang="ts" setup>
  import { cn } from "@ap/ui/lib/utils";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
</script>

<template>
  <ul
    data-sidebar="menu-sub"
    data-slot="sidebar-menu-sub"
    :class="cn(
      'border-sidebar-border mx-3.5 translate-x-px gap-1 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden flex min-w-0 flex-col',
      props.class,
    )"
  >
    <slot />
  </ul>
</template>
