<script lang="ts" setup>
  import { storeToRefs } from "pinia";

  import { CONTENT_LAYOUTS } from "@/constants/themes";
  import { useThemeStore } from "@/stores/theme";

  const themeStore = useThemeStore();
  const { setContentLayout } = themeStore;
  const { contentLayout } = storeToRefs(themeStore);
</script>

<template>
  <div class="space-y-1.5 pt-6">
    <UiLabel class="text-xs" for="radius"> Content Layout </UiLabel>
    <div class="grid grid-cols-2 gap-2 py-1.5">
      <UiButton
        class="justify-center h-8 px-3"
        variant="outline"
        v-for="layout in CONTENT_LAYOUTS"
        :key="layout.label"
        :class="contentLayout === layout.value ? 'border-foreground border-2' : ''"
        @click="setContentLayout(layout.value)"
      >
        <component :is="layout.icon" />
        {{ layout.label }}
      </UiButton>
    </div>
  </div>
</template>
