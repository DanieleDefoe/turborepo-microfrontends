<script lang="ts" setup>
  import { Icon } from "@iconify/vue";

  import Marquee from "@/components/inspira-ui/marquee/index.vue";

  const types = [
    { icon: "simple-icons:nuxt", name: "Nuxt" },
    { icon: "simple-icons:vitess", name: "Vue" },
    { icon: "simple-icons:vite", name: "Vite" },
    { icon: "simple-icons:vitest", name: "vitest" },
    { icon: "simple-icons:visualstudiocode", name: "vscode" },
    { icon: "simple-icons:mysql", name: "mysql" },
    { icon: "simple-icons:prisma", name: "prisma" },
  ];
</script>

<template>
  <div
    class="relative flex w-full flex-col items-center justify-center overflow-hidden -rotate-3"
  >
    <Marquee class="[--duration:50s]" pause-on-hover reverse>
      <div
        class="flex items-center gap-2 mx-4"
        v-for="type in types"
        :key="type.name"
      >
        <Icon class="w-12 h-12" :icon="type.icon" />
        <span class="font-black text-4xl">{{ type.name }}</span>
      </div>
    </Marquee>

    <!-- Left Gradient -->
    <div
      class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-(--ui-bg) dark:from-(--ui-bg)"
    />

    <!-- Right Gradient -->
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-(--ui-bg) dark:from-(--ui-bg)"
    />
  </div>
</template>
