<script lang="ts" setup>
  import { ThumbsDownIcon } from "@lucide/vue";
</script>

<template>
  <UiTooltipProvider>
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton class="p-1" variant="ghost">
          <ThumbsDownIcon class="size-4" />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>It's so bad</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>
