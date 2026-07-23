<script lang="ts" setup>
  import type { MessageScrollerProviderProps } from "./useMessageScroller";
  import { provideMessageScroller } from "./useMessageScroller";

  const props = defineProps<MessageScrollerProviderProps>();

  provideMessageScroller(props);
</script>

<template>
  <slot />
</template>
