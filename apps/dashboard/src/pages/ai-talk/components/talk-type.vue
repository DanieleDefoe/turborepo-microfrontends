<script lang="ts" setup>
  import { RadioTowerIcon, SparklesIcon } from "@lucide/vue";

  import type { TalkMode } from "../types";

  const type = defineModel<TalkMode>("type", {
    default: "deep-think",
  });

  const types = [
    { icon: SparklesIcon, type: "deep-think" },
    { icon: RadioTowerIcon, type: "online" },
  ] satisfies { type: TalkMode; icon: Component }[];
</script>

<template>
  <UiToggleGroup size="sm" type="single" variant="outline" v-model="type">
    <UiToggleGroupItem
      class="px-4"
      v-for="modelType in types"
      :key="modelType.type"
      :aria-label="modelType.type"
      :value="modelType.type"
    >
      <component class="size-4 mr-1" :is="modelType.icon" />
      {{ modelType.type }}
    </UiToggleGroupItem>
  </UiToggleGroup>
</template>
