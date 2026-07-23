<script lang="ts" setup>
  import { ExternalLinkIcon } from "@lucide/vue";

  import type { NavItem } from "./types";

  defineProps<{
    isActive: boolean;
    tooltip?: string;
    isExternalUrl?: boolean;
    menu: NavItem;
  }>();
</script>

<template>
  <UiSidebarMenuButton as-child :is-active="isActive" :tooltip="tooltip">
    <a
      class="flex items-center gap-2"
      rel="noopener noreferrer"
      target="_blank"
      v-if="isExternalUrl"
      :href="menu.url"
    >
      <component :is="menu.icon" v-if="menu.icon" />
      <span>{{ menu.title }}</span>
      <ExternalLinkIcon class="w-4 h-4 ml-auto" />
    </a>

    <router-link class="flex items-center gap-2" v-else :to="menu.url!">
      <component :is="menu.icon" v-if="menu.icon" />
      <span>{{ menu.title }}</span>
    </router-link>
  </UiSidebarMenuButton>
</template>
