<script lang="ts" setup>
  import { ChevronRightIcon, LayoutListIcon } from "@lucide/vue";
  import { storeToRefs } from "pinia";

  import type { NavigationMode } from "@/stores/sidebar-config";

  import { useSidebarConfigStore } from "@/stores/sidebar-config";

  const sidebarConfigStore = useSidebarConfigStore();
  const { navigationMode } = storeToRefs(sidebarConfigStore);

  const menuStyles: Array<{
    value: NavigationMode;
    label: string;
    icon: any;
    description: string;
  }> = [
    {
      description: "Traditional collapsible menu",
      icon: LayoutListIcon,
      label: "Collapsible",
      value: "collapsible",
    },
    {
      description: "Click to navigate to the next level",
      icon: ChevronRightIcon,
      label: "Vercel Style",
      value: "vercel",
    },
  ];

  function handleMenuStyleChange(style: NavigationMode) {
    sidebarConfigStore.setNavigationMode(style);
  }
</script>

<template>
  <div class="space-y-1.5 pt-6">
    <UiLabel class="text-xs" for="menu-style"> Menu Style </UiLabel>
    <div class="grid grid-cols-2 gap-2 py-1.5">
      <UiButton
        class="justify-center h-8 px-3"
        variant="outline"
        v-for="style in menuStyles"
        :key="style.value"
        :class="navigationMode === style.value ? 'border-foreground border-2' : ''"
        :title="style.description"
        @click="handleMenuStyleChange(style.value)"
      >
        <component class="w-4 h-4" :is="style.icon" />
        {{ style.label }}
      </UiButton>
    </div>
  </div>
</template>
