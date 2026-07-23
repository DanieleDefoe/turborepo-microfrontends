<script lang="ts" setup>
  import { ThumbsUpIcon } from "@lucide/vue";
</script>

<template>
  <UiTooltipProvider>
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton class="p-1" variant="ghost">
          <ThumbsUpIcon class="size-4" />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>Good Job</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>
