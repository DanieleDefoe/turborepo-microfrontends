<script lang="ts" setup>
  import { RefreshCcwIcon } from "@lucide/vue";
</script>

<template>
  <UiTooltipProvider>
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton class="p-1" variant="ghost">
          <RefreshCcwIcon class="size-4" />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>refresh</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>
