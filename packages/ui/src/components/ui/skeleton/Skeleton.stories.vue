<script setup lang="ts">
import { Skeleton } from '.'
</script>

<template>
  <Stories title="UI/Skeleton" :component="Skeleton">
    <!-- bg-muted is near-white in this theme, so show it as a bordered loading
         card (the realistic usage) rather than bare shapes on the canvas. -->
    <Story title="Card">
      <div class="w-[300px] rounded-xl border p-4">
        <div class="flex items-center gap-4">
          <Skeleton class="size-12 rounded-full" />
          <div class="grid gap-2">
            <Skeleton class="h-4 w-[180px]" />
            <Skeleton class="h-4 w-[140px]" />
          </div>
        </div>
        <Skeleton class="mt-4 h-24 w-full rounded-lg" />
      </div>
    </Story>
  </Stories>
</template>
