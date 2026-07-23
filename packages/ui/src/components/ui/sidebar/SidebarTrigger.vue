<script lang="ts" setup>
  import { Button } from "@ap/ui/components/button";
  import { cn } from "@ap/ui/lib/utils";
  import { PanelLeftIcon } from "@lucide/vue";
  import type { HTMLAttributes } from "vue";
  import { useSidebar } from "./utils";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();

  const { toggleSidebar } = useSidebar();
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    size="icon-sm"
    variant="ghost"
    :class="cn('', props.class)"
    @click="toggleSidebar"
  >
    <PanelLeftIcon class="cn-rtl-flip" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
