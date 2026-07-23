<script lang="ts" setup>
  import { Separator } from ".";
</script>

<template>
  <Stories title="UI/Separator" :component="Separator">
    <Story title="Default">
      <div class="w-64">
        <p class="text-sm font-medium leading-none">Radix Primitives</p>
        <p class="text-muted-foreground text-sm">
          An open-source UI component library.
        </p>
        <Separator class="my-4" />
        <div class="flex h-5 items-center gap-4 text-sm">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      </div>
    </Story>
  </Stories>
</template>
