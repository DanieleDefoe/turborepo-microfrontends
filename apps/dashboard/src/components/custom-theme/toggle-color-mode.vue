<script lang="ts" setup>
  import { MoonIcon, SunIcon, SunMoonIcon } from "@lucide/vue";
  import type { BasicColorSchema } from "@vueuse/core";
  import { useColorMode } from "@vueuse/core";
  import type { Component } from "vue";

  const mode = useColorMode();

  const colorModes: {
    colorMode: BasicColorSchema;
    icon: Component;
  }[] = [
    { colorMode: "light", icon: SunIcon },
    { colorMode: "dark", icon: MoonIcon },
    { colorMode: "auto", icon: SunMoonIcon },
  ];

  function setColorMode(colorMode: BasicColorSchema) {
    mode.value = colorMode;
  }
</script>

<template>
  <div class="space-y-1.5 pt-6">
    <UiLabel class="text-xs" for="radius"> Color Mode </UiLabel>
    <div class="grid grid-cols-3 gap-2 py-1.5">
      <UiButton
        class="justify-center items-center h-8 px-3"
        variant="outline"
        v-for="item in colorModes"
        :key="item.colorMode"
        :class="item.colorMode === mode ? 'border-foreground border-2' : ''"
        @click="setColorMode(item.colorMode)"
      >
        <component :is="item.icon" />
        <span class="text-xs">{{ item.colorMode }}</span>
      </UiButton>
    </div>
  </div>
</template>
