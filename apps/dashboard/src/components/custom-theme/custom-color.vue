<script lang="ts" setup>
  import { storeToRefs } from "pinia";

  import { THEME_PRIMARY_COLORS } from "@/constants/themes";
  import { useThemeStore } from "@/stores/theme";

  const themeStore = useThemeStore();
  const { setTheme } = themeStore;
  const { theme: t } = storeToRefs(themeStore);
</script>

<template>
  <div class="space-y-1.5 pt-6">
    <UiLabel class="text-xs" for="radius"> Color </UiLabel>
    <div class="grid grid-cols-2 gap-2 py-1.5">
      <UiButton
        class="justify-center h-8 px-3"
        variant="outline"
        v-for="theme in THEME_PRIMARY_COLORS"
        :key="theme.theme"
        :class="t === theme.theme ? 'border-foreground border-2' : ''"
        @click="setTheme(theme.theme)"
      >
        <span
          class="size-2 rounded-full bg-(--theme-primary)"
          :style="{
            '--theme-primary': theme.primaryColor,
          }"
        />
        <span class="text-xs"
          >{{ theme.theme[0].toUpperCase() }}{{ theme.theme.slice(1) }}</span
        >
      </UiButton>
    </div>
  </div>
</template>
