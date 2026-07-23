<script lang="ts" setup>
  import { Icon } from "@iconify/vue";
  import { useColorMode } from "@vueuse/core";

  const mode = useColorMode();

  const links = [
    {
      icon: "simple-icons:bluesky",
      name: "bluesky",
      url: "https://bsky.app/profile/bitmc.bsky.social",
    },
    {
      icon: "simple-icons:github",
      name: "github",
      url: "https://www.github.com/whbbit1999/shadcn-vue-admin",
    },
    {
      icon: "simple-icons:bilibili",
      name: "bilibili",
      url: "https://space.bilibili.com/104376935",
    },
  ];
</script>

<template>
  <footer class="min-h-18 flex items-center justify-between">
    <UiAvatar>
      <UiAvatarImage
        alt="Logo"
        :src="`${mode === 'dark' ? '/logo.svg' : '/logo-black.svg'}`"
      />
    </UiAvatar>

    <div>© 2025 Whbbit1999</div>

    <div class="flex items-center gap-2">
      <UiButton
        as="a"
        size="icon"
        target="_blank"
        variant="outline"
        v-for="link in links"
        :key="link.name"
        :href="link.url"
      >
        <Icon :icon="link.icon" />
      </UiButton>
    </div>
  </footer>
</template>
