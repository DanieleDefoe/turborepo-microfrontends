<script lang="ts" setup>
  import { ChevronsUpDownIcon } from "@lucide/vue";

  import { settingsNavItems } from "@/constants/sidebar-data";

  const route = useRoute();
  const currentPath = computed(() => route.path);
  const activeClass = "text-primary font-semibold bg-primary/5";
  const currentLink = computed(() =>
    settingsNavItems.find((link) => link.url === currentPath.value)
  );
</script>

<template>
  <nav class="flex flex-col gap-2">
    <router-link
      class="items-center hidden px-2 py-1 rounded-md lg:flex hover:bg-primary/5"
      v-for="link in settingsNavItems"
      :key="link.url"
      :class="link.url === currentPath ? activeClass : ''"
      :to="link.url"
    >
      <component class="size-4 mr-1" :is="link.icon" />
      <span>{{ link.title }}</span>
    </router-link>

    <UiDropdownMenu class="lg:hidden">
      <UiDropdownMenuTrigger as-child>
        <UiButton class="w-48 lg:hidden" variant="outline">
          <component class="size-4 mr-1" :is="currentLink?.icon" />
          <span>{{ currentLink?.title }}</span>
          <ChevronsUpDownIcon class="size-4 ml-auto" />
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent align="start" class="w-48">
        <UiDropdownMenuItem
          v-for="link in settingsNavItems"
          :key="link.url"
          @click="$router.push(link.url)"
        >
          <component class="size-4 mr-1" :is="link.icon" />
          {{ link.title }}
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </nav>
</template>
