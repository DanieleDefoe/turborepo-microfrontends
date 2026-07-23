<script lang="ts" setup>
  import { storeToRefs } from "pinia";

  import { RADIUS } from "@/constants/themes";
  import { useThemeStore } from "@/stores/theme";

  const themeStore = useThemeStore();
  const { setRadius } = themeStore;
  const { radius } = storeToRefs(themeStore);
</script>

<template>
  <div class="space-y-1.5 pt-6">
    <UiLabel class="text-xs" for="radius"> Radius </UiLabel>
    <div class="grid grid-cols-5 gap-2 py-1.5">
      <UiButton
        class="justify-center h-8 px-3"
        variant="outline"
        v-for="rayon in RADIUS"
        :key="rayon"
        :class="rayon === radius ? 'border-foreground border-2' : ''"
        @click="setRadius(rayon)"
      >
        <span class="text-xs">{{ rayon }}</span>
      </UiButton>
    </div>
  </div>
</template>
